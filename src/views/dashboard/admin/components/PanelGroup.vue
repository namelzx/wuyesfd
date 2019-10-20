<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="4" :sm="4" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description">
          <div class="card-panel-text">今日缴纳笔数</div>
          <count-to
            :start-val="0"
            :end-val="temp.meter[0].count"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col :xs="4" :sm="4" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description">
          <div class="card-panel-text">今日缴纳金额</div>
          <count-to
            :start-val="0"
            :end-val="temp.meter[0].sum"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  
   <el-col :xs="4" :sm="4" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description">
          <div class="card-panel-text">未缴纳笔数</div>
          <count-to
            :start-val="0"
            :end-val="temp.fales_temp.all_failure"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <el-col :xs="4" :sm="4" :lg="4" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-description">
          <div class="card-panel-text">未缴纳金额</div>
          <count-to
            :start-val="0"
            :end-val="temp.fales_temp.all_price"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import { fetchList, getDataByList } from "@/api/transaction";
import { mapGetters } from "vuex";

export default {
  components: {
    CountTo
  },
  computed: {
    ...mapGetters(["communit"])
  },
  data() {
    return {
      temp: {
        true_temp: {}
      }
    };
  },
  created() {
    getDataByList(this.communit.communit_id).then(res => {
      console.log(res.data);
      this.temp = res.data;
    });
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
