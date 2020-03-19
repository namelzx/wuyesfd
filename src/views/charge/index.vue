<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        clearable
        v-model="listQuery.building_id"
        style="width: 140px"
        class="filter-item"
        placeholder="选择楼栋"
        filterable
        @change="handleBuilding"
      >
        <el-option
          v-for="(item,index) in housing"
          :key="item.id"
          :label="item.building "
          :value="index"
        />
      </el-select>
      <el-select
        clearable
        v-model="listQuery.unit_id"
        style="width: 140px"
        class="filter-item"
        placeholder="选择单元"
        filterable
        @change="handleNmuber"
      >
        <el-option v-for="(item,index) in unit" :key="item.id" :label="item.unit" :value="index" />
      </el-select>
      <el-select
        clearable
        v-model="listQuery.housing_id"
        style="width: 140px"
        class="filter-item"
        placeholder="选择房间号"
        filterable
        @change="handleFilter"
      >
        <el-option
          v-for="item in house_number"
          :key="item.id"
          :label="item.house_number"
          :value="item.id"
        />
      </el-select>
    </div>

    <code>
      <el-row>
        <el-col :span="4">
          房号
       
          <template
            v-if="userinfo.get_owner.id<9999999999"
          >{{userinfo.building+userinfo.unit+userinfo.house_number}}</template>
        </el-col>
        <el-col :span="4">业主姓名 {{userinfo.get_owner.owner_name}}</el-col>
        <el-col :span="4">联系电话 {{userinfo.get_owner.mobile}}</el-col>
        <el-col :span="4">建筑面积 {{userinfo.construction_area}}</el-col>
        <el-col :span="4">汽车数量 {{userinfo.get_owner.automobile}}</el-col>
        <el-col :span="4">电瓶车数量 {{userinfo.get_owner.battery}}</el-col>
        <el-col :span="4">三轮车数量 {{userinfo.get_owner.tricycle}}</el-col>
        <el-col :span="4">摩托车数量 {{userinfo.get_owner.tricycle}}</el-col>
        <el-col :span="4">存款 {{userinfo.deposit}}</el-col>

      </el-row>
    </code>
    <code>
      <el-row>
        <el-col :span="4">待缴金额 {{sum|fltext}}</el-col>
        <el-col :span="4">已缴金额 {{sumBill.already}}</el-col>
      </el-row>
    </code>
    <div class="conent">
      <div class="conent-head">
        <div>收费项目</div>
        <div>应缴金额</div>
        <div>收费金额</div>
        <div>逾期日期</div>
      </div>
      <div class="list" v-for="(item,index) in list" :key="index">
        <div class="list-head">账单月份{{item.meter_time}}</div>
        <div class="conent-list" v-for="(sitem,sindex) in item.get_bill" :key="sindex">
          <div>
            <el-checkbox v-model="sitem.che" @change="toche(index,sindex)"></el-checkbox>
            {{sitem.name}}
          </div>
          <div>{{sitem.to_paid}}</div>
          <div>{{sitem.to_paid}}</div>
          <div>--</div>
        </div>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>缴费预收</span>
        </div>

        <el-checkbox-group v-model="checkList" @change="handelChange">
          <el-row :gutter="10">
            <el-col :span="20">
              <el-checkbox
                v-for="(item,index) in chargelist"
                :key="index"
                :label="item"
                :value="item"
              >{{item.note+item.getcharge.fee_name}}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
        <div class="card-conent">
          <el-card class="box-card" v-for="(item,index) in yjlist" :key="index">
            <div slot="header" class="clearfix">
              <span>{{item.note+item.getcharge.fee_name}}</span>
            </div>
            <el-form label-width="80px">
              <el-form-item label="当前单价">
                <span>{{item.price*1000/1000}}</span>
              </el-form-item>
            </el-form>

            <el-form label-width="80px">
              <el-form-item label="收费月数">
                <el-input-number v-model="item.num" :min="1" :max="999" @change="handelchange(item)"></el-input-number>
              </el-form-item>
            </el-form>
            <el-form label-width="80px">
              <el-form-item label="应缴纳">
                <span
                  v-if="item.formula_id==19"
                >{{item.price*item.num*userinfo.construction_area|subunitfile}}</span>
                <span v-if="item.formula_id==17"> 
                  <span v-if="item.num">
                      {{item.price*item.num|subunitfile}}
                  </span>
                </span>
                <span
                  v-if="item.formula_id==36"
                >{{item.price*userinfo.get_owner.automobile*item.num|subunitfile}}</span>
                <span
                  v-if="item.formula_id==39"
                >{{item.price*userinfo.get_owner.battery*item.num|subunitfile}}</span>
                <span v-if="item.formula_id==40">
                  <!-- 摩托车 -->
                  <template
                    v-if="item.id==14"
                  >
                  {{item.price*userinfo.get_owner.motorbike*item.num|subunitfile}}
                  </template>
                 <!-- 三轮车 -->
                  <template
                    v-if="item.id==30"
                  >{{item.price*userinfo.get_owner.tricycle*item.num|subunitfile}}</template>
                </span>
                <span v-if="item.formula_id==46">{{item.price*item.num|subunitfile}}</span>

   <span v-if="item.formula_id==47">
                  {{item.price*userinfo.get_owner.tricycle*item.num|subunitfile}}
     </span>

                <span v-if="item.formula_id==41">{{item.price*item.num|subunitfile}}</span>
              </el-form-item>
            </el-form>
            <el-form label-width="80px">
              <el-form-item label="计算方式">
                <span>{{item.getcharge.calcula_name}}</span>
              </el-form-item>
            </el-form>

            <el-form label-width="80px">
              <el-form-item label="实收">
                <el-col :span="11">
                  <el-input v-model="item.paid" placeholder="请输入金额" v-if="item.formula_id"></el-input>
                  <el-input v-model="item.paid" placeholder="请输入金额" v-else></el-input>
                </el-col>
              </el-form-item>
            </el-form>

            <el-form label-width="80px" v-if="item.category_id===30||item.category_id===27">
              <el-form-item label="收费时间">
                <el-col :span="11">
                  <el-input v-model="item.desc" type="textarea" :rows="2" placeholder="收费时间请手动录入"></el-input>
                </el-col>
              </el-form-item>
            </el-form>

          </el-card>
        </div>
      </el-card>
    </div>
    <div class="btn">
      <el-button type="primary" v-if="list.length>0||yjlist.length>0" @click="showDialog">下一步</el-button>
    </div>

    <el-dialog title="订单确认" :modal="false" :visible.sync="dialogVisible" width="50%">
      <div class="order">
        <div class="order-list">
          <div class="title">账单费用:</div>
          <div class="conent price">¥{{sum+ordersum|fltext}}</div>
        </div>
        <div class="order-list">
          <div class="title">收费备注:</div>
          <div class="conent">
            <input v-model="temp.desc" />
          </div>
        </div>
        <div class="order-list">
          <div class="title">应缴金额:</div>
          <div class="conent">
            <input v-model="temp.price" :disabled="is_price" />
          </div>
        </div>
        <div class="order-list">
          <el-radio-group v-model="temp.type" @change="handetype">
            <el-radio :label="1">转账</el-radio>
            <el-radio :label="2">刷卡</el-radio>
            <el-radio :label="3">支付宝</el-radio>
            <el-radio :label="4">微信</el-radio>
            <el-radio :label="5">现金</el-radio>
            <el-radio :label="6">存款</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-show="hideposit">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="!is_Post" @click="handelPostOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUserBillbyItem,
  getByList,
  getByListt,
  getHousingitem
} from "@/api/meter";

import { OnekeyPay } from "@/api/order";

import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { mapGetters } from "vuex";

export default {
  name: "ComplexTable",
 
  computed: {
    ...mapGetters(["communit"])
  },
  filters: {
     numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2); // num.toFixed(2)获取的是字符串
      return parseFloat(realVal);
    },
    sumFixed(str, len) {
      return str.toFixed(2);
    },
    //应缴
    tocalculate(row) {
      var sum = 0;
      for (let i = 0; i < row.length; i++) {
        sum += parseFloat(row[i].to_paid);
      }
      return sum.toFixed(2);
    },
    //已缴
    paidcalculate(row) {
      var sum = 0;
      for (let i = 0; i < row.length; i++) {
        sum += parseFloat(row[i].paid);
      }
      return sum.toFixed(2);
    },
    //欠款
    arrears(row) {
      var sum = 0;
      for (let i = 0; i < row.length; i++) {
        sum += parseFloat(row[i].to_paid - row[i].paid);
      }
      return sum.toFixed(2);
    },
    AddMouth(num) {
      if (num === undefined) {
        return "请先增加时间";
      }
      var date = new Date();

      //date为格式化后的日期字符yyyy-MM-dd,num为增加的月份
      var monthnum = parseInt(num);
      date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + 31;

      var year = parseInt(date.substring(0, 4));
      var month = parseInt(date.substring(5, 7));
      var day = parseInt(date.substring(7, 10));

      if (month + monthnum > 12) {
        var newyear = year + 1;
        var newmonth = month + monthnum - 12;
        var newday = day;
      } else {
        var newyear = year;
        var newmonth = month + monthnum;
        var newday = day;
      }
      var newdate = newyear + "-" + newmonth + "-" + newday;
      return newdate;
    },
    fltext(val) {
      return val.toFixed(2);
    },

    subunitfile(str) {
      if(str===NaN){
        console.log(111)
        return 0;
      }else{
      return parseFloat(str).toFixed(2);

      }
    },
    sumfile(str) {
      if (str < 1) {
        return 1;
      }
    }
  },
  data() {
    return {
      is_Post:true,
      hideposit: true,
      housing_id: 0,
      radio: [],
      dialogVisible: false,
      checkList: [],
      yjlist: [],
      chargelist: [],
      sumBill: {
        unpaidamount: 0.0,
        already: 0.0
      },
      temp: {
        price: 0, //缴费金额
        type: 0, //缴费方式
        bill_no: "", //订单号
        housing_id: 0, //房号
        admin_id: 0 //操作人
      },
      dialogImport: false,
      housing: [],
      unit: [], //单元
      house_number: [], //门牌号
      categorylistd: [],
      category_type: 1,
      tableKey: 0,
      is_price: true,
      list: [],
      total: 0,
      sum: 0,
      userinfo: {
        get_owner: {
          id: 9999999999
        }
      },
      ordersum: 0, //订单总价包括预缴费
      listQuery: {
        page: 1,
        limit: 20,
        community_id: undefined,
        building_id: undefined,
        name: undefined,
        category: undefined
      }
    };
  },

  created() {
    this.getList();
    this.temp.admin_id = this.communit.id;
    if (this.communit.is_price === 0) {
      this.is_price = false;
    } else {
      this.is_price = true;
    }
    this.listQuery.community_id = this.communit.communit_id;
    // console.log(this.sumBill);
  },
  methods: {
    handetype(e) {
      if (e === 6) {
        if (parseFloat(this.temp.price) > parseFloat(this.userinfo.deposit)) {
          this.$message({
            message: "存款不足",
            type: "warning"
          });
          this.hideposit = false;
        }
      } else {
        this.hideposit = true;
      }
    },
    handelchange(row) {
      console.log(row)
      row.paid = row.price * row.num;
      if (row.formula_id === 19) {
        row.paid = row.paid * this.userinfo.construction_area;
      }

        if (row.formula_id === 39) {
        row.paid = row.paid * this.userinfo.get_owner.battery;
      }
      if (row.formula_id === 36) {
        if(this.userinfo.get_owner.automobile<1){
          this.$message.error('该户没有小车');
        }

        row.paid = row.paid * this.userinfo.get_owner.automobile;
      }
      row.paid = parseFloat(row.paid).toFixed(2);
    },
    showDialog() {
         

      this.dialogVisible = true;
      var sum = 0;
      var yjlist = this.yjlist;
      for (let i = 0; i < yjlist.length; i++) {
        console.log(yjlist)
        if (yjlist[i].formula_id === 19) {
          sum =
            sum +
            yjlist[i].num * yjlist[i].price * this.userinfo.construction_area;
        }
        if (yjlist[i].formula_id === 17) {
          sum = sum + yjlist[i].num * yjlist[i].price;
        }

        if (yjlist[i].formula_id === 36) {
          sum =
            sum +
            yjlist[i].num *
              yjlist[i].price *
              this.userinfo.get_owner.automobile;
        }
        if (yjlist[i].formula_id === 39) {
          sum =
            sum +
            yjlist[i].num *
              parseFloat( yjlist[i].price) *
              this.userinfo.get_owner.battery;
        }
        if (yjlist[i].formula_id === 40) {

         if(yjlist[i].id===14){
          sum = sum + yjlist[i].num * yjlist[i].price * this.userinfo.get_owner.motorbike;
        }
         if(yjlist[i].id===30){
          sum = sum + yjlist[i].num * yjlist[i].price * this.userinfo.get_owner.tricycle;
        }
        }

        if (yjlist[i].formula_id === 46) {
          sum = sum + yjlist[i].num * yjlist[i].price;
        }
        if (yjlist[i].formula_id === 41) {
          sum = sum + yjlist[i].num * yjlist[i].price;
        }
      }
      this.ordersum = (sum * 100000000000000000000) / 100000000000000000000;
      this.temp.price = (this.sum + this.ordersum).toFixed(2);
    },
    //选择与选项
    handelChange(e) {
      this.yjlist = e;
    },
    // 提交订单
    handelPostOrder() {
      this.is_Post=false
      if(this.temp.type===0){
         this.is_Post=true;
        this.$notify.error({
          title: '错误',
          message: '请选择支付方式'
        });
        return;
      }
      var order = [];
      var che = [];
      for (let i = 0; i < this.list.length; i++) {
        order.push(this.list[i].bill_no);
        for (let k = 0; k < this.list[i].get_bill.length; k++) {
          if (this.list[i].get_bill[k].che) {
            che.push(this.list[i].get_bill[k].id);
          }
        }
      }
      this.temp.housing_id = this.listQuery.housing_id;
      this.temp.bill_no = order;
      this.temp.che = che;
      this.temp.admin_id = this.communit.id;
      this.temp.community_id = this.communit.communit_id;
      this.temp.yjlist = this.yjlist;
      OnekeyPay(this.temp).then(res => {
        this.$confirm("是否打印账单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
        this.is_Post=true;

          this.$router.push({ path: "/record/toview/" + res.data.data });
        });
      });
    },
    toche(index, sindex) {
      if (this.list[index].get_bill[sindex].che === true) {
        this.sum = parseFloat(
          this.sum + parseFloat(this.list[index].get_bill[sindex].to_paid)
        );
      } else {
        this.sum = parseFloat(
          this.sum - parseFloat(this.list[index].get_bill[sindex].to_paid)
        );
      }
    },
    handleBuilding(e) {
      var temp = {
        type: "unit",
        building: this.housing[e].building
      };
      getHousingitem(temp).then(res => {
        this.unit = res.data.data;
      });
      var temp = {
        type: "house_number",
        building: this.housing[e].building,
        unit: this.housing[e].unit
      };
    },
    handleNmuber(e) {
      var temp = {
        type: "house_number",
        building: this.unit[e].building,
        unit: this.unit[e].unit
      };
      this.house_number = [];
      getHousingitem(temp).then(res => {
        this.house_number = res.data.data;
      });
    },
    getList() {
      this.listLoading = true;
      var temp = {
        type: "building",
          community_id:this.communit.communit_id
      };
      getHousingitem(temp).then(res => {
        this.housing = res.data.data;
      });
      if (this.listQuery.housing_id === undefined) {
        return false;
      }
    this.listQuery.communit_id=this.communit.communit_id
      getUserBillbyItem( this.listQuery).then(res => {
        var data = res.data.data.data;
        this.chargelist = res.data.charge;
        for (let i = 0; i < data.length; i++) {
          for (let k = 0; k < data[i].get_bill.length; k++) {
            data[i].get_bill[k].che = true;
            this.sum = this.sum + parseFloat(data[i].get_bill[k].to_paid);
          }
        }
        this.temp.price = parseFloat(this.sum).toFixed(2);
        this.list = data;
        this.yjlist = [];
      });
    },
    handleFilter(e) {
      var that = this;
      that.yjlist = [];
      this.userinfo = {
        get_owner: {}
      };
      this.sum = 0;
      for (let i = 0; i < this.house_number.length; i++) {
        if (this.house_number[i].id === e) {
          this.userinfo = this.house_number[i];
        }
      }
      (this.categorylistd = []),
        (this.categorylist = []),
        (this.calculatelist = []),
        (this.listQuery.page = 1);
      this.checkList = [];
      this.getList();
    }
  }
};
</script>

<style  scoped>
.order {
  display: flex;
  flex-direction: column;
}
.order .order-list {
  font: 15px/1.5 "微软雅黑", tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif;
  display: flex;
  flex-direction: row;
  height: 40px;
  align-items: center;
}
.order .order-list .title {
  color: #333;
  width: 15%;
  text-align: right;
}
.order .order-list .conent {
  width: 80%;
}
.p-title {
  width: 20%;
  display: contents;
}
.p-price {
  width: 80%;
  float: right;
}
.d-list {
  height: 35px;
  line-height: 35px;
  height: 35px;
  font: 16px/1.5 "微软雅黑", tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif;
  color: #333;
}
.d-list .title {
  width: 20%;
}
.price {
  color: red;
  padding-left: 10px;
}
.d-list .price,
.el-input--medium {
  width: 80%;
  color: red;
}
.btn {
  text-align: center;
  margin-top: 30px;
}
.list-head {
  background: #e7e7e7;
  text-indent: 10px;
  border: 1px solid #ccc;
  border-top: none;

  height: 40px;
  line-height: 40px;
}
.conent-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  background: #fff;
  border: 1px solid #ccc;
  color: #333;
  justify-content: center;
  border-top: none;
}
.conent-list div {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-right: 1px solid #ccc;
}
.conent-head {
  width: 100%;
  display: flex;
  flex-direction: row;
  background: #e7e7e7;
  border: 1px solid #ccc;
  color: #333;
  text-align: center;
  justify-content: center;
}
.conent-head div {
  width: 100%;
  height: 40px;
  line-height: 40px;
  /* text-align: center; */
  border-right: 1px solid #ccc;
}
.conent-head div:last-child {
  border-right: none;
}
code {
  margin-bottom: 0;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
  margin-top: 20px;
  margin-right: 30px;
}
.card-conent .el-card {
  margin-top: 30px;
}
.group .el-checkbox {
  margin-right: 20px;
}
</style>

