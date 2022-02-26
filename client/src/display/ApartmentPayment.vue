<template>
    <div>
        <div>
            <button @click="closeApartmentPayment()" id="backBtn" class="btn btn-danger"></button>
            <!-- <button @click="this.add_apart_pay=true" class="btn ml-2" id="addBtn">+</button> -->
        </div>
        <div>
            <h1>{{this.apart.apart_num}}</h1>
            <table class="table">
                <thead>
                    <th>PAY NAME</th>
                    <th>DATE</th>
                    <th>AMOUNT PAYABLE</th>
                    <th>AMOUNT PAID</th>
                    <th>ARREARS</th>
                    <th>STATUS</th>
                </thead>
                <tbody>
                    <td v-if="apartment_payments.length==0">No Apartment Payment</td>
                    <tr v-for="apartPay in apartment_payments" :key="apartPay">
                        <th>{{apartPay.name}}</th>
                        <td>{{apartPay.date}}</td>
                        <td>{{apartPay.amount_payable}}</td>
                        <td>{{apartPay.amount_paid}}</td>
                        <td>{{apartPay.arears}}</td>
                        <td id="paidCol" v-if="apartPay.status == 1">PAID</td>
                        <td id="partialPaid" v-else-if="apartPay.status == 2">PARTIAL PAID</td>
                        <td id="unpaidCol" v-else>UNPAID</td>
                        
                        <td>
                            <button @click="openProcessApartmentPaymentForm(apartPay)" class="btn btn-secondary" id="addBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                </svg>                      
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="this.add_apart_pay" class="apart">
            <AddApartmentPayment ></AddApartmentPayment>
        </div>
        <div v-if="this.process_apart_pay" class="apart">
            <ProcessApartmentPayment @process="this.process_apart_pay=$event" :apartPay="this.apart_pay"></ProcessApartmentPayment>
        </div>
    </div>
</template>

<script>
import ProcessApartmentPayment from '../forms/apartment_payment/ProcessApartmentPayment.vue'
import AddApartmentPayment from '../forms/apartment_payment/AddApartmentPayment.vue'
export default {
    components : {
        ProcessApartmentPayment,
        AddApartmentPayment
    },
    props : {
        apart : {
            type : Object
        }
    },
    data() {
        return{
            process_apart_pay : false,
            add_apart_pay : false,
            apartment_payments : Object,
            apart_pay : Object
        }
    },
    methods : {
        openProcessApartmentPaymentForm(apartPay){
            this.process_apart_pay = true
            this.apart_pay = apartPay
        },
        closeApartmentPayment(){
            this.$emit("apartment_payment",false)
        },
        getApartmentPayments(){
            console.log("Getting Apartment Payment")
            this.axios.get("http://localhost:3000/apartmentPayment",
            {
                params : {id : this.apart.apart_id} 
            }).then((res)=>{
                this.apartment_payments = res.data
                console.log(res.data)
            })
        }
    },
    mounted(){
        this.getApartmentPayments()
        console.log(this.apart)
        document.getElementById("backBtn").innerHTML="<"
    }
}
</script>

<style scoped>
button{
transition-duration: 0.5s;
}
h1{
    text-align: center;
}
#addBtn{
    color: black;
    background: white;
    border-radius: 10px;
    border-color: green;
    
}
#addBtn:hover{
    background: black;
    color: white;
    
}

/* #addBtn:hover:before{
    content: "PROCESS ";
} */
#backBtn{
    border-radius: 10px;
    border-color: red;
    color: black;
}
#backBtn:hover:after{
    content: " BACK";   
}
div{
    margin: 2%;
}
.apart{
    top: 10%;
    background: rgb(20,157,13);
background: linear-gradient(90deg, rgba(20,157,13,1) 0%, rgba(172,237,160,1) 100%, rgba(0,212,255,1) 100%);
    position: absolute;
    z-index: 1;
    width: 50%;
    margin-left: 20%;
}
th,td{
    text-align: center;
}
#paidCol{
    background: green;
    font-weight: bold;
}
#unpaidCol{
    background: red;
    font-weight: bold;
}
#partialPaid{
    background: yellow;
    font-weight: bold;
}
</style>