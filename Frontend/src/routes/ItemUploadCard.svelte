<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';


  import * as fs from 'fs/promises';
	import Loading from './Loading.svelte';
	import Progressbar from './Progressbar.svelte';

  //let url = 'http://h3002731.stratoserver.net:3000/upload'
  const url = PUBLIC_BACKEND_URL + "upload"
  let  avatar, fileinput;
  let dataAsSteam : ReadableStream;
  let loading = false;
	
  const form = document.querySelector('form');

  async function upload() {
  
    const selectedFile = document.getElementById('input').files[0];   
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
    //location.reload();
  }

</script>
  
  <div class="container">
    {#if loading}
      <Loading></Loading>
    {:else}
      <Progressbar></Progressbar>
      <input type="file" id="input" multiple />
      <button id="uploadButton" on:click={upload}>Upload</button>
    {/if}
  </div>
  
<style lang="scss">
  
  //@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;900&display=swap');
  
  
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