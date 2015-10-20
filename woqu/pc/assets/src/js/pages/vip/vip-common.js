var $ = require('../../vendors/jquery.min');
var doT = require('../../vendors/doT.min');
var simplePagination = require('../../plugins/jquery.simplepagination');

// 会员中心公共逻辑
exports.vipCommonOp = function() {
    // 左侧导航事件
    $('.left-item, .sub-list li').on('click', function() {
        var $this = $(this);

        if ($this.is('.has-sub-item')) return;

        $('#vipLeft').find('.on').removeClass('on');
        $this.addClass('on');
    });

    // table tag切换
    $('.switch-tags').on('click', 'span', function() {
        var $this = $(this);

        if ($this.is('.on')) return;

        $this.addClass('on').siblings().removeClass('on');
    });
};

// 模板引擎
exports.doT = doT;

// 分页插件
exports.simplePagination = simplePagination;
