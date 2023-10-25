<template>
    <div class="left-box">
        <Kline></Kline>
    </div>
</template>

<script>
import Kline from "@/components/Kline.vue";

export default {
    name: "HomeView",
    components: {
        Kline,
    },
};
</script>
<style scoped>
.left-box {
    width: 100%;
    height: 36%;
}
</style>
