<template>
    <div>
        <!-- Sidebar -->
        <div class="w3-sidebar w3-bar-block w3-border-right" style="display:none" id="mySidebar">
            <button @click="w3_close()" class="w3-bar-item w3-black w3-large">Close &times;</button>
            <router-link to="/" exact>
            <a href="#" class="w3-bar-item w3-button">HOME</a>
            </router-link>
            <router-link to="/apartment">
                <a class="w3-bar-item w3-button" href="#">APARTMENT</a>
            </router-link>
            <router-link to="/payment">
                <a class="w3-bar-item w3-button" href="#">PAYMENT</a>
            </router-link>
            <router-link to="/bill">
                <a class="w3-bar-item w3-button" href="#">BILL</a>
            </router-link>
        </div>
        <button class="w3-button w3-xlarge" @click="w3_open()">☰</button>
        <h1>SGV</h1>
    </div>
</template>

<script>
export default {
    setup() {
        
    },
    methods:{
        logout(){
            var ans = confirm("Are You Sure ?")

            if(ans){
                localStorage.clear()
                this.$parent.isLoggedIn = false
            }
        },
        w3_open() {
            document.getElementById("mySidebar").style.display = "block";
        },
        w3_close() {
            document.getElementById("mySidebar").style.display = "none";
        }
    }
}
</script>

<style scoped>
.w3-sidebar{
    background: rgb(20,157,13);
background: linear-gradient(90deg, rgba(20,157,13,1) 0%, rgba(172,237,160,1) 100%, rgba(0,212,255,1) 100%);
}
h1{
    display: inline-block;
    margin-left: 25%;
    margin-top: 2%;
}
.w3-bar-item{
    color: white;
}
</style>