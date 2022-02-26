<template>
  <div>
    <Sidebar id="sidebar"></Sidebar>
    <Navbar id="navbar"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Sidebar,
    Navbar
  }
}
</script>

<style>
h1{
  text-align: center;
}
@media(max-width: 991px){
  #navbar{
    display: none;
  }
  #sidebar{
    display: block;
  }
}

@media(min-width: 992px){
  #sidebar {
    display: none;
  }
  #navbar{
    display: block;
  }
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
