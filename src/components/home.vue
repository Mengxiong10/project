
<template>
  <table class="q-table" v-if="questionnaires.length !== 0">
    <colgroup>
    <col>
    <col class="q-check">
    <col class="q-title">
    <col class="q-time">
    <col class="q-status">
    <col class="q-operate">
    <col></colgroup>
    <thead>
      <th></th>
      <th></th>
      <th>标题</th>
      <th>时间</th>
      <th>状态</th>
      <th>
        操作
        <a v-link="'/new'" class="q-new">
          <span>+</span>
          新建问卷
        </a>
      </th>
      <th></th>
    </thead>
    <tfoot>
      <td></td>
      <td>
        <input type="checkbox" id="checkall" class="q-option" v-model="checkAll">
        <i class="checkbox"></i>
      </td>
      <td>
        <label class ="q-checkall" for="checkall">全选</label>
        <a class="operate-btn" @click="deleteSelected">删除</a>
      </td>
    </tfoot>
    <tbody>
      <tr v-for="questionnaire in questionnaires" @click="check($index)">
        <td class="no-bottom"></td>
        <td>
          <input type="checkbox" class="q-option" v-model = "questionnaire.checked">
          <i class="checkbox"></i>
        </td>
        <td>
          <a v-link = "{name:'view', params:{id: questionnaire.id}}">{{questionnaire.title}}</a>
        </td>
        <td>{{questionnaire.time}}</td>
        <td :class="{'pending':questionnaire.status==='发布中'}">{{questionnaire.status}}</td>
        <td>
          <a class="operate-btn" v-link="{name: 'edit', params: {id: questionnaire.id}}" v-if="questionnaire.status==='未发布'" >编辑</a>
          <a class="operate-btn" v-else v-link = "{name:'view', params:{id: questionnaire.id}}">查看问卷</a>
          <a class="operate-btn" @click.stop="deleteQuestionnaire($index)">删除</a>
          <a class="operate-btn" v-link = "{name:'viewdata', params:{id: questionnaire.id}}">查看数据</a>
        </td>
        <td class="no-bottom"></td>
      </tr>
    </tbody>
  </table>
  <div class="add-q" v-else>
    <a v-link="'/new'" class="q-new">
      <span>+</span>
         新建问卷
   </a>
  </div>
  <pop-up :show.sync = "popup.show" :prompt="popup.prompt" :callback="popup.call" ></pop-up>
</template>

<script>
  import Store from '../store.js'
  import Popup from './popup.vue'
  import '../css/table.less'
  export default {
    components: {'pop-up': Popup},
    data () {
      let serverData = Store.fetch()
      return {
        questionnaires: serverData.info,
        allId: serverData.allId,
        popup: {
          show: false,
          prompt: '确认删除吗',
          call: function () {} // 确定按钮回调函数
        }
      }
    },
    computed: {
      checkAll: {
        get () {
          let i = 0
          this.questionnaires.forEach(function (key, index) {
            if (key.checked) { i++ }
          })
          return this.questionnaires.length === i
        },
        set (value) {
          this.questionnaires.forEach(function (key) {
            key.checked = value
          })
        }
      }
    },
    watch: {
      'questionnaires': function () {
        Store.save({allId: this.allId, info: this.questionnaires})
      }
    },
    methods: {
      deleteQuestionnaire (index) {
        // if (window.confirm('确认删除吗？')) {
        //   this.questionnaires.splice(index, 1)
        // }
        this.popup.show = true
        this.popup.call = () => {
          this.questionnaires.splice(index, 1)
        }
      },
      deleteSelected () {
        // if (window.confirm('确认删除吗？')) {
        //   this.questionnaires = this.questionnaires.filter((key, index) => {
        //     return !key.checked
        //   })
        // }
        this.popup.show = true
        this.popup.call = () => {
          this.questionnaires = this.questionnaires.filter((key, index) => {
            return !key.checked
          })
        }
      },
      check (index) {
        this.questionnaires[index].checked = !this.questionnaires[index].checked
      }
    }
  }
</script>
