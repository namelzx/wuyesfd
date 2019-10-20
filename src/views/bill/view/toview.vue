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
            <div class="text">交易时间:{{order_create_time}}</div>
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
          <template v-if="item.category_id===30||item.category_id===27">{{item.desc}}</template>
          <template v-else>{{starttime}}-{{endtime}}</template>
        </div>
        <div style="width:80%">{{ item.unit_price }}</div>
        <div style="width:80%">{{ item.dosage |nullfilter}}</div>
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
          <div>收费渠道: {{pricetype|fsfileer}}</div>
          <div>支付方式:{{pricetype}}</div>
          <div style="width:40%">合计金额(大写):{{sum|Arabia_To_SimplifiedChinese}}</div>
          <div>实收¥:{{sum|numFixed}}</div>
          <div>应收¥:{{shsum|numFixed}}</div>
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
    timeSubstring(time) {
      var st = time.substring(0, 8);
      return st + "1" + "至" + st + "31";
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
    fsfileer(str) {
      if (str === "现金") {
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
      sum: 0, //实收金额
      shsum: 0, //应收金额
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
      listQuery: {
        page: 1,
        limit: 20,
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
    this.listQuery.bill_no = this.$route.params && this.$route.params.id;
    this.bill_no = this.$route.params && this.$route.params.id;
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getBillChildByItem(this.listQuery).then(response => {
        this.list = response.data.data.data;
        this.total = response.data.data.total;
        this.headinfo = response.data.housing;
        this.order = response.data.order;
        this.pricetype = this.order.type; //支付方式
        for (let i = 0; i < this.list.length; i++) {
          this.sum = this.sum + parseFloat(this.list[i].paid);

          this.shsum = this.shsum + parseFloat(this.list[i].to_paid);
        }
        if (this.list[0] != undefined) {
          var bill = this.list[0].get_housing;
          this.order_create_time = this.list[0].create_time;
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
      console.log(subOutputRankPrint.innerHTML);
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
