<template>
    <div>
        <button @click="closeForm()" class="btn btn-danger ml-auto">X</button>
        <h1>ADD APARTMENT PAYMENT</h1>
        <form @submit.prevent="processApartmentPayment()" class="mt-5">
            <div class="mb-3">
                <label for="amount" class="form-label">AMOUNT</label>
                <input type="number" min="0" class="form-control" id="amount" required>
            </div>
            <button type="submit" class="btn btn-primary">PAY</button>
        </form>  
    </div>    
</template>

<script>
export default {
    props : {
        apartPay : {
            type : Object
        }
    },
    data() {
        return {
            apart_pay : Object
        }
    },
    methods:{
        closeForm(){
            this.$emit("process",false)
        },
        processApartmentPayment(){
            console.log(this.apart_pay);
            const amt = parseInt(document.getElementById("amount").value);
            this.apart_pay.amount_paid += amt;
            this.apart_pay.arears = this.apart_pay.amount_payable - this.apart_pay.amount_paid;
        
            if (this.apart_pay.arears == 0) {
                this.apart_pay.status = 1
            }else if (this.apart_pay.arears > 0) {
                this.apart_pay.status = 2
            }

            this.axios.put("http://localhost:3000/processApartPay",
            {
                apart_pay : this.apart_pay
            }
            ).then((res)=>{
                if(res.data == true){
                    alert("Processed Successfull");
                }
            })

        }
    },
    mounted(){
        this.apart_pay = this.apartPay
    }
}
</script>

<style scoped>

</style>