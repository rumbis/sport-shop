<template>
  <div class="home">
    <div class="slider">
      <button class="left-btn" @click="slideLeft"><i class="fas fa-chevron-left"></i></button>
        <div class="slider1"></div>
        <div class="slider2"></div>
        <div class="slider3"></div>
      <button class="right-btn" @click="slideRight"><i class="fas fa-chevron-right"></i></button>

    </div>
    <div class="wrapper">
      <div class="category">
        <router-link to="/shop/M">
          <div class="all men">
            <img src="../assets/categories/men-categories.png" alt="men">
              <div class="category__text">
                <h3>men</h3>
              </div><!-- end categort__men__text -->
          </div><!-- end men -->
        </router-link>
        <router-link to="/shop/F">
          <div class="all women">
            <img src="../assets/categories/woman-categories.png" alt="woman">
              <div class="category__text">
                <h3>women</h3>
              </div><!-- end categort__women__text -->
          </div><!-- end women -->
        </router-link>
        <router-link to="/shop/U">
          <div class="all unisex">
            <img src="../assets/categories/Fotolia_130932802_Subscription_Monthly_M.jpg" alt="mens">
              <div class="category__text">
                <h3>unisex</h3>
              </div><!-- end categort__unisex__text -->
          </div><!-- end unisex -->
        </router-link>
      </div><!-- end categorys -->

    </div><!-- end wrapper -->

    <div class="special-product">
      <div class="wrapper">
        <div class="special-product__text">
          <h2>you can <span>fly too</span></h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique ullam reprehenderit totam, laudantium consequatur expedita dolorem eaque quisquam voluptates voluptas magni tempore, fuga veritatis!</p>
          <router-link to="/products/2">More</router-link>
        </div><!-- end special-product__text -->
        <div class="special-product__img">
          <img src="../assets/products/vaporfly.png" alt="Nike Vaporfly">
        </div><!-- end special-product__img -->
    </div><!-- end wrapper -->
    </div><!-- end special product -->

    <div class="wrapper">
      <div class="category">
        <router-link to="/shop/shoes">
          <div class="all shoes">
            <img src="../assets/products/shoes.jpg" alt="shoes">
              <div class="category__text">
                <h3>shoes</h3>
              </div><!-- end categort__shoes__text -->
          </div><!-- end shoes -->
        </router-link>
        <router-link to="/shop/clothing">
          <div class="all clothing">
            <img src="../assets/products/clothing.jpg" alt="clothing">
              <div class="category__text">
                <h3>clothing</h3>
              </div><!-- end categort__clothing__text -->
          </div><!-- end clothing -->
        </router-link>
        <router-link to="/shop/equipment">
          <div class="all equipment">
            <img src="../assets/products/equipment.jpg" alt="equipment">
              <div class="category__text">
                <h3>equipment</h3>
              </div><!-- end categort__equipment__text -->
          </div><!-- end equipment -->
        </router-link>
      </div><!-- end categorys -->
    </div><!-- end wrapper -->

    <div class="running-football">
      <div class="football" :class="{'animated': animateSlide}">
        <div class="football_content">
          <h2>football</h2>
          <router-link to="shop/football">More</router-link>
        </div>
      </div><!-- end football -->
      <div class="running" :class="{'animated': animateSlide}">
        <div class="running_content">
          <h2>running</h2>
          <router-link to="shop/running">More</router-link>
        </div>
      </div><!-- end running -->
    </div><!-- end running-football -->
    <div class="wrapper">
      <div class="brands">
        <div class="brand">
          <img src="../assets/brands/nike.png" alt="Nike">
        </div>
        <div class="brand">
          <img src="../assets/brands/adidas.png" alt="Adidas">
        </div>
        <div class="brand">
          <img src="../assets/brands/thenorthface.png" alt="The North Face">
        </div>
        <div class="brand">
          <img src="../assets/brands/ua.png" alt="Under Armour">
        </div>
        <div class="brand">
          <img src="../assets/brands/reebok.png" alt="Reebok">
        </div>
      </div><!-- end brands -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  props:['user'],
  data:function(){
    return{
      sliderNumber: 0,
      slides: [],
      changeSlide: null,
      animateSlide: false,
    }
  },
  methods: {
    displayNone(el){
      el.forEach((div) => {
        div.style.display = "none";
      });
    },
    slideLeft(){
      this.displayNone(this.slides);
      this.sliderNumber--;

      if(this.sliderNumber === -1){
        this.sliderNumber = this.slides.length - 1;
      }
      this.slides[this.sliderNumber].style.display ="block";

      clearInterval(this.changeSlide);
      this.changeSlide = setInterval(this.slideRight, 5000);
    },
    slideRight(){
      this.displayNone(this.slides);
      this.sliderNumber++;
      
      if(this.sliderNumber >= this.slides.length){
        this.sliderNumber = 0;
      }
      this.slides[this.sliderNumber].style.display = "block";

      clearInterval(this.changeSlide);
      this.changeSlide = setInterval(this.slideRight, 5000);
    },
    animationSlideElement(){
      window.onscroll = () => {
        let sectionForAnimation = this.$el.querySelector('.running-football');

        let sectionPosition = sectionForAnimation.getBoundingClientRect().top;
        let screenPosition = window.innerHeight / 1.3;

        if(sectionPosition <screenPosition){
          this.animateSlide = true
        }
      }
    }
  },
  mounted(){
    this.slides = this.$el.querySelectorAll('.slider div');
    this.slideRight()
    this.animationSlideElement();
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
}
.slider{
  position: relative;
  height: 470px;
  margin-top: 60px;
}
.slider button{
  height: 50px;
  width: 50px;
  border: none;
  background: rgba(0,0,0,0.25);
  cursor: pointer;
  position: absolute;
  top: 40%;
  z-index: 15;
}
.slider button i{
  font-size: 30px;
  color: #fff;
}
.right-btn{
  right: 0;
}
.slider1{
  background: url('../assets/slider/nikeslider1.jpg') center center / cover;
  height: 100%;
}
.slider2{
  background: url('../assets/slider/220524-pride-hp-hero-d.webp') center center / cover;
  height: 100%;
}
.slider3{
  background: url('../assets/slider/35831c23-178d-4ead-9d48-3e09dd9846ac.webp') center center / cover;
  height: 100%;
}

.category{
  display: flex;
  justify-content: space-between;
  padding: 50px 0;
}
.category a{
  display: block;
  width: 30%;
}
.category .all{
  position: relative;;
}
.category .all:hover .category__text{
  background-color: rgba(0,0,0,0.533);
}
.category__text{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 700;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.252); 
}

.special-product{
  background: url(../assets/kipchoge.png) no-repeat center top / cover;
  height: 600px;
}
.special-product .wrapper{
  padding: 50px;
  display: flex;
  justify-content: space-between;
}
.special-product__text{
  flex-basis: 40%;
  color: #fff;
}
.special-product__text span{
  color: #41c1fe;
}
.special-product__text h2{
  text-transform: uppercase;
  font-weight: 800;
  font-style: italic;
  font-size: 50px;
}
.special-product h2, .special-product p{
  margin: 70px 0;
}
.special-product__text a{
  background-color: #41c1fe;
  color: #fff;
  text-transform: uppercase;;
  border: none;
  border-radius: 25% 0;
  padding: 7px 20px;
}
.special-product__img{
  flex-basis: 45%;
  transform: rotateX(5deg);
}
.special-product__img img{
  opacity: 0.8;
  transform: rotate(15deg);
}

.running-football{
  max-width: 100%;
  display: flex;
  height: 500px;
}
.football{
  flex-basis: 50%;
  background: url(../assets/football.webp) no-repeat center center / cover;
  opacity: 0;
  transform: translateX(50%);
  transition: all 1s ease;
}
.running{
  flex-basis: 50%;
  background: url(../assets/nikerun.webp) no-repeat center center / cover;
  opacity: 0;
  transform: translateX(-50%);
  transition: all 1s ease;
}
.football_content, .running_content{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.418);
  text-transform: uppercase;
  color: #fff;
  text-align: center;
}
.running_content{
  background-color: rgba(0, 0, 0, 0.612);
}
.running-football h2{
  color: rgba(255, 255, 255, 0.814);
  font-size: 40px;
  letter-spacing: 20px;
  padding: 200px 0 80px;
  transition:  1s all ease;
}
.running-football a{
  background-color: #41c1fe;
  color: #fff;
  text-transform: uppercase;;
  border: none;
  border-radius: 25% 0;
  padding: 7px 20px;
}
.football_content:hover h2, .running_content:hover h2{
  padding: 100px 0 70px;
}
.running.animated, .football.animated{
  transform: translateX(0);
  opacity: 1;
}
.brands{
  margin: 50px 0;
  display: flex;
  justify-content: space-between;
}
.brand{
  flex-basis: 18%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width:1024px) and (max-width:1279px){
  .wrapper{
    width: 900px;
  }
  .special-product h2, .special-product p{
    margin: 50px 0;
  }
}

@media screen and (min-width:768px) and (max-width:1024px) {
  .wrapper{
    width: 90%;
  }
  .slider{
    height: 400px;
  }
  .category{
    width: 100%;
  }
  .category a{
    width: 32%;
  }
  .special-product{
    height: 490px;
  }
  .special-product .wrapper{
    box-sizing: border-box;
  }
  .special-product p{
    display: none;
  }
  .special-product h2{
    margin-bottom: 30px;
  }
}

@media screen and (max-width:767px){
  .wrapper{
    width: 95%;
  }
  .slider{
    height: 200px;
    margin-top: 50px;
  }
  .slider button{
    height: 30px;
    width: 30px;
  }
  .slider button i{
    font-size: 23px;
  }
  .category{
    flex-direction: column;
    align-items: center;
  }
  .category a{
    width: 60%;
    margin: 10px 0;
  }
  .category h3{
    font-weight: 600;
  }
  .special-product{
    height: 200px;
  }
  .special-product .wrapper{
    padding: 50px 0;
  }
  .special-product__text{
    margin-left: auto;
  }
  .special-product h2{
    font-size: 23px;
    margin: 0 0 20px;
  }
  .special-product a{
    font-size: 15px;
    padding: 4px 8px;
  }
  .special-product p{
    display: none;
  }
  .special-product__img{
    display: none;
  }
  .running-football{
    display: block;
    height: 200px;
    margin-bottom: 400px;
  }


  .football{
    width: 100%;
    background: url(../assets/football.webp) no-repeat center center / cover;
    opacity: 0;
    transform: none;
    transition: all 1s ease;
  }
  .running{
    width: 100%;
    background: url(../assets/nikerun.webp) no-repeat center center / cover;
    opacity: 0;
    transform: none;
    transition: all 1s ease;
  }
  .football_content, .running_content{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.418);
    text-transform: uppercase;
    color: #fff;
    text-align: center;
    padding: 70px 0;
  }
  .running-football h2{
    max-width: 100%;
    color: rgba(255, 255, 255, 0.814);
    font-size: 25px;
    letter-spacing: 15px;
    padding: 20px 0 60px;
    transition:  1s all ease;
  }
  .running-football a{
    background-color: #41c1fe;
    color: #fff;
    text-transform: uppercase;;
    border: none;
    border-radius: 25% 0;
    padding: 7px 20px;
  }
  .running.animated, .football.animated{
    opacity: 1;
  }
  .brands{
    flex-wrap: wrap;
  }
  .brand{
    margin: 20px 0;
    flex-basis: 48%;
  }
}

@media screen and (max-width:320px){
  .category a{
    width: 80%;
  }
  .category__text h3{
    font-size: 18px;
  }
  .special-product .wrapper{
    display: felx;
    justify-content: right;
    align-items: center;
    padding-top: 25px;
  }
  .running-football h2{
    letter-spacing: 5px;
    font-size: 15px;
    max-width: 100%;
  }
}
</style>