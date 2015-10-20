webpackJsonp([5,10],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);

	/*
	 * vip center common op
	 */
	var vipCommon = __webpack_require__(3);
	vipCommon.vipCommonOp();

	/*
	 * template op
	 */
	var doT = vipCommon.doT;
	var collectTemplate = __webpack_require__(10);
	var tempFn = doT.template(collectTemplate);

	/*
	 * pagination init
	 */
	vipCommon.simplePagination();

	$.ajax({
	    url:'../../../js/pages/vip/personal-center/my-collect/mock/collect.json',
	    type:'post',
	    data:{},
	    success:function(data){

	        data = JSON.parse(data);

	        if (!data.rs) {
	            window.alert(data.msg);
	            return;
	        }
	        var html = tempFn(data.data);
	        $('.collect_box').html(html);
	    },
	    error:function(e){
	        console.log(e);
	    }
	});


/***/ },

/***/ 10:
/***/ function(module, exports) {

	module.exports = "{{? it.length === 0 }}\r\n<p class=\"empty-tips\">暂无订单信息</p>\r\n{{?}}\r\n\r\n{{? it.length !== 0 }}\r\n\r\n<table class=\"collect-table\">\r\n    <col width=\"300px\"></col>\r\n    <col width=\"375px\"></col>\r\n    <col width=\"190px\"></col>\r\n    <col width=\"140px\"></col>\r\n    {{~it:value:index}}\r\n        <tr class=\"collect-divide\">\r\n            <td colspan=\"4\"></td>\r\n        </tr>\r\n        <tr class=\"collect-tr\">\r\n            <td class=\"collect-img\">\r\n                <div>\r\n                    <span><span>{{=value.productCategory}}</span><i></i></span>\r\n                    <img src=\"//www.quimg.com/guide/origin/road1inusa_300180_20150901121210300.jpg\" width=\"250\" height=\"150\">\r\n                </div>\r\n            </td>\r\n            <td class=\"collect-title\">\r\n                <div>\r\n                    <a href=\"#\">{{=value.title}}</a>\r\n                    <span class=\"collect-time\">收藏于{{=value.createDate}}</span>\r\n                </div>\r\n            </td>\r\n            <td class=\"collect-price\">\r\n                <span>{{=value.currency}}{{=value.price}}/人起</span>\r\n            </td>\r\n            <td>\r\n                <button class=\"btn btn-confirm btn-w80 btn-h24\" type=\"button\">立即预订</button>\r\n                <span class=\"collect-delete\">删除</span>\r\n            </td>\r\n        </tr>\r\n    {{~}}\r\n</table>\r\n{{?}}";

/***/ }

});