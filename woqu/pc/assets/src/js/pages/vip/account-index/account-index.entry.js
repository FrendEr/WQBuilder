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
 * 初始化订单列表
 */
var getOrderUrl = 'http://vip.woqu.com/get-order-list';
$.post(getOrderUrl, {
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
