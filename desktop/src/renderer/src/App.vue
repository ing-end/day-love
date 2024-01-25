<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import utils from './utils/index.js';
const isMaxWinSize = ref(false);
onMounted(() => {
	utils.onMainProcess('update_size_state', (value) => {
		isMaxWinSize.value = value;
	});
});
function maxWindowSize() {
	const name = isMaxWinSize.value ? 'app_unmaximize' : 'app_maximize';
	utils.sendToMainProcess(name);
	isMaxWinSize.value = !isMaxWinSize.value;
}
function minWinSize() {
	utils.sendToMainProcess('app_minimize');
}
function quitApp() {
	utils.sendToMainProcess('app_quit');
}
</script>

<template>
	<div class="app">
		<div class="app_nav">
			<div class="info_wrapper">
				<span class="app_logo">
					<img
						style="
							width: 20px;
							height: 20px;
							user-select: none;
							-webkit-user-drag: none;
						"
						src="./assets/icons/logo.svg"
					/>
				</span>
			</div>
			<div class="button_wrapper">
				<span class="button" @click="minWinSize">
					<img style="width: 15px; height: 15px" src="./assets/icons/min.svg" />
				</span>
				<span class="button" @click="maxWindowSize">
					<img
						v-if="isMaxWinSize"
						style="width: 20px; height: 20px"
						src="./assets/icons/fulling.svg"
					/>
					<img v-else style="width: 15px; height: 15px" src="./assets/icons/full.svg" />
				</span>
				<span class="button error" @click="quitApp">
					<img style="width: 15px; height: 15px" src="./assets/icons/close.svg" />
				</span>
			</div>
		</div>
		<div class="app_body">
			<RouterView></RouterView>
		</div>
	</div>
</template>

<style lang="less" scoped>
.app {
	width: 100%;
	height: 100%;
	.app_nav {
		width: 100%;
		height: 40px;
		float: left;
		padding: 0 0 0 10px;
		-webkit-app-region: drag;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		border-bottom: 1px solid #ebedf0;
		.info_wrapper {
			height: 100%;
			display: flex;
			align-items: center;
			.app_logo {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				user-select: none;
				-webkit-user-drag: none;
			}
		}
		.button_wrapper {
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: end;
			-webkit-app-region: no-drag;
			.button {
				width: 50px;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					user-select: none;
					-webkit-user-drag: none;
				}
			}
			.button:hover {
				background-color: #ebedf0;
			}
			.button.error:hover {
				background-color: #f56c6c;
			}
		}
	}
	.app_body {
		width: 100%;
		height: calc(100% - 60px);
		float: left;
	}
}
</style>
