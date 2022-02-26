<template>
    <div>
        <button class="btn btn-danger ml-auto">X</button>
        <h1>ADD APARTMENT PAYMENT</h1>

        <form @submit.prevent="addApartmentPayment()" class="mt-5">
            <div class="mb-3">
                <label class="form-label">SELECT PAYMENT : </label>
                <select class="form-select" id="payment">
                    <option selected value="null">Open this select menu</option>
                    <option v-for="pay in payments" :key="pay">{{pay.name}}</option>
                </select>
                <span id="errorMsg"></span>
            </div>
            <div class="mb-3">
                <label for="date" class="form-label">DATE</label>
                <input type="month" max="2022-12" min="2022-01" class="form-control" id="date" required>
            </div>
            <div class="mb-3">
                <label for="amount" class="form-label">AMOUNT</label>
                <input type="number" min="0" class="form-control" id="amount" required>
            </div>
            <button type="submit" class="btn btn-primary">ADD</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            payments : []
        }
    },
    methods : {
        addApartmentPayment(){
            let pay = document.getElementById("payment").value
            let date = document.getElementById("date").value
            let amount = document.getElementById("amount").value
            if(pay === "null"){
                document.getElementById("errorMsg").innerHTML = "Invalid Option"
                return
            }

            this.axios.post("http://localhost:3000/addApartmentPayment",
            {
                apart_pay : {
                    pay : pay,
                    date : date,
                    amount : amount
                }
            }).then((res)=>{
                alert(res.data)
            })
        },
        getPayments(){
            this.axios.get("http://localhost:3000/payment").then((res)=>{
                this.payments = res.data
                console.log(this.payments)
            })
        }
    },
    mounted(){
        this.getPayments()
    }
}
</script>

<style scoped>
h1{
    text-align: center;
}
span{
    display: flex;
    color: red;
}
</style>