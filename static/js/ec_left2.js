var ec_left2 = echarts.init(document.getElementById('l2'), "vintage")

var ec_left2_Option = {
	title: {
		text: '全国当日趋势',
		textStyle: {
			color: '#338aa2',
		},
	},
	tooltip: {
		trigger: 'axis',
		//指示器
		axisPointer: {
			type: 'line',
			lineStyle: {
				color: '#7171C6'
			}
		},
	},
	legend: {
		x:'right',      //可设定图例在左、右、居中
		data: ['当日确诊', '当日疑似']
	},
	//图形位置
	grid: {
		left: '1%',
		right: '6%',
		bottom: '4%',
		top: 50,
		containLabel: true
	},
	xAxis: [{
		type: 'category',
		data: []
	}],
	//y轴没有显式设置，根据值自动生成y轴
	//数据-data是最终要显示的数据，serie是个数组记得访问0别忘了
	yAxis: [{
		type: 'value',
		axisLabel: {
			show: true,
			color: 'black',
			fontSize: 12,
			formatter: function(value) {
				if (value >= 1000) {
					value = value / 1000 + 'k';
				}
				return value
			}
		},
		axisLine: {
			show: true
		},
		//与x轴平行的线样式
		splitLine: {
			show: true,
			lineStyle: {
				color: '#b1c7eb',
				width: 1,
				type: 'solid'
			}
		}
	}],
	series: [{
		name: '当日确诊',
		type: 'line',
		smooth: true,
		data: []
	}, {
		name: '当日疑似',
		type: 'line',
		smooth: true,
		data: []
	},  ]
};
ec_left2.setOption(ec_left2_Option)
