var ec_r1 = echarts.init(document.getElementById('r1'));

var ec_r1_Option = {
	title: {
		text: '非湖北地区城市确诊TOP5',
		textStyle: {
			color: '#338aa2'
		}
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'value',
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		type: 'category',
		data: [],
		splitLine: {
			show: false
		},
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		offset: 10,
		nameTextStyle: {
			fontSize: 15
		}
	},
	series: [{
		name: '数量',
		type: 'bar',
		barWidth: 14,
		barGap: 10,
		smooth: true,
		label: {
			normal: {
				show: true,
				position: 'right',
				offset: [5, -2],
				textStyle: {
					color: '#472828',
					fontSize: 13
				}
			}
		},
		itemStyle: {
			emphasis: {
				barBorderRadius: 7
			},
			normal: {
				barBorderRadius: 7,
				color: new echarts.graphic.LinearGradient(
					0, 0, 1, 0,
					[{
							offset: 0,
							color: '#7b7bb8'
						},
						{
							offset: 1,
							color: '#7b7bb8'
						}

					]
				)
			}
		},
		data: []
	}]

};
ec_r1.setOption(ec_r1_Option)
