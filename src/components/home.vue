<template>
<div id="bg" :style="note">
<div id="coverbg">

<div style="width:100%;height:1px;"></div>
<div class="centerWidth" style="padding-top:35px;">
  <el-row>
     <el-col :span="22">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" style="height:70px;margin:0 10px;margin-left:100px;"><router-link to="/">Home</router-link></el-menu-item>
          <el-menu-item index="2" style="height:70px;margin:0 10px;"><router-link to="/AList">Annoncement</router-link></el-menu-item>
          <el-menu-item index="3" style="height:70px;margin:0 10px;"><router-link to="/EList">Exercises</router-link></el-menu-item>
          <el-menu-item index="4" style="height:70px;margin:0 10px;"><router-link to="/CAList">Competition</router-link></el-menu-item>
          <el-menu-item index="5" style="height:70px;margin:0 10px;"><router-link to="/Community">Community</router-link></el-menu-item>
          <el-menu-item index="6" style="height:70px;margin:0 10px;"><router-link to="/Settings">Judger</router-link></el-menu-item>
     </el-menu>
    </el-col>
     <el-col :span="2">
       <p style="color:white;cursor:pointer;" @click="loginout"><i class="el-icon-user" style="margin-right:10px;"></i>{{loginname}}</p>
    </el-col>
  </el-row>
</div>

<div class="title">

<div class="centerTitle" style="padding-top:40px;">
  <h1 class="white-text">Welcome to Online Judge</h1>
</div>
<div class="centerTitle">
  <p class="textstyle">OnlineJudge is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.</p>
</div>

<div class="centerTitle" style="margin-top:50px;">
   <el-button style="width:165px;height:50px;font-family: inherit;"  @click="showModal = true" >Register</el-button>
  <el-button style="width:165px;height:50px;font-family: inherit;" type="primary" @click="showLogin = true">Login</el-button>
</div>

</div>


 <transition name="fade" appear>
    <div class="modal-overlay" 
         v-if="showModal" 
         @click="showModal = false"></div>
</transition>
  <transition name="pop" appear>
    <div class="modal" 
         role="dialog" 
         v-if="showModal"
         >
      <h3>Register</h3>

      <el-form :label-position="labelPosition" label-width="80px" :model="register">
        <el-form-item label="Username">
            <el-input v-model="register.name"></el-input>
        </el-form-item>
        <el-form-item label="Password">
            <el-input v-model="register.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="Email">
            <el-input v-model="register.Email"></el-input>
        </el-form-item>
        </el-form>

        <el-button type="success" @click="registerConfirm" style="width:22em;margin-bottom:1em;">Register</el-button>

    </div>
  </transition>


   <transition name="fade" appear>
    <div class="modal-overlay" 
         v-if="showLogin" 
         @click="showLogin = false"></div>
</transition>
  <transition name="pop" appear>
    <div class="modal" 
         role="dialog" 
         v-if="showLogin"
         >
      <h3>Login</h3>

      <el-form :label-position="labelPosition" label-width="80px" :model="login">
        <el-form-item label="Username">
            <el-input v-model="login.name"></el-input>
        </el-form-item>
        <el-form-item label="Password">
            <el-input v-model="login.password" show-password></el-input>
        </el-form-item>
       
        </el-form>

        <el-button type="primary" @click="loginoj" style="width:22em;margin-bottom:1em;">Login</el-button>

    </div>
  </transition>

  <el-dialog
  title="Logout"
  :visible.sync="dialogVisible"
  width="30%">
  <span>Confirm Logout?</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogout">Confirm</el-button>
  </span>
</el-dialog>


<!-- <div class="centerWidth" style="position:absolute;width:70%;bottom:20px;">
  <div class="footer">
    <p>
      Copyright &copy; 2019 Online Judge . Created by ojteam /  More Actions <a href="https://mail.163.com/" target="_blank" title="联系我们">联系我们</a>
    </p>
  </div>
</div> -->
</div>
</div>
</template>

<script>
  export default {
    name:'home',
    components:{

    },
    data() {
      return {
        dialogVisible: false,
        loginname:'请登录',
        register: {
          name: '',
          password: '',
          Email: ''
        },
        login: {
          name: '',
          password: ''
        },
        labelPosition:'left',
        showModal: false,
        showLogin:false,
        activeIndex: '1',
        note:{
          backgroundImage: "url(" + require("../../static/img/dash-bg-01.jpg") + ")",
          }
    
      };
    },
    mounted(){
    
      if(this.$cookies.get('username')==null){
        this.loginname = '请登录';
      }else{
        this.loginname = this.$cookies.get('username');
      }
   
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      registerConfirm(){
        if(this.register.name==''||this.register.password==''||this.register.Email==''){
          this.$message.error('Incomplete information!');
        }else{

           var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
           if(!regEmail.test(this.register.Email)){
            this.$message.error('Error Email!');

           }else{

        this.showModal = false;

        this.$axios({
        method: 'post',
        url: "/api/Account/register", 
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:{
            username:this.register.name,
            password:this.register.password,
            email:this.register.Email
        },
        responseType: 'json'// 返回数据为json
      })
      .then(response => {
          console.log(response.data);

          if(response.data.error_code==0){
                this.$message({
                message: 'Register Succeeded!',
                type: 'success'
              });
               
          }else{
            this.$message.error('Register Error!');
          }
    
        })
      .catch(error => console.log(error, "error")); // 失败的返回

        }
      }


      },
      loginoj(){
        if(this.login.name==''||this.login.password==''){
            this.$message.error('Incomplete information!');
        }else{

        this.$axios({
        method: 'post',
        url: "/api/Account/login", 
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:{
            username:this.login.name,
            password:this.login.password
        },
        responseType: 'json'// 返回数据为json
      })
      .then(response => {
          console.log(response.data);

          if(response.data.status==0){
                this.$message({
                message: 'Login Succeeded!',
                type: 'success'
              });
              this.loginname = this.login.name;
              this.$cookies.set('username',this.login.name);
              this.showLogin = false;
               
          }else{
            this.$message.error('Login Error!');
          }
    
        })
      .catch(error => console.log(error, "error")); 
      }// 失败的返回
      },

      loginout(){
        if(this.$cookies.get('username')==null){
              this.$message({
                message: 'Please Login!',
                type: 'warning'
              });

        }else{
          this.dialogVisible = true;
        }
      },
      dialogout(){
        this.$axios({
        method: 'get',
        url: "/api/Account/logout", 
        responseType: 'json'// 返回数据为json
      })
      .then(response => {
          console.log(response.data);
          if(response.data.status == 0){
            this.$cookies.remove("username");
            this.loginname = '请登录';
            this.dialogVisible = false;
            this.$message({
                message: 'Logout Succeeded!',
                type: 'success'
              });
          }

        })
      .catch(error => console.log(error, "error")); // 失败的返回

      }
    }
  }
</script>
<style lang="less" scoped>
  #bg{
    margin:0;
    padding:0;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background-size: cover;
  }
  #coverbg{
    width: 100%;
    height: 100%;
    background-color:rgba(31,32,35,0.7);

  }
  .el-menu{
    background-color: transparent;
  }
  .el-menu--horizontal{
      border-bottom: none;
    }
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover{
    background-color: transparent;
    color: #fff;
  }
  .el-menu--horizontal>.el-menu-item.is-active{
    color: #fff;
    background-color: transparent;
       font-size: 18px;

  }
  .el-menu--horizontal>.el-menu-item{
    color: #c1c1c1;
    font-weight: 600;

  }
  
 .el-menu--horizontal>.el-submenu .el-submenu__title{
   margin:0 10px;
   height: 70px;
}
   .el-menu--horizontal>.el-menu-item a{
       font-size: 18px;
   }
   .title{
       width: 100%;
       position: absolute;
       top:105px;
       bottom: 105px;
       left: 0;
       right: 0;
       display: flex;
       flex-direction: column;
       justify-content: center;
   }
   .centerTitle{
     display: flex;
     justify-content: center;
   }
   .white-text{
     text-transform: uppercase;
     color: #fff;
     font-size: 54px;
     font-family: 'Montserrat', sans-serif;
     font-weight: 700px;
   }
   .textstyle{
     color: #fff;
     font-size: 18px;
   }

   .modal {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
//   width: fit-content;
  height: fit-content;
  max-width: 32em;
//   max-height: 22em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #FFF;
  z-index: 999;
  transform: none;
}
.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
//   background: #2c3e50;
//   opacity: 0.8;
  cursor: pointer;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}

// .footer{
//      height: 60px;
//      p{
//         height: 22px;
//         background-color: rgba(0, 0, 0, 0.2);
//         color:#fff;
//         width:60%;
//         padding:10px;
//         a{
//           color:#0056b3;
//         }
//      }
//    }

   .el-form-item__label{
    font-size: 18px;
}
</style>