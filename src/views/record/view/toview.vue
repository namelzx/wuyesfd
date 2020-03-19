<template>
  <div>
    <div class="app-container" id="print">
      <div class="filter-container">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div class="bill_no" style="text-align: center;font-size: 20px;font-weight: 600;">缴费回执单</div>
          </div>
          <div class="text item">
            <div slot="header" class="clearfix" style="    display: flex;">
              <div style="    font-weight: 300;">收费单位:广西北海长青藤物业管理有限公司</div>
              <div class="bill_no" style="    padding-left: 104px;">流水:{{order_no}}</div>
            </div>
            <div
              class="text"
              v-if="headinfo.get_community"
            >小区:{{headinfo.get_community.community_name}}</div>
            <div class="text">房号:{{ headinfo.building+headinfo.unit+headinfo.house_number}}</div>
            <div class="text">面积:{{headinfo.construction_area}}</div>
            <div class="text" v-if="headinfo.get_owner">姓名:{{headinfo.get_owner.owner_name}}</div>
            <div class="text">交易时间:{{order_create_time| parseTime('{y}-{m}-{d}')}}</div>
          </div>
        </el-card>
      </div>
      <div class="header">
        <div style="width: 80%">收费项目</div>
        <div style="width: 80%">收费期间</div>
        <div>单价(元)</div>
        <div>数量/用量/面积</div>
        <div>金额(元)</div>
        <div>上次读数</div>
        <div>本次读数</div>
      </div>
      <div class="header-conetn" v-for="(item,index) in list" :key="index">
        <div style="width: 128%">{{ item.name}}</div>

        <div style="width:128%">
          <template v-if="item.category_id===30">{{item.desc}}</template>
          <template v-else>{{item|timeSubstring}}</template>
        </div>
        <div style="width:80%">{{ item.unit_price |subunitfile}}</div>
        <div style="width:80%">
          {{ item.dosage |subunitfile}}
          <span v-if="item.temporary===2">
            <span>*</span>
            <span v-if="item.formula_id===19">{{headinfo.construction_area}}</span>
          </span>
        </div>
        <div style="width:80%">{{ item.paid }}</div>
        <div>
          <span v-if="item.last_number>0">{{ item.last_number |lastfile}}</span>
          <span v-if="item.last_number<1">---</span>
        </div>
        <div>
          <span v-if="item.this_number!==null">{{ item.this_number |lastfile}}</span>
          <span v-else>---</span>
        </div>
      </div>
      <div class="bottom-content">
        <div class="content-info">
          <!-- <div>收费渠道: {{pricetype|fsfileer}}</div> -->
          <div style="width:29%">收费渠道:服务中心收取</div>
          <div style="width:29%">支付方式:{{pricetype|fsfileer}}({{pricetype|payType}})</div>
          <div style="width:40%">合计金额(大写):{{sum|Arabia_To_SimplifiedChinese}}</div>
          <div>应收¥:{{sum|numFixed}}</div>
          <div>实收¥:{{shsum|numFixed}}</div>
        </div>
        <div class="content-info">
          <div>会计:</div>
          <div>出纳:</div>
          <div>开票人:</div>
          <div>操作员:{{this.communit.realname}}</div>
        </div>
        <div class="content-info">
          <div>备注:{{this.order.desc}}</div>
        </div>
      </div>
    </div>
    <div style="    text-align: center;">
      <el-button v-waves class="filter-item" type="primary" @click="printContent">打印</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import { getBillChildByItem } from "@/api/meter";
import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

const calendarTypeOptions = [
  { id: "1", name: "一级配置项" },
  { id: "2", name: "二级配置项" }
];
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.id] = cur.name;
  return acc;
}, {});
export default {
  computed: {
    ...mapGetters(["sidebar", "name", "avatar", "device", "communit"])
  },
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    lastfile(str) {
      return parseFloat(str).toFixed(0);
    },
    Arabia_To_SimplifiedChinese(n) {
      if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
      var unit = "千百拾亿千百拾万千百拾元角分",
        str = "";
      n += "00";
      var p = n.indexOf(".");
      if (p >= 0) n = n.substring(0, p) + n.substr(p + 1, 2);
      unit = unit.substr(unit.length - n.length);
      for (var i = 0; i < n.length; i++)
        str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);
      return str
        .replace(/零(千|百|拾|角)/g, "零")
        .replace(/(零)+/g, "零")
        .replace(/零(万|亿|元)/g, "$1")
        .replace(/(亿)万|壹(拾)/g, "$1$2")
        .replace(/^元零?|零分/g, "")
        .replace(/元$/g, "元整");
    },
    statusFilter(status) {
      const statusMap = {
        1: "success",
        2: "danger"
      };
      return statusMap[status];
    },
    subunitfile(str) {
      return (str * 1000) / 1000;
    },
    timeSubstring(row) {

      if (row.formula_id === 46) {
        return;
      }
      var Year = row.month.substring(0, 4);
      var Month = row.month.substring(5, 7);
      var to = 0;
      //预缴费
      if (row.type === 2) {
        if (row.np > 12) {
          //如果超过12个月 那么就计算 有多少年
          //得到多少年
          to = parseInt(row.np / 12);
        } 
        //  m = m +1;
        var m = row.np - to * 12; //计算 年份后得到剩余的月份

      
        // m=Month+m
        // m=parseInt(Month)+m
        if (parseInt(Month) + m > 12) {
          to = to + 1;
          m = parseInt(Month) + m - 12;
        }else{
          m=m+1
        }
        // console.log(((parseInt(Month)+m)/2 ))
        to = parseInt(Year) + parseInt(to);
        Month = parseInt(Month) + 1;
        //主要作用判断当前缴费日是否超过今年。主要作用在年底12月使用
        if (parseInt(Month) > 12) {
          Year = parseInt(Year) + 1;
          Month = Month - 12;
        }

        if (m === 0) {
          m = 12;
        }
        var firstDay = new Date(to, m - 1, 1); //这个月的第一天
        var currentMonth = firstDay.getMonth(); //取得月份数
        var lastDay = new Date(firstDay.getFullYear(), currentMonth + 1, 0); //是0而不是-1
        return (
          Year +
          "." +
          parseInt(Month).toString() +
          "." +
          "1" +
          "-" +
          to +
          "." +
          parseInt(m).toString() +
          "." +
          lastDay.getDate()
        );
      }

      if (
        row.category_id != 28 &&
        row.category_id != 27 &&
        row.items_id != 12 &&
        row.items_id != 7
      ) {
        var cost = row.get_order_meter.meter_time;

        Month = parseInt(cost.substring(0, 2));
        if (Month === 0) {
          Month = 12;
        }
        Year = 20 + "" + cost.substring(cost.length - 2);
        return (
          Year + "." + Month + "." + "1" + "-" + Year + "." + Month + "." + "31"
        );
      }
      if ((row.category_id = 28)) {
        var cost = row.get_order_meter.meter_time;

        Month = parseInt(cost.substring(0, 2)) - 1;
        Year = 20 + "" + cost.substring(cost.length - 2);
        if (Month === 0) {
          Month = 12;
          Year = Year - 1;
        }

       
        return (
          Year +
          "." +
          parseInt(Month).toString() +
          "." +
          "1" +
          "-" +
          Year +
          "." +
          parseInt(Month).toString() +
          "." +
          "31"
        );

        return (
          Year + "." + +"." + "1" + "-" + Year + "." + Month - 1 + "." + "31"
        );
      }
    },

    typeFilter(type) {
      const statusMap = {
        1: "已缴费",
        2: "未缴费"
      };
      return statusMap[type];
    },
    nullfilter(str) {
      if (!str) {
        return "--";
      }
      return str;
    },
    payType(type) {
      const typeMap = {
        1: "转账",
        2: "刷卡",
        3: "支付宝",
        4: "微信",
        5: "现金",
        6: "小程序缴费"
      };
      return typeMap[type];
    },
    fsfileer(str) {
      if (str === "") {
        return "服务中心收取";
      } else {
        return "网上渠道";
      }
    },
    numFixed(n) {
      return parseFloat(n).toFixed(2);
    },
    PayFilter(type) {
      const statusMap = {
        1: "微信缴费",
        2: "现金缴费"
      };
      return statusMap[type];
    }
  },
  data() {
    return {
      pricetype: "", // 支付方式
      order_create_time: "",
      headinfo: {},
      bill_no: "",
      order_no: "",
      order: {},
      sum: 0, //总金额
      shsum: 0,
      housingName: "",
      categorylistd: [],
      category_type: 1,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      housing: [],
      starttime: "", //开始时间
      endtime: "",

      sfstarttime: "", //水费
      sfendtime: "", //水费结束
      listQuery: {
        page: 1,
        limit: 20,
        type: 1,
        bill_no: undefined,
        name: undefined,
        category: undefined
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,

      showReviewer: false,
      temp: {
        fee_name: undefined
      },

      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogPvVisible: false,
      downloadLoading: false
    };
  },
  created() {
    var Nowdate = new Date();
    this.starttime =
      Nowdate.getFullYear() +
      "." +
      parseInt(Nowdate.getMonth() + 1) +
      "." +
      "1";
    this.endtime =
      Nowdate.getFullYear() +
      "." +
      parseInt(Nowdate.getMonth() + 1) +
      "." +
      "30";

    this.sfstarttime =
      Nowdate.getFullYear() + "." + parseInt(Nowdate.getMonth()) + "." + "1";

    this.sfendtime =
      Nowdate.getFullYear() + "." + parseInt(Nowdate.getMonth()) + "." + "30";

    this.listQuery.bill_no = this.$route.params && this.$route.params.id;
    this.bill_no = this.$route.params && this.$route.params.id;
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getBillChildByItem(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.total;
        this.headinfo = response.data.housing;
        this.order = response.data.order;
        this.pricetype = this.order.type; //支付方式
        for (let i = 0; i < this.list.length; i++) {
          this.sum = this.sum + parseFloat(this.list[i].to_paid);
          this.shsum = this.shsum + parseFloat(this.list[i].paid);
        }
        if (this.list[0] != undefined) {
          var bill = this.list[0].get_housing;
          if (this.order.create_time === null) {
            this.order_create_time = new Date();
          } else {
            this.order_create_time = this.order.create_time;
          }
          this.order_no = this.list[0].bill_no;
          this.housingName = bill.building + bill.unit + bill.house_number;
        } else {
          this.$message({
            message: "用户无账单",
            type: "error"
          });
        }
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    // 打印
    printContent(e) {
      this.remove_ie_header_and_footer();
      let subOutputRankPrint = document.getElementById("print");
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    },
    remove_ie_header_and_footer() {
      var hkey_path;
      hkey_path =
        "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
      try {
        var RegWsh = new ActiveXObject("WScript.Shell");
        RegWsh.RegWrite(hkey_path + "header", "");
        RegWsh.RegWrite(hkey_path + "footer", "");
      } catch (e) {}
    }
  }
};
</script>
<style  scoped>
@page {
  size: auto A4 landscape;
  margin: 3mm;
}
@media print {
  .app-container {
    display: block;
    width: 50%;
  }
}
.header-conetn,
.header {
  font: 16px/1.5 "微软雅黑", tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif;
}
.clearfix {
  margin-bottom: 10px;
}

.text {
  padding-right: 30px;
  float: left;
  font-size: 1px;
  font-weight: 300;
  margin-top: 5px;
  margin-bottom: 5px;
  text-indent: 10px;
  font: 1px "微软雅黑", tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif;
}
.bill_no {
  font-size: 6px;
  font-weight: 300;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 30px;
  align-items: center;
  font-size: 6px;
  font-weight: 500;
  border: 1px solid black;
  border-bottom: none;
}
.header-conetn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 30px;
  align-items: center;
  font-size: 6px;
  border-top: 1px solid black;
}
.header-conetn div {
  width: 80%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-bottom: none;
  border-right: 1px solid black;
  font-weight: 300;
}
.header-conetn div:nth-child(1) {
  border-left: 1px solid black;
}
.header-conetn:last-child {
  border-bottom: 1px solid black;
}
.header div {
  width: 50%;
  height: 30px;
  font-weight: 300;
  line-height: 30px;
  text-align: center;
  border-right: 1px solid black;
}
.header div:last-child {
  border-right: none;
}
.item span {
  margin-right: 10px;
  font-weight: 300;
}
.filter-container {
  padding-bottom: 0;
}
.el-card__header {
  border-bottom: none;
}
.el-card {
  border: none;
}
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: none;
}
.app-container {
  width: 80%;
  margin: auto;
}
.bottom-content {
  border-top: 1px solid black;
  display: flex;
  font-size: 6px;
  flex-direction: column;
}
.bottom-content .content-info {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  width: 100%;
}
.bottom-content .content-info div {
  width: 25%;
  font-weight: 300;
  font-size: 6px;
}
.el-card__header {
  border-bottom: 1px dashed;
  /* padding-bottom: 0; */
}
.app-container >>> .el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: #000;
}
.app-container >>> .el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  /* border-right: 1px solid #000; */
}
.app-container >>> .el-table td,
.app-container >>> .el-table th.is-leaf {
  border-top: 1px solid #000;
}

.app-container >>> .el-table--border td,
.app-container >>> .el-table--border th,
.app-container
  >>> .el-table__body-wrapper
  .el-table--border.is-scrolling-left
  ~ .el-table__fixed {
  border-left: 1px solid #000;
}
.app-container >>> .item {
  font-size: 6px;
}
</style>

