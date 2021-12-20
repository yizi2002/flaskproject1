var ec_center_2 = echarts.init(document.getElementById('c3'), "vintage");
var mydata = []

// javascripe和css就是已经学过了但是还是回乖乖抄别人写好了的东西的存在，笑死，我连颜色选的都很丑


var ec_center_option_2 = {
	// 标题
	title: {
		text: '新增疫情地图',
		subtext: '',
		x: 'left'
	},
	tooltip: {
		trigger: "item"
	},
	// 左侧小导航图标
	visualMap: {
		show: true,
		x: 'left',
		y: 'bottom',
		textStyle: {
			fontSize: 8,
		},
		splitList: [{
				start: 0,
				end: 5
			},
			{
				start: 6,
				end: 10
			},
			{
				start: 11,
				end: 50
			},
			{
				start:51,
				end:100
			},
			{
				start: 100
			},
		],
		color: ['#1c1a56', "#42529a", "#4377ca", "#438ff1", "#c7f5ff"],
	},
	// 配置属性
	series: [{
		name: '今日确诊人数',
		type: "map",
		mapType: "china",
		roam: false, //是否允许拖动和播放，为了整洁还是不能的哈
		itemStyle: {
			normal: {
				borderWidth: .5, //区域边框宽度
				borderColor: "#3b550c",
				areaColor: "#ffefd5", //区域颜色
			},
			// 重点强调，就是当鼠标划过地图的时候的重点表示
			emphasis: {
				borderWidth: .5,
				borderColor: "#823a47",
				areaColor: "#fff",
			}
		},
		lable: {
			normal: {
				show: true,
				fontSize: 8,
			},
			emphasis: {
				show: true,
				fontSize: 8,
			}
		},
		data: mydata //数据
	}],
};
ec_center_2.setOption(ec_center_option_2)
