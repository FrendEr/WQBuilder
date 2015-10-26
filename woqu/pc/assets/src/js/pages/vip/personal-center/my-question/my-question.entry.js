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
var template = require('./views/question-template.dot');
var tempFn = doT.template(template);

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
            url:'http://vip.woqu.com/faq/get-list?flag='+flag+'&pageNo='+page+'&pageSize=10',
            type:'post',
            beforeSend:function(){
                if(!$('.checking-tips').length){
                    $('.question-box').prepend('<p class="checking-tips">正在查询数据...</p>');
                }
                $('#pagination').html('');
            },
            success:function(data){

                if (!data.rs) {
                    alert(data.msg);
                    return;
                }
                var html = tempFn(data.data);
                $('.question-box').html(html);
                if(needInitPagination && !!data.data.length){
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