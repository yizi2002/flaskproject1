import time
import pymysql


def get_time():
    # 里面会接受一个字符串的格式，假如里面没有传入第二个参数的话就会直接显示当前的时间
    time_str = time.strftime("%Y{}%m{}%d{} %X")
    return time_str.format("年", "月", "日")


pass


def get_conn():
    conn = pymysql.connect(host="127.0.0.1",
                           user="root",
                           password="581321",
                           db="cov",
                           charset="utf8")
    cursor = conn.cursor()
    return conn, cursor


def close_conn(conn, cursor):
    cursor.close()
    conn.close()


def query(sql, *args):
    conn, cursor = get_conn()
    print("获得数据库连接")
    cursor.execute(sql, args)
    res = cursor.fetchall()
    close_conn(conn, cursor)
    print("数据库已经关闭连接")
    return res


# 返回大屏c1的数据，因为会跟新很多次数据，所以每次都选取最新的数据
def get_cl_data():
    sql = "select sum(confirmAll),sum(suspect)," \
          "sum(heal),sum(dead) from total where nowdate=" \
          "(select nowdate from total order by nowdate desc limit 1)"
    res = query(sql)
    return res[0]


def get_c2_data():
    sql = "select province,sum(confirmAll) from total " \
          "where nowdate=(select nowdate from total order by nowdate desc limit 1) " \
          "group by province"
    res = query(sql)
    return res


def get_c3_data():
    sql = "select province,sum(confirm) from total " \
          "where nowdate=(select nowdate from total order by nowdate desc limit 1) " \
          "group by province"
    res = query(sql)
    return res


def get_l1_date():
    sql = "select ds,confirm,suspect,heal,dead from history"
    res = query(sql)
    return res


def get_l2_date():
    sql = "select ds,confirm_add,suspect_add from history"
    res = query(sql)
    return res


def get_r1_date():
    sql = "select city,province,confirmAll " \
          "from (select city,province,confirmAll from total " \
          "where nowdate=(select nowdate from total order by nowdate desc limit 1)" \
          "and province not in ('湖北','北京','上海','天津','重庆') " \
          "union all " \
          "select city,province,sum(confirmAll) as confirmAll from total " \
          "where nowdate=(select nowdate from total order by nowdate desc limit 1) " \
          "and province in('北京','上海','天津','重庆') " \
          "group by province) as a  order by confirmAll desc limit 5"

    res = query(sql)
    return res


def get_r2_date():
    sql = "select city,province,sum(confirm) from total" \
          " where nowdate=(select nowdate from total order by nowdate desc limit 1) " \
          "and confirm!=0 " \
          "group by province " \
          "order by confirm desc"

    res = query(sql)
    return res
