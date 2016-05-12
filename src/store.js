const key = 'form'

if (!window.localStorage.getItem(key)) {
  let list = {
    allId: 2,
    info:
    [
      {
        id: 1,
        checked: false,
        title: '测试的第一份问卷',
        time: '2016-05-01 23:56:25',
        endTime: '2016-05-20',
        status: '发布中',
        content: [
          {
            title: '你最喜欢的运动',
            type: 'radio',
            options: [
              {
                text: '篮球'
              },
              {
                text: '足球'
              },
              {
                text: '游泳'
              },
              {
                text: '乒乓球'
              }
            ]
          },
          {
            title: '你喜欢的公司',
            type: 'checkbox',
            options: [
              {
                text: '谷歌'
              },
              {
                text: '百度'
              },
              {
                text: '腾讯'
              },
              {
                text: '苹果'
              }
            ]
          },
          {
            title: '对前端的看法',
            type: 'textarea',
            options: [
              {
                text: ''
              }
            ]
          }
        ]
      },
      {
        id: 2,
        checked: false,
        title: '足球数据调查',
        time: '2016-05-02 10:05:25',
        endTime: '2016-05-08',
        status: '未发布',
        content: [
          {
            title: '你最喜欢的足球球星',
            type: 'radio',
            options: [
              {
                text: '梅西'
              },
              {
                text: '卡卡'
              },
              {
                text: 'C罗'
              },
              {
                text: '其他'
              }
            ]
          },
          {
            title: '你喜欢的足球俱乐部',
            type: 'checkbox',
            options: [
              {
                text: '巴萨'
              },
              {
                text: '皇马'
              },
              {
                text: 'AC米兰'
              },
              {
                text: '曼联'
              }
            ]
          },
          {
            title: '你觉得历史是上最伟大的前锋是谁',
            type: 'textarea',
            options: [
              {
                text: ''
              }
            ]
          }
        ]
      }
    ]
  }

  window.localStorage.setItem(key, JSON.stringify(list))
}

export default {
  fetch () {
    return JSON.parse(window.localStorage.getItem(key))
  },
  save (list) {
    window.localStorage.setItem(key, JSON.stringify(list))
  }
}
