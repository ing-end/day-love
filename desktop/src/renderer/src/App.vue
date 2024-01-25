<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
	<div class="app">
		<div class="app-nav">
			<div class="title">
				<img style="width: 30px; height: 30px" src="./assets/logo.svg" />
			</div>
			<div class="btn-wrapper">
				<img style="width: 30px; height: 30px" src="./assets/close.svg" />
			</div>
		</div>
		<div class="app-body">
			<RouterView></RouterView>
		</div>
	</div>
</template>

<style lang="less" scoped>
.app {
	width: 100%;
	height: 100%;
	.app-nav {
		width: 100%;
		height: 60px;
		float: left;
		padding: 0 10px;
		-webkit-app-region: drag;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		.title {
			height: 100%;
			display: flex;
			align-items: center;
			user-select: none;
			-webkit-app-region: no-drag;
			pointer-events: none;
		}
		.btn-wrapper {
			height: 100%;
			display: flex;
			align-items: center;
			user-select: none;
			justify-content: end;
			pointer-events: none;
			-webkit-app-region: no-drag;
		}
	}
	.app-body {
		width: 100%;
		height: calc(100% - 60px);
		float: left;
	}
}
</style>
