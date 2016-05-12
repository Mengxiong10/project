<style>
  /**
 * 问卷编辑
 */
.main-header,.main-body{
  padding:34px 24px;
  border-bottom:2px solid #ccc;
}
.title{
  width: 100%;
  font-size: 22px;
  font-weight: bold;
  line-height:54px;
  text-align: center;
  border:0;
  outline: none;
  word-break:break-all;
}
.title:hover{
background: #fef1e8;
}
.add-question{
  text-align: center;
  border: 1px solid #cbcbcb;
}
.add-question-btn{
  font-size:137.5%;
  line-height:82px;
  background:#eee;
  cursor: pointer;
}
.add-question-btn>span{
  font-size: 160%;
  vertical-align: -4px;
  margin-right: 20px;
}
.question-type-transition{
  transition:all .5s ease;
  height: 64px;
  overflow: hidden;
}
.question-type-enter,.question-type-leave{
  height: 0;
}
.question-type-transition>button{
  margin: 15px;
  line-height: 32px;
  padding:0 22px;
  background:#eee;
  border: 1px solid #cbcbcb;
  outline: none;
  cursor: pointer;
}
.question-type-transition .iconfont{
  margin-right:10px;
}


/**
 * main-footer
 */
.main-footer{
  height: 136px;
}
.select-date{
  float: left;
  margin:32px 0 0 70px;
}
.select-date p{
  float: left;
  line-height:2em;
  margin-right: 1em;
}
.select-date strong{
  color:#f33;
}
.operate{
  float: right;
  margin: 38px 70px 0 0;
}
.operate .operate-btn{
  width:96px;
  margin-right: 20px;
}
/**
 * main-body
 */
.question-topic{
padding: 16px 26px;
}
.question-topic input[type='text']{
  border:0;
  outline: 0;
}
.question-topic:hover{
  background: #fdf1e6;
}
.question-num{
  float: left;
  margin-right: 14px;
}
.question-content{
  overflow: hidden;
  position: relative;
}
.question-options{
  margin-top: 12px;
  line-height:26px;
}
.question-operate>li{
  float: right;
  margin-left:16px;
  cursor: pointer;
  visibility: hidden;
}

.question-topic:hover .question-operate>li{
visibility: visible;
}
.question-content textarea{
  display: block;
  margin-top: 20px;
  width:540px;
  height: 100px;
  resize:none;
}
.question-required{
  position: absolute;
  top:0;
  right: 0;
}
.required{
  margin-right:12px;
}

</style>

<template>
  <h3 class="main-header">
    <input type="text" class="title" v-model="questionnaire.title" placeholder="编辑问卷标题"></h3>
  <div class="main-body">
    <div class="question-topic" v-for="question in questionnaire.content" track-by="$index">
      <div class="question-num">{{"Q"+($index+1)}}</div>
      <div class="question-content">
       <input type="text" v-model ="question.title" placeholder="编辑题目" >
        <textarea v-if="question.type==='textarea'"></textarea>
        <ul class="question-options" v-else>
          <li v-for = "option in question.options">
            <input :type="question.type" disabled>
            <input type="text" v-model = "option.text" placeholder="编辑选项">
          </li>
        </ul>
      </div>
      <ul class="question-operate clearfix">
        <li @click="deleteQuestion($index)">删除</li>
        <li @click="copyQuestion($index, question)">复用</li>
        <li @click="downQuestion($index, question)">下移</li>
        <li @click="upQuestion($index, question)">上移</li>
      </ul>
    </div>
    <div class="add-question">
      <div v-show = "show" transition="question-type" class="question-type">
        <button @click="addQuestion('radio')"> <i class="iconfont">&#xe602;</i>
          单选题
        </button>
        <button @click="addQuestion('checkbox')"> <i class="iconfont">&#xe601;</i>
          多选题
        </button>
        <button @click = "addQuestion('textarea')">
          <i class="iconfont">&#xe603;</i>
          文本题
        </button>
      </div>
      <div class="add-question-btn" @click = "addShow">
        <span>+</span>
        添加问题
      </div>
    </div>
  </div>
  <div class="main-footer">
    <div class="select-date">
      <p>问卷截止日期:</p>
      <calendar :date.sync = "questionnaire.endTime"></calendar>
      <strong v-if="timeEarly">!选择日期早于当前日期</strong>
    </div>

    <div class="operate">
      <a class="operate-btn" @click="save" v-link="'/home'">保存问卷</a>
      <a class="operate-btn" @click="pending">发布问卷</a>
    </div>
  </div>
  <pop-up :show.sync = "popup.show" :prompt="popup.prompt" :message = "popup.msg" :callback="popup.call"></pop-up>
</template>

<script>
  import Vue from 'vue'
  import Store from '../store.js'
  import Extend from './extend.js'
  import Popup from './popup.vue'
  import Calendar from './calendar.vue'
  export default {
    components: {'calendar': Calendar, 'pop-up': Popup},
    data () {
      let serverData = Store.fetch()
      return {
        questionnaire: {
          id: '',
          checked: false,
          title: '',
          time: '',
          endTime: '',
          status: '未发布',
          content: []
        },
        info: serverData.info,
        allId: serverData.allId,
        show: false, // 添加问题的按钮是否显示
        // 弹出层props
        popup: {
          show: false,
          prompt: '确认删除吗',
          msg: '',
          call: function () {}
        }
      }
    },
    computed: {
      timeEarly () {
        return Date.parse(this.questionnaire.endTime) - Date.now() < 0
      }
    },
    methods: {
      addShow () {
        this.show = !this.show
      },
      // 保存问卷
      save (event) {
        if (this.timeEarly) {
          event.preventDefault()
          return
        }
        this.questionnaire.time = Extend.format(new Date(), 'YYYY-MM-DD hh:mm:ss')
        // 新建页是添加数据，编辑页是保存数据
        if (this.$route.path === '/new') {
          this.questionnaire.id = ++this.allId
          this.info.push(this.questionnaire)
        } else {
          let id = +this.$route.params.id
          this.info.forEach((key, index) => {
            if (key.id === id) {
              this.questionnaire.id = key.id
              this.info[index] = this.questionnaire
            }
          })
        }
        Store.save({allId: this.allId, info: this.info})
        this.questionnaire = {}
      },
      // 发布问卷
      pending (event) {
        if (!this.questionnaire.endTime || this.timeEarly) {
          event.preventDefault()
          return
        }
        this.popup.show = true
        this.popup.prompt = '是否发布此问卷?'
        this.popup.msg = '(此问卷截止日期为' + this.questionnaire.endTime + ')'
        this.popup.call = () => {
          this.questionnaire.status = '发布中'
          this.save()
          this.$route.router.go('/home')
        }
      },
      /**
       * 添加问题
       * @param {['radio','checkbox','textarea']}
       */
      addQuestion (type) {
        let question = {
          title: '',
          options: [{text: ''}, {text: ''}],
          type: type
        }
        this.questionnaire.content.push(question)
      },
      deleteQuestion (index) {
        // if (window.confirm('确定删除吗？')) {
        //   this.questionnaire.content.splice(index, 1)
        // }
        this.popup.show = true
        this.popup.prompt = '确认删除吗？'
        this.popup.msg = ''
        this.popup.call = () => {
          this.questionnaire.content.splice(index, 1)
        }
      },
      upQuestion (index, question) {
        let arr = this.questionnaire.content
        if (index === 0) {
          return
        }
        Vue.set(arr, index, arr.splice(index - 1, 1, question)[0])
      },
      downQuestion (index, question) {
        let arr = this.questionnaire.content
        if (index === arr.length - 1) {
          return
        }
        Vue.set(arr, index, arr.splice(index + 1, 1, question)[0])
      },
      copyQuestion (index, question) {
        this.questionnaire.content.splice(index, 0, question)
      }
    },
    route: {
      data (transition) {
        let id = +transition.to.params.id
        this.info.forEach((key, index) => {
          if (key.id === id) {
            this.questionnaire = key
          }
        })
      }
    }
  }
</script>
