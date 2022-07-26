<template>
    <div v-if="usrLevel===1" class="wrapper">
        <h1>Users</h1>
        <div class="users">
            <div class="users-lable" v-if="windowWidth>767">
                    <div class="fullname">Name</div>
                    <div class="email">Email</div>
                    <div class="level">Level</div>
            </div>
            <ol class="users">
                <li class="user" v-for="user in users" :key="user.usr_id" >
                    <div class="user-container">
                        <div class="fullname">
                            {{user.usr_firstname}} {{user.usr_surname}}
                        </div>
                        <div class="email"><a :href="'mailto:'+user.usr_email">{{user.usr_email}}</a></div>
                        <div class="level">{{user.usr_level}}</div>
                    </div>
                </li>
            </ol>
            
        </div>
    </div>    
</template>

<script>
import axios from 'axios';

export default {
    props:['user', 'usrLevel', 'windowWidth'],
    data: function(){
        return{
            users: [],
        }
    },
    mounted(){
        if(this.usrLevel !== 1){
            this.$router.push('/');
        }
        axios.get('http://localhost:4000/admin/users').then((res) => {
            this.users = res.data.data;
        })
        window.scroll({
            top: 0,
            left: 0,
        });
    },
}
</script>

<style scoped>
.wrapper{
    margin: 100px auto 100px;
    width: 1170px;
}
h1{
    text-align: center;
    color: #000;
    margin: 100px auto 50px;
    padding: 0 10px 10px;
    width: max-content;
    border-bottom: 1px solid #d1aa68;
}
ol{
    margin: 0 auto;
    width: 630px;
}
.users-lable{
    margin: 0 auto;
    display: flex;
    width: 600px;
    text-align: left;
    font-weight: 600;
    padding: 10px;
    border-bottom: 0.5px solid black;
}
.user-container{
    margin: 0 auto;
    width: 610px;
    padding: 10px 5px;
    display: flex;
    list-style: decimal;
    border-bottom: 0.5px solid black;
}
.fullname{
    width: 230px;
    position: relative;
    overflow: hidden;
}
.email{
    width: 250px;
    overflow: hidden;
}
.level{
    width: 90px;
    text-align: center;
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
    ol, .users-lable, .users-container{
        width: max-content;
    }

}

@media screen and (max-width:767px){
    .wrapper{
        width: 95%;
    }
    ol{
        width: 100%;
        list-style: none;
    }
    .emial, .fullname, .level{
        padding: 1px 0;
        max-width: 100%;
        text-align: start;
    }
    .users-lable{
        display: none;
    }
    .user-container{
        display: block;
        width: 100%;
    }
}
</style>