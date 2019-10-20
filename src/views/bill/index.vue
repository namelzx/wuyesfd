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
        @change="handleBuilding">
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
        @change="handleNmuber">
        <el-option v-for="(item,index) in unit" :key="item.id" :label="item.unit" :value="index"/>
      </el-select>
      <el-select
        clearable
        v-model="listQuery.housing_id"
        style="width: 140px"
        class="filter-item"
        placeholder="选择房间号"
        filterable
        @change="handleFilter">
        <el-option
          v-for="item in house_number"
          :key="item.id"
          :label="item.house_number"
          :value="item.id"
        />
      </el-select>

        <el-date-picker
      v-model="listQuery.year_time"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
    </div>
    <code>
      <el-row>
        <el-col :span="4">待缴金额 {{sumBill.unpaidamount}}</el-col>
        <el-col :span="4">已缴金额 {{sumBill.already}}</el-col>
      </el-row>
    </code>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      
      <el-table-column label="房号" width="150px" align="center">
        <template slot-scope="scope">
            <router-link :to="'/bill/toview/'+scope.row.bill_no">
          <span>{{ scope.row.get_housing.building }}{{scope.row.get_housing.unit}}{{scope.row.get_housing.house_number}}</span>
     </router-link>
        </template>
      </el-table-column>
   
      <el-table-column label="业主姓名" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.get_owner.owner_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应缴费用" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.get_bill|tocalculate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已缴费用" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.get_bill |paidcalculate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="欠款" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.get_bill | arrears}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账单日期" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.meter_time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账单状态" min-width="150px" align="center">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.get_bill|calculate}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogImport">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="上次读数">
          <el-input v-model="temp.last_number"/>
        </el-form-item>
        <el-form-item label="本次读数">
          <el-input v-model="temp.this_number"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getByList,
  getByListt,
  getLIDataByDelete,
  postDataByUpdate,
  getHousingitem
} from "@/api/meter";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { mapGetters } from "vuex";

import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
const calendarTypeOptions = [
  { id: "1", name: "一级配置项" },
  { id: "2", name: "二级配置项" }
];

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.id] = cur.name;
  return acc;
}, {});
export default {
  name: "ComplexTable",
  components: { Pagination, UploadExcelComponent },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    numFilter(value) {
      // 截取当前数据到小数点后两位

      let realVal = parseFloat(value).toFixed(2); // num.toFixed(2)获取的是字符串

      return parseFloat(realVal);
    },

    typeFilter(type) {
      const statusMap = {
        1: "费项类型",
        2: "收费公式"
      };
      return statusMap[type];
    },
    calculate(row) {
      var to_paid = 0;
      var paid = 0;
      var sum = 0;
      for (let i = 0; i < row.length; i++) {
        to_paid += parseFloat(row[i].to_paid);
        paid += parseFloat(row[i].paid);
      }
      if (to_paid === paid) {
        return "已缴";
      }
      if (paid < 1) {
        return "未缴";
      }
      if (paid < to_paid) {
        return "未缴清";
      }
      return "用户账单异常";

      //   if (sum < 1) {
      //     return "未缴费";
      //   }
      //   if (sum === 0) {
      //     return "已缴";
      //   }
      return sum;
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
    }
  },
  computed: {
    ...mapGetters(["communit"])
  },
  
  data() {
    return {
      sumBill:  {
        unpaidamount:0.00,
        already:0.00
      },
      dialogImport: false,
      housing: [],
      categorylistd: [],
      category_type: 1,
      tableKey: 0,
      list: null,
      house_number:[],
      unit:[],
      total: 0,
      category: [], //总分类
      categorylist: [],
      calculatelist: [], //一级收费公式
      calculalist: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        community_id: undefined,
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
      //  this.$notify({
      //     title: '通知',
      //     message: '有人缴费了',
      //     type: 'warning'
      //   });
    this.getList();
    this.listQuery.community_id=this.communit.communit_id
    // console.log(this.sumBill);
  },
  methods: {
     handleBuilding(e) {
      var temp = {
        type: "unit",
        building: this.housing[e].building,
        community_id:this.communit.communit_id
      };
      getHousingitem(temp).then(res => {
        this.unit = res.data.data;
      });
      var temp = {
        type: "house_number",
        building:this.housing[e].building,
        unit: this.housing[e].unit
      };
    },
    handleNmuber(e) {
      var temp = {
        type: "house_number",
         building:this.unit[e].building,
          unit: this.unit[e].unit
      };
       this.house_number =[]
      getHousingitem(temp).then(res => {
        this.house_number = res.data.data;
      });
    },
    /**
     * 清空已有选择方式
     */
    handeVisible(e) {
      if (e) {
        this.calculalist = [];
      }
    },
    /**
     * 收费类型
     */
    handelCategory(e) {
      for (var i = 0; i < this.category.length; i++) {
        if (this.category[i].id == e) {
          this.temp.category_name = this.category[i].name;
        }
      }
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      var arr = [];
      for (let i = 0; i < results.length; i++) {
        if (results[i].表名称 === "水表") {
          arr.push({
            community_id: getCommunity(),
            last_number: results[i].上次读数,
            this_number: results[i].本次读数,
            meter_time: results[i].抄表日期,
            wheredata: {
              building: results[i].楼栋,
              unit: results[i].单元,
              house_number: results[i].房号
            }
          });
        }
      }
      postDataByAdd(arr).then(res => {
        if (res.data.status === 201) {
          this.$notify({
            title: "警告",
            message: res.data.msg,
            type: "warning",
            duration: 2000
          });
          this.dialogImport = false;
          return false;
        }
        this.dialogImport = false;
        this.$notify({
          title: "成功",
          message: res.data.msg,
          type: "success",
          duration: 2000
        });
      });
    },
    getList() {
      this.listLoading = true;
      getByListt(this.listQuery).then(response => {
        this.list = response.data.data.data;
        this.total = response.data.data.total;
        this.sumBill = response.data.msg;
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
  var temp = {
        type: "building",
        community_id:this.communit.communit_id
      };
      getHousingitem(temp).then(res => {
        this.housing = res.data.data;
      });
    },
    handleFilter() {
      (this.categorylistd = []),
        (this.categorylist = []),
        (this.calculatelist = []),
        (this.listQuery.page = 1);
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    handleCreate() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.temp.numeral = "BH" + Date.parse(new Date());
      postDataByAdd(this.temp).then(() => {
        this.list.unshift(this.temp);
        this.dialogFormVisible = false;
        this.$notify({
          title: "成功",
          message: "创建成功",
          type: "success",
          duration: 2000
        });
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj

      for (var i = 0; i < this.category.length; i++) {
        if (this.category[i].pid == row.calculate_id) {
          this.calculalist.push(this.category[i]);
        }
      }
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    updateData() {
      const tempData = Object.assign({}, this.temp);
      postDataByUpdate(tempData).then(() => {
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v);
            this.list.splice(index, 1, this.temp);
            break;
          }
        }
        this.dialogFormVisible = false;
        this.$notify({
          title: "成功",
          message: "更新成功",
          type: "success",
          duration: 2000
        });
      });
    },
    handleDelete(row) {
      getLIDataByDelete(row.id).then(res => {});
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    }
  }
};
</script>

<style>
code {
  margin-bottom: 0;
}
.filter-container .filter-item{
  margin-bottom: 0;
}
</style>

