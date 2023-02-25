<script lang="ts">
	import { onMount } from "svelte";
	import Item from "./Item.svelte";
	import ItemUploadCard from "./ItemUploadCard.svelte";
	import Loading from "./Loading.svelte";

    const url = "h3002731.stratoserver.net:3000/getFiles"

    let fileNames: any[] = [];
    let tempUrl: string

    async function getData(): Promise<string[]> {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.files;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    onMount(async () => {
        fileNames = await getData();
    });

    async function testConnetion(){
        const response = await fetch(tempUrl)
        console.log(response);
        console.log(response.json);
        
    }

</script>


    {#await getData()}
    <div class="loading">
            <Loading></Loading>
    </div> 
    {:then}
    <div class="content">
        <ItemUploadCard></ItemUploadCard>
        {#each fileNames as fileName}
            <Item {fileName}></Item>
        {/each}
    </div>

    <button on:click={() => testConnetion()}>test connection</button>
    url eingabe
    <input bind:value={tempUrl}>

    {/await}

<style>


.content{
    display: flex ;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start
}

.loading{
    display: grid;
    height: 100vh;
    width: 100vw;
    place-items: center;
}


</style>