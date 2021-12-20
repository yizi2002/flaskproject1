var ec_left1 = echarts.init(document.getElementById('l1'), "vintage")

var ec_left1_Option = {
	title: {
		text: '全国累计趋势',
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
		orient: 'vertical',
		x:'right',      //可设定图例在左、右、居中
		y:'center',     //可设定图例在上、下、居中
		padding:[0,30,0,0],
		data: ['累计确诊', '现有疑似', '累计治愈', '累计死亡']
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
		name: '累计确诊',
		type: 'line',
		smooth: true,
		data: []
	}, {
		name: '现有疑似',
		type: 'line',
		smooth: true,
		data: []
	}, {
		name: '累计治愈',
		type: 'line',
		smooth: true,
		data: []
	}, {
		name: '累计死亡',
		type: 'line',
		smooth: true,
		data: []
	}, ]
};
ec_left1.setOption(ec_left1_Option)
