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
          <el-menu-item index="5" style="height:70px;margin:0 10px;"><router-link to="/nav">Community</router-link></el-menu-item>
          <el-menu-item index="6" style="height:70px;margin:0 10px;"><router-link to="/nav">Settings</router-link></el-menu-item>
     </el-menu>
    </el-col>
     <el-col :span="2">
    </el-col>
  </el-row>
</div>

<div class="listcontent">
          <ul class="list">
            <li v-for="item in list" :key="item.id">
              <i class="el-icon-s-flag"></i>
              <p @click="getContent(item.id)">{{item.title}}</p>
              <!-- <p>{{item.time}}</p> -->
              <p>{{item.author}}</p>
              
            </li>

          </ul>

          <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
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
      <h3>公告内容</h3>

      <h5>这里显示公告的具体内容,我也不知道要写些什么，这里显示公告的具体内容,我也不知道要写些什么，这里显示公告的具体内容,我也不知道要写些什么</h5>

    <el-button type="primary" @click="showModal = false" style="margin-bottom:1em;">确认</el-button>

    </div>
  </transition>



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
        list:[
          {
            id:0,
            title:'欢迎使用OnlineJudge...',
            time:'2019-11-21',
            author:'发布人'

          },
          {
            id:1,
            title:'在这里显示公告的内容，内容超出部分用省略号显示...',
            time:'2019-11-21',
            author:'发布人'

          },
          {
            id:2,
            title:'点击公告文字可以查看公告详情...',
            time:'2019-11-21',
            author:'发布人'

          },
          {
            id:3,
            title:'公告和比赛在这里发布...',
            time:'2019-11-21',
            author:'发布人'

          },
          {
            id:4,
            title:'在这里显示公告的内容，内容超出部分用省略号显示...',
            time:'2019-11-21',
            author:'发布人'

          },
          {
            id:5,
            title:'在这里显示公告的内容，内容超出部分用省略号显示...',
            time:'2019-11-21',
            author:'发布人'

          },
        {
            id:6,
            title:'欢迎使用OnlineJudge...',
            time:'2019-11-21',
            author:'发布人'

          },
          {
            id:7,
            title:'在这里显示公告的内容，内容超出部分用省略号显示...',
            time:'2019-11-21',
            author:'发布人'

          },
          {
            id:8,
            title:'点击公告文字可以查看公告详情...',
            time:'2019-11-21',
            author:'发布人'

          },
          {
            id:9,
            title:'公告和比赛在这里发布...',
            time:'2019-11-21',
            author:'发布人'

          },
          {
            id:10,
            title:'在这里显示公告的内容，内容超出部分用省略号显示...',
            time:'2019-11-21',
            author:'发布人'

          },
          {
            id:11,
            title:'在这里显示公告的内容，内容超出部分用省略号显示...',
            time:'2019-11-21',
            author:'发布人'

          }
        ],
        showModal: false,
        activeIndex: '2',
        note:{
          backgroundImage: "url(" + require("../../../../static/img/blog2.jpg") + ")",
        }
    
      };
    },
    mounted(){
       //列表
      this.$axios({
      method: 'get',
      url: "/api/Announcement/", 
      responseType: 'json'// 返回数据为json
    })
      .then(response => {
        console.log(response.data.data);
        // this.list =  response.data.data; // 成功的返回      
      })
      .catch(error => console.log(error, "error")); // 失败的返回

    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    getContent(key){
        console.log(key);
        this.centerDialogVisible = true;
        this.showModal = true;

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
    background-color:rgba(31,32,35,0.8);

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
   .listcontent{
       width: 100%;
       position: absolute;
       top:120px;
       bottom: 60px;
       left: 0;
       right: 0;
       display: flex;
       flex-direction: column;
       justify-content: center;
       padding: 0 12em;
       box-sizing: border-box;
  
       .list{
           position: relative;
           height: 75%;
          overflow-y:scroll;
          &::-webkit-scrollbar {display:none}
       }
       .page{
         margin-top:20px;
         display: flex;
         justify-content: flex-end;
       }
         li{
            list-style: none;
            height: 5em;
            border-bottom: 1px solid hsla(0,0%,73%,.5);
            display: flex;
            align-items: center;
            font-size: 16px;
            transition: color .5s ease;
            color: #fff;
                p:nth-child(2){
                margin-left: 20px;
                width: 65%;
                letter-spacing: 2px;
                font-family: 'Montserrat', sans-serif;
                line-height: 60px;
                font-size: 18px;
                cursor: pointer;
                }
                p:nth-child(3){
                width: 20%;
                }
                &:hover{
                   background-color:rgba(31,32,35,0.4);
                   font-size: 19px;
                }
       }
  .el-icon-s-flag{
    margin-left:20px;
    color:#409EFF;

  }
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
  line-height: 40px;
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
   .el-form-item__label{
    font-size: 18px;
}
</style>