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

 <div style="display:flex;justify-content: flex-end;margin-bottom:20px;padding: 0 13em;">
    <el-button type="primary" @click="watchdata">查看统计</el-button>
    </div>
<div class="listcontent">
   
 
  <div class="tableli">

    <el-table
    :data="tableData"
    :row-style="tableRowStyle"
    :header-cell-style="tableHeaderColor"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
     
          <el-form-item label="性能指标">
            <span><span>memory:</span>{{ props.row.statistic_info.performanceindex.memory}}</span>
            <span style="margin-left:10px;"><span>time:</span>{{ props.row.statistic_info.performanceindex.time}}</span>
          </el-form-item>
        
          <el-form-item label="编译运行错误详细信息">

            <span>compile:{{ props.row.statistic_info.errordetails.compile}}</span>
            <span style="margin-left:10px;">runtime:{{ props.row.statistic_info.errordetails.runtime}}</span>

          </el-form-item>
     
        </el-form>
      </template>
    </el-table-column>
   
    <el-table-column
      label="提交ID">
        <template slot-scope="props">
        <span>{{ props.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="题目ID"
      prop="problem_id">
    </el-table-column>
     <el-table-column
      label="题目名称"
      prop="title">
    </el-table-column>
    <el-table-column
      label="所用语言"
       prop="language">
     
    </el-table-column>
    <el-table-column
      label="判题状态">
        <template slot-scope="props">
        <span style="margin-left: 10px">{{ props.row.statistic_info.solutionstate }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="运行结果">
        <template slot-scope="props">
        <span style="margin-left: 10px">{{ props.row.statistic_info.result}}</span>
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
  title="统计信息"
  :visible.sync="centerDialogVisible"
  width="45%"
  center>
  <div style="display:flex;">

    <div id="main" style="width: 400px;height: 300px;"></div>
    <div class="maintext">
        <p>Accepted:</p>
        <span>{{Accepted}}</span>
        <p>Failed:</p>
        <span>{{Failed}}</span>
    </div>
  </div>


  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>


</div>
</div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name:'settings',
    components:{

    },
    data() {
      return {
        Accepted:'0',
        Failed:'0',
        charts: '',
        opinion:['accepted','failed'],
        opinionData:[
                  {value:0, name:'accepted'},
                  {value:0, name:'failed'}
        ],
          centerDialogVisible: false,
          loginname:'',
          Cname:'',
          Cdiff:'',
          NumOfProblems:1,
          pagesize:1,
          currentPage:1,
          problem_list:'',
          tableData: [
              {
              id:'请先登录',
              problem_id:'',
              language:'',
              title:'',
              statistic_info:{
                  result:'',
                  solutionstate:'',
                  status:'',
                  errordetails:{
                      compile:'',
                      runtime:''
                  },
                  performanceindex:{
                      memory:'',
                      time:''

                  }
                 
              }
             }
          ],
        activeIndex: '6',
        note:{
          backgroundImage: "url(" + require("../../../../static/img/intro4.jpg") + ")",
        }
    
      };
    },
    mounted(){

      this.handleproblemlist();

    if(this.$cookies.get('username')==null){
        this.loginname = '请登录';
      }else{
        this.loginname = this.$cookies.get('username');
      }

    },
    methods: {
        watchdata(){

                this.centerDialogVisible = true;
                    this.$nextTick(function() {
                this.drawPie('main')
            })

        },
   
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
      //分页
      handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage); //点击第几页
                this.handleproblemlist();
      },
      handleproblemlist() {
                 //公告列表
          this.$axios({
          method: 'get',
          url: "/api/Account/stat", 
          responseType: 'json'// 返回数据为json
        })
          .then(response => {
            // console.log(response.data.data);
            this.opinionData = [
                {value:response.data.data.accepted, name:'accepted'},
                {value:response.data.data.failed, name:'failed'}

            ];
            this.Accepted = response.data.data.accepted;
            this.Failed = response.data.data.failed;
            var recent_submission = response.data.data.recent_submission;
            this.tableData = recent_submission;
            // console.log(recent_submission);

             // 成功的返回      
          })
          .catch(error => {
              console.log(error, "error");
                this.$message({
                message: 'Please Login!',
                type: 'warning'
              });

              
              }); // 失败的返回
          
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
          drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                 tooltip: {
                   trigger: 'item',
                   formatter: '{a}<br/>{b}:{c} ({d}%)'
                 },
                 legend: {
                   orient: 'vertical',
                   x: 'left',
                   data:this.opinion
                 },
                 series: [
                   {
                     name:'统计',
                     type:'pie',
                     radius:['50%','70%'],
                     avoidLabelOverlap: false,
                     label: {
                       normal: {
                         show: false,
                         position: 'center'
                       },
                       emphasis: {
                         show: true,
                         textStyle: {
                           fontSize: '60',
                           fontWeight: 'blod'
                         }
                       }
                     },
                     labelLine: {
                       normal: {
                         show: false
                       }
                     },
                     data:this.opinionData,
                                  itemStyle: {
                            
                                normal:{
                                    color:function(params) {
                                    //自定义颜色
                                    var colorList = [          
                                            '#409EFF', '#F56C6C'
                                        ];
                                        return colorList[params.dataIndex]
                                     }
                                }
                          }
                  

                   }
                 ]
               })
            }

  

    },

       
  }
</script>
<style lang="less" scoped>
.maintext{
    p{
        font-weight: 600;
        font-size: 18px;
        margin: 10px 0;
    }
    span{
        font-size: 18px;
    }
}

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
       top:160px;
       bottom: 3em;
       left: 0;
       right: 0;
    //    display: flex;
    //    flex-direction: column;
    //    justify-content: center;
       padding: 0 13em;
       box-sizing: border-box;
         overflow-y:scroll;
       &::-webkit-scrollbar {display:none}
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

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
    font-weight: 600;
  }



</style>