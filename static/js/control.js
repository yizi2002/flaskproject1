function gettime() {
	$.ajax({
		url: "/time",
		type: 'get',
		timeout: 10000,
		success: function(data) {
			$(".time").html(data)
		},
		error: function(xhr, type, errorThrown) {

		}
	})
}
// setInterval(gettime, 1000)

function get_c1_data() {
	$.ajax({
		url: "/c1",
		success: function(data) {
			$(".num h1").eq(0).text(data.confirmAll)
			$(".num h1").eq(1).text(data.suspect)
			$(".num h1").eq(2).text(data.heal)
			$(".num h1").eq(3).text(data.dead)
		},
		error: function(xhr, type, errorThrown) {

		}
	})
}
// setInterval(get_c1_data, 1000)
function get_c2_data(){
	$.ajax({
		url: "/c2",
		success: function(d) {
			ec_center_option.series[0].data=d.data
			ec_center.setOption(ec_center_option)
		},
		error: function(xhr, type, errorThrown) {
	
		}
	})
}

function get_c3_data(){
	$.ajax({
		url: "/c3",
		success: function(d) {
			ec_center_option_2.series[0].data=d.data
			ec_center_2.setOption(ec_center_option_2)
		},
		error: function(xhr, type, errorThrown) {

		}
	})
}
function get_l1_data(){
	$.ajax({
		url: "/l1",
		success: function(d) {
			//  return jsonify({"day": day, "confirm": confirm, "suspect": suspect, "heal": heal, "dead": dead})
			//日期是坐标，其他的写道数据里面去
			ec_left1_Option.xAxis[0].data=d.day

			ec_left1_Option.series[0].data=d.confirm
			ec_left1_Option.series[1].data=d.suspect
			ec_left1_Option.series[2].data=d.heal
			ec_left1_Option.series[3].data=d.dead

			ec_left1.setOption(ec_left1_Option)
		},
		error: function(xhr, type, errorThrown) {

		}
	})
}

function get_l2_data(){
	$.ajax({
		url: "/l2",
		success: function(d) {
			//ec_left2_Option
			ec_left2_Option.xAxis[0].data=d.day

			ec_left2_Option.series[0].data=d.confirm_add
			ec_left2_Option.series[1].data=d.suspect_add

			ec_left2.setOption(ec_left2_Option)
		},
		error: function(xhr, type, errorThrown) {

		}
	})
}
function get_r1_data(){
	//ec_r1
	$.ajax({
		url: "/r1",
		success: function(d) {
			//ec_r1_Option
			ec_r1_Option.yAxis.data=d.city;
			ec_r1_Option.series[0].data=d.confirm;
			ec_r1.setOption(ec_r1_Option);
		},
		error: function(xhr, type, errorThrown) {

		}
	})
}
function get_r2_data(){

	$.ajax({
		url: "/r2",
		success: function(d) {

			ec_r2_Option.xAxis.data=d.city;
			ec_r2_Option.series[0].data=d.confirm;
			ec_r2.setOption(ec_r2_Option);
		},
		error: function(xhr, type, errorThrown) {

		}
	})
}
 gettime()
get_c2_data()
get_c1_data()
get_c3_data()
get_l1_data()
get_l2_data()
get_r1_data()
get_r2_data()


setInterval(gettime,1000)
setInterval(get_l1_data,10000)
setInterval(get_c3_data,10000)
setInterval(get_r1_data,10000)
setInterval(get_c2_data,10000)
setInterval(get_c1_data,10000)
setInterval(get_l2_data,10000)
setInterval(get_r2_data,10000)



