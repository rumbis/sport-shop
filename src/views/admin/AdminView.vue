<template>
    <div v-if="usrLevel===1">
        <div class="wrapper">
            <h1>Admin Panel</h1>
            <div class="admin-container">
                <div class="categories container">
                    <div class="categories-image image-container">
                        <img src="../../assets/categories.jpg" alt="categories">   
                    </div>
                    <div class="categories-content content">
                        <h3>Categories</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias cupiditate illum eaque! Delectus, dolorem.</p>
                        <router-link to="/admin/categories">More</router-link>
                    </div>
                </div>
                <div class="orders container">
                    <div class="orders-image image-container">
                        <img src="../../assets/ordericon.png" alt="orders">   
                    </div>
                    <div class="orders-content content">
                        <h3>Orders reiew</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias cupiditate illum eaque! Delectus, dolorem.</p>
                        <router-link to="/admin/orders">More</router-link>
                    </div>
                </div>
                <div class="products container">
                    <div class="products-image image-container">
                        <img src="../../assets/productsicon.webp" alt="products">   
                    </div>
                    <div class="products-content content">
                        <h3>Products</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias cupiditate illum eaque! Delectus, dolorem.</p>
                        <router-link to="/admin/products">More</router-link>
                    </div>
                </div>
                <div class="users container">
                    <div class="users-image image-container">
                        <img src="../../assets/client.png" alt="clients">   
                    </div>
                    <div class="users-content content">
                        <h3>Users</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias cupiditate illum eaque! Delectus, dolorem.</p>
                        <router-link to="/admin/users">More</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
   name: 'AdminView' ,
   props: ['user', 'usrLevel'],
   mounted(){
    if(this.usrLevel !== 1){
        this.$router.push('/');
        return
    }
    window.scroll({
        top: 0,
        left: 0,
    });
   }
}
</script>

<style scoped>
.wrapper{
    width: 1170px;
    margin: 100px auto;
}
a:link, a:visited{
    display: block;
    width: max-content;
    padding: 5px 10px;
    border: 2px solid #00acb4;
    color: #00acb4;
    text-transform: uppercase;
    margin-top: 15px;
}
h1{
    text-align: center;
    color: #000;
    margin: 0 auto;
    padding: 0 10px 10px;
    width: max-content;
    border-bottom: 1px solid #d1aa68;
}
.admin-container{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.container{
    margin: 80px 0;
    display: flex;
    width: 48%;
}
h3{
    width: max-content;
    padding-bottom: 5px;
    border-bottom: 1px solid #00acb4;
}
.image-container{
    width: 50%;
}
.content{
    margin-left: 14px;
}

@media screen and (min-width:1024px) and (max-width:1279px){
.wrapper{
    width: 900px;
}
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .wrapper{
    width: 90%;
    font-size: 15px;
  }
  h1{
    font-size: 23px;
  }
}

@media screen and (max-width:768px){
    .wrapper{
        width: 95%;
    }
    .admin-container{
        display: block;
    }
    .container{
        width: 100%;
    }

}
</style>