(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0d34"],{"+EB/":function(t,e,i){},"+Lc1":function(t,e,i){"use strict";i.d(e,"a",function(){return n}),i.d(e,"c",function(){return s}),i.d(e,"d",function(){return r}),i.d(e,"b",function(){return l});var a=i("t3Un");function n(t){return Object(a.a)({url:"/OnekeyPay",method:"post",data:t})}function s(t){return Object(a.a)({url:"/getOrderByWithdraw",method:"get",params:{id:t}})}function r(t){return Object(a.a)({url:"/postTemporary",method:"post",params:t})}function l(t){return Object(a.a)({url:"/order/getDataByList",method:"get",params:t})}},"+PBm":function(t,e,i){"use strict";i.r(e);var a=i("YEIV"),n=i.n(a),s=i("QbLZ"),r=i.n(s),l=i("bCzH"),o=i("+Lc1"),u=i("t3Un");i("N5aa");var c,d=i("L2JU"),f=(c={name:"ComplexTable",filters:{numFilter:function(t){var e=parseFloat(t).toFixed(2);return parseFloat(e)},sumFixed:function(t,e){return t.toFixed(2)}},computed:r()({},Object(d.b)(["communit"]))},n()(c,"filters",{fltext:function(t){return t.toFixed(2)},subunitfile:function(t){return parseFloat(t).toFixed(2)}}),n()(c,"data",function(){return{radio:[],dialogVisible:!1,checkList:[],sumBill:{unpaidamount:0,already:0},temp:{type:1},form:{online:3},housing:[],unit:[],house_number:[],categorylistd:[],category_type:1,tableKey:0,list:[],yjlist:[],total:0,sum:0,userinfo:{get_owner:{}},category:[],listQuery:{page:1,limit:20,community_id:void 0,building_id:void 0,name:void 0,category:void 0}}}),n()(c,"created",function(){var t=this;this.getList(),Object(u.a)({url:"/temporary/getCategory",method:"get"}).then(function(e){t.category=e.data.data}),this.form.admin_id=this.communit.id,this.listQuery.community_id=this.communit.communit_id}),n()(c,"methods",{handeldialogVisible:function(){if(this.form.housing_id){for(var t=0,e=0;e<this.yjlist.length;e++)t+=parseFloat(this.yjlist[e].paid);return this.sum=t.toFixed(2),this.dialogVisible=!0,!0}this.$message({message:"必须选择房间用户",type:"warning"})},handelchange:function(t){t.paid=t.price*t.num,t.to_paid=t.price*t.num,19===t.formula_id&&(t.paid=t.paid*this.userinfo.construction_area,t.to_paid=t.price*this.userinfo.construction_area),t.paid=parseFloat(t.paid).toFixed(2),t.to_paid=parseFloat(t.to_paid).toFixed(2)},handelChange:function(t){this.yjlist=t},onSubmit:function(){var t=this;if(this.form.housing_id)return this.form.admin_id=this.communit.id,Object(o.d)(this.form).then(function(e){t.$confirm("是否打印账单?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$router.push({path:"/bill/toview/"+e.data})})}),!0;this.$message({message:"必须选择房间用户",type:"warning"})},handelPostOrder:function(){var t=this;this.form.housing_id&&(this.temp.housing_id=this.userinfo.id,this.temp.online=3,this.temp.yjlist=this.yjlist,this.temp.price=this.sum,this.temp.admin_id=this.communit.id,this.temp.community_id=this.communit.communit_id,Object(o.a)(this.temp).then(function(e){t.$confirm("是否打印账单?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$router.push({path:"/bill/toview/"+e.data.data})})}))},toche:function(t,e){!0===this.list[t].get_bill[e].che?this.sum=parseFloat(this.sum+parseFloat(this.list[t].get_bill[e].to_paid)):this.sum=parseFloat(this.sum-parseFloat(this.list[t].get_bill[e].to_paid))},handleBuilding:function(t){var e=this,i={type:"unit",building:this.housing[t].building};Object(l.c)(i).then(function(t){e.unit=t.data.data});i={type:"house_number",unit:this.housing[t].unit};Object(l.c)(i).then(function(t){e.house_number=t.data.data})},handleNmuber:function(t){var e=this,i={type:"house_number",building:this.unit[t].building,unit:this.unit[t].unit};Object(l.c)(i).then(function(t){e.house_number=t.data.data})},getList:function(){var t=this;this.listLoading=!0;if(Object(l.c)({type:"building"}).then(function(e){t.housing=e.data.data}),void 0===this.listQuery.housing_id)return!1},handleFilter:function(t){this.userinfo={get_owner:{}},this.sum=0;for(var e=0;e<this.house_number.length;e++)this.house_number[e].id===t&&(this.userinfo=this.house_number[e]);this.categorylistd=[],this.categorylist=[],this.calculatelist=[],this.listQuery.page=1,this.getList()}}),c),p=(i("GhpP"),i("KHd+")),h=Object(p.a)(f,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"filter-container"},[i("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{clearable:"",placeholder:"选择楼栋",filterable:""},on:{change:t.handleBuilding},model:{value:t.listQuery.building_id,callback:function(e){t.$set(t.listQuery,"building_id",e)},expression:"listQuery.building_id"}},t._l(t.housing,function(t,e){return i("el-option",{key:t.id,attrs:{label:t.building,value:e}})})),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{clearable:"",placeholder:"选择单元",filterable:""},on:{change:t.handleNmuber},model:{value:t.listQuery.unit_id,callback:function(e){t.$set(t.listQuery,"unit_id",e)},expression:"listQuery.unit_id"}},t._l(t.unit,function(t,e){return i("el-option",{key:t.id,attrs:{label:t.unit,value:e}})})),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{clearable:"",placeholder:"选择房间号",filterable:""},on:{change:t.handleFilter},model:{value:t.form.housing_id,callback:function(e){t.$set(t.form,"housing_id",e)},expression:"form.housing_id"}},t._l(t.house_number,function(t){return i("el-option",{key:t.id,attrs:{label:t.house_number,value:t.id}})}))],1),t._v(" "),i("code",[i("el-row",[i("el-col",{attrs:{span:4}},[t._v("房号 "+t._s(t.userinfo.building+t.userinfo.unit+t.userinfo.house_number))]),t._v(" "),i("el-col",{attrs:{span:4}},[t._v("业主姓名 "+t._s(t.userinfo.get_owner.owner_name))]),t._v(" "),i("el-col",{attrs:{span:4}},[t._v("联系电话 "+t._s(t.userinfo.get_owner.mobile))]),t._v(" "),i("el-col",{attrs:{span:4}},[t._v("建筑面积 "+t._s(t.userinfo.construction_area))])],1)],1),t._v(" "),i("div",{staticClass:"conent"},[i("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[i("div",{staticClass:"group"},[i("el-checkbox-group",{on:{change:t.handelChange},model:{value:t.checkList,callback:function(e){t.checkList=e},expression:"checkList"}},[i("el-row",{attrs:{gutter:10}},[i("el-col",{attrs:{span:20}},t._l(t.category,function(e,a){return i("el-checkbox",{key:a,attrs:{label:e,value:e}},[e.getcharge?[t._v(t._s(e.note+e.getcharge.fee_name))]:t._e()],2)}))],1)],1)],1),t._v(" "),t._l(t.yjlist,function(e,a){return i("el-card",{key:a,staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e.getcharge?i("span",[t._v(t._s(e.note+e.getcharge.fee_name))]):t._e()]),t._v(" "),i("el-form",{attrs:{"label-width":"80px"}},[i("el-form-item",{attrs:{label:"当前单价"}},[i("span",[t._v(t._s(1e3*e.price/1e3))])])],1),t._v(" "),i("el-form",{attrs:{"label-width":"80px"}},[i("el-form-item",{attrs:{label:"月"}},[i("el-input-number",{attrs:{min:1,max:12},on:{change:function(i){t.handelchange(e)}},model:{value:e.num,callback:function(i){t.$set(e,"num",i)},expression:"item.num"}})],1)],1),t._v(" "),i("el-form",{attrs:{"label-width":"80px"}},[i("el-form-item",{attrs:{label:"应缴纳"}},[19==e.formula_id?i("span",[t._v(t._s(t._f("subunitfile")(e.price*e.num*t.userinfo.construction_area)))]):t._e(),t._v(" "),17==e.formula_id?i("span",[t._v(t._s(t._f("subunitfile")(e.price*e.num)))]):t._e(),t._v(" "),36==e.formula_id?i("span",[t._v(t._s(t._f("subunitfile")(e.price*e.num)))]):t._e(),t._v(" "),39==e.formula_id?i("span",[t._v(t._s(t._f("subunitfile")(e.price*e.num)))]):t._e(),t._v(" "),40==e.formula_id?i("span",[t._v(t._s(t._f("subunitfile")(e.price*e.num)))]):t._e(),t._v(" "),46==e.formula_id?i("span",[t._v(t._s(t._f("subunitfile")(e.price*e.num)))]):t._e(),t._v(" "),41==e.formula_id?i("span",[t._v(t._s(t._f("subunitfile")(e.price*e.num)))]):t._e()])],1),t._v(" "),i("el-form",{attrs:{"label-width":"80px"}},[i("el-form-item",{attrs:{label:"实收"}},[i("el-col",{attrs:{span:11}},[i("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.paid,callback:function(i){t.$set(e,"paid",i)},expression:"item.paid"}})],1)],1)],1),t._v(" "),30===e.category_id||27===e.category_id?i("el-form",{attrs:{"label-width":"80px"}},[i("el-form-item",{attrs:{label:"收费时间"}},[i("el-col",{attrs:{span:11}},[i("el-input",{attrs:{type:"textarea",rows:2,placeholder:"收费时间请手动录入"},model:{value:e.desc,callback:function(i){t.$set(e,"desc",i)},expression:"item.desc"}})],1)],1)],1):t._e(),t._v(" "),i("el-form",{attrs:{"label-width":"80px"}},[i("el-form-item",{attrs:{label:"计算方式"}},[i("span",[t._v(t._s(e.getcharge.calcula_name))])])],1)],1)})],2)],1),t._v(" "),i("div",{staticClass:"btn"},[t.yjlist.length>0?i("el-button",{attrs:{type:"primary"},on:{click:t.handeldialogVisible}},[t._v("下一步")]):t._e()],1),t._v(" "),i("el-dialog",{attrs:{title:"订单确认",modal:!1,visible:t.dialogVisible,width:"50%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"order"},[i("div",{staticClass:"order-list"},[i("div",{staticClass:"title"},[t._v("账单费用:")]),t._v(" "),i("div",{staticClass:"conent price"},[t._v("¥"+t._s(t.sum))])]),t._v(" "),i("div",{staticClass:"order-list"},[i("div",{staticClass:"title"},[t._v("收费备注:")]),t._v(" "),i("div",{staticClass:"conent"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.temp.desc,expression:"temp.desc"}],domProps:{value:t.temp.desc},on:{input:function(e){e.target.composing||t.$set(t.temp,"desc",e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"order-list"},[i("el-radio-group",{model:{value:t.temp.type,callback:function(e){t.$set(t.temp,"type",e)},expression:"temp.type"}},[i("el-radio",{attrs:{label:1}},[t._v("转账")]),t._v(" "),i("el-radio",{attrs:{label:2}},[t._v("刷卡")]),t._v(" "),i("el-radio",{attrs:{label:3}},[t._v("支付宝")]),t._v(" "),i("el-radio",{attrs:{label:4}},[t._v("微信")]),t._v(" "),i("el-radio",{attrs:{label:5}},[t._v("现金")])],1)],1)]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handelPostOrder}},[t._v("确 定")])],1)])],1)},[],!1,null,"540a2844",null);h.options.__file="index.vue";e.default=h.exports},21:function(t,e){},22:function(t,e){},23:function(t,e){},Fwke:function(t,e,i){"use strict";var a=i("+EB/");i.n(a).a},GhpP:function(t,e,i){"use strict";var a=i("mWp2");i.n(a).a},N5aa:function(t,e,i){"use strict";var a=i("4d7F"),n=i.n(a),s=i("EUZL"),r=i.n(s),l={props:{beforeUpload:Function,onSuccess:Function},data:function(){return{loading:!1,excelData:{header:null,results:null}}},methods:{generateData:function(t){var e=t.header,i=t.results;this.excelData.header=e,this.excelData.results=i,this.onSuccess&&this.onSuccess(this.excelData)},handleDrop:function(t){if(t.stopPropagation(),t.preventDefault(),!this.loading){var e=t.dataTransfer.files;if(1===e.length){var i=e[0];if(!this.isExcel(i))return this.$message.error("Only supports upload .xlsx, .xls, .csv suffix files"),!1;this.upload(i),t.stopPropagation(),t.preventDefault()}else this.$message.error("Only support uploading one file!")}},handleDragover:function(t){t.stopPropagation(),t.preventDefault(),t.dataTransfer.dropEffect="copy"},handleUpload:function(){this.$refs["excel-upload-input"].click()},handleClick:function(t){var e=t.target.files[0];e&&this.upload(e)},upload:function(t){(this.$refs["excel-upload-input"].value=null,this.beforeUpload)?this.beforeUpload(t)&&this.readerData(t):this.readerData(t)},readerData:function(t){var e=this;return this.loading=!0,new n.a(function(i,a){var n=new FileReader;n.onload=function(t){var a=t.target.result,n=e.fixData(a),s=r.a.read(btoa(n),{type:"base64"}),l=s.SheetNames[0],o=s.Sheets[l],u=e.getHeaderRow(o),c=r.a.utils.sheet_to_json(o);e.generateData({header:u,results:c}),e.loading=!1,i()},n.readAsArrayBuffer(t)})},fixData:function(t){for(var e="",i=0,a=10240;i<t.byteLength/a;++i)e+=String.fromCharCode.apply(null,new Uint8Array(t.slice(i*a,i*a+a)));return e+=String.fromCharCode.apply(null,new Uint8Array(t.slice(i*a)))},getHeaderRow:function(t){var e=[],i=r.a.utils.decode_range(t["!ref"]),a=void 0,n=i.s.r;for(a=i.s.c;a<=i.e.c;++a){var s=t[r.a.utils.encode_cell({c:a,r:n})],l="UNKNOWN "+a;s&&s.t&&(l=r.a.utils.format_cell(s)),e.push(l)}return e},isExcel:function(t){return/\.(xlsx|xls|csv)$/.test(t.name)}}},o=(i("Fwke"),i("KHd+")),u=Object(o.a)(l,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("input",{ref:"excel-upload-input",staticClass:"excel-upload-input",attrs:{type:"file",accept:".xlsx, .xls"},on:{change:t.handleClick}}),t._v(" "),i("div",{staticClass:"drop",on:{drop:t.handleDrop,dragover:t.handleDragover,dragenter:t.handleDragover}},[t._v("\n    Drop excel file here or\n    "),i("el-button",{staticStyle:{"margin-left":"16px"},attrs:{loading:t.loading,size:"mini",type:"primary"},on:{click:t.handleUpload}},[t._v("Browse")])],1)])},[],!1,null,"69a554d1",null);u.options.__file="index.vue";e.a=u.exports},"RU/L":function(t,e,i){i("Rqdy");var a=i("WEpk").Object;t.exports=function(t,e,i){return a.defineProperty(t,e,i)}},Rqdy:function(t,e,i){var a=i("Y7ZC");a(a.S+a.F*!i("jmDH"),"Object",{defineProperty:i("2faE").f})},SEkw:function(t,e,i){t.exports={default:i("RU/L"),__esModule:!0}},YEIV:function(t,e,i){"use strict";e.__esModule=!0;var a=function(t){return t&&t.__esModule?t:{default:t}}(i("SEkw"));e.default=function(t,e,i){return e in t?(0,a.default)(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}},bCzH:function(t,e,i){"use strict";i.d(e,"c",function(){return n}),i.d(e,"b",function(){return s}),i.d(e,"a",function(){return r}),i.d(e,"e",function(){return l});var a=i("t3Un");function n(t){return Object(a.a)({url:"/getHousingitem",method:"get",params:t})}function s(t){return Object(a.a)({url:"/bill/getBillByItem",method:"get",params:t})}function r(t){return Object(a.a)({url:"/bill/getBillChildByItem",method:"get",params:t})}function l(t){return Object(a.a)({url:"bill/getUserBillbyItem",method:"get",params:t})}},mWp2:function(t,e,i){}}]);