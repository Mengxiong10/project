<style>

.v-header{
  font-size: 24px;
  height:54px;
  text-align: center;
}
.v-header>small{
  display: block;
  font-weight: 500;
}
.main-header a {
  position: absolute;
}
.v-question-topic{
padding: 16px 26px;
margin-bottom: 20px;
border: 1px solid #ccc;
position: relative;
}
.question-options li{
  height: 26px;
}
.v-footer{
  height: 130px;
  line-height: 130px;
  text-align: center;
}

.question-data{
  position: absolute;
  height: 100%;
  width: 50%;
  top:0;
  right: 0;
}


</style>


<template>
  <div class="main-header">
   <a><i class="iconfont">&#xe604;</i>返回</a>
    <h3 class="v-header">{{title}}<small>此统计分析只包含完整回收的数据</small></h3>
  </div>
  <div class="main-body">
    <div class="v-question-topic clearfix" v-for = "question in content">
      <b class="question-num">{{"Q"+($index+1)}}</b>
      <div class="question-content">
        <h4>{{question.title}}</h4>
        <ul class="question-options" >
          <li v-for = "option in question.options">{{option.text}}</li>
        </ul>
      </div>
      <div class="question-data">
        <canvas :id="'v-canvas'+$index"></canvas>
      </div>
    </div>
  </div>
  <div class="v-footer">
    <a href="" class="operate-btn"><i class="iconfont">&#xe604;</i>返回</a>
  </div>
</template>

<script>
import Store from '../store.js'
import Chart from './chart.js'
export default {
  data () {
    let serverData = Store.fetch()
    let id = +this.$route.params.id
    let data
    serverData.info.forEach((key, index) => {
      if (key.id === id) {
        data = serverData.info[index]
      }
    })
    return {
      title: data.title,
      content: data.content
    }
  },
  ready () {
    // var options = {
    //   title: '数据占比',
    //   type: 'bar',      //['bar','pie']默认pie
    //   canvas: document.querySelector('#kaka'),
    //   data: []
    // }
    this.content.forEach((key, index) => {
      let options = {
        title: '数据占比',
        type: 'bar',
        canvas: document.querySelector('#v-canvas' + index),
        data: key.options
      }
      Chart(options)
    })
  }
}

</script>
