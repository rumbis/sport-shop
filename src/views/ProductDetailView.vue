<template>
    <div>
        <div class="wrapper">
            <div class="product-view">
                <div class="product-img">
                    <img :src="imgURL(product.pro_image)" :alt="product.pro_name">
                </div>
                <div class="product-detail">
                    <h2>{{product.pro_name}}</h2>
                    <p class="price"><small>$</small>{{product.pro_price}}</p>
                    <p v-if="product.pro_amount <= 0">Not in stock</p>
                    <p v-if="product.pro_amount > 0">In stock</p>
                    
                    <div class="product-categories">
                        <p v-for="cat in categories" :key="cat.cat_id">{{cat.cat_name}}</p>
                    </div>
                    <button class="add-btn" v-if="product.pro_amount > 0" @click="addToCart(product)">ADD TO CART</button>
                    <p v-else class="out-stock">Currently out of stock!</p>
                    <div class="add-msg">{{messageAdd}}</div>
                    <div class="product-description">
                        <p>Description: <button @click="toggleDesc = !toggleDesc"><i class="fas fa-angle-down"></i></button></p>
                        <div class="hide-desc" :class="{'show-desc': toggleDesc}">
                            {{product.pro_description}}
                        </div>
                    </div>
                </div>
            </div><!-- end product-view -->  
            <div class="product-comments">
                <div class="to-comment">
                    <label for="Comment">Comment</label>
                    <textarea v-model="commentContent" placeholder="Comments" @keydown.enter="addComment(product)"></textarea>
                    <button class="add-com-btn" @click="addComment(product)">ADD COMMENT</button>
                    <div class="comm-msg">
                        {{messageCom}}
                    </div>
                </div><!-- end to-comment -->
                <div class="comments-list">
                    <div class="comment-container" v-for="com in comments" :key="com.com_id">
                        <div class="comment-detail">
                            <div class="name">
                                <p>{{com.usr_firstname}} {{com.usr_surname}}</p>
                                <p class="comment-date">{{com.com_date}}</p>
                            </div>
                            <div class="icon">  
                                <img src="../assets/avatar/comment.svg" alt="comment-icon">
                            </div>
                        </div>
                        <div class="comment-content">
                            <div class="comment-text">
                                {{com.com_text}}
                            </div>
                            <div v-if="usrLevel===1" class="comment-remove" @click="checkoutRemoveComm(com)">
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                        <confirm-dialog v-if="confirmText" :text="confirmText" @confirm="removeComment($event, com)"></confirm-dialog>
                    </div><!-- end comment-container -->
                </div><!-- end comments-list -->
            </div><!-- end product-comments --> 
        </div> 
       <success v-if="success"></success>
        
    </div>  
</template>

<script>
import axios from 'axios';
import Success from '../components/Success.vue';
import ConfirmDialog from '../components/Confirm.vue';

let images = require.context('../assets/products/', false, /\.jpg$/);

export default {
    name: 'ProductDetailView',
    components:{
        Success,
        ConfirmDialog
    },
    props: ['user', 'usrLevel', 'cart'],
    data: function(){
        return{
            product: {
                pro_id: null,
                pro_name: null,
                pro_price: null,
                pro_amount: null,
                pro_description: null,
                pro_gender: null,
                pro_image: null,
                pro_quantity: 1,
                pro_sale: null
            },
            categories:[],
            messageCom: '',
            messageAdd: '',
            success: false,
            commentContent: '',
            successText: '',
            confirmText: null,
            comments: [],
            cartJson: JSON.parse(JSON.stringify(this.cart)),
            toggleDesc: false,
            removeCom: null
        }
    },
    mounted(){
        console.log(this.cart)
        let pro_id = this.$route.params.id;
        axios.get('http://localhost:4000/products/'+pro_id)
            .then((res) => {
                console.log(res.data.products)
                //this.product = res.data.data
                this.categories = res.data.categories
                this.product.pro_id = res.data.products[0].pro_id
                this.product.pro_name = res.data.products[0].pro_name
                this.product.pro_price = res.data.products[0].pro_price
                this.product.pro_amount = res.data.products[0].pro_amount
                this.product.pro_description = res.data.products[0].pro_description
                this.product.pro_gender = res.data.products[0].pro_gender
                this.product.pro_image = res.data.products[0].pro_image
                this.product.pro_sale = res.data.products[0].pro_sale
        });
        this.showComments();
        window.scroll({
            top: 0,
            left: 0,
        });
    },
    methods:{   
        imgURL(path){
            if(path === null){
                return
            }
            return images('./' + path);
        },
        addToCart(product){
            this.messageAdd = '';
            if(!this.user){
                this.messageAdd = 'Log in to continue shopping.'
                return;
            }
            let foundProduct = null;
            for(let i=0; i<this.cartJson.length; i++){
                if(product.pro_id === this.cartJson[i].pro_id){
                    if(this.cart[i].numberOfUnits >= this.cartJson[i].pro_amount){
                        return
                    }
                    foundProduct = this.cartJson[i];
                }
            }
            if(foundProduct){
                foundProduct.numberOfUnits++;
            }
            else{
                this.cartJson.push({
                    ...product,
                    numberOfUnits: 1
                });
            }
            this.$emit('shoppingCart', this.cartJson);
            sessionStorage.setItem("products", JSON.stringify(this.cartJson));
        },
        addComment(product){
            this.messageCom = ""
            if(!this.user){
                this.messageCom = "You need be logged in."
                return
            }
            if(this.commentContent.trim().length === 0){
                this.messageCom = "Enter a comment";
                return;
            }
            let year = new Date().getFullYear();
            let month = new Date().getMonth();
            let day = new Date().getDate();
            let hour = new Date().getHours();
            let minutes = new Date().getMinutes();
            let seconds = new Date().getSeconds();
            
            let content = this.commentContent;

            axios.post('http://localhost:4000/comment',{
                userId: this.user.usr_id,
                productId: product.pro_id,
                content: content,
                date: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
            }).then((res) =>{
                if(res.data.result === 'ERROR'){
                    return;
                }
                this.successText = "You have successfully added a comment";
                this.success = true;
                setTimeout(()=>{
                    this.success = false
                },2070)
                this.commentContent = "";
                this.showComments();
            });
        },
        showComments(){
            let pro_id = this.$route.params.id;
            axios.get('http://localhost:4000/comments/'+pro_id)
                .then((res) => {
                    this.comments = res.data.data;
                })
        },
        checkoutRemoveComm(comment){
            if(!this.user){
                return;
            }
            this.removeCom = comment
            this.confirmText = "Do tou want to continue?"
        },
        removeComment(confirm){
            this.confirmText = null;
            if(confirm === false){
                return;
            }
            axios.post('http://localhost:4000/delete-comment',{
                comId: this.removeCom.com_id
            }).then((res) => {
                if(res.data.result === "OK"){
                    this.success = true;
                    setTimeout(()=>{
                        this.success = false
                    },2070)
                    this.showComments();
                }
            });

        }
    }
}
</script>

<style scoped>
.wrapper{
    width: 1170px;
}
.product-view{
    padding: 100px 0 20px;
    display: flex;
}
.product-img{
    width: 40%;
}
.product-img img{
    width: 100%;
}
.product-detail{
    margin-left: 100px;
}
.product-detail h2{
    margin: 0 0 50px;
    font-size: 30px;
    font-style: italic;
    padding: 0 0 5px;
    border-bottom: 1px solid #d1aa68;
}
.product-detail p{
    margin: 15px 0;
}
.price{
    font-weight: 500;
    font-size: 28px;
    font-style: italic;
    color: #26393a;
}
.product-detail input{
    width: 30px;
}
.product-categories{
    display: flex;
    flex-direction: row;
}
.product-categories p{
    font-size: 12px;
    text-transform: uppercase;
    margin-right:5px;
    color: #d1aa68;
}
.out-stock{
    color: red;
    border: 0.5px solid red;
    width: max-content;
    padding: 2px;
}
.add-btn{
    background-color: #00acb4;
    border: none;
    padding: 10px 25px;
    border-radius: 10px 0 25px 0;
    color: #fff;
    margin-top: 20px;
}
.add-btn:active{
    background-color: #00abb480;
}
.add-msg{
    margin: 10px 0;
    color: red;
}
.product-description{
    margin-top: 50px;
    width: 400px;
    position: relative;
}
.product-description p{
    margin: 10px 0 20px;
}
.product-description button{
    font-size: 20px;
    border: none;
    background-color: transparent;
}
.hide-desc{
    visibility: hidden;
    position: relative;
    top: 0px;
    opacity: 0;
    transition: 1s all ease;
}
.show-desc{
    opacity: 1;
    visibility: visible;
    top: 30px;
    border-top: 1px solid gray;
    padding-top: 20px;
}
.product-comments{
    margin: 50px auto;
    width: 500px;
    background: #fff;
    padding: 30px;
    border-radius: 20px;
}
.product-comments textarea{
    box-sizing: border-box;
    font-size: 15px;
    resize: none;
    display: block;
    width: 500px;
    height: 100px;
    padding: 10px;
    margin: 10px 0;
}
.comm-msg{
    height: 20px;
    margin: 10px 0 20px;
    color: red;
}
.add-com-btn{
    background-color: transparent;
    color: #00acb4;
    border: 2px solid #00acb4;
    border-radius: 10px 0 12px 0;
    padding: 10px 15px;
}
.comment-container{
    box-sizing: border-box;
    width: 500px;
    margin: 20px auto;
    padding: 20px;
    background-color: aliceblue;
}
.comment-detail{
    display: flex;
    justify-content: space-between;
}
.comment-date{
    font-size: 10px;
    border-top: 1px solid rgb(221, 137, 137);
    padding-top: 5px;
    margin-top: 5px;
}
.icon{
    width: 40px;
}
.comment-content{
 margin: 20px 0 10px;
 display: flex;
 justify-content: space-between;
}
.comment-remove{
    cursor: pointer;
    margin-right: 14px;
    font-size: 21px;
    color: red;
}

@media screen and (min-width:1024px) and (max-width:1279px){
    .wrapper{
        width: 900px;
    }
    .product-img{
        width: 38%;
    }
    .product-detail h2{
        font-size: 27px;
    }
}

@media screen and (min-width:768px) and (max-width:1024px){
    .wrapper{
        width: 90%;
    }
    .product-view{
        justify-content: space-between;
    }
    .product-img{
        width: 40%;
    }
    .product-detail h2{
        font-size: 24px;
        margin: 0 0 25px;
    }
    .product-detail{
        width: 50%;
        margin-left: 0;
    }
    .product-detail p{
        margin: 7px 0;
    }
    .product-categories{
        font-size: 10px;
    }
    .product-categories p{
        margin-right: 6px;
    }
    .add-btn{
        padding: 7px 17px;
    }
    .hide-desc{
        font-size: 14px;
    }
    .add-com-btn{
        padding: 7px 13px;
    }
}

@media screen and (max-width:767px){
    .wrapper{
        width: 95%;
    }
    .product-view{
        flex-direction: column;
    }
    .product-img{
        width: 100%;
    }
    .product-detail{
        width: 100%;
        margin: 50px 0 10px;
    }
    .product-detail h2{
        margin: 0 0 20px;
        font-size: 23px;
        width: max-content;
        max-width: 100%;
        padding: 0 0 5px;
    }
    .product-description{
        width: 97%;
    }
    .product-comments{
        width: 97%;
        max-width: 100%;
        box-sizing: border-box;
        padding: 5px;
    }
    .product-comments textarea{
        width: 100%;
    }
    .comment-container{
        width: 97%;
    }

}
</style>