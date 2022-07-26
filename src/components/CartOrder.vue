<template>
    <div class="cart-order">
        <div class="order-container">
            <div>
                <h2>My Details</h2>
            </div>
            <div class="fullname">
                <div class="firstname">
                    <label for="firstname">First name *</label>
                    <input :class="{'error': errors.firstname}" type="text" v-model="firstname">
                </div>
                <div class="surname">
                    <label for="lastname">Last name *</label>
                    <input :class="{'error': errors.lastname}" type="text" v-model="lastname">
                </div>
            </div>
            <div class="address">
                <label for="address">Address *</label>
                <input :class="{'error': errors.address}" type="text" v-model="address">
            </div>
            <div class="place">
                <label for="place">Place *</label>
                <input :class="{'error': errors.place}" type="text" v-model="place">
            </div>
            <div class="ponumber">
                <label for="postalnumber">Postal number *</label>
                <input :class="{'error': errors.ponumber}" type="text" v-model="ponumber">
            </div>
            <div class="phonenumber">
                <label for="phonenumber">Phone number *</label>
                <input :class="{'error': errors.phonenumber}" type="text" v-model="phonenumber" @keydown.enter="confirm">
            </div>
            <div class="order-btn">
                <button @click="confirm">CONFIRM</button>
                <button @click="closeCartOrder">CANCLE</button>
            </div>
        </div>
        <success v-if="success"></success>
    </div>    
</template>

<script>
import axios from 'axios';
import Success from './Success.vue';

export default {
    props:['checked', 'user', 'cart'],
    components:{
        Success
    },
    data: function(){
        return{
            checkedJson: JSON.parse(JSON.stringify(this.checked)),
            cartJson: JSON.parse(JSON.stringify(this.cart)),
            firstname: this.user.usr_firstname,
            lastname: this.user.usr_surname,
            address: "",
            place: "",
            ponumber: "",
            phonenumber: "",
            errors:{
                firstname: false,
                lastname: false,
                address: false,
                place: false,
                ponumber: false,
                phonenumber: false,
            },
            success: false
        }
    },
    methods:{
        closeCartOrder(){
            this.checkedJson = false;
            this.$emit('checkIn', this.checkedJson);
        },
        checkValidation(){
            let phoneno = /^[0-9()-.\s]+$/;

            this.errors.firstname = false;
            this.errors.lastname = false;
            this.errors.address = false;
            this.errors.place = false;
            this.errors.ponumber = false;
            this.errors.phonenumber = false;

            if(this.firstname === null || this.firstname.trim().length === 0){
                this.errors.firstname = true;
            }
            if(this.lastname === null || this.lastname.trim().length === 0){
                this.errors.lastname = true;
            }
            if(this.address === null || this.address.trim().length === 0){
                this.errors.address = true
            }
            if(this.place === null || this.place.trim().length === 0){
                this.errors.place = true
            }
            if(!this.ponumber.match('^[0-9]{5}$')){
                this.errors.ponumber = true
            }
            if(!this.phonenumber.match(phoneno)){
                this.errors.phonenumber = true;
            }
        },
        confirm(){
            this.checkValidation();
            if(!this.user){
                return
            }
            if(this.errors.firstname === true || this.errors.lastname === true || this.errors.address === true || this.errors.place === true || this.errors.ponumber === true || this.errors.phonenumber === true){
                return;
            }
            axios.post('http://localhost:4000/order', {
                userId: this.user.usr_id,
                address: this.address,
                ponumber: this.ponumber,
                phonenumber: this.phonenumber,
                place: this.place
            }).then((res) => {
                if(res.data.result === 'ERROR'){
                    return;
                }
                //-------------------------------

            
                for(let i=0; i<this.cart.length; i++){
                    let pro_id = this.cart[i].pro_id;
                    let ord_id = res.data.data.ord_id;
                    let quantity = this.cart[i].numberOfUnits;
                    let price = quantity * this.cart[i].pro_price;

                    axios.post('http://localhost:4000/order-items',{
                        proId: pro_id,
                        ordId: ord_id,
                        quantity,
                        price
                    }).then((res) => {
                    })
                }
                this.success = true;
                setTimeout(()=>{
                    this.checkedJson = false;
                    this.cartJson = [];
                    this.$emit('checkIn', this.checkedJson);
                    this.$emit('removeCart', this.cartJson);
                    this.success = false;
                },2070)
            })
            
        }
    }
}
</script>

<style scoped>
.cart-order{
    position: fixed;
    z-index: 40;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.067);
}
.order-container{
    margin: 80px auto;
    width: 380px;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.24), 0 9px 46px 8px rgba(0, 0, 0, 0.18), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
    padding: 30px 50px;
    background-color: #fff;
}
.order-container h2{
    text-align: center;
    margin: 0 0 20px
}
.order-container div{
    margin: 5px 0;
}
.order-container input{
    display: block;
    padding: 5px;
    width: 100%;
}
.order-container input.error{
    border: 3px solid red;
}
.fullname{
    display: flex;
    justify-content: space-between;
}
.order-btn{
    display: flex;
    justify-content: center;
}
.order-btn :first-child{
    background-color: #00acb4;
    color: #fff;
    margin-right: 25px;
}
.order-container button{
    display: block;
    background: transparent;
    border: 2px solid #00acb4;
    color: #00acb4;
    padding: 10px 25px;
    margin: 20px 0;
}

@media screen and (min-width:1024px) and (max-width:1279px){
    .order-container{
        width: 370px
    }
}

@media screen and (max-width:1024px){
    .order-container{
        width: 370px;
    }
    .order-container button{
        padding: 10px 20px;
    }
}

@media screen and (max-width:500px){
    .order-container{
        width: 95%;
        box-sizing: border-box;
        padding: 30px 10px;
    }
    .order-container input{
        box-sizing: border-box;
    }
}
</style>