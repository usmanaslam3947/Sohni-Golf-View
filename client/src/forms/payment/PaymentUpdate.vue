<template>
    <div>
        {{pay.payment_id}}
        {{this.payment.name}}
        <button @click="closeForm()" class="btn btn-danger ml-auto">X</button>
        <h1>UPDATE PAYMENT</h1>
        <form @submit.prevent="updatePayment()">
            <div class="mb-3">
                <label for="payment_name" class="form-label">PAYMENT NAME</label>
                <input type="text" class="form-control" id="payment_name" v-model="this.payment.name">
            </div>
            <div class="mb-3">
                <label for="default_amount" class="form-label">default_amount</label>
                <input type="number" class="form-control" id="default_amount" v-model="this.payment.default_amount" >
            </div>
            <button type="submit" class="btn btn-primary">UPDATE</button>
        </form>
    </div>
</template>

<script>
export default {
    props : {
        pay : {
            type : Object
        }
    },
    setup() {
        
    },
    data(){
        return {
            payment : {
                id : Number,
                name : "",
                default_amount : Number
            }
        }
    },
    methods:{
        closeForm(){
            this.$emit("update_payment",false)
        },
        updatePayment(){
            this.axios.put("http://localhost:3000/updatePay",
            {
                pay : this.payment
            }
            ).then((res)=>{
                alert(res.data)

                // if(res.data == true){
                //     alert("Update Successfull")
                //     this.$parent.showStd()
                // }
            })
        }
    },
    mounted(){
        this.payment.id = this.pay.payment_id
        this.payment.name = this.pay.name
        this.payment.default_amount = this.pay.default_amount
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