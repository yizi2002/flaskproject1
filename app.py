from flask import Flask
from flask import render_template
from flask import jsonify

import util


app = Flask(__name__)


@app.route('/')
def mypage():  # put application's code here
    return render_template("main.html")


@app.route("/time")
def get_time():
    # 书写一个函数,用来计算当前的时间是多少
    return util.get_time()


@app.route("/c1")
def get_c1_data():
    data =util.get_cl_data()
    return jsonify({"confirmAll": data[0], "suspect": data[1], "heal": data[2], "dead": data[3]})


@app.route("/c2")
def get_c2_data():
    res = []
    # 返回的是一个结果集，元组类型，要不然你直接转到数据库看一下也行，你要把这个转化成一个好处理的list数据
    for tup in util.get_c2_data():
        res.append({"name": tup[0], "value": int(tup[1])})

    return jsonify({"data": res})


@app.route("/c3")
def get_c3_data():
    res = []
    # 返回的是一个结果集，元组类型，要不然你直接转到数据库看一下也行，你要把这个转化成一个好处理的list数据
    for tup in  util.get_c3_data():
        res.append({"name": tup[0], "value": int(tup[1])})

    return jsonify({"data": res})


# 专门返回的是每一天的数据，然后在js文件里面的格式是：确诊按天来排一个数组，治愈按天来排又是一个数组
# 然后从数据库传回来的结果集是每一天的所有数据，就是一天一天里面的有确诊，治愈等等
# 所以做的就是处理数据，每一个都分类拍好
@app.route("/l1")
def get_l1_data():
    data = util.get_l1_date()
    print(data)
    day, confirm, suspect, heal, dead = [], [], [], [], []
    # 这个循环的意思是每一个abcd按顺序对应上面的每一个然后依次添加
    # 然后我这里存储的是两个月前到现在的数据
    for a, b, c, d, e in data:
        day.append(a.strftime("%Y-%m-%d"))
        confirm.append(b)
        suspect.append(c)
        heal.append(d)
        dead.append(e)
    return jsonify({"day": day, "confirm": confirm, "suspect": suspect, "heal": heal, "dead": dead})


@app.route("/l2")
def get_l2_data():
    data = util.get_l2_date()

    day, confirm_add, suspect_add = [], [], []

    for a, b, c in data:
        day.append(a.strftime("%Y-%m-%d"))
        confirm_add.append(b)
        suspect_add.append(c)

    return jsonify({"day": day, "confirm_add": confirm_add, "suspect_add": suspect_add})


@app.route("/r1")
def get_r1_data():
    data = util.get_r1_date()
    city = []
    confirm = []
    # 这里解释一下，date后面要存到一个ec_r1_Option的series里面的date去，这是一连串的数据，格式为json的城市：一整条列表，数据：列表
    # 然后穿过来的数据集是你在数据库中看到的那样，省，市，数据。然后一行一行的排列
    for a, b, c in data:
        city.append(b + ' ' + a)
        confirm.append(c)

    return jsonify({"city": city, "confirm": confirm})


@app.route("/r2")
def get_r2_data():
    data = util.get_r2_date()
    city = []
    confirm = []
    #     这里解释一下，date后面要存到一个ec_r1_Option的series里面的date去，这是一连串的数据，格式为json的城市：一整条列表，数据：列表
    # 然后穿过来的数据集是你在数据库中看到的那样，省，市，数据。然后一行一行的排列
    for a, b, c in data:
        city.append(b + ' ' + a)
        confirm.append(c)
    return jsonify({"city": city, "confirm": confirm})


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080, debug=False)
