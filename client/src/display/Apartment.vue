<template>
    <div>

        <div v-if="!apartment_payment">
            <!-- <button @click="openForm(false,true,null)" class="btn btn-primary mb-2">Add Apartment +</button> -->
            <button @click="getActiveApartments()" class="btn btn-primary mb-2">Active Apartments</button>
            <button @click="getInactiveApartments()" class="btn btn-warning mb-2">In active Apartment</button>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>APART NUMBER</th>
                        <th>NAME</th>
                        <th>CONTACT</th>
                        <th>EMAIL</th>
                    </tr>
                </thead>
                <tbody>
                    <td v-if="apartments.length==0">No Apartments</td>
                    <tr v-for="apart in apartments" :key="apart">
                        <th>{{apart.apart_id}}</th>
                        <td>{{apart.apart_num}}</td>
                        <td>{{apart.person_name}}</td>
                        <td>{{apart.person_contact}}</td>
                        <td>{{apart.person_email}}</td>
                        <td>
                            <button @click="openApartmentPayment(apart)" v-if="active==true" class="btn btn-primary">View</button>
                            <button @click="openForm(true,false,apart)" class="btn btn-warning">Update</button>
                            <button @click="activeApartment(apart)" v-if="active==false" class="btn btn-primary">Active</button>
                            <button @click="deleteApartment(apart)" v-if="active==true"  class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <ApartmentPayment @apartment_payment="apartment_payment=$event" :apart="this.apart"></ApartmentPayment>
        </div>
    </div>
</template>

<script>
import ApartmentPayment from './ApartmentPayment.vue'
export default {
    components: {
        ApartmentPayment
    },
    setup() {
        
    },
    data(){
        return {
            apart : Object,
            apartments : [],
            apartment_payment : false,
            active : true,
            render : 0
        }
    },
    methods:{
        openApartmentPayment(apart){
            this.apart = apart
            this.apartment_payment = true
        },
        openForm(update,add,apart){
            this.$emit("apartment",{"updateApartment" : update,"addApartment" : add  , "apartments" : apart})
        },
        getActiveApartments(){
            this.axios.get("http://localhost:3000/apartment").then((res)=>{
                this.apartments = res.data
                console.log(this.apartments)
            })
            this.active = true;
        },
        getInactiveApartments(){
            this.axios.get("http://localhost:3000/inactiveApartment").then((res)=>{
                this.apartments = res.data
                console.log(this.apartments)
            })
            this.active = false;
        },
        deleteApartment(apart){
            var ans = confirm("Are you sure?")
            if(ans == true){
                this.axios.put("http://localhost:3000/deleteApart",
                {
                    apart : apart
                }
                ).then((res)=>{
                    if(res.data == true){
                        // alert("Update Successfull")
                        if (this.active == true) {
                            this.getActiveApartments();
                        }
                    }
                })
            }

        },
        activeApartment(apart){
            this.axios.put("http://localhost:3000/activeApart",
                {
                    apart : apart
                }
                ).then((res)=>{
                    if(res.data==true){
                        if (this.active == false) {
                            this.getInactiveApartments();
                        }
                    }else{
                        alert("Failed Activation !!!");
                    }
                })
        }
    },
    mounted(){
        this.getActiveApartments()
    }
}
</script>

<style scoped>
.btn{
    margin-left: 2%;
}
#delete{
    position: absolute;
    z-index: 2;
}

</style>