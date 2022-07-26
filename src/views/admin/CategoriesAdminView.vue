<template>
    <div v-if="usrLevel===1">
        <div class="wrapper">
            <div class="edit-create">
                <input type="text" :class="{'error': error}" v-model="categoriesName" @keydown.enter="updateOrAdd">
                <div class="edit-create-btn">
                    <button @click="updateOrAdd">{{btnMsg}}</button>
                    <button @click="cancle">Cancle</button>
                </div>
            </div><!-- end edit-create -->
            <ol class="categories">
                <li v-for="cat in categories" :key="cat.cat_id" class="category-container">
                    <span>{{cat.cat_name}}</span>  
                    <button @click="edit(cat)">Edit</button>
                </li>
            </ol>
        </div>
        <success v-if="success"></success>
    </div>    
</template>

<script>
import axios from 'axios';
import Success from '../../components/Success.vue'

export default {
    props:['user', 'usrLevel'],
    components:{
        Success
    },
    data: function(){
        return{
            categories: [],
            categoriesName: '',
            btn: 'Create',
            editCat: null,
            success: false,
            error: false
        }
    },
    mounted(){
        if(this.usrLevel !== 1){
            this.$router.push('/');
        }
        this.getCategories();
        window.scroll({
            top: 0,
            left: 0,
        });
    },
    methods:{
        getCategories(){
            axios.get('http://localhost:4000/admin/categories').then((res) => {
                this.categories = res.data.data;
            });
        },
        updateOrAdd(){
            if(this.categoriesName.length === 0){
                this.error = true;
                return;
            }
            this.error = false;
            if(this.editCat){
                axios.patch('http://localhost:4000/admin/categories',{
                    catId: this.editCat.cat_id,
                    catName: this.categoriesName,
                }).then((res) => {
                    this.success = true;
                    setTimeout(()=>{
                        this.success = false;
                        this.getCategories()
                    },2070)
                })
            }
            else{
                axios.post('http://localhost:4000/admin/categories',{
                    catName: this.categoriesName
                }).then((res) => {
                    this.success = true;
                    setTimeout(()=>{
                        this.success = false;
                        this.getCategories()
                    },2070)
                });
            }
            this.categoriesName = '';
            this.editCat = null;
            
        },
        edit(category){
            this.editCat = category;
            this.categoriesName = category.cat_name;
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        },
        cancle(){
            this.editCat = null;
            this.btn = 'Create';
            this.categoriesName = '';
        }
    },
    computed:{
        btnMsg(){
            if(this.editCat){
                this.btn = 'Update';
            }
            return this.btn
        }
    }
}
</script>

<style scoped>
.wrapper{
    width: 1170px;
    margin: 70px auto;
}
.edit-create{
    display: flex;
    width: max-content;
    margin: 100px auto 50px;
}
.edit-create input{
    padding: 2px;
    width: 300px;
    height: 30px;
}
input.error{
    border: 2px solid red;
}
.edit-create-btn{
    display: flex;
}
.edit-create button{
    box-sizing: border-box;
    width: 70px;
    height: 37px;
    margin-left: 10px;
    color: #00acb4;
    border: 2px solid #00acb4;
}
.edit-create button:first-of-type{
    background-color: #00acb4;
    color: white;
}
ol{
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    margin: 50px;
}
ol li{
    box-sizing: border-box;
    width: 25%;
    padding: 5px 0;
}
li span{
    display: inline-block;
    width: 40%;
}
li button{
    color: #00acb4;
    border: 2px solid #00acb4;
    padding: 5px 10px;
}

@media screen and (min-width:1024px) and (max-width:1279px){
    .wrapper{
        width: 950px;
    }
    .edit-create input{
        width: 270px;
        height: 27px;
    }
    .edit-create button{
        height: 33px;
    }

}

@media screen and (min-width: 768px) and (max-width: 1024px){
    .wrapper{
        width: 90%;
    }
    .edit-create input{
        width: 250px;
    }
    ol li{
        width: 33%;
    }
    li span{
        width: 50%;
    }
    li button{
        padding: 5px 7px;
    }
}


@media screen and (max-width:768px){
    .wrapper{
        width: 95%;
    }
    .edit-create{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .edit-create input{
        display: block;
        width: 70%;
        height: 25px;
        margin: 0 auto 15px;
    }
    .edit-create-btn{
        margin: 0 auto;
        width: 30%;
    }
    .edit-create button{
        display: block;
        height: 29px;
        margin: 0 5px;
        width: 100%;
    }
    ol{
        width: 90%;
        margin: 50px auto;
    }
    ol li{
        width: 48%;
        margin: 10px auto;
    }
    li span{
        width: 50%;
    }
    li button{
        display: block;
        padding: 1px 3px;
    }
}
</style>