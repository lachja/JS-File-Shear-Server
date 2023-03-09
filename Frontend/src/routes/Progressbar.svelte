<script>
var i = 0;
function move() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 10;
        var id = setInterval(frame, 10);
        function frame() {
        if (width >= 100) {
            clearInterval(id);
            i = 0;
        } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width  + "%";
        }
        }
    }
}
</script>

<button on:click={move}>Go</button>
<div id="myProgress">
    <div id="myBar">10%</div>
</div>

<style lang="scss">
#myBar {
    width: 10%;
    height: 30px;
    background-color: #04AA6D;
    text-align: center; /* To center it horizontally (if you want) */
    line-height: 30px; /* To center it vertically */
    color: white;
}
</style>