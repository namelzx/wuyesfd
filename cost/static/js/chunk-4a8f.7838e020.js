(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4a8f"],{"+EB/":function(t,e,i){},21:function(t,e){},22:function(t,e){},23:function(t,e){},"96UT":function(t,e,i){},E8qc:function(t,e,i){"use strict";i.r(e);var a=i("FyfS"),n=i.n(a),l=i("P2sY"),o=i.n(l),r=i("QbLZ"),s=i.n(r),u=i("bCzH"),c=i("N5aa"),d=i("L2JU"),p=i("ZySA"),f=(i("7Qib"),i("Mz3J")),h=[{id:"1",name:"一级配置项"},{id:"2",name:"二级配置项"}],m=(h.reduce(function(t,e){return t[e.id]=e.name,t},{}),{name:"ComplexTable",components:{Pagination:f.a,UploadExcelComponent:c.a},directives:{waves:p.a},filters:{statusFilter:function(t){return{published:"success",draft:"info",deleted:"danger"}[t]},numFilter:function(t){var e=parseFloat(t).toFixed(2);return parseFloat(e)},typeFilter:function(t){return{1:"费项类型",2:"收费公式"}[t]},calculate:function(t){for(var e=0,i=0,a=0;a<t.length;a++)e+=parseFloat(t[a].to_paid),i+=parseFloat(t[a].paid);return e===i?"已缴":i<1?"未缴":i<e?"未缴清":"用户账单异常"},tocalculate:function(t){for(var e=0,i=0;i<t.length;i++)e+=parseFloat(t[i].to_paid);return e.toFixed(2)},paidcalculate:function(t){for(var e=0,i=0;i<t.length;i++)e+=parseFloat(t[i].paid);return e.toFixed(2)},arrears:function(t){for(var e=0,i=0;i<t.length;i++)e+=parseFloat(t[i].to_paid-t[i].paid);return e.toFixed(2)}},computed:s()({},Object(d.b)(["communit"])),data:function(){return{sumBill:{unpaidamount:0,already:0},dialogImport:!1,housing:[],categorylistd:[],category_type:1,tableKey:0,list:null,house_number:[],unit:[],total:0,category:[],categorylist:[],calculatelist:[],calculalist:[],listLoading:!0,listQuery:{page:1,limit:20,community_id:void 0,name:void 0,category:void 0},importanceOptions:[1,2,3],calendarTypeOptions:h,showReviewer:!1,temp:{fee_name:void 0},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},dialogPvVisible:!1,downloadLoading:!1}},created:function(){this.getList(),this.listQuery.community_id=this.communit.communit_id},methods:{handleBuilding:function(t){var e=this,i={type:"unit",building:this.housing[t].building,community_id:this.communit.communit_id};Object(u.c)(i).then(function(t){e.unit=t.data.data});i={type:"house_number",building:this.housing[t].building,unit:this.housing[t].unit}},handleNmuber:function(t){var e=this,i={type:"house_number",building:this.unit[t].building,unit:this.unit[t].unit};this.house_number=[],Object(u.c)(i).then(function(t){e.house_number=t.data.data})},handeVisible:function(t){t&&(this.calculalist=[])},handelCategory:function(t){for(var e=0;e<this.category.length;e++)this.category[e].id==t&&(this.temp.category_name=this.category[e].name)},beforeUpload:function(t){return t.size/1024/1024<1||(this.$message({message:"Please do not upload files larger than 1m in size.",type:"warning"}),!1)},handleSuccess:function(t){for(var e=this,i=t.results,a=(t.header,[]),n=0;n<i.length;n++)"水表"===i[n].表名称&&a.push({community_id:getCommunity(),last_number:i[n].上次读数,this_number:i[n].本次读数,meter_time:i[n].抄表日期,wheredata:{building:i[n].楼栋,unit:i[n].单元,house_number:i[n].房号}});postDataByAdd(a).then(function(t){if(201===t.data.status)return e.$notify({title:"警告",message:t.data.msg,type:"warning",duration:2e3}),e.dialogImport=!1,!1;e.dialogImport=!1,e.$notify({title:"成功",message:t.data.msg,type:"success",duration:2e3})})},getList:function(){var t=this;this.listLoading=!0,Object(u.b)(this.listQuery).then(function(e){t.list=e.data.data.data,t.total=e.data.data.total,t.sumBill=e.data.msg,setTimeout(function(){t.listLoading=!1},1500)});var e={type:"building",community_id:this.communit.communit_id};Object(u.c)(e).then(function(e){t.housing=e.data.data})},handleFilter:function(){this.categorylistd=[],this.categorylist=[],this.calculatelist=[],this.listQuery.page=1,this.getList()},handleModifyStatus:function(t,e){this.$message({message:"操作成功",type:"success"}),t.status=e},sortChange:function(t){var e=t.prop,i=t.order;"id"===e&&this.sortByID(i)},sortByID:function(t){this.listQuery.sort="ascending"===t?"+id":"-id",this.handleFilter()},handleCreate:function(){var t=this;this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.temp.numeral="BH"+Date.parse(new Date),postDataByAdd(this.temp).then(function(){t.list.unshift(t.temp),t.dialogFormVisible=!1,t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})},handleUpdate:function(t){this.temp=o()({},t);for(var e=0;e<this.category.length;e++)this.category[e].pid==t.calculate_id&&this.calculalist.push(this.category[e]);this.dialogStatus="update",this.dialogFormVisible=!0},updateData:function(){var t=this,e=o()({},this.temp);Object(u.postDataByUpdate)(e).then(function(){var e=!0,i=!1,a=void 0;try{for(var l,o=n()(t.list);!(e=(l=o.next()).done);e=!0){var r=l.value;if(r.id===t.temp.id){var s=t.list.indexOf(r);t.list.splice(s,1,t.temp);break}}}catch(t){i=!0,a=t}finally{try{!e&&o.return&&o.return()}finally{if(i)throw a}}t.dialogFormVisible=!1,t.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})})},handleDelete:function(t){Object(u.getLIDataByDelete)(t.id).then(function(t){}),this.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var e=this.list.indexOf(t);this.list.splice(e,1)}}}),g=(i("gBRM"),i("KHd+")),b=Object(g.a)(m,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"filter-container"},[i("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{clearable:"",placeholder:"选择楼栋",filterable:""},on:{change:t.handleBuilding},model:{value:t.listQuery.building_id,callback:function(e){t.$set(t.listQuery,"building_id",e)},expression:"listQuery.building_id"}},t._l(t.housing,function(t,e){return i("el-option",{key:t.id,attrs:{label:t.building,value:e}})})),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{clearable:"",placeholder:"选择单元",filterable:""},on:{change:t.handleNmuber},model:{value:t.listQuery.unit_id,callback:function(e){t.$set(t.listQuery,"unit_id",e)},expression:"listQuery.unit_id"}},t._l(t.unit,function(t,e){return i("el-option",{key:t.id,attrs:{label:t.unit,value:e}})})),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"140px"},attrs:{clearable:"",placeholder:"选择房间号",filterable:""},on:{change:t.handleFilter},model:{value:t.listQuery.housing_id,callback:function(e){t.$set(t.listQuery,"housing_id",e)},expression:"listQuery.housing_id"}},t._l(t.house_number,function(t){return i("el-option",{key:t.id,attrs:{label:t.house_number,value:t.id}})})),t._v(" "),i("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.listQuery.year_time,callback:function(e){t.$set(t.listQuery,"year_time",e)},expression:"listQuery.year_time"}}),t._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v(t._s(t.$t("table.search")))])],1),t._v(" "),i("code",[i("el-row",[i("el-col",{attrs:{span:4}},[t._v("待缴金额 "+t._s(t.sumBill.unpaidamount))]),t._v(" "),i("el-col",{attrs:{span:4}},[t._v("已缴金额 "+t._s(t.sumBill.already))])],1)],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""},on:{"sort-change":t.sortChange}},[i("el-table-column",{attrs:{label:"房号",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("router-link",{attrs:{to:"/bill/toview/"+e.row.bill_no}},[i("span",[t._v(t._s(e.row.get_housing.building)+t._s(e.row.get_housing.unit)+t._s(e.row.get_housing.house_number))])])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"业主姓名","min-width":"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.get_owner.owner_name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"应缴费用","min-width":"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("tocalculate")(e.row.get_bill)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"已缴费用","min-width":"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("paidcalculate")(e.row.get_bill)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"欠款","min-width":"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("arrears")(e.row.get_bill)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"账单日期","min-width":"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.meter_time))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"账单状态","min-width":"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",[i("span",[t._v(t._s(t._f("calculate")(e.row.get_bill)))])])]}}])})],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogImport},on:{"update:visible":function(e){t.dialogImport=e}}},[i("upload-excel-component",{attrs:{"on-success":t.handleSuccess,"before-upload":t.beforeUpload}})],1),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:t.temp,"label-position":"left","label-width":"100px"}},[i("el-form-item",{attrs:{label:"上次读数"}},[i("el-input",{model:{value:t.temp.last_number,callback:function(e){t.$set(t.temp,"last_number",e)},expression:"temp.last_number"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"本次读数"}},[i("el-input",{model:{value:t.temp.this_number,callback:function(e){t.$set(t.temp,"this_number",e)},expression:"temp.this_number"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v(t._s(t.$t("table.cancel")))]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){"create"===t.dialogStatus?t.createData():t.updateData()}}},[t._v(t._s(t.$t("table.confirm")))])],1)],1)],1)},[],!1,null,null,null);b.options.__file="index.vue";e.default=b.exports},Fwke:function(t,e,i){"use strict";var a=i("+EB/");i.n(a).a},HKPr:function(t,e,i){"use strict";var a=i("YPLS");i.n(a).a},Mz3J:function(t,e,i){"use strict";Math.easeInOutQuad=function(t,e,i,a){return(t/=a/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e};var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function n(t,e,i){var n=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,l=t-n,o=0;e=void 0===e?500:e;!function t(){o+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(o,n,l,e)),o<e?a(t):i&&"function"==typeof i&&i()}()}var l={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&n(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&n(0,800)}}},o=(i("HKPr"),i("KHd+")),r=Object(o.a)(l,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[i("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"cebf2f0c",null);r.options.__file="index.vue";e.a=r.exports},N5aa:function(t,e,i){"use strict";var a=i("4d7F"),n=i.n(a),l=i("EUZL"),o=i.n(l),r={props:{beforeUpload:Function,onSuccess:Function},data:function(){return{loading:!1,excelData:{header:null,results:null}}},methods:{generateData:function(t){var e=t.header,i=t.results;this.excelData.header=e,this.excelData.results=i,this.onSuccess&&this.onSuccess(this.excelData)},handleDrop:function(t){if(t.stopPropagation(),t.preventDefault(),!this.loading){var e=t.dataTransfer.files;if(1===e.length){var i=e[0];if(!this.isExcel(i))return this.$message.error("Only supports upload .xlsx, .xls, .csv suffix files"),!1;this.upload(i),t.stopPropagation(),t.preventDefault()}else this.$message.error("Only support uploading one file!")}},handleDragover:function(t){t.stopPropagation(),t.preventDefault(),t.dataTransfer.dropEffect="copy"},handleUpload:function(){this.$refs["excel-upload-input"].click()},handleClick:function(t){var e=t.target.files[0];e&&this.upload(e)},upload:function(t){(this.$refs["excel-upload-input"].value=null,this.beforeUpload)?this.beforeUpload(t)&&this.readerData(t):this.readerData(t)},readerData:function(t){var e=this;return this.loading=!0,new n.a(function(i,a){var n=new FileReader;n.onload=function(t){var a=t.target.result,n=e.fixData(a),l=o.a.read(btoa(n),{type:"base64"}),r=l.SheetNames[0],s=l.Sheets[r],u=e.getHeaderRow(s),c=o.a.utils.sheet_to_json(s);e.generateData({header:u,results:c}),e.loading=!1,i()},n.readAsArrayBuffer(t)})},fixData:function(t){for(var e="",i=0,a=10240;i<t.byteLength/a;++i)e+=String.fromCharCode.apply(null,new Uint8Array(t.slice(i*a,i*a+a)));return e+=String.fromCharCode.apply(null,new Uint8Array(t.slice(i*a)))},getHeaderRow:function(t){var e=[],i=o.a.utils.decode_range(t["!ref"]),a=void 0,n=i.s.r;for(a=i.s.c;a<=i.e.c;++a){var l=t[o.a.utils.encode_cell({c:a,r:n})],r="UNKNOWN "+a;l&&l.t&&(r=o.a.utils.format_cell(l)),e.push(r)}return e},isExcel:function(t){return/\.(xlsx|xls|csv)$/.test(t.name)}}},s=(i("Fwke"),i("KHd+")),u=Object(s.a)(r,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("input",{ref:"excel-upload-input",staticClass:"excel-upload-input",attrs:{type:"file",accept:".xlsx, .xls"},on:{change:t.handleClick}}),t._v(" "),i("div",{staticClass:"drop",on:{drop:t.handleDrop,dragover:t.handleDragover,dragenter:t.handleDragover}},[t._v("\n    Drop excel file here or\n    "),i("el-button",{staticStyle:{"margin-left":"16px"},attrs:{loading:t.loading,size:"mini",type:"primary"},on:{click:t.handleUpload}},[t._v("Browse")])],1)])},[],!1,null,"69a554d1",null);u.options.__file="index.vue";e.a=u.exports},YPLS:function(t,e,i){},ZySA:function(t,e,i){"use strict";var a=i("P2sY"),n=i.n(a),l=(i("jUE0"),{bind:function(t,e){t.addEventListener("click",function(i){var a=n()({},e.value),l=n()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},a),o=l.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var r=o.getBoundingClientRect(),s=o.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":((s=document.createElement("span")).className="waves-ripple",s.style.height=s.style.width=Math.max(r.width,r.height)+"px",o.appendChild(s)),l.type){case"center":s.style.top=r.height/2-s.offsetHeight/2+"px",s.style.left=r.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(i.pageY-r.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(i.pageX-r.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=l.color,s.className="waves-ripple z-active",!1}},!1)}}),o=function(t){t.directive("waves",l)};window.Vue&&(window.waves=l,Vue.use(o)),l.install=o;e.a=l},bCzH:function(t,e,i){"use strict";i.d(e,"c",function(){return n}),i.d(e,"b",function(){return l}),i.d(e,"a",function(){return o}),i.d(e,"e",function(){return r});var a=i("t3Un");function n(t){return Object(a.a)({url:"/getHousingitem",method:"get",params:t})}function l(t){return Object(a.a)({url:"/bill/getBillByItem",method:"get",params:t})}function o(t){return Object(a.a)({url:"/bill/getBillChildByItem",method:"get",params:t})}function r(t){return Object(a.a)({url:"bill/getUserBillbyItem",method:"get",params:t})}},gBRM:function(t,e,i){"use strict";var a=i("96UT");i.n(a).a},jUE0:function(t,e,i){}}]);