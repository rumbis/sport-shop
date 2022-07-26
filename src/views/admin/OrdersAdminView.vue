<template>
    <div v-if="usrLevel===1" class="wrapper">
        <h1>Rewiew Orders</h1>
        <div class="orders-container">
            <div class="order-label" v-if="windowWidth>=1024">
                <div class="address">Address</div>
                <div class="firstname">First Name</div>
                <div class="lastname">Last Name</div>
                <div class="date">Date</div>
                <div class="ponumber">Postal number</div>
                <div class="place">Place</div>
                <div class="phonenumber">Phone number</div>
            </div><!-- end order label -->
            <ol>
                <li v-for="order in orders" :key="order.ord_id">
                    <div class="order-info">
                        <div class="address">
                            <button @click="moreDetailsOrder(order)" class="more-btn"><i class="far fa-caret-square-down"></i></button>
                            <div class="address-content">{{order.ord_address}}</div>
                            <button @click="checkoutDelete(order)" class="remove-btn"><i class="far fa-trash-alt"></i></button>
                        </div>
                        <div class="firstname">{{order.usr_firstname}}</div>
                        <div class="lastname">{{order.usr_surname}}</div>
                        <div class="date">{{dateTime(order.ord_date)}}</div>
                        <div class="ponumber">{{order.ord_ponumber}}</div>
                        <div class="place">{{order.ord_place}}</div>
                        <div class="phonenumber">{{order.ord_tel}}</div>
                    </div>
                    <div class="order-items-container" :class="{'show-products': order.toggleProducts}">
                        <div class="order-items" :class="{'show-products': order.toggleProducts}" v-for="item in order.itemsOrder" :key="item.ori_id">
                            
                            <div class="item-name" v-if="item.ord_id===order.ord_id">
                                {{item.pro_name}}
                            </div>
                            <div class="item-price" v-if="item.ord_id===order.ord_id">${{item.pro_price}}</div>
                            <div class="item-quantity" v-if="item.ord_id===order.ord_id">x{{item.ori_quantity}}</div>
                        </div>  
                        <div class="total-price">Total price: ${{order.totalPrice}}</div>
                    </div>
                </li>
            </ol>
            <confirm-dialog v-if="confirmVisible" :text="confirmText" @confirm="removeOrder($event)"></confirm-dialog>
        </div><!-- end orders-container -->
        <success v-if="success" class="success"></success>  
    </div>
</template>

<script>
import axios from 'axios';
import ConfirmDialog from '../../components/Confirm.vue';
import Success from '../../components/Success.vue'


export default {
    name: 'OrderAdminView',
    components:{
        ConfirmDialog,
        Success
    },
    props:['usrLevel', 'windowWidth'],
    data: function(){
        return{
            orders: [],
            orderItems: [],
            confirmVisible: false,
            orderRemove: null,
            confirmText: 'Do you want to remove the order?',
            success: false
        }
    },
    mounted(){
        if(this.usrLevel !== 1){
            this.$router.push('/');
        }
        this.getOrders();
        window.scroll({
            top: 0,
            left: 0,
        });
    },
    methods:{
        getOrders(){
            axios.get('http://localhost:4000/admin/orders').then((res) => {
                this.orders = res.data.orders;
                this.orderItems = res.data.ordItems;
                for(let i=0; i<this.orders.length; i++){
                    this.$set(this.orders[i], 'itemsOrder', [])
                    this.$set(this.orders[i], 'toggleProducts', false);
                    this.$set(this.orders[i], 'totalPrice', 0);
                }
            }); 
        },
        dateTime(date){
            let date1 = new Date(date).toDateString();
            date1 = date1.substring(4);
            let dateTime = new Date(date).toTimeString()
            dateTime = dateTime.substring(0,5);
            return date1 + " " + dateTime;
        },
        moreDetailsOrder(order){
            if(order.itemsOrder.length === 0){
                for(let i=0; i<this.orderItems.length; i++){
                    if(order.ord_id === this.orderItems[i].ord_id){
                        order.totalPrice += this.orderItems[i].ori_price * this.orderItems[i].ori_quantity;
    
                        order.itemsOrder.push(this.orderItems[i]);
                    }
                }
            }
            order.toggleProducts = !order.toggleProducts;
        },
        checkoutDelete(order){
            if(this.usrLevel !== 1){
                return;
            }
            this.confirmVisible = true;
            this.orderRemove = order;
        },
        removeOrder(confirm){
            if(confirm === false){
                this.confirmVisible = false;
                this.orderRemove = null; 
            }
            else{
                axios.post('http://localhost:4000/delete-order',{
                    ordId: this.orderRemove.ord_id
                }).then((res) => {
                    this.confirmVisible = false;
                    this.orderRemove = null;
                    this.success = true;
                    setTimeout(() => {
                        this.getOrders();
                        this.success = false;
                    }, 2070);
                });
            }
        }

    }

}
</script>

<style scoped>
.wrapper{
    width: 1170px;
    margin: 100px auto;
}
.success{
    top: 0;
    left: 0;
}
h1{
    text-align: center;
    margin: 50px 0 70px;
    color: #000;
    margin: 0 auto 50px;
    padding: 0 10px 10px;
    width: max-content;
    border-bottom: 1px solid #d1aa68;
}
ol{
    margin: 0 auto;
    width: max-content;
    list-style: none;
}
ol li:last-child{
    border-bottom: 0.5px solid black;
}
li{
    border-top: 0.5px solid black;
    border-left: 0.5px solid black;
    border-right: 0.5px solid black;
    width: max-content;
}
.order-label{
    width: max-content;
    display: flex;
    margin: 0 auto;
    border-top: 0.5px solid black;
    border-right: 0.5px solid black;
    border-left: 0.5px solid black;
}
.order-info{
    display: flex;
    margin: 0 auto;
    position: relative;
}
.order-info div, .order-label div{
    padding: 5px;
    overflow: hidden;
}
.firstname{
    width: 130px;
    border-right: 0.2px solid black;
}
.lastname{
    width: 130px;
    border-right: 0.2px solid black;
}
.address{
    display: flex;
    text-align: start;
    width: 300px;
    border-right: 0.2px solid black;
}
.address .more-btn{
    background-color: transparent;
    border: none;
    font-size: 20px;
    color: #00acb4;
    margin-right: 15px;
}
.address .address-content{
    padding: 0;
    height: 25px;
    overflow-y: hidden;
}
.address .address-content:hover{
    left: 37.5px;
    width: 220px;
    height: auto;
    background: #eff;
    overflow: visible;
}
.remove-btn{
    height: 21px;
    display: block;
    background-color: transparent;
    color: red;
    border: 0.5px solid red;
    margin: auto 0 auto;
    margin-left: auto;
    padding: 2px 5px;
}
.date{
    width: 200px;
    border-right: 0.2px solid black;
    text-align: center;
}
.ponumber{
    width: 100px;
    border-right: 0.2px solid black;
    text-align: center;
}
.place{
    overflow: hidden;
    width: 150px;
    border-right: 0.2px solid black;
    text-align: center;
}
.phonenumber{
    width: 150px;
    text-align: center;
}

.order-items-container{
    display: none;
    padding: 20px;
}
.order-items{
    display: flex;
    padding: 5px;
    visibility: hidden;
}
.order-items-container.show-products{
    border-top: 0.5px solid black;
    display: block;
}
.show-products{
    visibility: visible;
}

.item-name{
    width: 300px;
}
.item-price{
    width: 80px;
}
.item-quantity{
    width: 50px;
}
.total-price{
    border: 1px solid black;
    padding: 5px;
    width: max-content;
    margin-top: 15px;
}

@media screen and (min-width:1024px) and (max-width:1279px) {
    .wrapper{
        width: max-content;
    }
    .orders-container{
        font-size: 14px;
    }
    .address{
        width: 210px;
    }
    .firstname{
        width: 90px;
    }
    .lastname{
        width: 90px;
    }
    .date{
        width: 140px;
    }
    .ponumber{
        width: 80px;
    }
    .place{
        width: 100px;
    }
    .phonenumber{
        width: 110px;
    }
}

@media screen and (max-width:1024px){
    .wrapper{
        width: 90%;
    }
    ol{
        width: 100%;
    }
    li{
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
    }
    .order-label{
        display: none;
    }
    .order-info{
        display: block;
        widows: 50%;
    }
    .order-info div{
        padding: 5px 0;
    }
    .address, .date, .ponumber, .place, .phonenumber, .firstname, .lastname{
        border: none;
        text-align: start;
        width: 100%;
    }
    .address .more-btn{
        position: absolute;
        bottom: 2px;
        right: -8px;
    }
    .address .remove-btn{
        border: none;
        font-size: 18px;
    }
    .address::before{
        content: "Address:";
        margin-right: 10px;
    }
    .firstname::before{
        content: "First Name:";
        margin-right: 10px;
    }
    .lastname::before{
        content: "Last Name:";
        margin-right: 10px;
    }
    .date::before{
        content: "Date:";
        margin-right: 10px;
    }
    .ponumber::before{
        content: "Ponumber:";
        margin-right: 10px;
    }
    .phonenumber::before{
        content: "Phone number:";
        margin-right: 10px;
    }
    .place::before{
        content: "Place:";
        margin-right: 10px;
    }
    .usrid::before{
        content: "User ID:";
        margin-right: 10px;
    }
}

@media screen and (max-width:767px){
    .wrapper{
        width: 95%;
    }
    h1{
        max-width: 80%;
        font-size: 20px;
    }
}

@media screen and (max-width:250px){
    h1{
        font-size: 10px;
    }
}


</style>