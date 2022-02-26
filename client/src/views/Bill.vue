<template>
    <div>
        <div>

        </div>
        <div class="bill">
            <AddBill @add_bill="add_bill = $event" v-if="add_bill"></AddBill>
        </div>
        <div class="bill">
            <UpdateBill @update_bill="update_bill = $event" :bil="this.bill" v-if="update_bill"></UpdateBill>
        </div>
        <div>
            <DisplayBill @bill="Bill"></DisplayBill>
        </div>
        
        
    </div>
</template>

<script>
import AddBill from '../forms/bill/BillAdd.vue'
import DisplayBill from '../display/Bill.vue'
import UpdateBill from '../forms/bill/BillUpdate.vue'
export default {
    name: 'Bill',
    components: {
        AddBill,
        DisplayBill,
        UpdateBill
    },
    data(){
        return{
            add_bill : false,
            update_bill : false,
            bill : Object
        }
    },
    methods : {
        Bill({updateBill,addBill,bills}){
            this.update_bill = updateBill
            this.add_bill = addBill
            this.bill = bills
        },
        abc(){
            this.update_bill = false
        }
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
.bill{
    top: 8%;
    background: rgb(20,157,13);
background: linear-gradient(90deg, rgba(20,157,13,1) 0%, rgba(172,237,160,1) 100%, rgba(0,212,255,1) 100%);
    position: absolute;
    z-index: 1;
    width: 50%;
    margin-left: 20%;
}
</style>