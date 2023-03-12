<script lang="ts">
	import { PUBLIC_BACKEND_URL } from "$env/static/public";
	import { onMount } from "svelte";
	import Item from "./Item.svelte";
	import ItemUploadCard from "./ItemUploadCard.svelte";
	import Loading from "./Loading.svelte";

    const url = PUBLIC_BACKEND_URL + "getFiles"

    let fileNames: any[] = [];

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

    var testData:any

    async function test() {
        testData = fetch(url + "getFiles")
        console.log(testData);
        
    }

</script>
    {testData}
    <button on:click={test}>test</button>
    {#await getData()}
    <div class="loading">
            <Loading></Loading>
    </div> 
    {:then}
    <div class="center-container">
        <div class="content">
            <ItemUploadCard></ItemUploadCard>
            {#each fileNames as fileName}
                <Item {fileName}></Item>
            {/each}
        </div>
    </div>
    {/await}

<style>

@media(max-width: 600px)
{
    .center-container{
        margin: auto;
        width: 50%;
        padding: 10px;
    }
}

.center-container{
    display: flex;
    align-items: center;
    justify-content: start;
}

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