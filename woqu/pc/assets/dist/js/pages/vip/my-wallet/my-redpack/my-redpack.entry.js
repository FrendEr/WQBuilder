webpackJsonp([4,10],{

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
	var redpackTemplate = __webpack_require__(9);
	var tempFn = doT.template(redpackTemplate);

	/*
	 * 初始化分页插件
	 */
	vipCommon.simplePagination();

	/*
	 * 初始化红包列表
	 */
	var redpackTotalNumber = parseInt($('#incomeTotalNumber').data('value'));
	var getRedpackUrl = 'http://127.0.0.1:3003';
	if (redpackTotalNumber) {
	    getRedpackList(redpackTotalNumber, 1, 10, getRedpackUrl);
	}

	/*
	 * 红包tag切换
	 */
	$('.switch-tags').on('click', 'span', function(event) {
	    var $this = $(this),
	        targetId = event.target.id,
	        redpackTotalNumber = parseInt($this.data('value'));

	    getRedpackList(redpackTotalNumber, 1, 10, getRedpackUrl);
	});

	/*
	 * 红包接口调用函数
	 */
	function getRedpackList(redpackTotalNumber, pageNo, pageSize, getRedpackUrl) {
	    if (redpackTotalNumber === 0) {
	        $('#redpackList').html('<p class="empty-tips">暂无红包信息</p>');
	        return;
	    }

	    $.post(getRedpackUrl, {
	        pageNo: pageNo,
	        pageSize: pageSize
	    }, function(data) {
	        if (!data.rs) {
	            window.alert(data.msg);
	            return;
	        }
	        var tempHtml = tempFn(data.data);
	        $('#redpackList').html(tempHtml);

	        // 分页内嵌在订单列表内，需要在订单列表渲染完后再初始化
	        $('#pagination').pagination({
	            items: redpackTotalNumber,
	            itemsOnPage: 10,
	            displayedPages: 6,
	            prevText: '< 上一页',
	            nextText: '下一页 >',
	            currentPage: pageNo,
	            onPageClick: function(pageNumber) {
	                getRedpackList(redpackTotalNumber, pageNumber, 10, getRedpackUrl);
	            }
	        });
	    });
	}


/***/ },

/***/ 9:
/***/ function(module, exports) {

	module.exports = "{{? it.length === 0 }}\r\n<p class=\"empty-tips\">您目前还没有红包哦~</p>\r\n{{?}}\r\n\r\n<table class=\"coupons-redpack-table\">\r\n    <col width=\"150px\"></col>\r\n    <col width=\"530px\"></col>\r\n    <col width=\"260px\"></col>\r\n    <tr class=\"table-header\">\r\n        <th>金额</th>\r\n        <th>来源描述</th>\r\n        <th>收入时间</th>\r\n    </tr>\r\n    {{~it :value:index}}\r\n        <tr>\r\n            <td>{{=value.amount}}</td>\r\n            <td>{{=value.sourceDescription}}</td>\r\n            <td>{{=value.createTime}}</td>\r\n        </tr>\r\n    {{~}}\r\n</table>\r\n";

/***/ }

});