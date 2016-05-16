
<template>
  <h3 class="main-header">
    <input type="text" class="title" v-model="questionnaire.title" placeholder="编辑问卷标题"></h3>
  <div class="main-body">
    <div class="question-topic" v-for="question in questionnaire.content">
      <b class="question-num">{{"Q"+($index+1)}}</b>
      <div class="question-content">
       <input type="text" v-model ="question.title" placeholder="编辑题目" >
        <div v-if="question.type==='textarea'">
          <textarea></textarea>
          <div class="question-required">
            <input type="checkbox" v-model="question.required">
            <b>此题是否必填</b>
          </div>
        </div>
        <ul class="question-options" v-else>
          <li v-for = "option in question.options">
            <input :type="question.type" disabled>
            <input type="text" v-model = "option.text" placeholder="编辑选项">
            <b class="delete-option" @click="deleteOption($index, question)">×</b>
          </li>
        </ul>
      </div>
      <ul class="clearfix">
        <li class="question-operate" @click="deleteQuestion($index)">删除</li>
        <li class="question-operate" @click="copyQuestion($index, question)">复用</li>
        <li class="question-operate" @click="downQuestion($index, question)" v-if="$index !== questionnaire.content.length-1">下移</li>
        <li class="question-operate" @click="upQuestion($index, question)" v-if="$index!==0">上移</li>
        <li class="question-operate" @click="addOption(question)" v-if="question.type !=='textarea'">添加选项</li>
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
    <div class="float-left">
      <p class="float-left">问卷截止日期:&nbsp;</p>
      <calendar :date.sync = "questionnaire.endTime"></calendar>
      <strong v-if="timeEarly">!选择日期早于当前日期</strong>
    </div>

    <div class="float-right">
      <a class="operate-btn" @click="save" v-link="'/home'">保存问卷</a>
      <a class="operate-btn" @click="pending">发布问卷</a>
    </div>
  </div>
  <pop-up :show.sync = "popup.show" :prompt="popup.prompt" :message = "popup.msg" :callback="popup.call"></pop-up>
</template>

<script>
  import '../css/edit.less'
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
          options: [{text: ''}, {text: ''}, {text: ''}, {text: ''}],
          type: type,
          required: false
        }
        switch (type) {
          case 'radio':
            question.options.length = 2
            break
          case 'textarea':
            question.options.length = 1
            break
        }
        this.questionnaire.content.push(question)
      },
      addOption (question) {
        question.options.push({text: ''})
      },
      deleteOption (index, question) {
        question.options.splice(index, 1)
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
        Vue.set(arr, index, arr.splice(index - 1, 1, question)[0])
      },
      downQuestion (index, question) {
        let arr = this.questionnaire.content
        Vue.set(arr, index, arr.splice(index + 1, 1, question)[0])
      },
      copyQuestion (index, question) {
        console.log(question)
        let q = {
          title: '',
          options: [],
          type: question.type
        }
        for (var i = 0; i < question.options.length; i++) {
          q.options.push({text: ''})
        }
        this.questionnaire.content.splice(index + 1, 0, q)
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
