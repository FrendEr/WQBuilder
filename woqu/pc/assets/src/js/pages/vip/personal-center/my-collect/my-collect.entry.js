var $ = require('../../../../vendors/jquery.min');

/*
 * vip center common op
 */
var vipCommon = require('../../vip-common');
vipCommon.vipCommonOp();

/*
 * template op
 */
var doT = vipCommon.doT;
var collectTemplate = require('./views/collect-template.dot');
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
