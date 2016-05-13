<style>
.q-table{
  width: 1040px;
  margin-left: -32px;
  text-align: left;
}
.spacing{
  width: 16px;
}
.questionnaire-check{
  width: 60px;
}
.questionnaire-title{
  width: 342px;
}
.questionnaire-time{
  width: 200px;
}
.questionnaire-status{
  width: 136px;
}
.questionnaire-operate{
  width: 270px;
}
.q-table th{
  height: 54px;
}
.q-table thead{
  background: #ddd;
}

.q-table td{
  height: 54px;
  border-bottom:1px solid #cacaca;
}

.q-table tbody tr:hover{
  background: #fcf0e5;
}

.new{
  position: absolute;
  margin:-4px 0 0 96px;
  width:6.857em;
  line-height:1.7143em;
  border: 1px solid #c26206;
  color:#fff;
  background: #e77408;
  text-align: center;
}
.new:hover{
  text-decoration: none;
}
.new>span{
  font-size: 1.666667em;
  vertical-align:-0.1em;
  margin-right: 0.18181em;
}

.checkbox{
    position: relative;
    top:4px;
    left: 10px;
    float: left;
    cursor: pointer;
}
.checkbox>span{
  float: right;
  margin-left:24px;
  line-height: 12px;

}
.checkbox:before,.checkbox:after{
  content: "";
  position: absolute;
  border-radius: 50%;
}
.checkbox:before{
    width: 12px;
    height: 12px;
    top:0;
    background:#d8d8d8;
    border: 1px solid #adadad;
}
.checkbox:after{
  width: 6px;
  height: 6px;
  top:4px;
  left:4px;
}
.q-option{
  visibility: hidden;
}
.q-option:checked+.checkbox:before{
 border: 1px solid #c5670d;
 background:#e77408;
}
.q-option:checked+.checkbox:after{
background: #fff;
}

.q-table tfoot td{
  vertical-align: top;
  padding-top: 14px;
}
.s-delete{
  margin-left: 16px;
}

/**
 * 发布中增加pending类
 * 第一个td增加no-bottom类
 */
.pending{
  color:#55e344;
}
.q-table .no-bottom{
  border:none;
}
</style>

<template>
  <table class="q-table">
    <colgroup>
    <col class="spacing">
    <col class="questionnaire-check">
    <col class="questionnaire-title">
    <col class="questionnaire-time">
    <col class="questionnaire-status">
    <col class="questionnaire-operate">
    <col class="spacing"></colgroup>
  <thead>
    <th></th>
    <th></th>
    <th>标题</th>
    <th>时间</th>
    <th>状态</th>
    <th>
      操作
      <a v-link="'/new'" class="new">
        <span>+</span>
        新建问卷
      </a>
    </th>
    <th></th>
  </thead>
  <tfoot>
    <td></td>
    <td colspan='2'>
      <input type="checkbox" id="checkall" class="q-option" v-model="checkAll">
      <label class="checkbox iconfont"
        for="checkall">
        <span>全选</span>
      </label>
      <a class="operate-btn s-delete" @click="deleteSelected">删除</a>
    </td>
  </tfoot>
  <tbody>
    <tr v-for="questionnaire in questionnaires" @click="check($index)">
      <td class="no-bottom"></td>
      <td>
        <input type="checkbox" :id="'list'+$index" class="q-option" v-model = "questionnaire.checked">
        <label class="checkbox" :for="'list'+$index"></label>
      </td>
      <td>
        <a href="">{{questionnaire.title}}</a>
      </td>
      <td>{{questionnaire.time}}</td>
      <td :class="{'pending':questionnaire.status==='发布中'}">{{questionnaire.status}}</td>
      <td>
        <a class="operate-btn" v-link="{name: 'edit', params: {id: questionnaire.id}}" v-if="questionnaire.status==='未发布'" >编辑</a>
        <a class="operate-btn" v-else>查看问卷</a>
        <a class="operate-btn" @click.stop="deleteQuestionnaire($index)">删除</a>
        <a class="operate-btn" v-link = "{name:'viewdata', params:{id: questionnaire.id}}">查看数据</a>
      </td>
      <td class="no-bottom"></td>
    </tr>
  </tbody>
</table>
<pop-up :show.sync = "popup.show" :prompt="popup.prompt" :callback="popup.call" ></pop-up>
</template>

<script>
  import Store from '../store.js'
  import Popup from './popup.vue'
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
