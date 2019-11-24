<template>
  <div class="hello">

          <pre v-highlight>
            <code class="lang-javascript">
                
              <div>
                {{msg}}

              </div>

            </code>
        </pre>

<codemirror v-model="content"
      ref="mycode"
      :value="curCode"
      :options="cmOptions"
      class="code">
 </codemirror>

 <button @click="getcode()">点击</button>

 




   
  </div>
</template>



<script>

import { codemirror } from 'vue-codemirror'
import "codemirror/theme/ambiance.css";  // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
import "codemirror/theme/base16-dark.css";  // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
import "codemirror/theme/eclipse.css";  // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
require("codemirror/mode/javascript/javascript"); // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
require("codemirror/mode/python/python.js")
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/xml-fold.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/comment-fold.js')



export default {
  name: 'HelloWorld',
  comments:{
    codemirror
  },
  data () {
    return {
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

      msg: 'for i in range(1,5):for j in range(1,5):for k in range(1,5):'
         
    }
  },
  mounted(){
 

  },
  computed:{
     codemirror() {
      return this.$refs.mycode.codemirror
    }

  
     

  },
  methods:{
    getcode(){
      console.log(this.content);
      console.log(typeof(this.content));
    }
   
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.code{
  width: 500px;
  border: 1px solid black;
}
body{
  background-color: burlywood;
}
#codepad{
  width: 200px;
  height: 200px;
}
</style>
