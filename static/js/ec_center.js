var ec_center = echarts.init(document.getElementById('c2'), "vintage");
var mydata = []

// javascripe和css就是已经学过了但是还是回乖乖抄别人写好了的东西的存在，笑死，我连颜色选的都很丑


var ec_center_option = {
	// 标题
	title: {
		text: '全国累计疫情地图',
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
				end: 9
			},
			{
				start: 10,
				end: 99
			},
			{
				start: 100,
				end: 999
			},
			{
				start:1000,
				end:9999
			},
			{
				start: 10000
			},
		],
		color: ['#431707', "#762a0e", "#ca4d1f", "#F2AD92", "#F9DCD1"],
	},
	// 配置属性
	series: [{
		name: '累计确诊人数',
		type: "map",
		mapType: "china",
		roam: false, //是否允许拖动和播放，为了整洁还是不能的哈
		itemStyle: {
			normal: {
				borderWidth: .5, //区域边框宽度
				borderColor: "#55aaff",
				areaColor: "#ffefd5", //区域颜色
			},
			// 重点强调，就是当鼠标划过地图的时候的重点表示
			emphasis: {
				borderWidth: .5,
				borderColor: "#4b0082",
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
ec_center.setOption(ec_center_option)
