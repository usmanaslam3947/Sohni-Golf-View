<template>
    <div>
        <button @click="closeForm()" class="btn btn-danger ml-auto">X</button>
        <h1>UPDATE APARTMENT</h1>
        <form @submit.prevent="updateApartment()">
            <div class="mb-3">
                <label for="apartment_number" class="form-label">APARTMENT NUMBER</label>
                <input type="text" class="form-control" id="apartment_number" v-model="this.apartment.num">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">PERSON NAME</label>
                <input type="text" class="form-control" id="name" v-model="this.apartment.name" >
            </div>
            <div class="mb-3">
                <label for="contact" class="form-label">CONTACT</label>
                <input type="number" class="form-control" id="contact" v-model="this.apartment.contact">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="this.apartment.email">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>

            <button type="submit" class="btn btn-primary">UPDATE</button>
        </form>
    </div>
</template>

<script>
export default {
    props : {
        apart : {
            type : Object
        }
    },
    setup() {
        
    },
    data(){
        return {
            apartment : {
                id : Number,
                num : "",
                name : "",
                contact : Number,
                email : ""
            }
        }
    },
    methods:{
        closeForm(){
            this.$emit("update_apartment",false)
        },
        updateApartment(){
            this.axios.put("http://localhost:3000/updateApart",
            {
                apart : this.apartment
            }
            ).then((res)=>{
                console.log(res.data)

                if(res.data == true){
                    alert("Update Successfull")
                    this.$emit("update_apartment",false);
                }
            })
        }
    },
    mounted(){
        this.apartment.id = this.apart.apart_id
        this.apartment.num = this.apart.apart_num
        this.apartment.name = this.apart.person_name
        this.apartment.contact = this.apart.person_contact
        this.apartment.email = this.apart.person_email
        // document.getElementById("apartment_number").value = this.apart.apart_num
        // document.getElementById("name").value = this.apart.person_name
        // document.getElementById("contact").value = this.apart.person_contact
        // document.getElementById("email").value = this.apart.person_email
    }
}
</script>

<style scoped>
h1{
    text-align: center;
}


</style>