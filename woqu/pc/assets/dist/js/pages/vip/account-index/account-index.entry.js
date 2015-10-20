webpackJsonp([1,10],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);

	/*
	 * 个人中心公共逻辑
	 */
	var vipCommon = __webpack_require__(3);
	vipCommon.vipCommonOp();

	/*
	 * 初始化模板
	 */
	var doT = vipCommon.doT;
	var orderTemplate = __webpack_require__(6);
	var tempFn = doT.template(orderTemplate);

	/*
	 * 初始化订单列表
	 */
	$.post('http://127.0.0.1:3000', {
	    flag: 1,
	    pageNo: 1,
	    pageSize: 10
	}, function(data) {
	    if (!data.rs) {
	        window.alert(data.msg);
	        return;
	    }

	    var tempHtml = tempFn(data.data);
	    $('#orderList').html(tempHtml);
	});


/***/ },

/***/ 6:
/***/ function(module, exports) {

	module.exports = "{{? it.length === 0 }}\n<p class=\"empty-tips\">暂无订单信息</p>\n{{?}}\n\n{{? it.length !== 0 }}\n<h3 class=\"section-title\">最近订单<a class=\"check-all-order\" href=\"\">查看全部订单</a></h3>\n<table class=\"order-table\">\n    <col width=\"400px\"></col>\n    <col width=\"110px\"></col>\n    <col width=\"116px\"></col>\n    <col width=\"150px\"></col>\n    <col width=\"180px\"></col>\n    <tr class=\"table-header\">\n        <th>订单信息</th>\n        <th>产品类型</th>\n        <th>订单金额</th>\n        <th>订单状态</th>\n        <th>操作</th>\n    </tr>\n    {{~it :value:index}}\n        {{? index < 3}}\n            <tr class=\"order-divide {{? index === 0}}first{{?}}\">\n                <td colspan=\"5\"></td>\n            </tr>\n            <tr class=\"order-num-date\">\n                <td colspan=\"5\"><span>订单号：<font>{{=value.orderCD}}</font></span><span>预订日期：{{=value.createTime}}</span></td>\n            </tr>\n            <tr class=\"order-info\">\n                <td class=\"order-title\"><a target=\"_blank\" href=\"http://www.woqu.com{{=value.productUrl}}\">{{=value.productTitle}}</a></td>\n                <td>{{=value.categoryMean}}</td>\n                <td class=\"price\">\n                    {{=value.currencySign}}{{=value.totalAmount}}\n                </td>\n                <td>\n                    <p class=\"order-status\">已成交</p>\n                    <a class=\"check-detail\" href=\"\">查看详情</a>\n                </td>\n                <td>\n                    <button class=\"btn btn-confirm btn-w80 btn-h24\" type=\"button\">提交资料</button>\n                    <a class=\"cancel-order\" href=\"\">申请取消订单</a>\n                </td>\n            </tr>\n        {{?}}\n    {{~}}\n</table>\n{{?}}\n";

/***/ }

});