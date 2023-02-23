<script lang="ts">
	import { onMount } from "svelte";
	import Item from "./Item.svelte";
	import ItemUploadCard from "./ItemUploadCard.svelte";
	import Loading from "./Loading.svelte";

    const url = "http://localhost:3000/getFiles"

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