<template>
    <div>
        <div>
            
            <!-- <button @click="add_apartment = false" v-else class="btn btn-primary mt-2">Close X</button> -->
        </div>
        <div class="apart" v-if="add_apartment">
            <AddApartment @add_apartment="add_apartment = $event" ></AddApartment>
        </div>
        <div class="apart" v-if="update_apartment">
            <UpdateApartment @update_apartment="func" :apart="this.apartment"></UpdateApartment>
        </div>
        <div id="dispApart">
            
            <DisplayApartment @apartment="Apartment" :key="this.render"></DisplayApartment>

        </div>
        
        
    </div>
</template>

<script>
import AddApartment from '../forms/apartment/ApartmentAdd.vue'
import DisplayApartment from '../display/Apartment.vue'
import UpdateApartment from '../forms/apartment/ApartmentUpdate.vue'
export default {
    name: 'Apartment',
    components: {
        AddApartment,
        DisplayApartment,
        UpdateApartment
    },
    data(){
        return{
            add_apartment : false,
            update_apartment : false,
            apartment : Object,
            render : 0
        }
    },
    methods : {
        Apartment({updateApartment,addApartment,apartments}){
            this.update_apartment = updateApartment
            this.add_apartment = addApartment
            this.apartment = apartments
        },
        func(event){
            this.update_apartment = event;
            this.render+=1;
        }
    },
    watch:{
        // add_apartment(newVal){
        //     // if(newVal){
        //     //     alert(newVal)
        //     // }
        // }
    }
}
</script>
<style scoped>
div{
    /* margin-left: 2%;
    margin-right: 2%;
    margin-top: 2%; */
    margin: 2%;
}
.apart{
    top: 8%;
    background: rgb(20,157,13);
background: linear-gradient(90deg, rgba(20,157,13,1) 0%, rgba(172,237,160,1) 100%, rgba(0,212,255,1) 100%);
    position: absolute;
    z-index: 1;
    width: 50%;
    margin-left: 20%;
}
</style>