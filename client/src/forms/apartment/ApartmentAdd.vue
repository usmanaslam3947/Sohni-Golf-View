<template>
    <div>

        <button @click="closeForm()" class="btn btn-danger ml-auto">X</button>
        <h1>ADD APARTMENT</h1>
        <form @submit.prevent="addApartment()">
            <div class="mb-3">
                <label for="apartment_number" class="form-label">APARTMENT NUMBER</label>
                <input type="text" class="form-control" v-model="apartment.num" id="apartment_number" required>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">PERSON NAME</label>
                <input type="text" class="form-control" v-model="apartment.name" id="name" required>
            </div>
            <div class="mb-3">
                <label for="contact" class="form-label">CONTACT</label>
                <input type="number" class="form-control" v-model="apartment.contact" id="contact" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" v-model="apartment.email" id="email" aria-describedby="emailHelp" required>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>

            <button type="submit" class="btn btn-primary">ADD</button>
        </form>
    </div>
</template>

<script>
export default {
    setup() {

    },
    data(){
        return {
            apartment : {
                num : "",
                name : "",
                contact : Number,
                email : ""
            }
        }
    },
    methods:{
        closeForm(){
            this.$emit("add_apartment",false)
        },
        addApartment(){
            this.axios.post("http://localhost:3000/createApart",
            {
                apartment : this.apartment
            }).then((res)=>{
                // if(res.data){
                //     alert("Insertion Successfull");
                //     this.clearFields();
                // }else{
                //     alert(res.data);
                // }
                alert(res.data)
            })
        },
        clearFields(){
            document.getElementById("apartment_number").value = "";
            document.getElementById("name").value = "";
            document.getElementById("contact").value = "";
            document.getElementById("email").value = "";
        }
    }
}
</script>

<style scoped>
h1{
    text-align: center;
}

form{
    width: 100%;
}

</style>