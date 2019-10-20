<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-container">
        <el-select
          clearable
          v-model="ulistQuery.building_id"
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
          v-model="ulistQuery.unit_id"
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

        <el-select
          clearable
          v-model="listQuery.online"
          style="width: 140px"
          class="filter-item"
          placeholder="费项"
          filterable
          @change="handleFilter"
        >
          <el-option
            v-for="item in onlineMap"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>

        <el-select
          clearable
          v-model="listQuery.channel"
          style="width: 140px"
          class="filter-item"
          placeholder="缴费渠道"
          filterable
          @change="handleFilter"
        >
          <el-option
            v-for="item in channelMap"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>

        <el-select
          clearable
          v-model="listQuery.type"
          style="width: 140px"
          class="filter-item"
          placeholder="支付方式"
          filterable
          @change="handleFilter"
        >
          <el-option
            v-for="item in typeMap"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>

        <el-select
          clearable
          v-model="listQuery.status"
          style="width: 140px"
          class="filter-item"
          placeholder="交易状态"
          filterable
          @change="handleFilter"
        >
          <el-option
            v-for="item in statusMap"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-date-picker
        v-model="listQuery.year_time"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
    </div>

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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" inline class="demo-table-expand">
            <el-table ref="filterTable" :data=" props.row.mett" style="width: 100%">
              <el-table-column prop="name" label="收费项名称" width="180"></el-table-column>
              <el-table-column prop="to_paid" label="金额" width="180"></el-table-column>
            </el-table>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="房号" width="150px" align="center">
        <template slot-scope="scope">
          <router-link :to="'/record/toview/'+scope.row.bill_no">
            <span
              v-if=" scope.row.get_housing"
            >{{ scope.row.get_housing.building }}{{scope.row.get_housing.unit}}{{scope.row.get_housing.house_number}}</span>
            <span v-else>临时用户</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="业主姓名" min-width="150px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.get_housing">{{ scope.row.get_housing.get_owner.owner_name }}</span>
          <span v-else>临时用户</span>
        </template>
      </el-table-column>
      <el-table-column label="费项" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.online|onlineSatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="交易金额" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="收缴渠道" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.channel|channelSatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="交易状态" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column label="交易时间" min-width="180px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.create_time">{{ scope.row.create_time| parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作员" min-width="150px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.get_pay">{{ scope.row.get_pay.realname}}</span>
          <span v-else>用户自助缴费</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handelshorder(scope.row,scope.row.id)">撤回</el-button>
          <router-link v-if="scope.row.online<3" :to="'/record/toview/'+scope.row.bill_no">
            <el-button type="text" size="small">打印</el-button>
          </router-link>
          <router-link v-else :to="'/bill/toview/'+scope.row.bill_no">
            <el-button type="text" size="small">打印</el-button>
          </router-link>
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
  </div>
</template>
<script>
import { getByListt, getOrderByWithdraw } from "@/api/order";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { mapGetters } from "vuex";

import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

import { getHousingitem } from "@/api/meter";
export default {
  name: "ComplexTable",
  components: { Pagination, UploadExcelComponent },
  directives: { waves },
  filters: {
    onlineSatus(str) {
      if (str === 1) {
        return "一键缴费";
      }
      if (str === 2) {
        return "单项缴费";
      }
      if (str === 3) {
        return "临时缴费";
      }
      if (str === 4) {
        return "存款";
      }
    },
    channelSatus(str) {
      if (str === 1) {
        return "线上缴费";
      } else {
        return "服务中心缴费";
      }
    }
  },
  computed: {
    ...mapGetters(["communit"])
  },
  computed: {
    ...mapGetters(["communit"])
  },

  data() {
    return {
      listLoading: false,
      tableKey: 0,
      list: null,
      total: 0,
      housing: [],
      unit: [], //单元
      house_number: [], //门牌号
      categorylistd: [],
      category_type: 1,
      onlineMap: [
        {
          text: "一键缴费",
          value: 1
        },
        {
          text: "单项缴费",
          value: 2
        },
        {
          text: "临时缴费",
          value: 3
        },
        {
          text: "预缴费",
          value: 4
        },
        
      ],
      channelMap: [
        {
          text: "线上缴费",
          value: 1
        },
        {
          text: "服务中心缴费",
          value: 2
        }
      ],
      statusMap: [
        {
          text: "完成",
          value: 1
        },
        {
          text: "冻结",
          value: 2
        },
        {
          text: "撤回",
          value: 3
        }
      ],

      typeMap: [
        {
          text: "转账",
          value: 1
        },
        {
          text: "刷卡",
          value: 2
        },
        {
          text: "支付宝",
          value: 3
        },
        {
          text: "微信",
          value: 4
        },
        {
          text: "现金",
          value: 5
        },
        {
          text: "小程序缴费",
          value: 6
        }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        community_id: undefined,
        name: undefined,
        category: undefined
      },
      form: {},
      ulistQuery: {
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
    this.ulistQuery.community_id = this.communit.communit_id;

    // this.$notify({
    //   title: "通知",
    //   message: "有人缴费了",
    //   type: "warning"
    // });
    this.getList();
    this.listQuery.community_id = this.communit.communit_id;
    // console.log(this.sumBill);
  },
  methods: {
    handelshorder(row, id) {
      if (this.communit.is_shorder === 0) {
        this.$message({
          message: "你没有权限",
          type: "warning"
        });
        return;
      }

      this.$confirm("账单撤回, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getOrderByWithdraw(id).then(res => {
            console.log(id);
            row.status="撤回"
               this.$message({
            type: 'success',
            message: '撤回成功!'
          });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onlineHandler(value, row, column) {
      const property = column["online"];
      return row[property] === value;
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

    getList() {
      this.listLoading = true;

      var temp = {
        type: "building",
          community_id:this.communit.communit_id
      };
      getHousingitem(temp).then(res => {
        this.housing = res.data.data;
      });
      getByListt(this.listQuery).then(response => {
        this.list = response.data.data.data;
        this.total = response.data.data.total;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
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
</style>

