
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

  var data = [
    {
      name: '新增订单数量',
      data: {
        'SW事业部': 200,
        'JFN事业部': 120,
        'Pi事业部': 20,
        'NC事业部': 50,
        'RW事业部': 10,
      }
    },
    {
      name: '新增邮件数量',
      data: {
        'SW事业部': 200,
        'JFN事业部': 90,
        'Pi事业部': 20,
        'NC事业部': 50,
        'RW事业部': 10,
      }
    },
    {
      name: '新增纠纷数量',
      data: {
        'SW事业部': 200,
        'JFN事业部': 80,
        'Pi事业部': 20,
        'NC事业部': 50,
        'RW事业部': 10,
      }
    },
    {
      name: '新增工单数量',
      data: {
        'SW事业部': 200,
        'JFN事业部': 100,
        'Pi事业部': 20,
        'NC事业部': 50,
        'RW事业部': 10,
      }
    },
  ]

  var categories = Object.keys(data[0]['data']);

  var series = data.map(item => {
    return {
      name: item.name,
      type: 'bar',
      barGap: 0,
      label: labelOption,
      data: Object.values(item.data),
    }
  })

  var option = {
    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Forest', 'Steppe', 'Desert', 'Wetland']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: {show: false},
        dataView: {show: false, readOnly: false},
        magicType: {show: false, type: ['bar']},
        restore: {show: false},
        saveAsImage: {show: false}
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisTick: {show: false},
        data: categories
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: series,
    backgroundColor: '#e9e9e9',
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
var renderFanLineChart = function() {

  var option = {
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '50%'],
        data:[
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
          {value:135, name:'视频广告'},
          {value:1548, name:'搜索引擎'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    backgroundColor: '#e9e9e9',
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

renderBarChart();
renderFanLineChart()

