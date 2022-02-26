<template>
    <div>

        <button @click="closeForm()" class="btn btn-danger ml-auto">X</button>
        <h1>ADD BILL</h1>
        <form @submit.prevent="addBill()">
            <div class="mb-3">
                <label class="form-label">SELECT PAYMENT</label>
                <select @change="setAmount()" id="payment">
                    <option selected value="null">Open this select menu</option>
                    <option v-for="pay in payments" :key="pay" :value="pay.payment_id">{{pay.name}}</option>
                </select>
                <span id="errorMsg"></span>
            </div>
            <div class="mb-3">
                <label for="date" class="form-label">DATE</label>
                <input type="month" class="form-control" v-model="bill.bill_date" id="date" required>
            </div>
            <div class="mb-3">
                <label for="amount" class="form-label">AMOUNT</label>
                <input type="number" min="0" class="form-control" v-model="bill.amount" id="amount" required>
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
            payments : [],
            bill : {
                pay_id: Number,
                bill_date : "",
                amount : 0
            }
        }
    },
    methods:{
        getPayment(){
            this.axios.get("http://localhost:3000/payment").then((res)=>{
                this.payments = res.data
                console.log(this.bills)
            })
        },
        closeForm(){
            this.$emit("add_bill",false)
        },
        addBill(){
            this.bill.pay_id = document.getElementById("payment").value
            
            const userSelectedDate = new Date(this.bill.bill_date);
            
            if(this.bill.pay_id === "null"){
                document.getElementById("errorMsg").innerHTML = "Invalid value !!!"
                return;
            }else if (this.bill.bill_date == "") {
                alert("Please Select a month !!!")
                return ;
            }else if(userSelectedDate.getMonth() > new Date().getMonth()){
                alert("Future Months cannot be added !!!");
                return;
            }else if(userSelectedDate.getFullYear() > new Date().getFullYear()){
                alert("Future Years cannot be added !!!");
                return;
            }else{
                if (this.bill.amount < 1) {
                    var ans = confirm("Amount is 0. Are you sure to proceed?");
                    if (!ans) {
                        return;
                    }
                }
                this.axios.post("http://localhost:3000/createBill",
                {
                    bill : this.bill
                }).then((res)=>{
                    if(res.data==true){
                        alert("Bill Insertion Successfull");
                        this.clearFields();
                    }else{
                        alert(res.data);
                    }
                });
            }

        },
        clearFields(){
            document.getElementById("payment").value = "";
            document.getElementById("date").value = "";
            document.getElementById("amount").value = "";

        },
        disableKeyboard(){
            alert("You cannot type date manually !!!")
            document.getElementById("date").value = "-----"
        },
        setAmount(){
            const id = document.getElementById("payment").value
            this.payments.filter(function(elem){
                if (elem.payment_id==id) {
                    document.getElementById("amount").value = elem.default_amount
                }
            })
        }
    },
    mounted(){
        this.getPayment()
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
#errorMsg{
    color: red;
    display: block;
}

</style>