<template>
<div>
    <div class="wrapper">
        <div class="empty-cart" v-if="cartJson.length <= 0 || !user">
            <img src="../assets/shopping-cart.svg" alt="shopping cart">
            <h3>Your cart is empty</h3>
            <p>You can go to shop page to view more sports item.</p>
        </div><!-- end empty-cart -->
        <div class="cart-container" v-if="cartJson.length > 0 && user">
            <div class="shopping-cart">
                <div>
                    <h2>Shopping Cart</h2>
                </div>
                <div class="cart-label">
                    <div class="label-details">PRODUCT DETAILS</div>
                    <div class="label-quantity">QUANTITY</div>
                    <div class="label-price">PRICE</div>
                    <div class="label-total">TOTAL</div>
                </div>
                <div class="products-cart">
                    <div class="product-container" v-for="product in cartJson" :key="product.pro_id">
                        <div class="product-details">
                            <div class="product-image">
                                <img :src="imgURL(product.pro_image)" :alt="product.pro_name">
                            </div>
                            <div class="product-name">
                                <p>{{product.pro_name}}</p>
                                <button class="remove-btn" @click="checkoutDelete(product)">
                                    <i class="fas fa-trash-alt"></i> Delete
                                </button>
                            </div>
                        </div><!-- end product-details -->
                        <div class="product-quantity">
                            <button @click="quantityMinus(product)"><i class="fas fa-minus"></i></button>
                            <span>{{product.numberOfUnits}}</span>
                            <button @click="quantityPlus(product)"><i class="fas fa-plus"></i></button>
                        </div><!-- end product- quantity -->
                        <div class="product-price">
                            <p><span>$</span>{{product.pro_price}},<small>00</small></p>
                        </div>
                        <div class="product-total-price"><span>$</span>{{product.pro_price * product.numberOfUnits}},<small>00</small></div>
                        <confirm-dialog v-if="confirmVisible" :text="confirmText" @confirm="removeProduct($event)"></confirm-dialog>
                    </div><!-- end product-container -->
                </div><!-- end products-cart -->
            </div><!-- end shopping-cart -->
            <div class="order-summary">
                <div class="title">
                    <h2>Order Summary</h2>
                </div>
                
                <div class="order-label">
                    <div class="items">TOTAL ITEMS: <span>- {{totalItems}} -</span></div>
                    <div class="price">TOTAL PRICE: <span>${{totalPrice}},<small>00</small></span></div>
                </div>
                <button @click="checked=true">CHECKOUT</button>
            </div><!-- end order-summary -->
        </div><!-- end cart-container -->
    </div>
    <cart-order v-if="checked && user" :cart="cartJson" :user="user" :checked="checked" @removeCart="removeCart($event)" @checkIn="checkIn($event)"></cart-order>
</div>
</template>

<script>
import CartOrder from '../components/CartOrder.vue';
import ConfirmDialog from '../components/Confirm.vue';

let images = require.context('../assets/products/', false, /\.jpg$/);
let body = window.document.body;

export default {
    name: 'Cart',
    props: ['cart', 'user'],
    components:{
        CartOrder,
        ConfirmDialog
    },
    data: function(){
        return{
           cartJson: JSON.parse(JSON.stringify(this.cart)),
           checked: false,
           confirmVisible: false,
           confirmText: "",
           productDelete: null
        }
    },
    methods:{
        updateCart(){
            this.renderSubtotal();
            this.$emit('shoppingCart', this.cartJson);
            sessionStorage.setItem('products', JSON.stringify(this.cartJson));
        },
        renderSubtotal(){
            this.cartJson.forEach((product) => {
                this.totalPrice += parseInt(product.pro_price) * parseInt(product.numberOfUnits);
                this.totalItems += parseInt(product.numberOfUnits);
            });
        },
        checkoutDelete(product){
            if(!this.user){
                return;
            }
            this.productDelete = product
            this.confirmText = "Do you want to remove the product?"
            this.confirmVisible = true;
        },
        removeProduct(confirm){
            this.confirmVisible = false;
            if(confirm === false){
                return;
            }
            for(let i=0; i<this.cartJson.length; i++){
                if(this.productDelete.pro_id === this.cartJson[i].pro_id){
                    this.cartJson.splice(i,1);
                    this.updateCart();
                }
            }
        },
        quantityPlus(product){
            product.numberOfUnits++;
            if(product.numberOfUnits >= product.pro_amount){
                product.numberOfUnits = product.pro_amount;
            }
            this.updateCart()
        },
        quantityMinus(product){
            product.numberOfUnits--;
            if(product.numberOfUnits <= 1){
                product.numberOfUnits = 1;
            }
            this.updateCart()
        },
        checkout(){
            if(!this.user){
                return
            }
            this.confirmText = "Do you want to continue?"
        },
        checkIn(check){
            this.checked = check;
        },
        checkConfirm(confirm){
            this.confirmVisible = false;
            if(confirm === false){
                return
            }
            this.checked = true;
        },
        removeCart(cart){
            this.cartJson = cart;
            this.updateCart();
        },
        renderSubtotal(){
            /*this.cartJson.forEach((product) => {
                this.totalPrice = parseInt(product.pro_price) * parseInt(product.numberOfUnits);
                this.totalItems = parseInt(product.numberOfUnits);
            });*/
        },
        imgURL(path){
            if(path === undefined){
                return
            }
            return images('./' + path);
        }
    },
    mounted(){
        console.log(this.cart)
        console.log(this.cartJson)
        this.updateCart()
        window.scroll({
            top: 0,
            left: 0,
        });
        this.updateCart();

    },
    computed:{
        totalPrice(){
            let totalPrice = 0;
            this.cartJson.forEach((product) => {
                totalPrice += parseInt(product.pro_price) * parseInt(product.numberOfUnits);
            });
            return totalPrice;
        },
        totalItems(){
            let totalItems = 0;
            this.cartJson.forEach((product) => {
                totalItems += parseInt(product.numberOfUnits);
            });
            return totalItems;
        }     
    },
    watch:{
        cartJson(){
            this.updateCart()
        }
    }
}
</script>

<style scoped>
.wrapper{
    width: 1170px;
}
.empty-cart{
    text-align: center;
    height: 80vh;
    margin-top: 80px;
}
.empty-cart img{
    margin: 50px 0 20px;
    width: 270px;
}
.empty-cart h3{
    font-size: 25px;
    color: red;
}
.empty-cart p{
    margin: 10px 0 50px;
}
.cart-container{
    margin: 110px 0;
    display: flex;
    justify-content: space-between;
}
.shopping-cart{
    width: 70%;
}
.cart-label{
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
}
.product-container{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    border: 1px solid black;
}
.label-details{
    width: 43%;
}
.label-quantity, .label-price, .label-total{
    width: 20%;
    text-align: center;
}
.product-details{
    display: flex;
    width: 43%;
}
.product-image{
    width: 30%;
    height: auto;
}
.product-name{
    margin: 10px 0 0 10px;
    display: flex;
    flex-direction: column;
}
.remove-btn{
    display: block;
    text-align: left;
    margin: auto 0 20px;
    color: rgba(255, 0, 0, 0.805);
    background-color: transparent;
    border: none;
    cursor: pointer;
}
.remove-btn i{
    font-size: 20px;
}
.product-quantity{
    width: 20%;
    text-align: center;
    margin: auto 0;
}
.product-quantity input{
    width: 30px;
    height: 25px;
    margin: 0 10px;
}
.product-quantity button{
    width: 30px;
    height: 25px;
    background-color: transparent;
    border: none;
}
.product-price span{
    font-weight: bold;
}
.product-price, .product-total-price{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.order-summary{
    width: 26%;
    height: max-content;
    background-color: rgba(250, 240, 240, 0.918);
    box-shadow: 3px 6px 16px -3px rgba(0,0,0,0.77);
    padding: 10px 10px 30px
}
.order-summary .title h2{
    padding: 10px;
}
.order-label{
    margin: 50px 0 30px;
    padding: 10px;
}
.order-label div{
    margin: 15px 0;
}
.order-label span{
    font-weight: 500;
    margin-left: 10px;
}
.order-summary button{
    margin-left: 10px;
    background-color: #00acb4;
    padding: 5px 15px;
    border: none;
    color: #fff;
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
    .cart-container{
        display: block;
    }
    .shopping-cart{
        width: 100%;
    }
    .order-summary{
        background-color: rgba(250, 240, 240, 0.644);
        border: 0.5px solid #d1aa68;
        box-sizing: border-box;
        margin-top: 50px;
        width: 100%;
        box-shadow: none;
    }
    .order-summary button{
        padding: 8px 20px;
    }
}

@media screen and (max-width:767px){
    .wrapper{
        width: 95%;
    }
    .empty-cart{
        width: 100%;
    }
    .empty-cart img{
        width: 240px;
    }
    .empty-cart h3{
        font-size: 22px;
    }
    .empty-cart p{
        font-size: 14px;
    }
    .cart-container{
        display: block;
    }
    .shopping-cart{
        width: 100%;
    }
    .cart-label{
        display: none;
    }
    .order-summary{
        background-color: rgba(250, 240, 240, 0.644);
        border: 0.5px solid #d1aa68;
        box-sizing: border-box;
        margin-top: 50px;
        width: 100%;
        box-shadow: none;
    }
    .product-container{
        display: block;
    }
    .product-details{
        width: 100%;
    }
    .product-image{
        margin-right: 15px;
    }
    .product-quantity, .product-price, .product-total-price{
        margin: 10px 10px 10px;
        display: flex;
        justify-content: start;
        align-items: center;
        width: 100%;
    }
    .product-price span{
        font-weight: normal;
    }
    .product-quantity::before{
        content: "QUANTITY: ";
        border-bottom: 0.5px solid #d1aa68;
        font-size: 14px;
        margin-right: 10px;
    }
    .product-price::before{
        content: "PRICE: ";
        border-bottom: 0.5px solid #d1aa68;
        font-size: 14px;
        margin-right: 10px;
    }
    .product-total-price::before{
        content: "TOTAL:";
        border-bottom: 0.5px solid #d1aa68;
        font-size: 14px;
        margin-right: 10px;
    }
}
@media screen and (max-width:500px){
    .empty-cart img{
        width: 70%;
    }
}
</style>