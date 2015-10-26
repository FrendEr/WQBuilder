webpackJsonp([3,12],{

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
	var couponsTemplate = __webpack_require__(11);
	var tempFn = doT.template(couponsTemplate);

	/*
	 * 初始化分页插件
	 */
	vipCommon.simplePagination();

	/*
	 * 激活优惠码
	 */
	$('#activeCodeBtn').on('click', function() {
	    var errTips = $('.active-coupons-error'),
	        value = $.trim($('#conpusCodeInput').val());

	    errTips.hide();

	    if (!value) {
	        errTips.show();
	        return;
	    }

	    $.post('https://vip.woqu.com/coupon/activate', {
	        couponCode: value
	    }, function(data) {
	        if (!data.rs) {
	            window.alert(data.msg);
	            return;
	        }

	        window.alert('激活成功！');
	    });
	});

	/*
	 * 初始化优惠券列表
	 */
	var couponsTotalNumber = parseInt($('#unuseTotalNumber').data('value'));
	var getCouponsUrl = 'http://127.0.0.1:3000';
	if (couponsTotalNumber) {
	    getCouponsList(couponsTotalNumber, 1, 10, getCouponsUrl);
	}

	/*
	 * 优惠券tag切换
	 */
	$('.switch-tags').on('click', 'span', function(event) {
	    var $this = $(this),
	        targetId = event.target.id,
	        couponsTotalNumber = parseInt($this.data('value'));

	    getCouponsList(couponsTotalNumber, 1, 10, getCouponsUrl);
	});

	/*
	 * 查看优惠券详情
	 */
	$('#couponsList').on('click', '.check-coupons', function() {

	});

	/*
	 * 优惠券接口调用函数
	 */
	function getCouponsList(couponsTotalNumber, pageNo, pageSize, getCouponsUrl) {
	    if (couponsTotalNumber === 0) {
	        $('#couponsList').html('<p class="empty-tips">暂无优惠券信息</p>');
	        return;
	    }

	    $.post(getCouponsUrl, {
	        pageNo: pageNo,
	        pageSize: pageSize
	    }, function(data) {
	        if (!data.rs) {
	            window.alert(data.msg);
	            return;
	        }
	        var tempHtml = tempFn(data.data);
	        $('#couponsList').html(tempHtml);

	        // 分页内嵌在订单列表内，需要在订单列表渲染完后再初始化
	        $('#pagination').pagination({
	            items: couponsTotalNumber,
	            itemsOnPage: 10,
	            displayedPages: 6,
	            prevText: '< 上一页',
	            nextText: '下一页 >',
	            currentPage: pageNo,
	            onPageClick: function(pageNumber) {
	                getCouponsList(couponsTotalNumber, pageNumber, 10, getCouponsUrl);
	            }
	        });
	    });
	}


/***/ },

/***/ 11:
/***/ function(module, exports) {

	module.exports = "{{? it.length === 0 }}\r\n<p class=\"empty-tips\">您目前还没有优惠券哦~</p>\r\n{{?}}\r\n\r\n<table class=\"coupons-redpack-table\">\r\n    <col width=\"170px\"></col>\r\n    <col width=\"170px\"></col>\r\n    <col width=\"170px\"></col>\r\n    <col width=\"170px\"></col>\r\n    <col width=\"170px\"></col>\r\n    <col width=\"90px\"></col>\r\n    <tr class=\"table-header\">\r\n        <th>编号</th>\r\n        <th>面值</th>\r\n        <th>使用范围</th>\r\n        <th>生效时间</th>\r\n        <th>到期时间</th>\r\n        <th>优惠说明</th>\r\n    </tr>\r\n    {{~it :value:index}}\r\n        <tr>\r\n            <td>{{=value.couponCode}}</td>\r\n            <td>{{=value.currency}}{{=value.amount}}</td>\r\n            <td>{{=value.activeRange}}</td>\r\n            <td>{{=value.effTime}}</td>\r\n            <td>{{=value.expTime}}</td>\r\n            <td><a class=\"check-coupons\" href=\"\">查看</a></td>\r\n        </tr>\r\n    {{~}}\r\n</table>\r\n";

/***/ }

});