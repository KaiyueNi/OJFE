<template>
    <div>
        <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply Tiezi">
            <el-avatar class="header-img" :size="40" :src="myHeader">
                        <i class="el-icon-user"></i>

            </el-avatar>
            <div class="reply-info " >
                <div 
                tabindex="0" 
                contenteditable="true" 
                id="replyInput" 
                spellcheck="false" 
                placeholder="发表帖子..." 
                class="reply-input" 
                @focus="showReplyBtn"  
                @input="onDivInput($event)"
                >
                </div>
            </div>
            <div class="reply-btn-box" v-show="btnShow">
                <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表帖子</el-button>
            </div>
        </div>
        <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
            <el-avatar class="header-img" :size="40" :src="item.headImg">
                        <i class="el-icon-user"></i>

            </el-avatar>
            <div class="author-info">
                <span class="author-name">{{item.name}}</span>
                <span class="author-time">{{item.time}}</span>
            </div>
            <div class="icon-btn">
                <!-- <span @click="showReplyInput(i,item.name,item.id)"><i class="iconfont el-icon-s-comment"></i>{{item.commentNum}}</span> -->
                <span @click="showReplyInput(i,item.name,item.id)"><i class="iconfont el-icon-s-comment"></i></span>

                <!-- <i class="iconfont el-icon-caret-top"></i>{{item.like}} -->
            </div>
            <div class="talk-box">
                <p>
                    <span class="reply">{{item.comment}}</span>
                </p>
            </div>
            <div class="reply-box">
                <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
                    <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg">
                        <i class="el-icon-user"></i>
                    </el-avatar>
                    <div class="author-info">
                        <span class="author-name">{{reply.from}}</span>
                        <span class="author-time">{{reply.time}}</span>
                    </div>
                    <div class="icon-btn">
                        <!-- <span @click="showReplyInput(i,reply.from,reply.id)"><i class="iconfont el-icon-s-comment"></i>{{reply.commentNum}}</span> -->
                        <span @click="showReplyInput(i,reply.from,reply.id)"><i class="iconfont el-icon-s-comment"></i></span>

                        <!-- <i class="iconfont el-icon-caret-top"></i>{{reply.like}} -->
                    </div>
                    <div class="talk-box">
                        <p>
                            <span>回复 {{reply.to}}:</span>
                            <span class="reply">{{reply.comment}}</span>
                        </p>
                    </div>
                    <div class="reply-box">

                    </div>
                </div>
            </div>
            <div  v-show="_inputShow(i)" class="my-reply my-comment-reply">
                <el-avatar class="header-img" :size="40" :src="myHeader">
                        <i class="el-icon-user"></i>

                </el-avatar>
                <div class="reply-info" >
                    <div tabindex="0" contenteditable="true" spellcheck="false" :placeholder="to_placehoder"   @input="onDivInput($event)"  class="reply-input reply-comment-input"></div>
                </div>
                <div class=" reply-btn-box">
                    <el-button class="reply-btn" size="medium" @click="sendCommentReply(i)" type="primary">发表评论</el-button>
                    <el-button class="reply-btn" size="medium" @click="deleteCommentReply(i)" style="margin-right:10px;">取消评论</el-button>

            </div>
        </div>
        </div>
    </div>
</template>

<script>
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
    function documentHandler(e) {
    // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
            return false;
        }
    // 判断指令中是否绑定了函数
        if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
        }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
    name:'comment',
    data(){
        return{
            to_placehoder:'',
            btnShow: false,
            index:'0',
            replyComment:'',
            myName:'admin',
            myHeader:'',
            myId:19870621,
            to:'',
            toId:-1,
            comments:[
                {
                    name:'admin',
                    id:19870621,
                    headImg:'',
                    comment:'我的代码出bug了，谁来帮帮我？',
                    time:'2019年11月16日 18:43',
                    commentNum:2,
                    inputShow:false,
                    reply:[
                        {
                            from:'user',
                            fromId:19891221,
                            fromHeadImg:'',
                            to:'admin',
                            toId:19870621,
                            comment:'哪一题？',
                            time:'2019年11月16日 18:56',
                            commentNum:0,
                            inputShow:false
                        },
                        {
                            from:'user2',
                            fromId:1123,
                            fromHeadImg:'',
                            to:'admin',
                            toId:19870621,
                            comment:'我可以看看你的代码吗？',
                            time:'2019年12月10日 12:43',
                            commentNum:0,
                            inputShow:false

                        }
                    ]
                },
                {
                    name:'admin',
                    id:19891221,
                    headImg:'',
                    comment:'求题目5解法',
                    time:'2019年11月16日 18:47',
                    commentNum:1,
                    inputShow:false,
                    reply:[
                        {
                            from:'user',
                            fromId:19870621,
                            fromHeadImg:'',
                            to:'admin',
                            toId:19891221,
                            comment:'同求',
                            time:'2019年11月16日 19:33',
                            commentNum:0,
                            inputShow:false

                        }
                    ]
                },
                {
                    name:'user',
                    id:20190830,
                    headImg:'',
                    comment:'求一起刷题的小伙伴',
                    time:'2019年12月10日 10:43',
                    commentNum:0,
                    like:5,
                    inputShow:false,
                    reply:[]
                },
            ]
        }
    },
    directives: {clickoutside},
    methods: {
        inputFocus(){
            var replyInput = document.getElementById('replyInput');
            replyInput.style.padding= "8px 8px"
            replyInput.style.border ="2px solid darkgray"
            replyInput.focus()
        },  
        showReplyBtn(){
            this.btnShow = true
        },
        hideReplyBtn(){
            this.btnShow = false
            replyInput.style.padding= "10px"
            replyInput.style.border ="none"
        },
        showReplyInput(i,name,id){
            this.comments[this.index].inputShow = false
            this.index =i
            this.comments[i].inputShow = true
            this.to = name
            this.toId = id
            this.to_placehoder = '回复'+name+':'
        },
        deleteCommentReply(i){
            this.comments[i].inputShow = false
        },
        _inputShow(i){
            return this.comments[i].inputShow 
        },
        sendComment(){
            if(!this.replyComment){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                let a ={}
                let input =  document.getElementById('replyInput')
                let timeNow = new Date().getTime();
                let time= this.dateStr(timeNow);
                a.name= this.myName
                a.comment =this.replyComment
                a.headImg = this.myHeader
                a.time = time
                a.commentNum = 0
                a.like = 0
                this.comments.push(a)
                this.replyComment = ''
                input.innerHTML = '';

            }
        },
        sendCommentReply(i){
            if(!this.replyComment){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                let a ={}
                let timeNow = new Date().getTime();
                let time= this.dateStr(timeNow);
                a.from= this.myName
                a.to = this.to
                a.fromHeadImg = this.myHeader
                a.comment =this.replyComment
                a.time = time
                a.commentNum = 0
                a.like = 0
                this.comments[i].reply.push(a)
                this.replyComment = ''
                document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
                this.comments[i].inputShow = false
            }
        },
        onDivInput: function(e) {
            this.replyComment = e.target.innerHTML;
        },
        dateStr(date){
            //获取js 时间戳
            var time=new Date().getTime();
            //去掉 js 时间戳后三位，与php 时间戳保持一致
            time=parseInt((time-date)/1000);
            //存储转换值 
            var s;
            if(time<60*10){//十分钟内
                return '刚刚';
            }else if((time<60*60)&&(time>=60*10)){
                //超过十分钟少于1小时
                s = Math.floor(time/60);
                return  s+"分钟前";
            }else if((time<60*60*24)&&(time>=60*60)){ 
                //超过1小时少于24小时
                s = Math.floor(time/60/60);
                return  s+"小时前";
            }else if((time<60*60*24*30)&&(time>=60*60*24)){ 
                //超过1天少于30天内
                s = Math.floor(time/60/60/24);
                return s+"天前";
            }else{ 
                //超过30天ddd
                var date= new Date(parseInt(date));
                return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
            }
        }
    },    
}
</script>

<style lang="less" scoped>

.my-reply{
    padding:10px;
    background-color:#fafbfc;
    margin-bottom: 30px;
    .header-img{
        display:inline-block;
        vertical-align:top;
    }

    .reply-info{

        display:inline-block;
        margin-left:5px;
        width:90%;
        @media screen and (max-width:1200px) {
            width:80%;
        }
        .reply-input{

            min-height:20px;
            line-height:22px;
            padding:10px 10px;
            color:#ccc;
            background-color:#fff;
            border-radius:5px;
            &:empty:before{
                content:attr(placeholder);
            }

            &:focus:before{
                content:none;
            }

            &:focus{

                padding:8.4px 8px;
                border:2px solid darkgray;
                box-shadow:none;
                outline:none;
            }
        }

    }   

    .reply-btn-box{

        height:25px;
        margin:10px 0;
        .reply-btn{
            position:relative;
            float:right;
        }
    }


}
.Tiezi{
    // background-color: aqua;
    // height: 50px;
    border-bottom: 2px solid rgba(178,186,194,.3);
}
.my-comment-reply{

    margin-left:50px;
    .reply-input{

        width:flex;
    }

}

.author-title:not(:last-child){

    border-bottom: 1px solid rgba(178,186,194,.3);
}

.author-title{

    padding:10px;
    .header-img{
        display:inline-block;
        vertical-align:top;
    }
        
    .author-info{

        display:inline-block;
        margin-left:5px;
        width:60%;
        height:40px;
        line-height:20px;
        >span{

            display:block;
            cursor:pointer;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
        }

        .author-name{

            color:#000;
            font-size:18px;
            font-weight:bold;
        }

        .author-time{
            font-size:14px;

        }
    }

}

    .icon-btn{
        width:30%;
        padding:0 !important;
        float:right;
        @media screen and (max-width : 1200px){
            width:20%;
            padding:7px;
        }
        >span{
            cursor:pointer;
            float: right;

        }
        .iconfont{
            margin:0 5px;
        }
        .redLike{
            color:red;
        }
    }

    .talk-box{
        margin:0 50px;
        >p{
           margin:0;

        }
        .reply{
            font-size:16px;
            color:#000;

        }

    }
        
    .reply-box{
        margin:10px 0 0 50px;
        background-color:#efefef;
    }
        
</style>