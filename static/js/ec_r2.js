var ec_r2 = echarts.init(document.getElementById('r2'),"vintage");

var ec_r2_Option = {
	title: {
		text: '今日新增确证诊人数TOP5',
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
		type: 'category',
		axisLine: {
			show: true
		},
		axisTick: {
			show: true,
		},
		nameTextStyle: {
			fontSize: 3
		}
	},
	yAxis: {
		type: 'value',
		data: [],
		splitLine: {
			show: true
		},
		axisLine: {
			show: true
		},
		axisTick: {
			show: true
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
		barGap: 0,
		smooth: true,
		label: {
			normal: {
				show: true,
				position: 'right',
				offset: [5, -2],
				textStyle: {
					color: '#55557f',
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
							color: '#18875d'
						},
						{
							offset: 1,
							color: '#18875d'
						}

					]
				)
			}
		},
		data: []
	}]

};
ec_r2.setOption(ec_r2_Option)
