<template>
    <div v-if="usrLevel===1">
        <div class="wrapper">
            <h1>Products List</h1>
            <div v-if="createEdit" class="edit-create">
                <div class="product-name">
                    <label for="name">Name</label>
                    <input v-model="name" :class="{'input-error': errors.name}" type="text">
                </div>
                <div class="product-price-amount-gender">
                    <div class="product-price">
                        <label for="price">Price</label>
                        <input v-model="price" min="0" :class="{'input-error': errors.price}" type="number">
                    </div>
                    <div class="product-amount">
                        <label for="amount">Amount</label>
                        <input v-model="amount" min="0" :class="{'input-error': errors.amount}" type="number">
                    </div>
                    <div class="product-gender">
                        <label for="text">Gender</label>
                        <select name="gender" v-model="gender" :class="{'input-error': errors.gender}">
                            <option value="M">M</option>
                            <option value="F">F</option>
                            <option value="U">U</option>
                        </select>
                    </div>
                </div>
                <div class="product-image">
                    <label for="image">Image name</label>
                    <input v-model="image" :class="{'input-error': errors.image}" type="text">
                </div>
                <div class="product-categories">
                    <button @click="showCategories" :class="{'input-error': errors.categories}">Categories <i class="fas fa-angle-down"></i></button>
                    <div class="categories-container" :class="{'show': categoriesShow}">
                        <div v-for="cat in categories" :key="cat.cat_id">
                            <input type="checkbox" name="selected-category" v-model="cat.selected">
                            <label :for="cat.cat_name">{{cat.cat_name}}</label>
                        </div>
                    </div>
                </div>
                <div class="product-description">
                    <label for="description">Description</label>
                    <textarea v-model="description" :class="{'input-error': errors.description}" cols="30" rows="10"></textarea>
                </div>
                <button class="confirm-btn" @click="updateOrAdd">{{btnMsg}}</button>
                <button class="cancle-btn" @click="createEdit = false">Cancle</button>
            </div><!-- end edid-create -->
            <div class="products-container" v-else>
                <div class="add-product">
                    Add a new product:<button @click="openCreateNewProduct">Create</button>
                </div>
                <div>
                    <div class="products-lable" v-if="windowWidth>768">
                        <div class="id">ID</div>
                        <div class="name">Name</div>
                        <div class="price">Price</div>
                        <div class="amount">Amount</div>
                        <div class="idchange-btn">&nbsp;</div>
                    </div>
                    <div class="products-details" v-for="product in products" :key="product.id">
                        <div class="id">{{product.pro_id}}</div>
                        <div class="name">{{product.pro_name}}</div>
                        <div class="price">${{product.pro_price}}</div>
                        <div class="amount">{{product.pro_amount}}</div>
                        <div class="idchange-btn"><button @click="edit(product)">Edit</button></div>
                    </div>
                </div>
            </div>
        </div>
        <success v-if="success"></success>
    </div>
</template>

<script>
import axios from 'axios';
import Success from '../../components/Success.vue';

export default {
    components:{
        Success
    },
    data: function(){
        return{
            products: [],
            categories: [],
            categoriesProduct: [],
            categoriesShow: false,
            category: '',
            btn: 'Create',
            createEdit: false,
            editProduct: null,
            name: '',
            price: null,
            amount: null,
            gender: '',
            image: '',
            description: '',
            id: null,
            errors: {
                name: false,
                price: false,
                amount: false,
                gender: false,
                image: false,
                description: false,
                categories: false
            },
            success: false
        }
    },
    props:['usrLevel', 'windowWidth'],
    mounted(){
        if(this.usrLevel !== 1){
            this.$router.push('/');
        }
        this.getProducts();
        this.getCategories();
        window.scroll({
            top: 0,
            left: 0,
        });
    },
    methods:{
        getProducts(){
            axios.get('http://localhost:4000/admin/products').then((res) => {
                this.products = res.data.products;
            });
        },
        getCategories(){
            axios.get('http://localhost:4000/admin/categories').then((res) => {
                this.categories = res.data.data;
                for(let i=0; i<this.categories.length; i++){
                    this.$set(this.categories[i],'selected', false);
                }
            });
        },
        showCategories(){
            this.categoriesShow = !this.categoriesShow;
        },
        checkValidation(){
            this.errors.name = false;
            this.errors.price = false;
            this.errors.amount = false;
            this.errors.gender = false;
            this.errors.image = false;
            this.errors.description = false;
            this.errors.categories = false;

            if(this.name === null || this.name.length === 0){
                this.errors.name = true;
            }
            if(this.price === null || this.price.length === 0 || isNaN(this.price) || this.price == 0){
                this.errors.price = true;
            }
            if(this.amount === null || this.amount.length === 0 || isNaN(this.amount)){
                this.errors.amount = true;
            }
            if(this.gender === null || this.gender.length === 0){
                this.errors.gender = true;
            }
            if(this.image === null || this.image.length === 0){
                this.errors.image = true;
            }
            if(this.description === null || this.description.length === 0){
                this.errors.description = true;
            }
            for(let i=0; i<this.categories.length; i++){
                if(this.categories[i].selected === true){
                    this.errors.categories = false;
                    return
                }
                this.errors.categories = true;
            }
        },
        openCreateNewProduct(){
            this.editProduct = null;
            this.id = null;
            this.name = '';
            this.price = null;
            this.amount = null;
            this.gender = '';
            this.image = '';
            this.description = '';
            this.categoriesProduct = [];
            
            this.createEdit = true
        },
        edit(product){
            let id = product.pro_id;
            axios.get('http://localhost:4000/admin/products/' + id).then((res) => {
                this.categoriesProduct = res.data.data;
                if(this.categoriesProduct.length === 0) return
                for(let i=0; this.categories.length; i++){
                    for(let j=0; j<this.categoriesProduct.length; j++){
                        if(this.categories[i].cat_id === this.categoriesProduct[j].cat_id){
                            this.categories[i].selected = true;
                        }
                    }
                }
            });
            
            this.createEdit = true;

            this.editProduct = product;
            this.id = product.pro_id
            this.name = product.pro_name;
            this.price = product.pro_price;
            this.amount = product.pro_amount;
            this.gender = product.pro_gender;
            this.image = product.pro_image;
            this.description = product.pro_description;
        },
        updateOrAdd(){
            this.categoriesProduct = [];
            for(let i=0; i<this.categories.length; i++){
                if(this.categories[i].selected){
                    this.categoriesProduct.push(this.categories[i]);
                }
            }
            this.checkValidation();
            if(this.errors.name === true || this.errors.price === true || this.errors.amount === true || this.errors.gender === true || this.errors.image === true || this.errors.description ===true || this.errors.categoriesno){
                return;
            }
            if(this.editProduct){
                axios.patch('http://localhost:4000/admin/products/'+this.id,{
                   name: this.name,
                   price: this.price,
                   amount: this.amount,
                   gender: this.gender,
                   imageName: this.image,
                   description: this.description,
                   categories: this.categoriesProduct
                }).then((res) => {
                    this.success = true;
                    setTimeout(()=>{
                        this.success = false;
                        this.getProducts()
                    },2070)
                })
            }
            else{
                axios.post('http://localhost:4000/admin/products',{
                    name: this.name,
                    price: this.price,
                    amount: this.amount,
                    gender: this.gender,
                    imageName: this.image,
                    description: this.description,
                    categories: this.categoriesProduct
                }).then((res) => {
                    this.success = true;
                    setTimeout(()=>{
                        this.success = false
                    },2070)
                    this.getProducts()
                })
            }
            this.editProduct = null;
            this.id = null;
            this.name = '';
            this.price = null;
            this.amount = null;
            this.gender = '';
            this.image = '';
            this.description = '';
            this.createEdit = false;
            this.categoriesProduct = [];
        }
    },
    computed:{
        btnMsg(){
            if(this.editProduct){
                this.btn = 'Update';
            }
            return this.btn
        }
    }
}
</script>

<style scoped>
.wrapper{
    margin: 80px auto;
    width: 1170px;
}
h1{
    text-align: center;
    color: #000;
    margin: 100px auto 0;
    padding: 0 10px 10px;
    width: max-content;
    border-bottom: 1px solid #d1aa68;
}
.edit-create{
    width: 400px;
    margin: 50px auto;
}
.edit-create label{
    display: block;
    margin-top: 10px;
}
.edit-create input{
    width: 400px;
    height: 30px;
}
.input-error{
    border: 2px solid red;
}
.product-categories button.input-error{
    border: 2px solid red;
}
.product-price-amount-gender{
    display: flex;
    justify-content: space-between;
}
.product-price-amount-gender input, .product-price-amount-gender select{
    width: 90px;
    height: 30px;
}
.product-categories{
    position: relative;
}
.product-categories button{
    padding: 10px 15px;
    background-color: #fff;
    margin: 10px 0 0;
    border: 0.5px solid rgb(112, 112, 112);
}
.categories-container{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border: 0.5px solid #d1aa68;
    visibility: hidden;
    margin: 10px;
    opacity: 0;
    position: absolute;
    top: 0;
    left: -10px;
    background-color: #eff;
    width: 400px;
    padding: 10px;
    transition: 0.5s all ease;
}
.categories-container>div{
    box-sizing: border-box;
    padding: 5px 0;
    width: 48%;
    border-bottom: 0.5px solid #d1aa68;
}
.categories-container label{
    box-sizing: border-box;
    display: inline;
    margin: 5px;
}
.categories-container input{
    box-sizing: border-box;
    display: inline;
    height: 15px;
    width: 15px;
    margin: 5px 0;
}
.categories-container.show{
    top: 50px;
    opacity: 1;
    visibility: visible;
}
.product-description textarea{
    box-sizing: border-box;
    padding: 5px;
    width: 400px;
    resize: none;
    margin-bottom: 20px;
}
.confirm-btn{
    box-sizing: border-box;
    width: 70px;
    height: 37px;
    background-color: #00acb4;
    color: #fff;
    border: none;
}
.cancle-btn{
    box-sizing: border-box;
    width: 70px;
    height: 37px;
    margin-left: 10px;
    color: #00acb4;
    border: 2px solid #00acb4;
}


.products-container{
    margin: 50px auto;
    width: max-content;
}
.add-product{
    margin: 20px 0;
    color: #000;
}
.add-product button{
    background-color: transparent;
    border: none;
    font-size: 17px;
    border: 2px solid #d1aa68;
    padding: 1px 2px;
    color: #d1aa68;
    margin-left: 15px;
}
.products-lable{
    display: flex;
    justify-content: space-between;
    border-top: 0.5px solid black;
    border-left: 0.5px solid black;
    border-bottom: 0.5px solid black;
}

.products-details{
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid black;
    border-left: 0.5px solid black;
}
.products-lable div, .products-details div{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-right: 0.5px solid black;
}
.id{
    width: 50px;
}
.name{
    width: 250px;
    
}
.price{
    width: 100px;
    
}
.amount{
    width: 100px;
    
}
.idchange-btn{
    width: 100px;
}
.idchange-btn button{
    box-sizing: border-box;
    width: 70px;
    height: 37px;
    color: #00acb4;
    border: 2px solid #00acb4;
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
    .edit-create{
        padding: 5px;
    }
    .product-price-amount-gender input, .product-price-amount-gender select{
        width: 85px;
    }
    .id{
        width: 45px;
    }
    .price{
        width: 80px;
    }
    .amount{
        width: 70px;
    }
    .idchange-btn{
        width: 80px;
    }
}

@media screen and (max-width:768px){
    .wrapper{
        width: 75%;
    }
    h1{
        text-align: center;
        font-size: 23px;
    }
    .edit-create{
        width: 100%;
    }
    .edit-create input{
        width: 100%;
    }
    .product-price-amount-gender{
        display: block;
    }
    .product-price-amount-gender select{
        width: 100%;
        height: 30px;
    }
    .categories-container{
        width: 100%;
    }
    .product-description textarea{
        width: 100%;
    }

    .products-container{
        width: 100%;
    }
    .products-lable{
        display: none;
    }
    .add-product{
        padding-bottom: 10px;
        border-bottom: 0.5px solid black;
    }
    .products-details{
        display: block;
        border-left: none;
    }
    .products-details div{
        border: none;
        width: 100%;
        display: block;
    }
    .id::before{
        content: "ID:";
        margin-right: 10px;
    }
    .name::before{
        content: "Name:";
        margin-right: 10px;
    }
    .price::before{
        content: "Price:";
        margin-right: 10px;
    }
    .amount::before{
        content: "Amount:";
        margin-right: 10px;
    }
}

@media screen and (max-width:500px){
    .wrapper{
        width: 95%;
    }
    .products-details div{
        padding: 5px 0;
    }
}
</style>