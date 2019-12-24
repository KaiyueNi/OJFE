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
  <div class="descriptioncss">
  <h3>比赛：</h3>
  <p>{{Cname}}</p>
  <h3>难度：</h3>
  <p>{{Cdiff}}</p>
  </div>
 
  <div class="tableli">

    <el-table
    :data="tableData"
    :row-style="tableRowStyle"
    :header-cell-style="tableHeaderColor"
      height="460"
    >
    <!-- <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
     
          <el-form-item label="题目描述">
            <span>{{ props.row.description }}</span>
          </el-form-item>
     
        </el-form>
      </template>
    </el-table-column> -->
    <el-table-column
      label="题目ID"
      prop="id">
        <template slot-scope="props">
        <i class="el-icon-s-order"></i>
        <span style="margin-left: 10px">{{ props.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="题目名称"
      prop="title">
    </el-table-column>
    <!-- <el-table-column
      label="通过次数/总提交次数">
        <template slot-scope="props">
        <span style="margin-left: 10px">{{ props.row.accepted_number }}</span>
        <span>/{{ props.row.submission_number }}</span>
      </template>
    </el-table-column> -->
<!--    
    <el-table-column
      label="难度">
        <template slot-scope="props">
          
          <el-button
          size="mini"
          type="success"
          v-if="props.row.difficulty == '简单'"
         >{{ props.row.difficulty}}</el-button>
          
          <el-button
          size="mini"
          type="danger"
          v-if="props.row.difficulty == '困难'"
         >{{ props.row.difficulty}}</el-button>

          <el-button
          size="mini"
          type="warning"
          v-if="props.row.difficulty == '中等'"
         >{{ props.row.difficulty}}</el-button>

      </template>
    </el-table-column> -->

        <el-table-column label="操作">
      <template slot-scope="props">
        <el-button
          size="mini"
          type="primary"
          @click="handleSelect(props.row.id, props.row)">解题</el-button>
      </template>
    </el-table-column>
      
 
  </el-table>
      
  </div>

  <!-- <div class="block">
  <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize" 
            :total="NumOfProblems">
  </el-pagination>
  </div> -->

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
          Cname:'暂无比赛',
          Cdiff:'暂无',
          NumOfProblems:1,
          pagesize:1,
          currentPage:1,
          problem_list:'',
          tableData: [],
        activeIndex: '4',
        note:{
          backgroundImage: "url(" + require("../../../../static/img/intro4.jpg") + ")",
        }
    
      };
    },
    mounted(){
      this.problem_list = this.$route.query.key;

      this.handleproblemlist();

         if(this.$cookies.get('username')==null){
        this.loginname = '请登录';
      }else{
        this.loginname = this.$cookies.get('username');
      }

    },
    methods: {
   
       // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'background-color:rgba(255,255,255,0.3);height:80px;color:black;cursor: pointer;font-size:18px;}'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: rgba(227,227,227);color:black;font-weight: 600;height:60px;font-size;20px;'
      }
    },
    handleSelect(key, keyPath) {
        this.$router.push({
          path: '/CContent',
          query: {
            key
          }
        })
      },
      //分页
      handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage); //点击第几页
                this.handleproblemlist();
      },
      handleproblemlist() {
        //问题列表
        this.$axios({
        method: 'get',
        url: "/api/Contest/"+this.problem_list, 
        // params:{
        //   NumberOfPages:this.currentPage,
        //   DataPerPage:this.pagesize
        // },
        responseType: 'json'// 返回数据为json
      })
      .then(response => {
          console.log(response.data);
          // this.NumOfProblems = response.data.data.NumOfProblems;
          this.Cname = response.data.data.title;
          this.Cdiff = response.data.data.difficulty;
          this.tableData =  response.data.Problem_list; // 成功的返回      
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

.colorstyle{
  color: black;
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
    // background-color:rgba(65,66,70,0.5);

  }
  .el-menu{
    background-color: transparent;
  }
  .el-menu--horizontal{
      border-bottom: none;
    }
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover{
    background-color: transparent;
    color: #2f2d2e;
    color: black;
    color: #fff;



  }
  .el-menu--horizontal>.el-menu-item.is-active{
    color: black;
    color: #fff;
    background-color: transparent;
    font-size: 18px;


  }
  .el-menu--horizontal>.el-menu-item{
    color: #2f2d2e;
    font-weight: 600;
    color: #c1c1c1;
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
       bottom: 3em;
       left: 0;
       right: 0;
      //  display: flex;
      //  flex-direction: column;
      //  justify-content: center;
       padding: 0 13em;
       box-sizing: border-box;
      //    overflow-y:scroll;
      //  &::-webkit-scrollbar {display:none}
       .tableli{
         position: relative;
         height: 500px;
          .el-table__body tr.hover-row>td{
          background-color: #212e3e !important;
          }
       }

   }


.el-form-item__label{
    font-size: 18px;
}

.el-table, .el-table__expanded-cell{
    background-color: transparent;
    // color: #fff;

}
.el-table::before{
    background-color: transparent;
}

.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #212e3e !important;
}
.block{

  color: white;
  display: flex;
  justify-content: flex-end;
 

}
.descriptioncss{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  p{
    margin-right: 20px;
    font-weight: 600;
  }

}



</style>