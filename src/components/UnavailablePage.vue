<template>
    <div class="unavailable-container">
        <div class="wrapper">
            <div class="unavailable-image">
                <img src="../assets/unavailable.png" alt="worng">
            </div>
            <h2>This page is currently unavailable.</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UnavailablePage'
}
</script>

<style scoped>
.wrapper{
    margin: 70px auto;
}
.unavailable-image{
    width: 400px;
    margin: 0 auto;
}
h2{
    text-align: center;
    color: rgb(133, 27, 27);
    font-size: 50px;
}

@media screen and (min-width:1024px) and (max-width:1279px){
    h2{
        font-size: 47px;
    }
}

@media screen and (min-width:768px) and (max-width:1024px){
    .unavailable-image{
        width: 70%;
    }
    h2{
        font-size: 40px;
    }
}

@media screen and (max-width:768px){
    .wrapper{
        width: 95%;
    }
    .unavailable-image{
        width: 70%;
    }
    h2{
        margin-top: 20px;
        font-size: 20px;
    }
}
</style>