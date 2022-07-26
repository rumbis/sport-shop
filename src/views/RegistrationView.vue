<template>
    <div class="wrapper">
        <div class="form" v-if="successfullRegistration === false">
            <div class="title"><h1>User registration</h1></div>
            <div>
                <label for="Firstname">First name: *</label>
                <input type="text" v-model="firstname" placeholder="Pera">
                <div v-if="errors.firstname" class="error-text">
                    Please enter your first name.
                </div>
            </div>
            <div>
                <label for="Lastname">Last name: *</label>
                <input type="text" v-model="surname" placeholder="Peric">
                <div v-if="errors.surname" class="error-text">
                    Please enter your last name.
                </div>
            </div>
            <div>
                <label for="Email">Email: *</label>
                <input type="text" v-model="email" placeholder="pera@gmail.com">
                <div class="error-text">
                    {{message}}
                </div>
                <div v-if="errors.email" class="error-text">
                    Invalid email address. Please enter a valid email address.
                </div>
            </div>
            <div>
                <label for="Password">Password: *</label>
                <input  type="password" v-model="password" placeholder="********">
                <div v-if="errors.password" class="error-text">
                    Password should be at least 8 characters.
                </div>
            </div>
            <div>
                <label for="Password">Confirm Password: *</label>
                <input type="password" v-model="confirmpassword" placeholder="********" @keydown.enter="createaccount">
                <div v-if="errors.confirmpassword" class="error-text">
                    Password do not matching
                </div>
            </div>
            <div>
                <button @click="createaccount">Create account</button>
            </div>
        </div>
        <div class="successful" v-if="successfullRegistration === true">
            <h2>Successful registration</h2>
            <p>Welcome, you can now log in.</p>
            <div class="image">
                <img src="../assets/logo.svg" alt="logo">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RegistrationView',
    data:function(){
        return{
            firstname: "",
            surname: "",
            email: "",
            password: "",
            confirmpassword: "",
            errors: {
                firstname: false,
                surname: false,
                email: false,
                password: false,
                confirmpassword: false
            },
            message: "",
            successfullRegistration: false
        }
    },
    mounted(){
        window.scroll({
            top: 0,
            left: 0,
        });
    },
    methods:{
        checkValidation(){
            this.message = "";
            this.errors.firstname = false;
            this.errors.surname = false;
            this.errors.email = false;
            this.errors.password = false;
            this.errors.confirmpassword = false;

            if(this.firstname === null || this.firstname.trim().length === 0){
                this.errors.firstname = true;
            }
            if(this.surname === null || this.surname.trim().length === 0){
                this.errors.surname = true;
            }
            this.validateEmail(this.email)
            if(this.password === null || this.password.length < 8){
                this.errors.password = true
            }
            if(this.password !== this.confirmpassword){
                this.errors.confirmpassword = true;
            }
        },
        validateEmail(value){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
                this.errors.email = false;
            }else{
                this.errors.email = true;
            }
        },
        createaccount(){
            this.checkValidation()
            if(this.errors.firstname === true || this.errors.surname === true || this.errors.email === true || this.errors.password === true || this.errors.confirmpassword === true){
                return;
            }
            
            axios.post('http://localhost:4000/register',{
                firstname: this.firstname,
                surname: this.surname,
                email: this.email,
                password: this.password,
                confirmpassword: this.confirmpassword    
            }).then((res) => {
                if(res.data.result === 'ERROR'){
                    this.message = res.data.message
                    return;
                }
                this.successfullRegistration = true;
                this.firstname = "";
                this.surname = "";
                this.email = "";
                this.password = "";
                this.confirmpassword = "";
            });
        }
    }
}
</script>

<style scoped>
.wrapper{
    width: 1170px;
    margin-top: 20px;
}
.title{
    display: flex;
    justify-content: center;
}
h1{
  text-align: center;
  color: #000;
  width: max-content;
  font-size: 37px;
  padding: 0 10px 10px;
  border-bottom: 1px solid #d1aa68;
}
.form{
    max-width: 600px;
    margin: auto;
    padding: 50px 0;
}
.form div{
    padding: 15px 0;
}
.form div label{
    display: block;
    font-weight: bold;
    font-size: 16px;
}
.form h1{
    margin: 40px 0;
}
.form div input{
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    font-size: 18px;
    padding: 0 10px;
}
.form div button{
    padding: 10px 25px;
    font-size: 18px;
    background-color: #00acb4;
    border: none;
    color: #fff;
}
.error-text{
    color: #f00;
}
.successful{
    margin: 150px 0 70px;
    text-align: center;
}
.successful h2, .successful p{
    margin: 30px 0;
}
.successful .image{
    margin: 50px auto;
    width: 400px;
}

@media screen and (min-width:1024px) and (max-width:1279px){
    .wrapper{
        width: 900px;
    }
    .form div input{
        height: 45px;
    }
    .form div button{
        padding: 8px 15px;
        font-size: 17px;
    }
}

@media screen and (min-width:768px) and (max-width:1024px){
    .wrapper{
        width: 90%;
    }
    .form div label{
        max-width: 100%;
        font-size: 15px
    }
    .form div input{
        width: 90%;
        height: 40px;
    }
    .form div button{
        padding: 8px 13px;
        font-size: 16px;
    }
}

@media screen and (max-width:768px){
    .wrapper{
        width: 95%;
    }
    h1{
        font-size: 27px;
    }
    .form div label{
        max-width: 100%;
        font-size: 14px
    }
    .form div input{
        width: 100%;
        height: 35px;
    }
    .form div button{
        padding: 7px 11px;
        font-size: 15px;
    }
}
</style>