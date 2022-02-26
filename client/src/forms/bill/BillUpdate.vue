<template>
    <div>
        <button @click="closeForm()" class="btn btn-danger ml-auto">X</button>
        <h1>UPDATE BILL</h1>
        <form @submit.prevent="updateBill()">
            <div class="mb-3">
               <label class="form-label">SELECT PAYMENT</label>
                <select id="payment">
                    <option selected :value="bill.pay_id">Pay Id {{this.bill.pay_id}}</option>
                    <option  v-for="pay in payments" :key="pay" :value="pay.payment_id">{{pay.name}}</option>
                </select>
                <span id="errMsg"></span>
            </div>
            <div class="mb-3">
                <label for="date" class="form-label">DATE</label>
                <input type="month" max="2022-12" min="2022-01" class="form-control" id="date" v-model="this.bill.bill_date">
            </div>
            <div class="mb-3">
                <label for="amount" class="form-label">AMOUNT</label>
                <input type="number" class="form-control" id="amount" v-model="this.bill.amount" required>
            </div>
            <button type="submit" class="btn btn-primary">UPDATE</button>
        </form>
    </div>
</template>

<script>
export default {
    props : {
        bil : {
            type : Object
        }
    },
    setup() {
        
    },
    data(){
        return {
            payments : [],
            bill : {
                bill_id : Number,
                pay_id : Number,
                bill_date : "",
                amount : Number
            }
        }
    },
    methods:{
        closeForm(){
            this.$emit("update_bill",false)
        },
        getPayment(){
            this.axios.get("http://localhost:3000/payment").then((res)=>{
                this.payments = res.data
                console.log(this.bills)
            })
        },
        updateBill(){
            this.bill.pay_id = document.getElementById("payment").value
            this.axios.put("http://localhost:3000/updateBill",
            {
                bill : this.bill
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
        this.getPayment()
        this.bill.bill_id = this.bil.bill_id
        this.bill.pay_id = this.bil.pay_id
        this.bill.bill_date = this.bil.bill_date
        this.bill.amount = this.bil.amount
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