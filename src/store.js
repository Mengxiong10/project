const key = 'form'

if (!window.localStorage.getItem(key)) {
  let list = {
    allId: 2,
    info: [{
      id: 1,
      checked: false, // 列表选中的
      title: '测试的第一份问卷',
      time: '2016-05-01 23:56:25',
      endTime: '2016-05-11',
      status: '已结束',
      content: [{
        title: '您的性别',
        type: 'radio',
        options: [{
          text: '男',
          value: 300
        }, {
          text: '女',
          value: 250
        }]
      }, {
        title: '您喜欢的公司',
        type: 'checkbox',
        options: [{
          text: '谷歌',
          value: 100
        }, {
          text: '百度',
          value: 26
        }, {
          text: '腾讯',
          value: 33
        }, {
          text: '苹果',
          value: 20
        }]
      }, {
        title: '您最喜欢的运动',
        type: 'radio',
        options: [{
          text: '篮球',
          value: 300
        }, {
          text: '足球',
          value: 200
        }, {
          text: '游泳',
          value: 100
        }, {
          text: '乒乓球',
          value: 250
        }]
      }, {
        title: '您喜欢的科目',
        type: 'checkbox',
        options: [{
          text: '数学',
          value: 250
        }, {
          text: '语文',
          value: 100
        }, {
          text: '英语',
          value: 100
        }, {
          text: '物理',
          value: 200
        }]
      }, {
        title: '您最喜欢的地方',
        type: 'textarea',
        options: [{
          text: '',
          value: 0.8
        }]
      }]
    }, {
      id: 2,
      checked: false,
      title: '足球数据调查',
      time: '2016-05-02 10:05:25',
      endTime: '2016-07-08',
      status: '发布中',
      content: [{
        title: '您的性别',
        type: 'radio',
        options: [{
          text: '男',
          value: 300
        }, {
          text: '女',
          value: 100
        }]
      }, {
        title: '您喜欢的足球俱乐部',
        type: 'checkbox',
        options: [{
          text: '巴萨',
          value: 60
        }, {
          text: '皇马',
          value: 50
        }, {
          text: 'AC米兰',
          value: 60
        }, {
          text: '曼联',
          value: 20
        }]
      }, {
        title: '您最喜欢的足球球星',
        type: 'radio',
        options: [{
          text: '梅西',
          value: 200
        }, {
          text: '卡卡',
          value: 500
        }, {
          text: 'C罗',
          value: 100
        }, {
          text: '其他',
          value: 20
        }]
      }, {
        title: '您喜欢的教练',
        type: 'checkbox',
        options: [{
          text: '安切洛蒂',
          value: 160
        }, {
          text: '瓜迪奥拉',
          value: 150
        }, {
          text: '穆里尼奥',
          value: 60
        }, {
          text: '西蒙尼',
          value: 120
        }]
      }, {
        title: '您认为最伟大的前锋是谁',
        type: 'textarea',
        options: [{
          text: '',
          value: 0.7
        }]
      }]
    }]
  }

  window.localStorage.setItem(key, JSON.stringify(list))
}

export default {
  fetch() {
    return JSON.parse(window.localStorage.getItem(key))
  },
  save(list) {
    window.localStorage.setItem(key, JSON.stringify(list))
  }
}
