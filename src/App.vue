<template>
    <div id='app'>
        <topBar></topBar>
        <headerBar></headerBar>
        <router-view></router-view>
        <footerBar></footerBar>
    </div>
</template>
<script>
import topBar from './components/topBar.vue'
import headerBar from './components/headerBar.vue'
import footerBar from './components/footerBar.vue'
export default {
    name: 'app',
        data () {
            return {
            }
        },
        components:{
            topBar,
            headerBar,
            footerBar
        }
    }
</script>

<style lang='less'>
* {
    border:0;
    margin:0;
    padding:0;
}
.container {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    color: #000;
}

h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    list-style: none;   
}

a {
    color: #2693d4;
    text-decoration: none;
}
.clearfix {
    clear:both;
    height:0;
    overflow: hidden;
}
</style>
