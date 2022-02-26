<template>
    <div>
        <div>
            
            <!-- <button @click="add_payment = false" v-else class="btn btn-primary mt-2">Close X</button> -->
        </div>
        <div class="pay">
            <AddPayment @add_payment="add_payment = $event" v-if="add_payment"></AddPayment>
        </div>
        <div class="pay" >
            <UpdatePayment @update_payment="update_payment=$event" :pay="this.payment" v-if="update_payment"></UpdatePayment>
        </div>
        <div id="dispPay" ref="dispPay">
            <DisplayPayment @payment="Payment"></DisplayPayment>
        </div>
        
        
    </div>
</template>

<script>
import AddPayment from '../forms/payment/PaymentAdd.vue'
import DisplayPayment from '../display/Payment.vue'
import UpdatePayment from '../forms/payment/PaymentUpdate.vue'
export default {
    name: 'Apartment',
    components: {
        AddPayment,
        DisplayPayment,
        UpdatePayment
    },
    data(){
        return{
            add_payment : false,
            update_payment : false,
            payment : Object
        }
    },
    setup() {
        
    },
    methods : {
        Payment({updatePayment,addPayment,payments}){
            this.update_payment = updatePayment
            this.add_payment = addPayment
            this.payment = payments
        }
    },
    watch:{
        // add_payment(newVal){
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
.pay{
    top: 8%;
    background: rgb(20,157,13);
    background: linear-gradient(90deg, rgba(20,157,13,1) 0%, rgba(172,237,160,1) 100%, rgba(0,212,255,1) 100%);
    position: absolute;
    z-index: 1;
    width: 50%;
    margin-left: 20%;
}
</style>