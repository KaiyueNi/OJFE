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
          <!-- <el-menu-item index="5" style="height:70px;margin:0 10px;"><router-link to="/">Community</router-link></el-menu-item> -->
          <el-menu-item index="6" style="height:70px;margin:0 10px;"><router-link to="/Settings">Judger</router-link></el-menu-item>
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
            <p>{{ptitle}}</p>
            <p>难度：{{pdifficulty}}</p>

        </div>
        <div class="content">
            <p class="weight">题目描述</p>
            <p>{{description}}</p>
            <p class="weight">输入描述：</p>
            <P>{{input_description}}</P>
            <p class="weight">输出描述：</p>
            <p>{{output_description}}</p>
            <p class="weight">示例：</p>
            <p>输入: {{pinput}}</p>
            <P>输出: {{poutput}}</P>
        </div>

    </div>
    <div class="answer">
        <div class="select">
          <p>语言：</p>
            <el-dropdown @command="handleCommand1">
                <span class="el-dropdown-link" style="color:black;">
                    {{language}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="c">c</el-dropdown-item>
                    <el-dropdown-item command="c++">c++</el-dropdown-item>
                    <el-dropdown-item command="java">java</el-dropdown-item>
                    <el-dropdown-item command="python">python</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          <p style="margin-left:10px;">主题：</p>
            <el-dropdown @command="handleCommand2">
                <span class="el-dropdown-link" style="color:black;">
                    {{theme}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command = "base16-dark">base16-dark</el-dropdown-item>
                    <el-dropdown-item command = "base16-light">base16-light</el-dropdown-item>
                    <el-dropdown-item command = "eclipse">eclipse</el-dropdown-item>
                    <el-dropdown-item command = "idea">idea</el-dropdown-item>
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
                <p>{{resultcode}}</p>
                <!-- <el-button type="success">查看详情</el-button> -->
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
import "codemirror/theme/base16-light.css";  // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
import "codemirror/theme/eclipse.css";  // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
import "codemirror/theme/idea.css";  // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
require("codemirror/mode/javascript/javascript") // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
require("codemirror/mode/python/python.js")
require("codemirror/mode/clike/clike.js")


  export default {
    name:'home',
    components:{
        codemirror

    },
    data() {
      return {
      path:'ws://47.101.167.9:5000/ws/Submission/admin/',
      resultcode:'判题中',
      socket:'',
      params:'',
      loginname:'',
      ptitle:'',
      pdifficulty:'',
      description:'',
      input_description:'',
      output_description:'',
      pinput:'',
      poutput:'',
      problem_id:'',
      language:'java',
      languageId:3,
      theme:'base16-dark',
      result:false,
      curCode:'',
      code:'',
      content:'',
      cmOptions:{
          value:'',
          mode:"python",
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
    
        activeIndex: '3',
        note:{
          backgroundImage: "url(" + require("../../../../static/img/banner.jpg") + ")",
        }
    
      };
    },
    mounted(){
      this.problem_id = this.$route.query.key;
      this.handleproblem();
        if(this.$cookies.get('username')==null){
        this.loginname = '请登录';
      }else{
        this.loginname = this.$cookies.get('username');
      }

    },
    methods: {
        init: function(){
            if(typeof(WebSocket) === "undefined"){
                this.$message({
                message: '您的浏览器不支持socket!',
                type: 'warning'
              });
            }else{
                // 实例化socket
                // this.path = this.path;

                this.socket = new WebSocket(this.path);

                // 监听socket连接
                this.socket.onopen = this.open;
                // 监听socket错误信息
                this.socket.onerror = this.error;
                //关闭连接
                // this.socket.onclose = this.close;
              
                // 监听socket消息
                this.socket.onmessage = this.getMessage;
                this.socket.onclose = this.close;

            
            }
      },
        open: function () {
            console.log("socket连接成功");
            this.socket.send(
              JSON.stringify({
                 'message': this.params
               })
            );
        },
        error: function () {
            console.log("连接错误");
        },
        getMessage: function (msg) {
          
          var coderesult = JSON.parse(msg.data);
            console.log(coderesult);

          var resultcode = coderesult.message.result;
          if(resultcode == 0){
            resultcode = "success";

          }else{
            resultcode = "error";
          }
          this.resultcode = resultcode;

        },
        close: function () {
          this.socket.close();
            console.log("socket已经关闭");
        },
        //发送代码
      openFullScreen(){
        this.result=true;
        this.resultcode = '判题中';
        if(this.$cookies.get('username')==null){
                this.$message({
                message: 'Please Login!',
                type: 'warning'
              });
        }else{
           this.params = JSON.stringify(
              {
                "problem": this.problem_id,
                "contest": 2, 
                "username": this.loginname, 
                "code": this.content, 
                "language": this.language, 
                "test":0
                });
          
            this.init();
          // this.result=true;

        }

      },
      handleCommand1(command) {
        // this.cmOptions.theme = command;
        this.language = command;
        if(this.language == 'c'){
          this.languageId = 1;

        }else if(this.language == 'c++'){
          this.languageId = 2;


        }else if(this.language == 'java'){
          this.languageId = 3;


        }else{
          this.languageId = 4;


        }
      },
      handleCommand2(command) {
        this.cmOptions.theme = command;
        this.theme = command;
      },
      handleproblem() {
        //问题内容
        this.$axios({
        method: 'get',
        url: "/api/Problem/"+this.problem_id, 
        responseType: 'json'// 返回数据为json
      })
      .then(response => {
          this.ptitle = response.data.data.title;
          this.pdifficulty = response.data.data.difficulty;
          this.description = response.data.data.description;
          this.input_description = response.data.data.input_description;
          this.output_description = response.data.data.output_description;
          this.pinput = response.data.data.input;
          this.poutput = response.data.data.output;

        })
      .catch(error => console.log(error, "error")); // 失败的返回
          
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
      },

    },
    destroyed(){
       // 销毁监听
      // this.socket = new WebSocket(this.path);

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
       bottom: 40px;
       left: 0;
       right: 0;
       display: flex;
       justify-content: space-around;
       padding: 0 6em;
       box-sizing: border-box;
}

.question{
    width: 30%;
    height: 100%;
    background-color: rgba(255,255,255,0.7);
    border-radius: 5%;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding:1%; 
    padding-bottom: 40px;
    box-sizing: border-box;
    padding-bottom: 2%;

    .content{
        width: 100%;
        height: 85%;
        border-radius: 3%;
        padding: 10px;
        padding-top: 0;
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
        // margin-bottom: 2%;
        line-height: 30px;
        padding: 10px;
        padding-bottom: 0;
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
    background-color: rgba(255,255,255,0.7);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .select{
        height: 7%;
        display: flex;
        align-items: center;
        p{
          font-weight: 600;
        }
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