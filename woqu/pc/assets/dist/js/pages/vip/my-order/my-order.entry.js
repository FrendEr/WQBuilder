webpackJsonp([2,12],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);

	/*
	 * 全站公用脚本
	 */
	__webpack_require__(7)();

	/*
	 * 个人中心公共逻辑
	 */
	var vipCommon = __webpack_require__(3);
	vipCommon.vipCommonOp();

	/*
	 * 初始化模板
	 */
	var doT = vipCommon.doT;
	var orderTemplate = __webpack_require__(10);
	var tempFn = doT.template(orderTemplate);

	/*
	 * 初始化分页插件
	 */
	vipCommon.simplePagination();

	/*
	 * 初始化全部订单列表
	 */
	var orderTotalNumber = parseInt($('#orderTotalNumber').data('value'));
	var getOrderUrl = 'http://vip.woqu.com/get-order-list';
	if (orderTotalNumber) {
	    getOrderList(orderTotalNumber, 1, 1, 10, getOrderUrl);
	}

	/*
	 * 订单tag切换
	 */
	$('.switch-tags').on('click', 'span', function(event) {
	    var $this = $(this),
	        targetId = event.target.id,
	        flag = $this.index() + 1,
	        orderTotalNumber = parseInt($this.data('value'));

	    getOrderList(orderTotalNumber, flag, 1, 10, getOrderUrl);
	});

	/*
	 * 订单接口调用函数
	 */
	function getOrderList(orderTotalNumber, flag, pageNo, pageSize, getOrderUrl) {
	    if (orderTotalNumber === 0) {
	        $('#orderList').html('<p class="empty-tips">暂无订单信息</p>');
	        $('#pagination').empty();
	        return;
	    }

	    $('#orderList').html('<p class="checking-tips">订单信息查询中...</p>');

	    $.post(getOrderUrl, {
	        flag: flag || 1,
	        pageNo: pageNo,
	        pageSize: pageSize
	    }, function(data) {
	        if (!data.rs) {
	            window.alert(data.msg);
	            return;
	        }
	        var tempHtml = tempFn(data.data);
	        $('#orderList').html(tempHtml);

	        // 分页内嵌在订单列表内，需要在订单列表渲染完后再初始化
	        $('#pagination').pagination({
	            items: orderTotalNumber,
	            itemsOnPage: 10,
	            displayedPages: 6,
	            prevText: '< 上一页',
	            nextText: '下一页 >',
	            currentPage: pageNo,
	            onPageClick: function(pageNumber) {
	                getOrderList(orderTotalNumber, flag, pageNumber, 10, getOrderUrl);
	            }
	        });
	    });
	}


/***/ },

/***/ 10:
/***/ function(module, exports) {

	module.exports = "{{? it.length === 0 }}\n<p class=\"empty-tips\">暂无订单信息</p>\n{{?}}\n\n{{? it.length !== 0 }}\n<table class=\"order-table\">\n    <col width=\"400px\"></col>\n    <col width=\"110px\"></col>\n    <col width=\"116px\"></col>\n    <col width=\"150px\"></col>\n    <col width=\"180px\"></col>\n    <tr class=\"table-header\">\n        <th>订单信息</th>\n        <th>产品类型</th>\n        <th>订单金额</th>\n        <th>订单状态</th>\n        <th>操作</th>\n    </tr>\n    {{~it :value:index}}\n        <tr class=\"order-divide {{? index === 0}}first{{?}}\">\n            <td colspan=\"5\"></td>\n        </tr>\n        <tr class=\"order-num-date\">\n            <td colspan=\"5\"><span>订单号：<font>{{=value.orderCD}}</font></span><span>预订日期：{{=value.createTime}}</span></td>\n        </tr>\n        <tr class=\"order-info\">\n            <td class=\"order-title\"><a target=\"_blank\" href=\"http://www.woqu.com{{=value.productUrl}}\">{{=value.productTitle}}</a></td>\n            <td>{{=value.categoryMean}}</td>\n            <td class=\"price\">\n                {{=value.currencySign}}{{=value.totalAmount}}\n            </td>\n            <td>\n                <p class=\"order-status\">已成交</p>\n                <a class=\"check-detail\" href=\"\">查看详情</a>\n            </td>\n            <td>\n                <button class=\"btn btn-confirm btn-w80 btn-h24\" type=\"button\">提交资料</button>\n                <a class=\"cancel-order\" href=\"\">申请取消订单</a>\n            </td>\n        </tr>\n    {{~}}\n</table>\n{{?}}\n";

/***/ }

});