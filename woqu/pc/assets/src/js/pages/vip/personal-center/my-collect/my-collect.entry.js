var $ = require('../../../../vendors/jquery.min');
var layer = require('../../../../plugins/wq.layer');
/*
 * vip center common op
 */
var vipCommon = require('../../vip-common');
//vipCommon.vipCommonOp();

/*
 * template op
 */
var doT = vipCommon.doT;
var collectTemplate = require('./views/collect-template.dot');
var tempFn = doT.template(collectTemplate);

/*
 * pagination init
 */
var simplePagination = vipCommon.simplePagination();
var needInitPagination = true;

var COLLECT = {
    config:{
        xhr:null
    },
    getpagesData:function(page,type){
        if(COLLECT.config.xhr !== null){
            COLLECT.config.xhr.abort();
            COLLECT.config.xhr = null;
        }
        COLLECT.config.xhr = $.ajax({
            url:'http://vip.woqu.com/collection/get-list?category='+type+'&pageNo='+page+'&pageSize=10',
            type:'post',
            beforeSend:function(){
                if(!$('.checking-tips').length){
                    $('.collect-box').prepend('<p class="checking-tips">正在查询数据...</p>');
                }
                $('#pagination').html('');
            },
            success:function(data){

                if (!data.rs) {
                    window.alert(data.msg);
                    return;
                }
                var html = tempFn(data.data);
                $('.collect-box').html(html);
                if(needInitPagination && data.data.length){
                    needInitPagination = false;
                    COLLECT.initPage(data.total,type);
                }
            },
            error:function(e){
                console.log(e);
            }
        });
    },
    initPage:function(total,type){
        $('#pagination').pagination({
            items : total,
            itemsOnPage : 10,
            displayedPages:3,
            prevText:'上一页',
            nextText:'下一页',
            onPageClick : function(index) {
                COLLECT.getpagesData(index,type);
            }
        });
    }
};
//tab
$('.switch-tags').find('span').on('click',function(){

    if($(this).hasClass('on'))return;

    var index = $('.switch-tags').find('span').index($(this)[0]);
    $('.switch-tags').find('span').removeClass('on').eq(index).addClass('on');

    var type = $(this).attr('data-type');

    needInitPagination = true;
    COLLECT.getpagesData(1,type);
});
//delete
$('.collect-box').on('click','.collect-delete',function(){
    var id = $(this).attr('data-bid');
    $.post('http://vip.woqu.com/collection/delete?collectionList='+id+',',function(data){
        if(data.rs){
            window.alert('删除成功');
            window.location.reload(true);
        }else{
            window.alert(data.msg);
        }
    });
});

COLLECT.getpagesData(1,'ALL');