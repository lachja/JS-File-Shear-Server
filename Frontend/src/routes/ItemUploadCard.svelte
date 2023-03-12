<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import Loading from './Loading.svelte';

  const url = PUBLIC_BACKEND_URL + "upload"
  let loading = false;

  let file:any = {};

  async function upload() {
    const selectedFile = file
    const fileName = selectedFile.name;
    
    let header = new Headers();
    header.append('Content-Name', fileName)
    let req = new Request(url,{
      method: 'POST',
      headers: header,
      body: selectedFile
    });
    loading = true;
    await fetch(req)
      .then(res => {console.log(res);
      })
    loading = false;
    location.reload();
  }

  function openFileDialog(){
    let input = document.createElement('input');
    input.id = 'input';
    input.type = 'file';
    input.onchange = ()  => {
        let files =   Array.from(input.files);
        file = files[0];
        fileProxy.file = files[0];
      };
    input.click();
  }

  var fileProxy = new Proxy(file, {
    set: function (target, key, value) {        
        console.log(isEmpty(value));
        
        if(isEmpty(value)){
          document.getElementById("uploadButton").disabled = true;
        }else{
          document.getElementById("uploadButton").disabled = false;
        }
        
        target[key] = value;
        return true;
    }
  });

  function isEmpty(obj:any) {
    if(Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype){
      return true
    } 
    return false
  }

</script>

  <div class="container">
    {#if loading}
      <Loading></Loading>
    {:else}
      <div on:click={openFileDialog} class="card-container" id="card-container">
        <img id="upload-image" src="src/icons/upload-image.png">
        <label>Upload files</label>
      </div>
      <button disabled on:click={upload} class="uploadButton" id="uploadButton">Upload</button>
    {/if}
  </div>
  
<style lang="scss">
  img {
    width: 100%;
    height: auto;
  }

  .card-container{
    border-radius: 20px;
    border-style: dashed;
    border-color: #a1a1a1;
    width: 90%;
    height: 70%;

    border-radius: 15px;
    background: #ffffff;
    box-shadow: inset 5px 5px 10px #d9d9d9,
                inset -5px -5px 10px #ffffff;
    justify-items: center;
    justify-content: center;
    text-align: center;
    margin: 1rem;
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
    box-shadow: 0 0 20px 8px #585858;
  }
  
  .container:hover {
    box-shadow: 0 0 20px 8px rgb(61, 61, 61);
  }

  .uploadButton{
    margin: 10px;
    background:    #3e6ef2;
    border-radius: 11px;
    padding:       20px 45px;
    color:         #ffffff;
    display:       inline-block;
    font:          normal bold 26px/1 "Open Sans", sans-serif;
    text-align:    center;
    border:        none;
    box-shadow:    0 5px #666;
  }

  .uploadButton:hover{
    background:    #245bf0;
  }

  .uploadButton:active{
    transform: translateY(3px);
    box-shadow:    0 2px #666;
  }

  .uploadButton:disabled{
    background:    #7f95db;
    box-shadow: 0 2px #666;
    transform: translateY(3px);
  }
  
</style>