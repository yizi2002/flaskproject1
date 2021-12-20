import time
import traceback

import pymysql
import requests
import json


def getdate(url):
    res = requests.get(url)
    d = json.loads(res.text)
    da = json.loads(d["data"])
    return da


def getMyConnect():
    conn = pymysql.connect(host="127.0.0.1",
                           user="root",
                           password="581321",
                           db="cov")

    return conn


def closeAll(conn, cursor):
    if conn:
        conn.close()
    if cursor:
        cursor.close()


def get_history_date():
    da = getdate("https://view.inews.qq.com/g2/getOnsInfo?name=disease_other")

    conn = getMyConnect()
    cursor = conn.cursor()

    history = {}
    for i in da["chinaDayList"]:
        ds = "2021." + i["date"]
        # 下面这里其实就是时间转换，能传入到数据库里面的，果然无论是那个语言做这个我都觉得好混乱啊
        tup = time.strptime(ds, "%Y.%m.%d")
        ds = time.strftime("%Y-%m-%d", tup)
        confirm = i["confirm"]
        suspect = i["suspect"]
        heal = i["heal"]
        dead = i["dead"]
        history[ds] = {"confirm": confirm, "suspect": suspect, "heal": heal, "dead": dead}
    for i in da["chinaDayAddList"]:
        ds = "2021." + i["date"]
        tup = time.strptime(ds, "%Y.%m.%d")
        ds = time.strftime("%Y-%m-%d", tup)
        confirm = i["confirm"]
        suspect = i["suspect"]
        heal = i["heal"]
        dead = i["dead"]
        history[ds].update({"confirm_add": confirm, "suspect_add": suspect, "heal_add": heal, "dead_add": dead})
    return history


def update_history():
    cursor = None
    conn = None
    try:
        conn = getMyConnect()
        cursor = conn.cursor()

        sql = "replace into history values(%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        sql_query = "select confirm from history where ds=%s"

        history = get_history_date()

        print("{}  开始更新最新数据".format(time.asctime()))
        for k, v in history.items():
            if not cursor.execute(sql_query, k):
                cursor.execute(sql, [k, v.get("confirm"), v.get("confirm_add"), v.get("suspect"), v.get("suspect_add"),
                                     v.get("heal"), v.get("heal_add"),
                                     v.get("dead"), v.get("dead_add")])

        conn.commit()
        print("{}  已是最新数据！".format(time.asctime()))
    except:
        traceback.print_exc()
    finally:
        closeAll(conn, cursor)


def getdetails():
    da = getdate("https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5")
    timeNow = da["lastUpdateTime"]
    dall = da["areaTree"][0]
    datap = dall["children"]
    detail = []
    i = 1
    for item in datap:
        province = item["name"]
        for cityi in item["children"]:
            id = i
            city = cityi["name"]
            confirm = cityi["today"]["confirm"]
            confirmall = cityi["total"]["confirm"]
            suspect = cityi["total"]["suspect"]
            dead = cityi["total"]["dead"]
            heal = cityi["total"]["heal"]
            i = i + 1
            detail.append([id, timeNow, province, city, confirm, confirmall, suspect, dead, heal])
    return detail


def updateDetails():
    cursor = None
    conn = None
    try:
        # li是详细数据列表
        li = getdetails()
        conn = getMyConnect()
        cursor = conn.cursor()
        sql = "replace into total(id,nowdate,province,city,confirm,confirmAll,suspect,dead,heal) values(%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        # sql2="update total "
        sql_query = "select %s=(select nowdate from total order by id desc limit 1)"
        cursor.execute(sql_query, li[0][0])
        if not cursor.fetchone()[0]:
            print("{}  开始更新最新数据".format(time.asctime()))
            for item in li:
                cursor.execute(sql, item)
            conn.commit()
            print("{}  已是最新数据！".format(time.asctime()))
        else:
            print("{}  已是最新数据！".format(time.asctime()))
    except:
        traceback.print_exc()
    finally:
        closeAll(conn, cursor)


updateDetails()
update_history()
