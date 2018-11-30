<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import router from './router'

export default {
	name: 'App',
	data () {
		return {
			info: null
		}
	}
}
</script>

<style lang='scss'>

@import '@/assets/styles/main.scss';

body {
	margin: 0;
	background-color: $blue-grey;
}

#app {
	font-family: Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
