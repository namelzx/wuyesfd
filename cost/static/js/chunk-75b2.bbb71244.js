(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-75b2"],{"9olq":function(t,e,i){"use strict";var n=i("O1S+");i.n(n).a},HKPr:function(t,e,i){"use strict";var n=i("YPLS");i.n(n).a},Mz3J:function(t,e,i){"use strict";Math.easeInOutQuad=function(t,e,i,n){return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function a(t,e,i){var a=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,r=t-a,s=0;e=void 0===e?500:e;!function t(){s+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(s,a,r,e)),s<e?n(t):i&&"function"==typeof i&&i()}()}var r={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&a(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&a(0,800)}}},s=(i("HKPr"),i("KHd+")),o=Object(s.a)(r,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[i("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"cebf2f0c",null);o.options.__file="index.vue";e.a=o.exports},"O1S+":function(t,e,i){},YPLS:function(t,e,i){},ZySA:function(t,e,i){"use strict";var n=i("P2sY"),a=i.n(n),r=(i("jUE0"),{bind:function(t,e){t.addEventListener("click",function(i){var n=a()({},e.value),r=a()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),s=r.ele;if(s){s.style.position="relative",s.style.overflow="hidden";var o=s.getBoundingClientRect(),l=s.querySelector(".waves-ripple");switch(l?l.className="waves-ripple":((l=document.createElement("span")).className="waves-ripple",l.style.height=l.style.width=Math.max(o.width,o.height)+"px",s.appendChild(l)),r.type){case"center":l.style.top=o.height/2-l.offsetHeight/2+"px",l.style.left=o.width/2-l.offsetWidth/2+"px";break;default:l.style.top=(i.pageY-o.top-l.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",l.style.left=(i.pageX-o.left-l.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return l.style.backgroundColor=r.color,l.className="waves-ripple z-active",!1}},!1)}}),s=function(t){t.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(s)),r.install=s;e.a=r},bCzH:function(t,e,i){"use strict";i.d(e,"c",function(){return a}),i.d(e,"b",function(){return r}),i.d(e,"a",function(){return s}),i.d(e,"d",function(){return o});var n=i("t3Un");function a(t){return Object(n.a)({url:"/getHousingitem",method:"get",params:t})}function r(t){return Object(n.a)({url:"/bill/getBillByItem",method:"get",params:t})}function s(t){return Object(n.a)({url:"/bill/getBillChildByItem",method:"get",params:t})}function o(t){return Object(n.a)({url:"bill/getUserBillbyItem",method:"get",params:t})}},jUE0:function(t,e,i){},s9ly:function(t,e,i){"use strict";i.r(e);var n=i("QbLZ"),a=i.n(n),r=i("L2JU"),s=i("bCzH"),o=i("ZySA"),l=(i("7Qib"),i("Mz3J")),d=[{id:"1",name:"一级配置项"},{id:"2",name:"二级配置项"}],u=(d.reduce(function(t,e){return t[e.id]=e.name,t},{}),{computed:a()({},Object(r.b)(["sidebar","name","avatar","device","communit"])),name:"ComplexTable",components:{Pagination:l.a},directives:{waves:o.a},filters:{lastfile:function(t){return parseFloat(t).toFixed(0)},Arabia_To_SimplifiedChinese:function(t){if(!/^(0|[1-9]\d*)(\.\d+)?$/.test(t))return"数据非法";var e="千百拾亿千百拾万千百拾元角分",i="",n=(t+="00").indexOf(".");n>=0&&(t=t.substring(0,n)+t.substr(n+1,2)),e=e.substr(e.length-t.length);for(var a=0;a<t.length;a++)i+="零壹贰叁肆伍陆柒捌玖".charAt(t.charAt(a))+e.charAt(a);return i.replace(/零(千|百|拾|角)/g,"零").replace(/(零)+/g,"零").replace(/零(万|亿|元)/g,"$1").replace(/(亿)万|壹(拾)/g,"$1$2").replace(/^元零?|零分/g,"").replace(/元$/g,"元整")},statusFilter:function(t){},subunitfile:function(t){return 1e3*t/1e3},timeSubstring:function(t){if(46!==t.formula_id){var e=t.month.substring(0,4),i=t.month.substring(5,7),n=0;if(2===t.type){t.np>12&&(n=parseInt(t.np/12));var a=t.np-12*n;parseInt(i)+a>12?(n+=1,a=parseInt(i)+a-12):a+=parseInt(i),n=parseInt(e)+parseInt(n),i=parseInt(i)+1,parseInt(i)>12&&(e=parseInt(e)+1,i-=12),0===a&&(a=12);var r=new Date(n,a-1,1),s=r.getMonth(),o=new Date(r.getFullYear(),s+1,0);return e+"."+parseInt(i).toString()+".1-"+n+"."+parseInt(a).toString()+"."+o.getDate()}if(28!=t.category_id&&27!=t.category_id&&12!=t.items_id&&7!=t.items_id){var l=t.get_order_meter.meter_time;return 0===(i=parseInt(l.substring(0,2)))&&(i=12),(e="20"+l.substring(l.length-2))+"."+i+".1-"+e+"."+i+".31"}if(t.category_id=28){l=t.get_order_meter.meter_time;i=parseInt(l.substring(0,2))-1,e="20"+l.substring(l.length-2),0===i&&(i=12,e-=1);var d=new Date(e,i,0);return e+"."+parseInt(i).toString()+".1-"+e+"."+parseInt(i).toString()+"."+d.getDate()}}},typeFilter:function(t){return{1:"已缴费",2:"未缴费"}[t]},nullfilter:function(t){return t||"--"},payType:function(t){return{1:"转账",2:"刷卡",3:"支付宝",4:"微信",5:"现金",6:"小程序缴费"}[t]},fsfileer:function(t){return""===t?"服务中心收取":"网上渠道"},numFixed:function(t){return parseFloat(t).toFixed(2)},PayFilter:function(t){return{1:"微信缴费",2:"现金缴费"}[t]}},data:function(){return{pricetype:"",order_create_time:"",headinfo:{},bill_no:"",order_no:"",order:{},sum:0,shsum:0,housingName:"",categorylistd:[],category_type:1,tableKey:0,list:null,total:0,listLoading:!0,housing:[],starttime:"",endtime:"",sfstarttime:"",sfendtime:"",listQuery:{page:1,limit:20,type:1,bill_no:void 0,name:void 0,category:void 0},importanceOptions:[1,2,3],calendarTypeOptions:d,showReviewer:!1,temp:{fee_name:void 0},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,downloadLoading:!1}},created:function(){var t=new Date;this.starttime=t.getFullYear()+"."+parseInt(t.getMonth()+1)+".1",this.endtime=t.getFullYear()+"."+parseInt(t.getMonth()+1)+".30",this.sfstarttime=t.getFullYear()+"."+parseInt(t.getMonth())+".1",this.sfendtime=t.getFullYear()+"."+parseInt(t.getMonth())+".30",this.listQuery.bill_no=this.$route.params&&this.$route.params.id,this.bill_no=this.$route.params&&this.$route.params.id,this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(s.a)(this.listQuery).then(function(e){t.list=e.data.data,t.total=e.data.total,t.headinfo=e.data.housing,t.order=e.data.order,t.pricetype=t.order.type;for(var i=0;i<t.list.length;i++)t.sum=t.sum+parseFloat(t.list[i].to_paid),t.shsum=t.shsum+parseFloat(t.list[i].paid);if(void 0!=t.list[0]){var n=t.list[0].get_housing;null===t.order.create_time?t.order_create_time=new Date:t.order_create_time=t.order.create_time,t.order_no=t.list[0].bill_no,t.housingName=n.building+n.unit+n.house_number}else t.$message({message:"用户无账单",type:"error"});setTimeout(function(){t.listLoading=!1},1500)})},printContent:function(t){this.remove_ie_header_and_footer();var e=document.getElementById("print").innerHTML,i=document.body.innerHTML;return document.body.innerHTML=e,window.print(),window.location.reload(),document.body.innerHTML=i,!1},remove_ie_header_and_footer:function(){var t;t="HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";try{var e=new ActiveXObject("WScript.Shell");e.RegWrite(t+"header",""),e.RegWrite(t+"footer","")}catch(t){}}}}),c=(i("9olq"),i("KHd+")),_=Object(c.a)(u,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"app-container",attrs:{id:"print"}},[i("div",{staticClass:"filter-container"},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("div",{staticClass:"bill_no",staticStyle:{"text-align":"center","font-size":"20px","font-weight":"600"}},[t._v("缴费回执单")])]),t._v(" "),i("div",{staticClass:"text item"},[i("div",{staticClass:"clearfix",staticStyle:{display:"flex"},attrs:{slot:"header"},slot:"header"},[i("div",{staticStyle:{"font-weight":"300"}},[t._v("收费单位:广西北海长青藤物业管理有限公司")]),t._v(" "),i("div",{staticClass:"bill_no",staticStyle:{"padding-left":"104px"}},[t._v("流水:"+t._s(t.order_no))])]),t._v(" "),t.headinfo.get_community?i("div",{staticClass:"text"},[t._v("小区:"+t._s(t.headinfo.get_community.community_name))]):t._e(),t._v(" "),i("div",{staticClass:"text"},[t._v("房号:"+t._s(t.headinfo.building+t.headinfo.unit+t.headinfo.house_number))]),t._v(" "),i("div",{staticClass:"text"},[t._v("面积:"+t._s(t.headinfo.construction_area))]),t._v(" "),t.headinfo.get_owner?i("div",{staticClass:"text"},[t._v("姓名:"+t._s(t.headinfo.get_owner.owner_name))]):t._e(),t._v(" "),i("div",{staticClass:"text"},[t._v("交易时间:"+t._s(t._f("parseTime")(t.order_create_time,"{y}-{m}-{d}")))])])])],1),t._v(" "),t._m(0),t._v(" "),t._l(t.list,function(e,n){return i("div",{key:n,staticClass:"header-conetn"},[i("div",{staticStyle:{width:"128%"}},[t._v(t._s(e.name))]),t._v(" "),i("div",{staticStyle:{width:"128%"}},[30===e.category_id?[t._v(t._s(e.desc))]:[t._v(t._s(t._f("timeSubstring")(e)))]],2),t._v(" "),i("div",{staticStyle:{width:"80%"}},[t._v(t._s(t._f("subunitfile")(e.unit_price)))]),t._v(" "),i("div",{staticStyle:{width:"80%"}},[t._v("\n        "+t._s(t._f("subunitfile")(e.dosage))+"\n        "),2===e.temporary?i("span",[i("span",[t._v("*")]),t._v(" "),19===e.formula_id?i("span",[t._v(t._s(t.headinfo.construction_area))]):t._e()]):t._e()]),t._v(" "),i("div",{staticStyle:{width:"80%"}},[t._v(t._s(e.paid))]),t._v(" "),i("div",[e.last_number>0?i("span",[t._v(t._s(t._f("lastfile")(e.last_number)))]):t._e(),t._v(" "),e.last_number<1?i("span",[t._v("---")]):t._e()]),t._v(" "),i("div",[null!==e.this_number?i("span",[t._v(t._s(t._f("lastfile")(e.this_number)))]):i("span",[t._v("---")])])])}),t._v(" "),i("div",{staticClass:"bottom-content"},[i("div",{staticClass:"content-info"},[i("div",{staticStyle:{width:"29%"}},[t._v("收费渠道:服务中心收取")]),t._v(" "),i("div",{staticStyle:{width:"29%"}},[t._v("支付方式:"+t._s(t._f("fsfileer")(t.pricetype))+"("+t._s(t._f("payType")(t.pricetype))+")")]),t._v(" "),i("div",{staticStyle:{width:"40%"}},[t._v("合计金额(大写):"+t._s(t._f("Arabia_To_SimplifiedChinese")(t.sum)))]),t._v(" "),i("div",[t._v("应收¥:"+t._s(t._f("numFixed")(t.sum)))]),t._v(" "),i("div",[t._v("实收¥:"+t._s(t._f("numFixed")(t.shsum)))])]),t._v(" "),i("div",{staticClass:"content-info"},[i("div",[t._v("会计:")]),t._v(" "),i("div",[t._v("出纳:")]),t._v(" "),i("div",[t._v("开票人:")]),t._v(" "),i("div",[t._v("操作员:"+t._s(this.communit.realname))])]),t._v(" "),i("div",{staticClass:"content-info"},[i("div",[t._v("备注:"+t._s(this.order.desc))])])])],2),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary"},on:{click:t.printContent}},[t._v("打印")])],1)])},[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header"},[i("div",{staticStyle:{width:"80%"}},[t._v("收费项目")]),t._v(" "),i("div",{staticStyle:{width:"80%"}},[t._v("收费期间")]),t._v(" "),i("div",[t._v("单价(元)")]),t._v(" "),i("div",[t._v("数量/用量/面积")]),t._v(" "),i("div",[t._v("金额(元)")]),t._v(" "),i("div",[t._v("上次读数")]),t._v(" "),i("div",[t._v("本次读数")])])}],!1,null,"2700b23c",null);_.options.__file="toview.vue";e.default=_.exports}}]);