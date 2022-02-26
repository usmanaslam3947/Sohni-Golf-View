<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Sohni Golf View</a>
                <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button> -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" exact>
                            <a class="nav-link active" href="#">Home</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/apartment">
                            <a class="nav-link" href="#">Apartment</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/payment">
                            <a class="nav-link" href="#">Payment</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/bill">
                            <a class="nav-link" href="#">Bill</a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" @click="logout()" class="nav-link">LOGOUT</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
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
            
           
        }
    }
}
</script>

<style scoped>
.navbar{
   background: rgb(20,157,13);
background: linear-gradient(90deg, rgba(20,157,13,1) 0%, rgba(172,237,160,1) 100%, rgba(0,212,255,1) 100%);
}
</style>