var $ = require('../../../../vendors/jquery.min');

/*
 * vip center common op
 */
var vipCommon = require('../../vip-common');
//vipCommon.vipCommonOp();

/*
 * template op
 */
var doT = vipCommon.doT;
var collectTemplate = require('./views/topic-template.dot');
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
    getpagesData:function(page,flag){
        if(COLLECT.config.xhr !== null){
            COLLECT.config.xhr.abort();
            COLLECT.config.xhr = null;
        }
        COLLECT.config.xhr = $.ajax({
            url:'http://vip.woqu.com/thread/get-list',
            type:'post',
            data:{
                flag:flag,
                page:page,
                pagesize:10
            },
            beforeSend:function(){
                if(!$('.checking-tips').length){
                    $('.topic-box').prepend('<p class="checking-tips">正在查询数据...</p>');
                }
            },
            success:function(data){
                if (!data.rs) {
                    alert(data.msg);
                    return;
                }
                var html = tempFn(data.data);
                $('.topic-box').html(html);
                if(needInitPagination){
                    needInitPagination = false;
                    COLLECT.initPage(data.total,flag);
                }
            },
            error:function(e){
                console.log(e);
            }
        });
    },
    initPage:function(total,flag){
        $('#pagination').pagination({
            items : total,
            itemsOnPage : 10,
            displayedPages:3,
            prevText:'上一页',
            nextText:'下一页',
            onPageClick : function(index) {
                COLLECT.getpagesData(index,flag);
            }
        });
    }
};

$('.switch-tags').find('span').on('click',function(){

    if($(this).hasClass('on'))return;

    var index = $('.switch-tags').find('span').index($(this)[0]);
    $('.switch-tags').find('span').removeClass('on').eq(index).addClass('on');

    var flag = $(this).attr('data-type');

    needInitPagination = true;
    COLLECT.getpagesData(1,flag);
    
});

COLLECT.getpagesData(1,1);