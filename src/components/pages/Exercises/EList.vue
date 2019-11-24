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
          <el-menu-item index="4" style="height:70px;margin:0 10px;"><router-link to="/nav">Community</router-link></el-menu-item>
          <el-menu-item index="5" style="height:70px;margin:0 10px;"><router-link to="/nav">Settings</router-link></el-menu-item>
     </el-menu>
    </el-col>
     <el-col :span="2">
    </el-col>
  </el-row>
</div>

<div class="listcontent">
  <div class="tableli">


    <el-table
    :data="tableData"
    :row-style="tableRowStyle"
    :header-cell-style="tableHeaderColor"
    :cell-mouse-enter="handleMouseEnter"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
     
          <el-form-item label="题目描述">
            <span>{{ props.row.category }}</span>
          </el-form-item>
     
        </el-form>
      </template>
    </el-table-column>
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
      prop="name">
    </el-table-column>
    <el-table-column
      label="通过次数/总提交次数">
        <template slot-scope="props">
        <span style="margin-left: 10px">{{ props.row.desc }}</span>
        <span>/{{ props.row.per }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="难度">
        <template slot-scope="props">
          
          <el-button
          size="mini"
          type="success"
          v-if="props.row.degree == '简单'"
         >{{ props.row.degree}}</el-button>
          
          <el-button
          size="mini"
          type="danger"
          v-if="props.row.degree == '困难'"
         >{{ props.row.degree}}</el-button>

          <el-button
          size="mini"
          type="warning"
          v-if="props.row.degree == '中等'"
         >{{ props.row.degree}}</el-button>

      </template>
    </el-table-column>

        <el-table-column label="操作">
      <template slot-scope="props">
        <!-- <el-button
          size="mini"          
          type="primary"
          @click="handleEdit(props.$index, props.row)">查看题解</el-button> -->
        <el-button
          size="mini"
          type="primary"
          @click="handleSelect(props.$index, props.row)">解题</el-button>
      </template>
    </el-table-column>
      
 
  </el-table>
      
  </div>

</div>


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
           tableData: [
          {
          id: '12987122',
          name: '整数问题',
          category: '给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。',
          desc: '23',
          degree:'简单',
          per:'45'
        },
         {
          id: '12987123',
          name: '排序问题',
          category: '给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。',
          desc: '23',
          degree:'困难',
          per:'45'

        }, 
        {
          id: '12987125',
          name: '整数问题',
          category: '给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。',
          desc: '23',
          degree:'中等',
          per:'45'

        }, 
        {
          id: '12987126',
          name: '整数问题',
          category: '给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。',
          desc: '23',
          degree:'简单',
          per:'45'

        },
         {
          id: '12987123',
          name: '排序问题',
          category: '给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。',
          desc: '23',
          degree:'困难',
          per:'45'

        }, 
        {
          id: '12987125',
          name: '整数问题',
          category: '给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。',
          desc: '23',
          degree:'中等',
          per:'45'

        }, 
        {
          id: '12987126',
          name: '整数问题',
          category: '给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。',
          desc: '23',
          degree:'简单',
          per:'45'

        }
        ],
        activeIndex: '3',
        note:{
          backgroundImage: "url(" + require("../../../../static/img/homebg.jpg") + ")",
        }
    
      };
    },
    mounted(){

    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
       // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'background-color:transparent;height:80px;color:black;cursor: pointer;font-size:20px;}'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: rgba(227,227,227);color:black;font-weight: 600;height:60px;font-size;20px;'
      }
    },
       handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$router.push({
          path: '/EContent',
          query: {
            key
          }
        })
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
    color: #2f2d2e;
    color: black;


  }
  .el-menu--horizontal>.el-menu-item.is-active{
    color: black;

    background-color: transparent;
       font-size: 18px;


  }
  .el-menu--horizontal>.el-menu-item{
    color: #2f2d2e;
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
       bottom: 7em;
       left: 0;
       right: 0;
       display: flex;
       flex-direction: column;
       justify-content: center;
       padding: 0 13em;
       box-sizing: border-box;
         overflow-y:scroll;
       &::-webkit-scrollbar {display:none}
       .tableli{
         position: relative;
         height: 90%;
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




</style>