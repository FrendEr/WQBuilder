var $ = require('../../../vendors/jquery.min');

/*
 * 个人中心公共逻辑
 */
var vipCommon = require('../vip-common');
vipCommon.vipCommonOp();

/*
 * 初始化模板
 */
var doT = vipCommon.doT;
var orderTemplate = require('./views/order-template.dot');
var tempFn = doT.template(orderTemplate);

/*
 * 初始化分页插件
 */
vipCommon.simplePagination();

/*
 * 初始化全部订单列表
 */
var orderTotalNumber = parseInt($('#orderTotalNumber').data('value'));
var getOrderUrl = 'http://127.0.0.1:3000';
if (orderTotalNumber) {
    getOrderList(orderTotalNumber, 1, 10, getOrderUrl);
}

/*
 * 订单tag切换
 */
$('.switch-tags').on('click', 'span', function(event) {
    var $this = $(this),
        targetId = event.target.id,
        orderTotalNumber = parseInt($this.data('value'));

    getOrderList(orderTotalNumber, 1, 10, getOrderUrl);
});

/*
 * 订单接口调用函数
 */
function getOrderList(orderTotalNumber, pageNo, pageSize, getOrderUrl) {
    if (orderTotalNumber === 0) {
        $('#orderList').html('<p class="empty-tips">暂无订单信息</p>');
        return;
    }

    $.post(getOrderUrl, {
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
                getOrderList(orderTotalNumber, pageNumber, 10, getOrderUrl);
            }
        });
    });
}
