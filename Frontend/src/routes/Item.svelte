<script lang="ts">


export let fileName: string
let dataType = getDataType()
const url = "h3002731.stratoserver.net:3000/"

enum FileExtensions {
  PNG = ".png",
  JPG = ".jpg",
  PDF = ".pdf",
  TXT = ".txt"
}

function getDataType():string {
  let extension = fileName.substring(fileName.lastIndexOf("."));

  switch (extension) {
    case FileExtensions.PNG:
      return "png"
    case FileExtensions.JPG:
      return "jpg"
    case FileExtensions.PDF:
      return "pdf"
    case FileExtensions.TXT:
      return "txt"
    default:
      return "package"
  }
}

async function deleteFile(): Promise<void> {
    const response = await fetch(url + `delete/${fileName}`, {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error(`Could not delete file ${fileName}`);
    }
    location.reload();
}

async function downloadFile(){
    let response = await fetch(`h3002731.stratoserver.net:3000/getFile/${fileName}`);
    let data = await response.blob();

    let a = document.createElement("a");
    let url = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}


</script>

<div class="container">
  <img src="src/icons/{dataType}.png" alt="default icon" on:click={() => downloadFile()} > 
  <h3>{fileName}</h3>
  <svg id="close" on:click={()=>deleteFile()} viewBox="0 0 12 12">
    <circle cx=6 cy=6 r=6 />
    <line x1=3 y1=3 x2=9 y2=9 />
    <line x1=9 y1=3 x2=3 y2=9 />
  </svg>
  
</div>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;900&display=swap');


img {
  width: 80%;
  height: auto;
}

.container  {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 300px;
  width: 200px;
  margin: 1rem;
  background: #f2f2f2;
  overflow: hidden;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 0 20px 8px #d0d0d0;
}

.container:hover {
  box-shadow: 0 0 20px 8px #a1a1a1;
}

.container:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

h3 {
  font-weight: 300;
}

#close {
  position: absolute;
  width:24px;
  height:24px;
  top : 10px;
  right: 10px;
  cursor: pointer;
  fill:#F44;
  transition: transform 0.3s;
}




#close:hover {
  transform: scale(1.3);
}

#close line {
  stroke:#FFF;
  stroke-width:2;
}

</style>