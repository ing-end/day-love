<template>
    <div id="chart-box" ref="chartBox">
        <canvas
            id="price-chart"
            :width="canvasWidth"
            :height="canvasHeight"
            ref="pCanvas"
        ></canvas>
    </div>
</template>

<script>
export default {
    name: "PriceChart",
    props: {},
    data() {
        return {
            context: null,
            canvasWidth: 1080,
            canvasHeight: 200,
        };
    },
    mounted() {
        const box = document.getElementById("chart-box");
        this.canvasWidth = box.offsetWidth;
        this.canvasHeight = box.offsetHeight;
        console.log(this.canvasHeight, this.canvasWidth);
        this.$nextTick(() => {
            const canvas = document.getElementById("price-chart");
            this.context = canvas.getContext("2d");
            console.log(this.context);
            this.context.font = "24px SimSun, Songti SC";
            this.context.fillText("24px的宋体呈现", 0, 24);
        });
    },
    methods: {},
};
</script>

<style scoped>
#chart-box {
    width: 100%;
    height: 100%;
}
</style>
