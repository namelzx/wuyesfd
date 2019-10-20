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
        <el-option v-for="(item,index) in unit" :key="item.id" :label="item.unit" :value="index"/>
      </el-select>

      <el-select
        clearable
        v-model="form.housing_id"
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
        <el-col :span="4">房号 {{userinfo.building+userinfo.unit+userinfo.house_number}}</el-col>
        <el-col :span="4">业主姓名 {{userinfo.get_owner.owner_name}}</el-col>
        <el-col :span="4">联系电话 {{userinfo.get_owner.mobile}}</el-col>
        <el-col :span="4">建筑面积 {{userinfo.construction_area}}</el-col>
      </el-row>
    </code>
    <div class="conent">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="group">
          <el-checkbox-group v-model="checkList" @change="handelChange">
            <el-row :gutter="10">
              <el-col :span="20">
                <el-checkbox
                  v-for="(item,index) in category"
                  :label="item"
                  :key="index"
                  :value="item"
                >
                  <template v-if="item.getcharge">{{item.note+item.getcharge.fee_name}}</template>
                </el-checkbox>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </div>
        <el-card class="box-card" v-for="(item,index) in yjlist" :key="index">
          <div slot="header" class="clearfix">
            <span v-if="item.getcharge">{{item.note+item.getcharge.fee_name}}</span>
          </div>
          <el-form label-width="80px">
            <el-form-item label="当前单价">
              <span>{{item.price*1000/1000}}</span>
            </el-form-item>
          </el-form>
          <el-form label-width="80px">
            <el-form-item label="月">
              <el-input-number v-model="item.num" :min="1" :max="12" @change="handelchange(item)"></el-input-number>
            </el-form-item>
          </el-form>
          <el-form label-width="80px">
            <el-form-item label="应缴纳">
              <span
                v-if="item.formula_id==19"
              >{{item.price*item.num*userinfo.construction_area|subunitfile}}</span>
              <span v-if="item.formula_id==17">{{item.price*item.num|subunitfile}}</span>
              <span v-if="item.formula_id==36">{{item.price*item.num|subunitfile}}</span>
              <span v-if="item.formula_id==39">{{item.price*item.num|subunitfile}}</span>

              <span v-if="item.formula_id==40">{{item.price*item.num|subunitfile}}</span>
             <span
                  v-if="item.formula_id==46"
                >{{item.price*item.num|subunitfile}}</span>
                    <span
                  v-if="item.formula_id==41"
                >{{item.price*item.num|subunitfile}}</span>
            </el-form-item>
          </el-form>
          <el-form label-width="80px">
            <el-form-item label="实收">
              <el-col :span="11">
                <el-input v-model="item.paid" placeholder="请输入内容"></el-input>
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
          <el-form label-width="80px">
            <el-form-item label="计算方式">
              <span>{{item.getcharge.calcula_name}}</span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-form>
    </div>
    <div class="btn">
      <el-button type="primary" v-if="yjlist.length>0" @click="handeldialogVisible ">下一步</el-button>
    </div>

    <el-dialog title="订单确认" :modal="false" :visible.sync="dialogVisible" width="50%">
      <div class="order">
        <div class="order-list">
          <div class="title">账单费用:</div>
          <div class="conent price">¥{{sum}}</div>
        </div>
        <div class="order-list">
          <div class="title">收费备注:</div>
          <div class="conent">
            <input v-model="temp.desc">
          </div>
        </div>
        <div class="order-list">
          <el-radio-group v-model="temp.type">
            <el-radio :label="1">转账</el-radio>
            <el-radio :label="2">刷卡</el-radio>
            <el-radio :label="3">支付宝</el-radio>
            <el-radio :label="4">微信</el-radio>
            <el-radio :label="5">现金</el-radio>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelPostOrder">确 定</el-button>
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

import { OnekeyPay, postTemporary } from "@/api/order";
import { temporaryCategory } from "@/api/category";

import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { mapGetters } from "vuex";

export default {
  name: "ComplexTable",
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2); // num.toFixed(2)获取的是字符串
      return parseFloat(realVal);
    },
    sumFixed(str, len) {
      return str.toFixed(2);
    }
  },
  computed: {
    ...mapGetters(["communit"])
  },
  filters: {
    fltext(val) {
      return val.toFixed(2);
    },
    subunitfile(str) {
      return parseFloat(str).toFixed(2);
    }
  },
  data() {
    return {
      radio: [],
      dialogVisible: false,
      checkList: [],
      sumBill: {
        unpaidamount: 0.0,
        already: 0.0
      },
      temp: {
        type:1,
      },
      form: {
        online: 3
      },
      housing: [],
      unit: [], //单元
      house_number: [], //门牌号
      categorylistd: [],
      category_type: 1,
      tableKey: 0,
      list: [],
      yjlist: [],
      total: 0,
      sum: 0,
      userinfo: {
        get_owner: {}
      },
      category: [],
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
    temporaryCategory().then(res => {
      this.category = res.data.data;
    });
    this.form.admin_id = this.communit.id;
    this.listQuery.community_id = this.communit.communit_id;
  },
  methods: {
    handeldialogVisible() {
      if (this.form.housing_id) {
        var sum=0;
        for (let i = 0; i < this.yjlist.length; i++) {
          sum =sum+ parseFloat(this.yjlist[i].paid)

      }
        this.sum=sum.toFixed(2)
        this.dialogVisible = true;
        return true
      }
      this.$message({
        message: "必须选择房间用户",
        type: "warning"
      });
    },
    handelchange(row) {
      row.paid = row.price * row.num;
      row.to_paid = row.price * row.num;
      if (row.formula_id === 19) {
        row.paid = row.paid * this.userinfo.construction_area;
        row.to_paid= row.price* this.userinfo.construction_area;
      }
      row.paid = parseFloat(row.paid).toFixed(2);
      row.to_paid = parseFloat(row.to_paid).toFixed(2);
    },
    //选择与选项
    handelChange(e) {
      this.yjlist = e;
    },
    onSubmit() {
      if (this.form.housing_id) {
        this.form.admin_id = this.communit.id;
        postTemporary(this.form).then(res => {
          this.$confirm("是否打印账单?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$router.push({ path: "/bill/toview/" + res.data });
          });
        });
        return true;
      }
      this.$message({
        message: "必须选择房间用户",
        type: "warning"
      });
    },
    // 提交订单
    handelPostOrder() {
      // return false
      if (this.form.housing_id) {
        this.temp.housing_id = this.userinfo.id;
        this.temp.online = 3;
        this.temp.yjlist = this.yjlist;
        this.temp.price = this.sum;
        this.temp.admin_id = this.communit.id;
         this.temp.community_id =this.communit.communit_id;
        OnekeyPay(this.temp).then(res => {
          this.$confirm("是否打印账单?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$router.push({ path: "/bill/toview/" + res.data.data });
          });
        });
      }
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
        unit: this.housing[e].unit
      };
      getHousingitem(temp).then(res => {
        this.house_number = res.data.data;
      });
    },

    handleNmuber(e) {
      var temp = {
        type: "house_number",
        building: this.unit[e].building,
        unit: this.unit[e].unit
      };
      getHousingitem(temp).then(res => {
        this.house_number = res.data.data;
      });
    },
    getList() {
      this.listLoading = true;

      var temp = {
        type: "building"
      };
      getHousingitem(temp).then(res => {
        this.housing = res.data.data;
      });
      if (this.listQuery.housing_id === undefined) {
        return false;
      }
    },
    handleFilter(e) {
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

      this.getList();
    }
  }
};
</script>

<style scoped >
.conent .el-checkbox-group {
  margin-bottom: 30px;
}
.el-card box-card is-always-shadow {
  margin-top: 30px;
}
.el-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 220px;
  /* margin-bottom: 10px; */
  margin-top: 13px;
  margin-left: 0;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
}
.order {
  display: flex;
  flex-direction: column;
}
.order .order-list {
  font: 20px/1.5 "微软雅黑", tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif;
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
  justify-content: center;
}

.conent-head div:last-child {
  border-right: none;
}
code {
  margin-bottom: 0;
}
.el-card.is-always-shadow {
  margin-top: 20px;
}
</style>

