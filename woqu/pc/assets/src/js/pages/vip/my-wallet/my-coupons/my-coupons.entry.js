var $ = require('../../../../vendors/jquery.min');

/*
 * 个人中心公共逻辑
 */
var vipCommon = require('../../vip-common');
vipCommon.vipCommonOp();

/*
 * 初始化模板
 */
var doT = vipCommon.doT;
var couponsTemplate = require('./views/coupons-template.dot');
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
