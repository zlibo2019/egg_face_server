<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style type="text/scss" lang="scss">
	* {
        margin: 0;
        padding: 0;
        list-style: none;
        box-sizing: border-box;
    }
    html, body {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    #app {
        height: 100%;
        width: 100%;
    }
</style>
