

<template>
  <div style="display: inline-block;">
    <input type="text" class="date-input" placeholder="yyyy-mm-dd" v-model='date' @click.stop="showCalendar">
    <table class="calendar" v-show="show" @click.stop>
      <caption>
        <i class="icon-top"></i>
        <i class="icon-left" @click = 'lastMonth'></i>
        <b>{{monthText}}</b>
        <b>{{year}}</b>
        <i class="icon-right" @click = "nextMonth"></i>
      </caption>
      <thead>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
        <th>Sun</th>
      </thead>
      <tbody>
        <tr v-for = "week in calendar">
          <td v-for = "day in week" :class="{'not-current-month': day.month !== 0, 'selected-day':day.selectedDay}" @click ="selectDate(day)">{{day.text}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import '../css/calendar.less'
  import Extend from './extend.js'
  export default{
    props: ['date'],
    data () {
      return {
        show: false,
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
      }
    },
    computed: {
      monthText () {
        const monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        return monthArr[this.month]
      },
      calendar () {
        // 得到当月一号的星期
        let firstIndex = new Date(this.year, this.month, 1).getDay()
        // 重置星期一为0,星期日为6
        firstIndex = firstIndex === 0 ? 6 : firstIndex - 1
        // 得到上个月有多少天  day为0得到上个月的最后一天
        let lastMonthDays = new Date(this.year, this.month, 0).getDate()
        // 得到当月有多少天
        let nowDays = new Date(this.year, this.month + 1, 0).getDate()
        let arr = []
        for (let i = 0; i < 42; i++) {
          if (i >= firstIndex && i < firstIndex + nowDays) {
            arr[i] = {
              text: i - firstIndex + 1,
              month: 0,
              selectedDay: false
            }
          } else if (i < firstIndex) {
            arr[i] = {
              text: lastMonthDays - firstIndex + i + 1,
              month: -1,
              selectedDay: false
            }
          } else {
            arr[i] = {
              text: i - nowDays - firstIndex + 1,
              month: 1,
              selectedDay: false
            }
          }
        }
        // 当前选择天增加.selected-day
        if (firstIndex + this.day - 1 < 42) {
          arr[firstIndex + this.day - 1].selectedDay = true
        }
        // 分割日历数组为2维，渲染到日历
        arr = Extend.sliceArr(arr, 7)
        return arr
      }
    },
    methods: {
      lastMonth () {
        if (this.month === 0) {
          this.month = 11
          this.year --
        } else {
          this.month--
        }
      },
      nextMonth () {
        if (this.month === 11) {
          this.month = 0
          this.year ++
        } else {
          this.month ++
        }
      },
      selectDate (day) {
        this.date = Extend.format(new Date(this.year, this.month + day.month, day.text), 'YYYY-MM-DD')
        this.show = false
      },
      showCalendar () {
        this.show = true
        let ymd = this.date.match(/(\d+)\D+(\d+)\D+(\d+)/)
        if (ymd) {
          this.year = ymd[1] - 0
          this.month = ymd[2] - 1
          this.day = ymd[3] - 0
        }
      }
    },
    ready () {
      let _this = this
      document.addEventListener('click', function () {
        _this.show = false
      })
    }
  }
 </script>


