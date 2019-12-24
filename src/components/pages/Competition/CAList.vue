<template>
<div id="bg" :style="note">
<div id="coverbg">

<div style="width:100%;height:1px;"></div>
<div class="centerWidth" style="padding-top:35px;">
  <el-row>
     <el-col :span="22">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
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

<div class="listcontent">
          <ul class="list">
            <li v-for="item in list" :key="item.id">
              <i class="el-icon-trophy-1"></i>
              <p @click="getContent(item.id)">{{item.title}}</p>
              <p>{{item.created_time}}</p>
              <!-- <p>{{item.created_by}}</p> -->
              
            </li>

          </ul>

          <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="pagesize" 
            :total="NumOfProblems">
          </el-pagination>
          </div>

</div>

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
        dialogVisible:false,
        loginname:'',
        NumOfProblems:1,
        pagesize:1,
        currentPage:1,
        list:[
          {title:'暂无数据...'}
        ],
        activeIndex: '4',
        note:{
          backgroundImage: "url(" + require("../../../../static/img/banner.jpg") + ")",
        }
    
      };
    },
    mounted(){
      this.handlecompetitionlist();
      if(this.$cookies.get('username')==null){
        this.loginname = '请登录';
      }else{
        this.loginname = this.$cookies.get('username');
      }

    },
    methods: {
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

      },
      getContent(key){
          console.log(key);
          this.$router.push({
            path: '/CList',
            query: {
              key
            }
          })
      },
      handlecompetitionlist() {
            //比赛列表
          this.$axios({
          method: 'get',
          url: "/api/Contest/", 
          params:{
          page_id:this.currentPage,
          num_page:this.pagesize
          },
          responseType: 'json'// 返回数据为json
        })
          .then(response => {
            console.log(response.data.data);
            this.NumOfProblems = response.data.data.total_page;
            this.list =  response.data.data.list; // 成功的返回      
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
    // background-color:rgba(31,32,35,0.8);

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
                width: 50%;
                letter-spacing: 2px;
                font-family: 'Montserrat', sans-serif;
                line-height: 60px;
                font-size: 18px;
                cursor: pointer;
                }
                p:nth-child(3){
                width: 30%;
                }
                p:nth-child(4){
                width: 20%;
                }
              
                &:hover{
                   background-color:rgba(31,32,35,0.4);
                   font-size: 19px;
                }
       }
  .el-icon-trophy-1{
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