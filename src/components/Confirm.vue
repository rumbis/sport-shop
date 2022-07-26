<template>
    <div class="confirm-bg">
        <div class="confirm-container">
            <div class="confirm-text">
                <p>{{text}}</p>
            </div>
            <div class="confirm-btn">
                <button @click="confirm">CONFIRM</button>    
                <button @click="cancle">CANCLE</button>    
            </div>   
        </div>    
    </div>    
</template>

<script>

export default {
    name:'ConfirmDialog',
    props:['text'],
    data: function(){
        return{
            dialogConfirm: null
        }
    },
    methods:{
        confirm(){
            this.dialogConfirm = true;
            this.$emit('confirm', this.dialogConfirm);
        },
        cancle(){
            this.dialogConfirm = false;
            this.$emit('confirm', this.dialogConfirm);
        }
    }
    
}
</script>

<style scoped>
.confirm-bg{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.438);
    width: 100%;
    height: 100vh;;
}
.confirm-container{
    margin: 150px auto;
    width: 400px;
    border-radius: 13px;
    padding: 20px;
    background-color: #fff;
}
.confirm-text{
    text-align: center;
    margin: 50px 0;
    font-size: 20px;
    font-weight: 400;
}
.confirm-btn{
    margin: 60px;
    display: flex;
    justify-content: center;
}
button{
    display: block;
    margin: 0 20px;
    padding: 10px 20px;
    background-color: transparent;
    border: 2px solid #d1aa68;
    color: #d1aa68;
}
.confirm-btn :first-child{
    background-color: #d1aa68;
    color: #fff;
    border: none;
}

@media screen and (max-width:1024px){
    .confirm-container{
        margin: 30vh auto;
        width: 300px;
        padding: 10px 20px;
    }
    button{
        padding: 8px 15px;
    }
}

@media screen and (max-width:600px){
    .confirm-container{
        margin: 30vh auto;
        width: 85%;
        padding: 10px 20px;
    }
    .confirm-text{
        font-size: 16px;
    }
    button{
        padding: 8px 15px;
    }
}
</style>