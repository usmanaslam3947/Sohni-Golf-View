<template>
    <div>
        <div>
            <button @click="openForm(false,true,null)" class="btn btn-primary mb-2">Add Payment +</button>
                
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PAY NAME</th>
                        <th>DEFAULT AMOUNT</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    <td v-if="payments.length==0">No Payments</td>
                    <tr v-for="pay in payments" :key="pay">
                        <th>{{pay.payment_id}}</th>
                        <td>{{pay.name}}</td>
                        <td>{{pay.default_amount}}</td>
                        <td>
                            <button @click="openForm(true,false,pay)" class="btn btn-warning">Update</button>
                            <button @click="deletePayment(pay)" class="btn btn-danger">Delete</button>
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
            payments : []
        }
    },
    methods:{
        openForm(update,add,pay){
            this.$emit("payment",{"updatePayment" : update,"addPayment" : add , "payments" : pay})
        },
        getPayments(){
            this.axios.get("http://localhost:3000/payment").then((res)=>{
                this.payments = res.data
                console.log(this.payments)
            })
        },
        deletePayment(pay){
            var ans = confirm("Are you sure?")
            if(ans == true){
                this.axios.put("http://localhost:3000/deletepay",
                {
                    pay : pay
                }
                ).then((res)=>{
                    alert(res.data)

                    // if(res.data == true){
                    //     alert("Update Successfull")
                    //     this.$parent.showStd()
                    // }
                })
            }

        }
    },
    mounted(){
        this.getPayments()
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