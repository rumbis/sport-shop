<template>
  <div class="wrapper">
    <h1>About Us</h1>
    <div class="about">
      <div class="content">
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
      </div>
      <div class="image">
        <img src="../assets/5kosport.png" alt="5ko store">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    window.scroll({
      top: 0,
      left: 0
    });
  }
}
</script>

<style scoped>
.wrapper{
  width: 1170px;
  margin: 80px auto 40px;
}
h1{
  margin: 0 auto;
  text-align: center;
  color: #000;
  font-size: 37px;
  padding: 0 10px 10px;
  width: max-content;
  border-bottom: 1px solid #d1aa68;
}
.about{
  display: flex;  
  justify-content: space-between;
  margin: 50px auto;
}
.content{
  flex-basis: 60%;
}
.image{
  flex-basis: 38%;
}

@media screen and (min-width:1024px) and (max-width:1279px){
  .wrapper{
    width: 900px;
  }
}

@media screen and (max-width:1024px){
  .wrapper{
    width: 90%;
  }
  .about{
    flex-direction: column-reverse;
  }
  .image{
    margin: 50px 0;
  }
  
}

@media screen and (max-width:768px){
  .wrapper{
    width: 95%;
  }
}
</style>
