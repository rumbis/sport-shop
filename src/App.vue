<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <div @click="toggleMenu" class="hamb-menu">
          <i class="fas fa-bars"></i>
        </div>
        <div class="logo">
          <img src="./assets/logo.svg" alt="logo">
        </div>
        <nav>
          <ul :class="{'open-menu': menuOpen}">
            <li @click="menuOpen=false"><router-link to="/">home</router-link></li>
            <li @click="menuOpen=false"><router-link to="/shop/all">shop</router-link></li>
            <li @click="menuOpen=false"><router-link to="/about">about</router-link></li>
            <li @click="menuOpen=false"><router-link to="/contact">contact</router-link></li>
            <li @click="menuOpen=false" v-if="usrLevel===1"><router-link to="/admin">admin</router-link></li>
          </ul>
        </nav>
        <div class="header-icon">
          <div class="user-icon" @click="showLogin">
            <i class="fas fa-user"></i>
          </div>
            <login v-if="loginContainer" :user="loggedUser" :loginContainer="loginContainer" @logged="userLogged($event)"></login>
          <div class="cart-icon">
            <router-link to="/cart"><i class="fas fa-shopping-basket"><div v-show="totalItems>0 && loggedUser" class="total-items">{{ totalItems }}</div></i></router-link>
          </div>
          
        </div><!-- end header-icon -->
      </div><!-- emd wrapper -->
    </header>
<!-- --------------------------------------------------------- -->
    <router-view :user="loggedUser" :windowWidth="windowWidth" :usrLevel="usrLevel" :cart="cart" @shoppingCart="shoppingCart($event)"/>
<!-- --------------------------------------------------------- -->

    <footer>
      <div class="scroll-to-top" @click="scrollToTop"><i class="fas fa-arrow-up"></i></div>
      <div class="footer-top">
        <div class="wrapper">
          <div class="footer-contact">
            <div class="footer-logo">
              <img src="./assets/logo.svg" alt="logo">
            </div>
            <router-link to="/contact">CONTACT US</router-link>
          </div><!-- end footer-contact -->
          <div class="footer-nav">
            <router-link to="/">home</router-link>
            <router-link to="/shop/all">shop</router-link>
            <router-link to="/about">about</router-link>
            <router-link to="/registration">register now</router-link>
          </div>
          <div class="footer-icon">
            <i class="fab fa-facebook"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-pinterest"></i>
          </div>
        </div>
      </div><!-- end footer top -->
      <div class="footer-bottom">
        <p>&copy; Copyright 2022 - All Rights Reserved </p>
      </div>
    </footer>


  </div>
</template>

<script>
import axios from 'axios';
import Login from './components/Login.vue';

let body = window.document.body;

export default {
  components:{
    Login
  },
  data: function(){
    return{
      windowWidth: window.innerWidth,
      loginContainer: false,
      loggedUser: null,
      usrLevel: null,
      cart: sessionStorage.getItem('products') || [],
      menuOpen: false
    }
  },
  methods: {
    windowResize(){
      this.windowWidth = window.innerWidth
    },
    toggleMenu(){
      this.menuOpen = !this.menuOpen;
      if(this.menuOpen){
        this.loginContainer = false;
      }
    },
    showLogin(){
      this.loginContainer = !this.loginContainer;
      if(this.loginContainer){
        this.menuOpen = false;
      }
    },
    userLogged(user){
      this.loggedUser = user.user;
      this.loginContainer = user.loginCont;
    },
    checkIfLoggedIn(){
      let sessionUser = sessionStorage.getItem('sessionUser');
      if(sessionUser){
        this.loggedUser = JSON.parse(sessionUser);
        this.usrLevel = this.loggedUser.usr_level;
        return
      }
      let storedUser = localStorage.getItem("user");
      if(storedUser){
        this.loggedUser = JSON.parse(storedUser);
        this.usrLevel = this.loggedUser.usr_level;
        return;
      }
    },
    shoppingCart(cart){
      this.cart = cart;
    },
    scrollToTop(){
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  },
  computed:{
    totalItems(){
      let totalItems = 0;
      if(this.cart){
        this.cart.forEach((product) => {
          totalItems += parseInt(product.numberOfUnits);
        });
        
        return totalItems;
      }
    }
  },
  watch:{
    loggedUser(){
      this.usrLevel = null;
      if(this.loggedUser){
        this.usrLevel = this.loggedUser.usr_level;
      }
      else{
        this.cart = [];
        sessionStorage.setItem('products', this.cart)
      }
    },
    menuOpen(){
       if(this.menuOpen === true){
        body.style.overflow = 'hidden';
        return;
      }
      body.style.overflow = 'visible';
    },
    windowWidth(){
      this.windowWidth = window.innerWidth
      if(this.windowWidth >= 768){
        body.style.overflow = 'visible';
      }
    }
  },
  mounted(){
    let sessionCart = JSON.parse(sessionStorage.getItem('products'))
    if(sessionCart){
      this.cart = sessionCart
    }
    this.checkIfLoggedIn();
    this.scrollToTop();
    body.style.overflow = 'visible';

    window.addEventListener('resize', this.windowResize)
    
  }
  
}
</script>

<style>
*{
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}
body{
  background-color: #eff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #121314;
}
.success{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #26393a28;
}
.success img{
  position: relative;
  width: 500px;
}
img{
  vertical-align: bottom;
  max-width: 100%;
  max-height: 100%;
}
a{
  text-decoration: none;
  top: 0;
}
ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
.scroll-to-top{
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  background-color: #00acb4;
  border-radius: 50%;
  color: #fff;
  font-size: 25px;
  line-height: 50px;
  text-align: center;
}
.wrapper{
  width: 1170px;
  margin: 0 auto;
}
header{
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 170;
  background-color: #4b3535;
}
header .wrapper{
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
header .hamb-menu{
  display: none;
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
  margin-left: 25px;
  position: relative;
}
.fa-shopping-basket{
  margin-left: 0px;
  position: relative;
}
.total-items{
  position: absolute;
  top: -31%;
  left: -50%;
  color: #fff;
  background-color: rgba(255, 0, 0, 0.76);
  border-radius: 50%;
  padding: 2px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  width: 20px;
  height: 20px;
}

nav a.router-link-exact-active {
  color: #00acb4;
}

footer{
  text-align: center;
}
.footer-top{
  background-color: rgb(46, 36, 36);
  color: #fff;
}
.footer-top .wrapper{
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
}
.footer-contact{
  margin: auto 0;
}
.footer-logo{
  width: 150px;
}
.footer-contact a{
  display: block;
  width: max-content;
  margin-top: 20px;
  padding: 3px 6px;
  color: #d1aa68;
  border: 2px solid #d1aa68;
  text-transform: uppercase;
}
.footer-nav::before{
  content: "";
  display: block;
  height: 100%;
  width: 2px;
  background-color: rgba(255, 255, 255, 0.705);
  position: absolute;
  left: -35px;
}
.footer-nav{
  position: relative;
  text-align: left;
  color: #fff;
}
.footer-nav a{
  display: block;
  color: #fff;
  text-transform: uppercase;
  padding: 5px;
}
.footer-nav a:hover{
  color: #00acb4;
}
.footer-icon::before{
  content: "";
  display: block;
  height: 100%;
  width: 2px;
  background-color: rgba(255, 255, 255, 0.705);
  position: absolute;
  left: -35px;
}
.footer-icon{
  position: relative;
}
.footer-icon i{
  display: block;
  font-size: 20px;
  padding: 5px;
}
.fa-facebook:hover{
  color: #4267B2;
}
.fa-instagram:hover{
  color: #8a3ab9;
}
.fa-twitter:hover{
  color: #1DA1F2;
}
.fa-pinterest:hover{
  color: #E60023
;
}
.footer-bottom{
  padding: 10px;
  color: #ddd;
  background-color: #222;
}

@media screen and (min-width:1024px) and (max-width:1279px){
  .wrapper{
    width: 900px;
  }
  
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .wrapper{
    width: 80%;
  }
  header .wrapper{
    width: 100%;
  }
  .footer-top .wrapper{
    width: 90%;
    font-size: 13px;
  }
  .footer-top i{
    font-size: 17px;
  }
  .footer-bottom{
    font-size: 15px;
  }
}

@media screen and (max-width:767px){
  .wrapper{
    width: 80%;
  }
  header .wrapper{
    display: flex;
    justify-content: space-between;
  }
  header .hamb-menu{
    display: block;
    color: #fff;
    width: 33%;
    font-size: 22px;
    line-height: 50px;
  }
  .header-icon{
    position: static;
    line-height: 50px;
  }
  .header-icon i{
    position: relative;
  }
  .fa-shopping-basket{
    position: relative;
  }
  .total-items{
    top: -40%;
    left: -30%;
    font-size: 8px;
    width: 15px;
    height: 15px;
    line-height: 15px;
  }
  .logo{
    margin-right: 13%;
    width: 110px;
  }
  .logo img{
    position: relative;
    z-index: 49;
    width: 120px;
  }
  nav ul{
    visibility: hidden;
    position: absolute;
    left: 0;
    top: -100vh;
    transition: 0.5s top ease-in;
    padding: 5px;
  }
  nav ul.open-menu{
    top: 50px;
    visibility: visible;
    display: block;
    width: 80%;
    height: 100vh;
    background-color: #4b3535;
  }
  nav ul li a{
    width: 100px;
    border-bottom: 0.5px solid #d1aa68;
  }
  nav a:link{
    transition: none;
  }
  
  .header-icon{
    font-size: 20px;
    padding: 0;
  }
  .header-icon i{
    margin-left: 10px;
  }

  .footer-top .wrapper{
    display: block;
  }
  .footer-contact{
    width: max-content;
    padding: 15px 0;
    margin: 10px auto;
    border-bottom: 1px solid rgba(255, 255, 255, 0.705);
  }
  .footer-logo{
    width: 120px;
  }
  .footer-contact a{
    margin: 20px auto;
    font-size: 12px;
  }
  .footer-nav{
    padding: 35px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .footer-nav::before, .footer-icon::before{
    display: none;
  }
  .footer-nav a{
    flex-basis: 47%;
    position: relative;
  }
  .footer-nav a::before{
    content: "";
    display: block;
    height: 60%;
    width: 2px;
    background-color: rgba(255, 255, 255, 0.705);
    position: absolute;
    left: -20px;
  }
  .footer-icon{
    display: flex;
    padding: 15px 0;
    justify-content: center;
  }
  .footer-icon i{
    margin: 0 5px;
  }
}

@media screen and (max-width:250px){
  .edit-create-btn{
    display: flex;
    flex-direction: column;
  }
  .edit-create button{
    display: block;
    margin-top: 15px;
    font-size: 10px;
  }
  ol{
    width: 70%;
    flex-wrap: nowrap;
    flex-direction: column;
    font-size: 15px;
    margin: 0 auto;
  }
  ol li{
    width: 95%;
    margin: 0 auto;
  }
  .footer-top .wrapper{
    width: 100%;
  }
  .footer-contact{
    width: 95%;
  }
  .footer-logo{
    width: 80%;
  }
  .footer-contact a{
    font-size: 10px;
    max-width: 100%;
  }
  .footer-nav{
    max-width: 100%;
    padding: 35px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .footer-nav::before, .footer-icon::before{
    display: none;
  }
  .footer-nav a{
    flex-basis: 80%;
    position: relative;
  }
  .footer-nav a::before{
    left: -10px;
  }
  .footer-icon{
    max-width: 100%;
    display: block;
  }
  .footer-bottom p {
    font-size: 15px;
    max-width: 95%;
  }
}
</style>
