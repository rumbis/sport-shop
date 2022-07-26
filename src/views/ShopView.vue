<template>
    <div class="wrapper">
        <main class="main-shop">
            <div v-if="!unavailablePage" class="products">
                <router-link :to="'/products/'+product.pro_id" v-for="product in products" :key="product.pro_id" class="item-container">
                    <div v-if="product.pro_amount===0" class="out-stock">
                        <img src="../assets/not.png" alt="Not in stock" title="Out of stock">
                    </div>
                    <div>
                        <img :class="{'not-in-stock': product.pro_amount===0}" :src="imgURL(product.pro_image)" :alt="product.pro_name">
                    </div>
                    <h3>{{product.pro_name}}</h3>
                    <p><small>$</small>{{product.pro_price}}</p>
                </router-link>
            </div><!-- end products -->
            <!--<div class="fetch-btn">
                <button @click="fetchPrev"><i class="fas fa-angle-left"></i></button>
                <button @click="fetchNext"><i class="fas fa-angle-right"></i></button>
            </div>-->
            <unavailable v-if="unavailablePage"></unavailable>
        </main>
    </div><!-- end wrapper -->
    <!-- <div v-for="product in products" :key="product.pro_id" class="item-container">
            <div v-if="product.pro_amount===0" class="out-stock">
                <img src="../assets/not.png" alt="Not in stock" title="Out of stock">
            </div>
            <div>
                <img :class="{'not-in-stock': product.pro_amount===0}" :src="imgURL(product.pro_image)" :alt="product.pro_name">
            </div>
            <h3>{{product.pro_name}}</h3>
            <p><small>$</small>{{product.pro_price}}</p>
            <router-link :to="'/products/'+product.pro_id">More</router-link>
        </div> -->
</template>

<script>
import axios from 'axios';
import Unavailable from '../components/UnavailablePage.vue';

let images = require.context('../assets/products/', false, /\.jpg$/);

export default {
    name: 'ShopView',
    components:{
        Unavailable
    },
    data: function(){
        return{
            products: [],
            unavailablePage: false,
            current: 0,
            perPage: 12,
        }
    },
    mounted(){
        let path = this.$route.params.path;
        this.loadData();
        /*axios.get('http://localhost:4000/shop/'+path).then((res) => {
            if(res.data.result === "ERROR"){
                this.unavailablePage = true;
            }
            this.products = res.data.data;
        });*/
        window.scroll({
            top: 0,
            left: 0,
        });
    },
    methods:{
        imgURL(path){
            return images('./' + path);
        },
        fetchPrev(){
            this.current -= this.perPage;
            if(this.current <= 0){
                this.current = 0;
            }
            this.loadData();
        },
        fetchNext(){
            this.current += this.perPage;
            this.loadData()
        },
        loadData(){
            let path = this.$route.params.path;
            axios.get('http://localhost:4000/shop/'+path).then((res) => {
                if(res.data.result === "ERROR"){
                    this.unavailablePage = true;
                }
                this.products = res.data.data;
            }); 
        }
    }
}
</script>

<style scoped>
*{
    box-sizing: border-box;
}
.wrapper{
    width: 1170px;
    margin: 90px auto;
}
.products{
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
}
.item-container{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 25%;
    margin: 15px 0;
    padding: 10px 15px;
    position: relative;
    color: #000;
    transition: 0.5s all ease;
}
.item-container:hover{
    box-shadow: 2px 3px 24px 1px rgba(209,171,104,0.55);
    transform: scale(1.05);
}
/*a{
    display: block;
    background-color: transparent;
    border: 3px solid #d1aa68;
    color: #d1aa68;
    font-weight: 700;
    padding: 7px 15px;
    width: max-content;
    border-radius: 10px 0 17px;
    margin: 10px auto 0;
}*/
.out-stock{
    width: 50%;
    position: absolute;
    z-index: 2;
}
.not-in-stock{
    opacity: 0.5;
}
h3{
    margin: 10px 0;
    font-weight:400;
    font-size: 15px;
    text-transform: uppercase;
}
p{
    margin: 10px 0;
}

@media screen and (min-width:1024px) and (max-width:1279px){
    .wrapper{
        width: 900px;
    }
}

@media screen and (min-width:768px) and (max-width:1024px){
    .wrapper{
        width: 90%;
    }
    .item-container{
        width: 33%;
    }
}

@media screen and (max-width:768px){
    .wrapper{
        width: 95%;
    }
    .item-container{
        width: 48%;
        font-size: 15px;
    }
}
</style>