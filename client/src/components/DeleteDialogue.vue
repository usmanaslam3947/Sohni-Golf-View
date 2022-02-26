<template>
    <div>
        <h5>Are you sure to Delete ?</h5>
        
            <input type="checkbox" @click="setDelFlag($event)" id="delete" value="1"/>
            <label>Don't ask again.</label>
            <button @click="closeDialogue()" class="btn btn-secondary">No</button>
            <button @click="positiveDelete()" class="btn btn-danger">Yes</button>
    </div>
</template>

<script>
export default {
    setup() {
        
    },
    methods : {
        setDelFlag(event){
           if(event.target.checked){
               alert("Checked")
           }
        },
        positiveDelete(){
            this.$emit()
            
        },
        closeDialogue(){
            this.$emit("delFlag",false)
        }
    }
}
</script>

<style scoped>
div{
    background: green;
    border-radius: 5%;
    text-align: center;
}
button{
    margin-left:2px;
}
</style>