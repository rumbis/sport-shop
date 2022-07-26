<template>
    <div class="success">
        <img src="../assets/check.gif" alt="check gif">
    </div>
</template>

<script>
export default {
    props:['success'],
    data:function(){
        return{
            
        }
    }
}
</script>

<style scoped>
.success{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.308);
}
.success img{
    width: 500px;
}
</style>