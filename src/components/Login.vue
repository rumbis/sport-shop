<template scroll="no">
    <div class="login-position">
        <div class="login-container" v-if="user == null">
            <h2>Login Form</h2>
            <div>
                <input type="text" v-model="login.email" placeholder="Email">
            </div>
            <div>
                <input type="password" v-model="login.password" placeholder="Lozinka" @keydown.enter="callLoginAPI">
            </div>
            <div class="remember-me">
                <input type="checkbox" v-model="login.shouldRemember"/>
                <p>Remember me. &nbsp; &nbsp; <span class="error-msg" v-if="currentErrorMsg.length > 0">{{currentErrorMsg}}</span></p> 
            </div>
            <div class="login-btn">
                <button @click="callLoginAPI">LOGIN</button>
                <span>New User?<span @click="logContain=false"><router-link to="/registration" > Create an account</router-link></span></span>
            </div> 
        </div>
        <div v-if="user">
            <div class="profile-details">
                <div class="profile-avatar" v-if="user.usr_level !== 1">
                    <img src="../assets/avatar/user.png" alt="user-avatar">
                </div>
                <div class="profile-avatar" v-if="user.usr_level === 1">
                    <img src="../assets/avatar/admin.png" alt="admin-avatar">
                </div>
                <div class="profile-content">
                    <p>First Name: &nbsp; <span>{{user.usr_firstname}}</span></p> 
                    <p>Last Name: &nbsp; <span>{{user.usr_surname}}</span></p> 
                </div>
            </div><!-- end profile-details -->
            <div class="profile-btn">
                <button @click="logout">LOGOUT</button>
            </div>  
        </div>  
    </div> 
</template>

<script>
import axios from "axios";
import RegistrationView from '../views/RegistrationView.vue';
import ConfirmDialog from '../components/Confirm.vue';

export default {
    components:{RegistrationView, ConfirmDialog},
    data:function(){
        return{
            login:{
                email: "",
                password: "",
                shouldRemember: false
            },
            currentErrorMsg: "",
            userJson: JSON.parse(JSON.stringify(this.user)),
            logContain: JSON.parse(JSON.stringify(this.loginContainer)),
            confirmVisible: false,
            confirmText: "Do you want to delete your account?"
        }
    },
    props: ['user', 'loginContainer'],
    methods:{
        callLoginAPI(){
            axios.post('http://localhost:4000/login', {
                email: this.login.email,
                password: this.login.password
            }).then((res) => {
                if(res.data.result === 'ERROR'){
                    this.currentErrorMsg = res.data.message;
                    return;
                }

                this.userJson = res.data.data;
                this.logContain = false;
                sessionStorage.setItem('sessionUser', JSON.stringify(this.userJson));
                this.$emit('logged', {
                    user: this.userJson,
                    loginCont: this.logContain
                });

                if(this.userJson.usr_level === 1){
                    this.$router.push('/admin');
                }
                
                if(this.login.shouldRemember === true){
                    localStorage.setItem('user', JSON.stringify(this.userJson));
                }

            });
        },
        logout(){
            if(this.userJson.usr_level === 1){
                this.$router.push('/');
            }
            this.userJson = null;
            this.$emit('logged', {
                user: this.userJson,
                loginCont: this.logContain
            });
            localStorage.removeItem('user');
            sessionStorage.removeItem('sessionUser');
            sessionStorage.setItem('products', []);
        },
        register(){
            console.log("sad")
        }
    },
    watch:{
        logContain(){
            this.$emit('logged', {
                user: this.userJson,
                loginCont: this.logContain
            });
        }
    }
}
</script>

<style scoped>
*{
    box-sizing: border-box;
    font-size: 16px;
    overflow: hidden;
}
.login-position{
    position: absolute;
    top: 100%;
    left: -300%;
    z-index: 5;
    background-color: rgb(212, 212, 212);
    width: 400px;
    border-radius: 10px;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.14), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
}
.login-container{
    background-color: rgb(212, 212, 212);
    padding: 0 20px;
    width: 400px;
    margin: 0 auto;
}
h2{
    text-align: center;
    font-size: 20px;
}
input{
    display: block;
    margin: 5px 0;
}
input[type="text"], input[type="password"]{
    width: 100%;
    height: 30px;
    padding: 0 10px;
}
input[type="checkbox"]{
    margin: auto 0;
}
p{
    margin: 0 0 0 10px;
    font-size: 15px;
    line-height: 32px;
}
.remember-me{
    display: flex;
}
.login-btn button{
    padding: 5px 15px;
    background-color: #00acb4;
    color: #fff;
    border: none;
    margin: 0 30px 5px 0;
}
.error-msg{
    color: red;
}
.profile-details{
    display: flex;
    margin: 20px 0;
}
.profile-avatar{
    width: 100px;
    margin: 0 20px;
}
.profile-content{
    margin: auto 0;
}
.profile-content p{
    font-size: 18px;
}
.profile-content span{
    font-size: 18px;
    color: rgb(28, 43, 75);
}
.profile-btn{
    display: flex;
    margin: 30px 0;
}
.profile-btn button{
    display: block;
    background-color:#904e4e;
    color: #fff;
    padding: 7px 15px;
    border: none;
    margin-left: 20px;
}
.profile-btn :last-child{
    background-color: transparent;
    color: #b23b3b;
}

@media screen and (min-width:768px) and (max-width:1024px){
    .profile-details{
        margin: 10px 0;
    }
    .profile-avatar{
        width: 80px;
    }
    .profile-btn{
        margin: 15px 0;
    }
}

@media screen and (max-width:768px){
    .login-position{
        top: 50px;
        left: -0%;
        border-radius: 0;
        box-shadow: none;
        height: 100vh;
        width: 100%;
        background-color: rgb(219, 211, 199);
    }
    .login-container{
        max-width: 100%;
        margin-top: 50px;
        background-color: transparent;
        box-sizing: border-box;
        padding: 0;
    }
    .login-container h2{
        margin-bottom: 30px;
    }
    .login-container input[type="text"], .login-container  input[type="password"]{
        margin: 10px auto;
        width: 90%;
    }
    .login-container input[type="checkbox"]{
        margin-left: 12px;
    }
    .login-btn{
        display: flex;
        flex-direction: column;
        margin: 20px 0 0 10px;
    }
    .login-btn button{
        width: max-content;
        margin: 20px 0 10px;
    }

    .profile-details{
        margin: 60px auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: max-content;
    }
    .profile-avatar{
        margin: 0 0 50px;
    }
    .profile-content p{
        padding: 5px;
        margin: 10px 0;
        border-bottom: 0.5px solid #fff;
    }
    .profile-btn{
        justify-content: center;
    }
    .profile-btn button{
        border: 2px solid rgb(182, 33, 33);
        color: rgb(182, 33, 33);
    }
}
</style>