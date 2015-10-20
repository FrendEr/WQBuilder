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
var redpackTemplate = require('./views/redpack-template.dot');
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
