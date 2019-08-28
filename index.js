// 事业部列表
var businessUnit = [
  {
    id: 1,
    name: 'sw1'
  },
  {
    id: 2,
    name: 'sw2'
  },
  {
    id: 3,
    name: 'sw3'
  },
  {
    id: 3,
    name: 'sw4'
  }
]

// todolist
var todolist = [
  {
    iconPath: '', // icon图标链接
    title: '待处理邮件', // 标题
    finish: 1, // 已完成
    total: 1, // 总共
  },
  {
    title: '待处理邮件',
    finish: 1,
    total: 1
  }
]

// 扇形图数据
var lineData = [
  { value: 335, name: '李阳-1' },
  { value: 310, name: '李阳-2' },
  { value: 234, name: '李阳-3' },
  { value: 135, name: '李阳-4' },
  { value: 1548, name: '李阳-5' },
  { value: 1548, name: '李阳-6' },
  { value: 1548, name: '李阳-7' },
  { value: 1548, name: '李阳-8' },
  { value: 1548, name: '李阳-9' },
  { value: 1548, name: '李阳-10' },
  { value: 1548, name: '李阳-11' },
  { value: 1548, name: '李阳-12' },
];

// 柱状图数据
var barData = [
  {
    name: '早上点外卖',
    data: [
      {
        name: '李阳事业部-1',
        value: 110,
      },
      {
        name: '李阳事业部-2',
        value: 111,
      },
      {
        name: '李阳事业部-3',
        value: 112,
      },
      {
        name: '李阳事业部-4',
        value: 113,
      },
      {
        name: '李阳事业部-5',
        value: 114,
      }
    ]
  },
  {
    name: '中午点外卖',
    data: [
      {
        name: '李阳事业部-1',
        value: 120,
      },
      {
        name: '李阳事业部-2',
        value: 121,
      },
      {
        name: '李阳事业部-3',
        value: 122,
      },
      {
        name: '李阳事业部-4',
        value: 123,
      },
      {
        name: '李阳事业部-5',
        value: 124,
      }
    ]
  },
  {
    name: '晚上点外卖',
    data: [
      {
        name: '李阳事业部-1',
        value: 130,
      },
      {
        name: '李阳事业部-2',
        value: 131,
      },
      {
        name: '李阳事业部-3',
        value: 132,
      },
      {
        name: '李阳事业部-4',
        value: 133,
      },
      {
        name: '李阳事业部-5',
        value: 134,
      }
    ]
  },
  {
    name: '夜宵点外卖',
    data: [
      {
        name: '李阳事业部-1',
        value: 140,
      },
      {
        name: '李阳事业部-2',
        value: 141,
      },
      {
        name: '李阳事业部-3',
        value: 142,
      },
      {
        name: '李阳事业部-4',
        value: 143,
      },
      {
        name: '李阳事业部-5',
        value: 144,
      }
    ]
  },
]

// 渲染柱状图
var renderBarChart = function () {
  var labelOption = {
    normal: {
      show: true,
      position: 'insideBottom',
      distance: 15,
      align: 'left',
      verticalAlign: 'middle',
      rotate: 90,
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {
          textBorderColor: '#fff'
        }
      }
    }
  };

  var categories = barData[ 0 ][ 'data' ].map(item => item.name);

  var series = barData.map(item => {
    return {
      name: item.name,
      type: 'bar',
      barGap: 0,
      label: labelOption,
      data: item.data.map(item => item.value),
    }
  })

  var option = {
    color: [ '#003366', '#006699', '#4cabce', '#e5323e' ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: [ 'Forest', 'Steppe', 'Desert', 'Wetland' ]
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: false },
        dataView: { show: false, readOnly: false },
        magicType: { show: false, type: [ 'bar' ] },
        restore: { show: false },
        saveAsImage: { show: false }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: categories
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: series,
    backgroundColor: '#f0f0f0',
  };

  var myChart = echarts.init(document.getElementById('bar-content'));
  myChart.showLoading({
    text: 'loading',
    color: '#f2b047',
    textColor: '#000',
  });
  myChart.setOption(option);
  setTimeout(() => {
    myChart.hideLoading();
  }, 800)
}

// 渲染扇形图
var renderFanLineChart = function () {

  var option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: lineData.map(item => item.name)
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: [ '50%', '50%' ],
        data: lineData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    backgroundColor: '#f0f0f0',
  };
  var myChart = echarts.init(document.getElementById('fan-line-content'));
  myChart.showLoading({
    text: 'loading',
    color: '#f2b047',
    textColor: '#000',
  });
  myChart.setOption(option);
  setTimeout(() => {
    myChart.hideLoading();
  }, 800)
}

// 渲染事业部列表
var renderDistributedList = function() {

}


renderBarChart();
renderFanLineChart()

