<template>
    <div>
        <div>
            <button @click="openForm(false,true,null)" class="btn btn-primary mb-2">Add Bill +</button>
            <input type="month" id="date" class="ml-2"/>
            <button @click="processBill()" class="btn btn-secondary mb-2">
                Process Bill
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
            </button>
            <table class="table">
                <thead>
                    <tr>
                        <th>PAY ID</th>
                        <th>PAYMENT NAME</th>
                        <th>DATE</th>
                        <th>AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    <td v-if="bills.length==0">No Bills</td>
                    <tr v-for="bill in bills" :key="bill">
                        <th>{{bill.pay_id}}</th>
                        <td>{{bill.name}}</td>
                        <td>{{bill.bill_date}}</td>
                        <td>{{bill.amount}}</td>
                        <td>
                            <button @click="openForm(true,false,bill)" class="btn btn-warning">Update</button>
                            <button @click="deleteBill(bill)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<script>
export default {
    components: {
    },
    setup() {
        
    },
    data(){
        return {
            bills : [],
            months : ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
            "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NONEMBER", "DECEMBER"],
            currentYear : new Date().getFullYear()
        }
    },
    methods:{
        openForm(update,add,bill){
            this.$emit("bill",{"updateBill" : update,"addBill" : add , "bills" : bill})
        },
        getBills(){
            this.axios.get("http://localhost:3000/bill").then((res)=>{
                this.bills = res.data
                console.log(this.bills)
            })
        },
        deleteBill(bill){
            var ans = confirm("Are you sure?")
            if(ans == true){
                this.axios.put("http://localhost:3000/deleteBill",
                {
                    bill : bill
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
        processBill(){
            const date = document.getElementById("date").value
            const userSelectedDate = new Date(date);

            if (date == "") {
                alert("Please Select a month !!!")
                return ;
            }else if(userSelectedDate.getMonth() > new Date().getMonth()){
                alert("Future Months cannot be processed !!!");
                return;
            }else if(userSelectedDate.getFullYear() > new Date().getFullYear()){
                alert("Future Years cannot be processed !!!");
                return;
            }else{

                var ans = confirm("Are you sure?");
                if (ans) {
                    this.axios.post("http://localhost:3000/processBill",{
                        date : date
                    }).then((res)=>{
                        if (res.data==true) {
                            alert("Processing done successfully!!!");
                        }else{
                            alert(res.data);
                        }
                    });                    
                }
            }
        }
    },
    mounted(){
        this.getBills()
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
th,td{
    text-align: center;
}
</style>