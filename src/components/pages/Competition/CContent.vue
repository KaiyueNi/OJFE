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
          <!-- <el-menu-item index="5" style="height:70px;margin:0 10px;"><router-link to="/nav">Community</router-link></el-menu-item> -->
          <el-menu-item index="6" style="height:70px;margin:0 10px;"><router-link to="/nav">Judger</router-link></el-menu-item>
     </el-menu>
    </el-col>
     <el-col :span="2">
       <p style="color:white;cursor:pointer;" @click="loginout"><i class="el-icon-user" style="margin-right:10px;"></i>{{loginname}}</p>
    </el-col>
  </el-row>
</div>

<div class="listcontent">
    <div class="question">
          <div class="title">
            <p>整数问题</p>
            <p>难度：简单</p>

        </div>
        <div class="content">
            <p class="weight">题目描述</p>
            <p>给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。</p>
            <p class="weight">输入描述：</p>
            <P>描述</P>
            <p class="weight">输出描述：</p>
            <p>描述</p>
            <p class="weight">示例：</p>
            <p>输入: 120 输出: 21</p>

        </div>
      

    </div>
    <div class="answer">
        <div class="select">
            <el-dropdown>
                <span class="el-dropdown-link" style="color:black;">
                    请选择<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>python</el-dropdown-item>
                    <el-dropdown-item>c</el-dropdown-item>
                    <el-dropdown-item>c++</el-dropdown-item>
                    <el-dropdown-item disabled>java</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>

        <div class="coding">
            <codemirror v-model="content"
                ref="mycode"
                :value="curCode"
                :options="cmOptions"
                class="code">
            </codemirror>

        </div>

        <div class="result" >

            <div class="vresult" v-if="result">
                <p>结果：</p>
                <p>success</p>

                <el-button type="success"
                >查看详情</el-button>

            </div>

       

             <el-button type="danger"
              @click="openFullScreen"
             >提交</el-button>

        </div>

    </div>

</div>
</div>
</div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import "codemirror/theme/ambiance.css";  // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
import "codemirror/theme/base16-dark.css";  // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
import "codemirror/theme/eclipse.css";  // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
require("codemirror/mode/javascript/javascript") // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
require("codemirror/mode/python/python.js")
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/xml-fold.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/comment-fold.js')

  export default {
    name:'home',
    components:{
        codemirror

    },
    data() {
      return {
       loginname:'',
      result:false,
      curCode:'',
      code:'',
      content:'',
      cmOptions:{
          value:'',
          mode:"javascript",
          theme: "base16-dark",
          tabSize: 2,
          lineNumbers: true,
          lineWrapping: true,
          viewportMargin: Infinity,
          matchBrackets : true,
          autofocus: true,
          smartIndent: true,
          showCursorWhenSelecting:true,
          extraKeys: {'Ctrl': 'autocomplete'}
      },
    
        activeIndex: '4',
        note:{
          backgroundImage: "url(" + require("../../../../static/img/banner.jpg") + ")",
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
      openFullScreen(){
          this.result=true;

      },
      loginout(){

        if(this.$cookies.get('username')==null){
              this.$message({
                message: 'Please Login!',
                type: 'warning'
              });

        }else{
             this.$message({
                message: 'Please Go Back To HomePage!',
                type: 'warning'
              });
        }
      }

   
  
    }
  }
</script>
<style lang="less" scoped>
   .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
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
       top:150px;
       bottom: 60px;
       left: 0;
       right: 0;
       display: flex;
       justify-content: space-around;
       padding: 0 8em;
       box-sizing: border-box;

}

.question{
    width: 30%;
    height: 100%;
    background-color: rgba(255,255,255,0.8);
    border-radius: 5%;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding:1.5%; 
    box-sizing: border-box;
    padding-bottom: 2%;

    .content{
        width: 100%;
        height: 85%;
        border-radius: 3%;
        padding: 10px;
        box-sizing: border-box;
        // background-color: #fff;
        overflow-y: scroll;
         &::-webkit-scrollbar {display:none}
         line-height: 30px;
         font-size: 14px;
         .weight{
             font-weight: 600;
         }

    }
    .title{
        width: 100%;
        height: 13%;
        margin-bottom: 2%;
        line-height: 30px;
        padding: 10px;
        p:nth-child(1){
             font-weight: 600;
             font-size: 20px;
             font-family: 'Courier New', Courier, monospace;

        }
        p:nth-child(2){
            font-size: 14px;
        }


    }
}
.answer{
    width: 65%;
    height: 100%;
    background-color: rgba(255,255,255,0.8);
    padding: 20px;
    padding-top:10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .select{
        height: 7%;
        font-weight: 600;
    }

    .code{
        width: 100%;
    }
    .result{
        width: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .vresult{
            display: flex;
            align-items: center;
            margin-right: 10px;
            p:nth-child(1){
            font-weight: 600;
            margin: 0 10px;
            }
            p:nth-child(2){
                margin-right: 10px;
            }

        }
   
    }

}
 

</style>