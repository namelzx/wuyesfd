<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="反馈人" width="70">
      <template slot-scope="scope" v-if="scope.row.get_owner">
        {{ scope.row.get_owner.owner_name }}
      </template>
    </el-table-column>
     <el-table-column label="反馈内容" min-width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.conent }}
      </template>
    </el-table-column>
    <el-table-column label="所属账单月份" min-width="195" align="center">
      <template slot-scope="scope">
        <span v-if=" scope.row.get_meter"> 
        {{ scope.row.get_meter.meter_time }}</span>
        <span v-else>该账单已被删除</span>
      </template>
    </el-table-column>
    <el-table-column label="联系电话" min-width="130" align="center">
      <template slot-scope="scope">
       <span>{{scope.row.phone }}</span>
      </template>
    </el-table-column>
      <el-table-column label="提交时间" min-width="100" align="center">
      <template slot-scope="scope">
        <span > {{ scope.row.create_time }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchList ,getDataByList} from '@/api/transaction'
import { mapGetters } from "vuex";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
   computed: {
    ...mapGetters(["communit"])
  },
  data() {
    return {
      list: null,
      meter:[],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getDataByList(this.communit.communit_id).then(res=>{
        console.log(res)
      this.list=res.data.fedback
      this.meter=res.data.meter
           this.$notify({
          title: '缴费通知',
          message: '今天有'+this.meter.length+'人缴费'
        });
      })
      // fetchList().then(response => {
      //   this.list = response.data.items.slice(0, 8)
      // })
    }
  }
}
</script>
