<script lang="ts">

  let url = 'h3002731.stratoserver.net:3000/upload'
  let  avatar, fileinput;
  let dataAsSteam : ReadableStream;
	
  const form = document.querySelector('form');
	const onFileSelected =(e)=>{

    console.log(e.target.files[0]);
    

    let image = e.target.files[0];
    let dataAsSteam = new ReadableStream(e)
    
  }

  async function upload() {
    
    const selectedFile = document.getElementById('input').files[0];    
    const fileName = selectedFile.name;

    let header = new Headers();
    header.append('Content-Type','application/octet-stream')
    header.append('Content-Name', fileName)
    let req = new Request(url,{
      method: 'POST',
      headers: header,
      body: selectedFile
    });

    fetch(req)
    location.reload();
  }

</script>
  
  <div class="container">
      <!--
        <img class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
        <div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>    
        <input style="display:none" type="file" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
        
      -->

      <input type="file" id="input" multiple />
      <button on:click={upload}>Upload</button>
      
  </div>
  
<style lang="scss">
  
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;900&display=swap');
  
  
  img {
    width: 50%;
    height: auto;
  }
  
  .container  {
    display: flex;
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
  
</style>