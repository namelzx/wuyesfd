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
        <el-form-item label="收费金额">
          <el-col :span="11">
            <el-input v-model="form.to_paid"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-col :span="11">
            <el-input v-model="form.desc"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认收费</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn">
      <el-button type="primary" v-if="list.length>0" @click="dialogVisible = true">下一步</el-button>
    </div>
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
import { getCategory } from "@/api/category";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { mapGetters } from "vuex";
import { getCharge } from "@/api/charge";
export default {
  name: "ComplexTable",
  filters: {
    sumfilter(str) {
      return this.form.to_paid * this.form.deposit;
    },
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
    }
  },
  data() {
    return {
      strprice: 0,
      housing_id: undefined,
      charge: [],
      dialogVisible: false,
      checkList: [],
      sumBill: {
        unpaidamount: 0.0,
        already: 0.0
      },
      temp: {},
      deposit: 1,
      form: {
        online: 4,
        name: 0
      },
      housing: [],
      unit: [], //单元
      house_number: [], //门牌号
      categorylistd: [],
      category_type: 1,
      tableKey: 0,
      list: [],
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
  watch: {
    deposit(newvalue, value) {
      this.form.deposit = newvalue;
      if (newvalue > 0) {
        this.form.to_paid = newvalue * this.strprice;
      }
      if ((newvalue / 12) % 1 === 0) {
        this.form.to_paid = this.form.to_paid - (newvalue / 12) * this.strprice;
        this.form.desc =
          "满" + newvalue + "个月减免" + newvalue / 12 + "月费用";
      }
    }
  },
  created() {
    this.getList();
    getCategory().then(res => {
      this.category = res.data;
    });
    this.form.admin_id = this.communit.id;
    this.listQuery.community_id = this.communit.communit_id;
    // console.log(this.sumBill);
  },
  methods: {
    handleadvance() {
      for (let i = 0; i < this.charge.length; i++) {
        if (this.charge[i].charge_id == this.form.category_id) {
          this.form.name =
            "预缴" +
            this.charge[i].get_charging.note +
            this.charge[i].get_charging.getcharge.fee_name;
          this.form.to_paid = parseFloat(this.charge[i].get_charging.price);
          this.strprice = this.form.to_paid;
        }
      }
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
      var order = [];
      for (let i = 0; i < this.list.length; i++) {
        order.push(this.list[i].bill_no);
      }
      this.temp.housing_id = this.list[0].housing_id;
      this.temp.bill_no = order;

      OnekeyPay(this.temp).then(res => {
        console.log(res);
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
      getCharge(this.form.housing_id).then(res => {
        this.charge = res.data;
      });
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

<style  >
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
.conent-head div {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-right: 1px solid #ccc;
}
.conent-head div:last-child {
  border-right: none;
}
code {
  margin-bottom: 0;
}
</style>

