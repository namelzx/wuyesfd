<template>
  <div class="index">
    <!-- 数据汇总 -->
    <div class="index-collect" v-if="homeData.meter">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>数据汇总</span>
        </div>
        <div class="item">
          <div class="item-list">
            <div class="list">
              <div class="list-icon">
                <i class="el-icon-printer"></i>
              </div>
              <div class="list-ranking">
                <div class="ranking-nums">
                  <span v-if="homeData.meter">{{homeData.meter.count}}</span>
                </div>
                <div class="ranking-title">今日已缴账单</div>
              </div>
            </div>
            <div class="schedule">
              <el-progress
                v-if="homeData.true_temp"
                :color="customColor"
                :percentage="homeData.true_temp.all_failure_percentage"
              ></el-progress>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-list">
            <div class="list">
              <div class="list-icon">
                <i class="el-icon-printer"></i>
              </div>
              <div class="list-ranking">
                <div class="ranking-nums">
                  <span>{{homeData.meter.sum}}</span>
                </div>
                <div class="ranking-title">今日缴纳金额</div>
              </div>
            </div>
            <div class="schedule">
              <el-progress :color="customColor" :percentage="homeData.true_temp.all_failure_price"></el-progress>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-list">
            <div class="list">
              <div class="list-icon">
                <i class="el-icon-printer"></i>
              </div>
              <div class="list-ranking">
                <div class="ranking-nums">
                  <span>{{homeData.fales_temp.all_price}}</span>
                </div>
                <div class="ranking-title">未缴纳金额</div>
              </div>
            </div>
            <div class="schedule">
              <el-progress :color="customColor" :percentage="homeData.fales_temp.all_failure_percentage"></el-progress>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-list">
            <div class="list">
              <div class="list-icon">
                <i class="el-icon-printer"></i>
              </div>
              <div class="list-ranking">
                <div class="ranking-nums">
                  <span>{{homeData.fales_temp.all_failure}}</span>
                </div>
                <div class="ranking-title">未缴纳笔数</div>
              </div>
            </div>
            <div class="schedule">
              <el-progress
                :color="customColor"
                :percentage="homeData.fales_temp.all_failure_percentage"
              ></el-progress>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 支付方式 -->
    <div class="index-dispose" v-if="disposelist.length>0">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>支付方式</span>
        </div>

        <div

          v-for="(item,index) in disposelist"
          :key="index"
          class="item"
          @click="todispose(index)"
        >

        
        <router-link  :to="'/record/index/'+item.type" >
          <el-tooltip class="items" effect="dark" :content="item.type" placement="bottom">
            <div>
              <div class="item-list">
                <div class="list-title">{{item.type}}</div>
                <div class="list-nums">
                  <span class="nums-bar">{{item.nums}}</span>
                  <span class="nums-un">笔</span>
                </div>
                <div class="list-money">
                  <span class="money-title">金额：</span>
                  <span>{{item.money}}</span>
                  <span>元</span>
                </div>
              </div>
              <div class="item-shade">
                <div class="shadeBox">
                  <div>数据明细</div>
                  <div>
                    <i class="el-icon-menu"></i>
                  </div>
                </div>
              </div>
            </div>
          </el-tooltip>
        </router-link>
        </div>
      </el-card>
    </div>

    <!--   图表 -->
    <div class="index-chart" >
      <div id="lineChart" :style="{width:'50%',height:'600px'}"></div>
      <div id="tuChart" :style="{width:'50%'}"></div>
    </div>
  </div>
</template>
<script>
  // import { getCuntslist, getCunpay } from "@/api/statistical";
  // import { getByList } from "@/api/statistical";
import { fetchList, getDataByList } from "@/api/transaction";
import { mapGetters } from "vuex";

  // import { getCommunity, setCommunity, removeCommunity } from "@/utils/community";

  // 引入 ECharts 主模块
  var echarts = require("echarts");

  export default {
    data() {
      return {
        dayData:[],
        customColor: "#a797fb", //进度条颜色
        homeData: {},
        collectlist: [],
        disposelist: [],
        titlelist: []
      };
    },
     computed: {
    ...mapGetters(["communit"])
  },
    filters: {},
    created() {
      this.getList();
    },
    methods: {
      togglebill(index) {
      },
      todispose(index) {
      },
      getList() {
        var where = {
          community_id: this.communit.communit_id,
          type: "day"
        };
        // getByList(where).then(res => {
        //   this.dayData=res.data.data.data
        //   this.mainzChar();
        // });
        getDataByList(this.communit.communit_id).then(response => {
          this.homeData = response.data;
          // if(response.data.orderType===)
          this.disposelist = response.data.orderType;

          if (response.data.status === 200) {

            this.mainChar();
          }
          // this.collectlist = response.data.data
        });
      },
      mainChar() {
        var lineChart = document.getElementById("lineChart");
        let myChart = echarts.init(lineChart);

        var option = {
          title: {
            text: "今日统计缴费方式汇总",
            subtext: "今日缴费(单位/笔)",
            x: "center",
            textStyle: {
              fontWeight: 400,
              fontSize: 16
            },
            subtextStyle: {
              color: "#00a5e8"
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: ["微信支付", "支付宝支付", "现金支付", "银行卡支付", "其他支付"]
            // data:titlels
          },
          color: ["#a797fb", "#f77388", "#b06bf8", "#4ce4d4", "#f8d185"],
          series: [
            {
              name: "支付来源",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: 703, name: "转账" },
                { value: 900, name: "刷卡" },
                { value: 234, name: "支付宝" },
                { value: 335, name: "微信" },
                { value: 500, name: "现金" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };

        let legend = [];
        let series = [];
        let array = this.disposelist;
        for (let index = 0; index < array.length; index++) {
          legend.push(array[index].type);
          series.push({ value: array[index].money, name: array[index].type });
        }

        option.legend.data = legend;
        option.series[0].data = series;
        //  option.legend[0].name='3333';
        myChart.setOption(option);
      },
      mainzChar(){


        //柱形图
        var tuChart = document.getElementById("tuChart");
        let mytuChart = echarts.init(tuChart);
        var optionls = {
          title: {
            text: "今日统计缴费收入汇总",
            subtext: "今日缴费(单位/元)",
            textStyle: {
              fontWeight: 400,
              fontSize: 16
            },
            subtextStyle: {
              color: "#00a5e8"
            }
          },
          xAxis: {
            type: "category",
            data: ["微信支付", "支付宝支付", "现金支付", "银行卡支付", " 其他支付"],
            axisLine: {
              lineStyle: {
                color: "#a797fb"
              }
            }
          },
          yAxis: {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#a797fb"
              }
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} 元"
          },
          series: [
            {
              name: "支付次数",
              data: [
                { value: 3238 },
                { value: 4938 },
                { value: 2035 },
                { value: 990 },
                { value: 1230 },
              ],
              // barWidth: 40,
              barMinHeight: 15,
              label: {
                show: true
              },
              type: "bar",
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                      "#a797fb",
                      "#f77388",
                      "#b06bf8",
                      "#4ce4d4",
                      "#f8d185",
                      "#a797fb",
                      "#f77388",
                      "#b06bf8",
                      "#4ce4d4",
                      "#f8d185",
                      "#a797fb",
                      "#f77388",
                      "#b06bf8",
                      "#4ce4d4",
                      "#f8d185",
                      "#a797fb",
                      "#f77388",
                      "#b06bf8",
                      "#4ce4d4",
                      "#f8d185",
                      "#a797fb",
                      "#f77388",
                      "#b06bf8",
                      "#4ce4d4",
                      "#f8d185",
                      "#a797fb",
                      "#f77388",
                      "#b06bf8",
                      "#4ce4d4",
                      "#f8d185",
                      "#a797fb",
                      "#f77388",
                      "#b06bf8",
                      "#4ce4d4",
                      "#f8d185",
                      "#a797fb",
                      "#f77388",
                      "#b06bf8",
                      "#4ce4d4",
                      "#f8d185",
                    ];
                    return colorList[params.dataIndex];
                  },
                  barBorderRadius: [5, 5, 0, 0]
                }
              }
            }
          ]
        };

        let legend = [];
        let series = [];
        let array = this.dayData;
        for (let index = 0; index < array.length; index++) {
          legend.push(array[index].收费月份);
          series.push({ value: array[index].实收小计 });
        }

        optionls.xAxis.data = legend;
        optionls.series[0].data = series;
        mytuChart.setOption(optionls);
      }
    }

  };
</script>
<style lang="scss" scoped>
  .index-collect {
    margin: 30px auto 0;
    width: 95%;
    height: 170px;
    font-family: "Arial";
    /deep/ .el-card__body {
      padding: 0;
      display: flex;
    }
    .item {
      width: 25%;
      border-right: 1px solid #ebeef5;
      height: 110px;
      overflow: hidden;
      cursor: pointer;
      .item-list {
        margin-left: 20px;
        .list {
          margin-top: 20px;
          display: flex;
          .list-icon {
            width: 45px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            color: #ffffff;
            font-size: 25px;
            border-radius: 50%;
            background: #a797fb;
          }
          .list-ranking {
            margin-left: 20px;
            .ranking-nums {
              font-size: 18px;
              font-weight: 500;
              color: #000;
              margin-bottom: 5px;
            }
            .ranking-title {
              color: #333333ab;
              font-size: 15px;
            }
          }
        }
        .schedule {
          margin-top: 15px;
        }
      }
    }
  }
  /deep/ .el-progress-bar {
    width: 90% !important;
  }
  .index-dispose {
    margin: 30px auto;
    width: 95%;
    height: 250px;
    font-family: "Arial";
    /deep/ .el-card__body {
      padding: 20px 15px;
      display: flex;
      justify-content: space-between;
      .item {
        width: 18.5%;
        height: 135px;
        background: #a797fb;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        .item-list {
          margin: 15px;
          // height: 100px;
          color: #ffffff;
          .list-title {
            font-weight: 600;
            font-size: 15px;
          }
          .list-nums {
            display: flex;
            padding: 5px 0;
            span {
              display: inline-block;
            }
            .nums-bar {
              font-size: 30px;
            }
            .nums-un {
              margin-top: 12px;
              margin-left: 10px;
              font-size: 15px;
              font-weight: 500;
            }
          }
          .list-money {
            font-size: 16px;
            font-weight: 400;
          }
        }
        .item-shade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30px;
          line-height: 30px;
          background: rgba($color: #000000, $alpha: 0.1);
          .shadeBox {
            margin: 0 15px;

            display: flex;
            justify-content: space-between;
            color: #ffffff;
            font-size: 13px;
            font-weight: 600;
          }
        }
      }
      .item:nth-child(2) {
        background: #f77388;
      }
      .item:nth-child(3) {
        background: #b06bf8;
      }
      .item:nth-child(4) {
        background: #4ce4d4;
      }
      .item:nth-child(5) {
        background: #f8d185;
      }
    }
  }
  .index-chart {
    width: 95%;
    margin: 50px auto 30px;
    display: flex;
    justify-content: space-between;
  }
</style>
