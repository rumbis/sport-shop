<template>
    <div class="wrapper">
        <h1>Contact 5ko Sport</h1>
        <div class="contacts">
            <div class="contact">
                <div class="contact-click">
                    <a href="mailto:doesnotexist@5ko.com"><i class="fas fa-envelope"></i></a>
                </div><!-- end contact-click -->
                <div class="contact-lable">
                    Send E-mail
                </div>
            </div>
            <div class="contact">
                <div class="contact-click">
                <a href="tel:0800100100"><i class="fas fa-mobile-alt"></i></a>
                </div><!-- end contact-click -->
                <div class="contact-lable">
                    Call Us
                </div>
            </div>
            <div class="contact">
                <div class="contact-click">
                    <a href="https://twitter.com/"><i class="fab fa-twitter"></i></a>
                </div><!-- end contact-click -->
                <div class="contact-lable">
                    Follow Us
                </div>
            </div>
            <div class="contact">
                <div class="contact-click">
                    <a href="https://www.skype.com/en/"><i class="fab fa-skype"></i></a>
                </div><!-- end contact-click -->
                <div class="contact-lable">
                    Call Us
                </div>
            </div>
            <div class="contact">
                <div class="contact-click">
                    <a href="https://www.linkedin.com/"><i class="fab fa-linkedin"></i></a>
                </div><!-- end contact-click -->
                <div class="contact-lable">
                    Follow Us
                </div>
            </div>
        </div><!-- end contacts -->
        <div class="find-us">
            <h4>FIND US</h4>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13857.275051542294!2d20.44045467596941!3d44.817449270475976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ssr!2srs!4v1656521242102!5m2!1ssr!2srs" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div><!-- end find-us -->
    </div>
</template>

<script>
export default {
    mounted(){
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
    margin: 130px auto;
}
h1{
    text-align: center;
    color: #000;
    font-size: 37px;
}
.contacts{
    margin: 50px auto;
    display: flex;
    justify-content: space-between;
    width: 800px;
}
.contact{
    text-align: center;
}
.contact-click{
    margin: 0 auto;
    height: 100px;
    width: 100px;
    background-color: rgb(189, 172, 172);
    line-height: 100px;
    font-size: 25px;
    border-radius: 50%;
}
.contact a{
    display: block;
    width: 100%;
    height: 100;
    overflow: hidden;
    border-radius: 50%;
}
.contact a, .contact i{
    color: #fff;
}
.contact-click:hover{
    background-color: #d1aa68;
}
.contact-lable{
    margin: 10px 0;
    color: #d1aa68;
}
.find-us{
    margin: 100px auto;
}
.find-us h4{
    color: rgb(105, 96, 96);
    font-weight: 400;
    text-align: center;
    margin: 0 auto;
    padding: 10px 7px;
    width: max-content;
    border-top: 1px solid rgb(105, 96, 96);
}
iframe{
    display: block;
    width: 900px;
    height: 500px;
    margin: 30px auto;
}

@media screen and (min-width:1024px) and (max-width:1279px){
    .wrapper{
        width: 900px;
    }
    .contacts{
        width: 750px;
    }
    .contact-click{
        width: 80px;
        height: 80px;
        line-height: 80px;
    }
    iframe{
        width: 800px;
        height: 470px;
    }
}

@media screen and (min-width:768px) and (max-width:1024px){
    .wrapper{
        width: 90%;
    }
    .contacts{
        width: 90%;
        max-width: 100%;
    }
    .contact-click{
        width: 70px;
        height: 70px;
        line-height: 70px;
    }
    iframe{
        width: 100%;
        height: 450px;
    }
}

@media screen and (max-width:768px){
    .wrapper{
        width: 95%;
    }
    h1{
        font-size: 30px;
    }
    .contacts{
        margin-top: 90px;
        display: flex;
        flex-wrap: wrap;
        width: 95%;
    }
    .contact{
        width: 48%;
        margin: 10px 0;
    }
    .contact-click{
        width: 60px;
        height: 60px;
        line-height: 60px;
    }
    iframe{
        width: 100%;
        height: 350px;
    }
}
</style>