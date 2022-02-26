<template>
    <div>

        <button @click="closeForm()" class="btn btn-danger ml-auto">X</button>
        <h1>ADD PAYMENT</h1>
        <form @submit.prevent="addPayment()">
            <div class="mb-3">
                <label for="payment_name" class="form-label">PAYMENT NAME</label>
                <input type="text" class="form-control" v-model="payment.name" id="payment_name" required>
            </div>
            <div class="mb-3">
                <label for="default_amount" class="form-label">DEFAULT AMOUNT</label>
                <input type="number" class="form-control" v-model="payment.default_amount" id="default_amount" required>
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
            payment : {
                name : "",
                default_amount : ""
            }
        }
    },
    methods:{
        closeForm(){
            this.$emit("add_payment",false)
        },
        addPayment(){
            this.axios.post("http://localhost:3000/createPay",
            {
                payment : this.payment
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
            document.getElementById("payment_name").value = "";
            document.getElementById("amount").value = "";
        }
    }
}
</script>

<style scoped>
h1{
    text-align: center;
}


</style>