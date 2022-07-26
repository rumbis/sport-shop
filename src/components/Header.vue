<template>
    <header>
      <div class="logo">
        <img src="../assets/logo.svg" alt="logo">
      </div>
      <nav>
        <ul>
          <li><router-link to="/">home</router-link></li>
          <li><router-link to="/shop">shop</router-link></li>
          <li><router-link to="/about">about</router-link></li>
          <li><router-link to="/">contact</router-link></li>
        </ul>
      </nav>
      <div class="header-icon">
        <div class="user-icon" @click="showLogin">
          <i class="fas fa-user"></i>
        </div>
          <login v-if="loginContainer" :user="loggedUser" @logged="userLogged($event)"></login>
        <div class="cart-icon">
          <router-link to="/cart"><i class="fas fa-shopping-basket"></i></router-link>
        </div>
        
      </div><!-- end header-icon -->
    </header>
</template>

<script>
import Login from '../components/Login.vue';

export default {
    components:{
        Login
    },
    data: function(){
        return{
            loginContainer: false,loggedUser: null,
        }
    },
    methods:{
        showLogin(){
        this.loginContainer = !this.loginContainer;
        },
        userLogged(user){
        this.loggedUser = user;
        }
    }
}
</script>

<style scoped>
header{
  display: flex;
  justify-content: space-between;
  background-color: #4b3535;
  padding: 0 30px;

}
.logo{
  width: 140px;
  height: auto;
  margin: auto 0;
}
nav ul{
  display: flex;
  justify-content: space-between;
}
nav ul li{
  padding: 0 10px;
}
header i{
  color: #000;
}
nav a:link,
nav a:visited {
  display: block;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  line-height: 60px;
  transition: 0.5s all ease-in;
}
nav a:hover {
  font-size: 1.2em;
}
.header-icon{
  display: flex;
  font-size: 23px;
  padding: 0 7.5px;
  line-height: 60px;
  position: relative;
}
.header-icon i{
  margin-left: 15px;
  position: relative;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
