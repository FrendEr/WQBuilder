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
var commentTemplate = require('./views/comment-template.dot');
var noCommentTemplate = require('./views/no-comment-template.dot');
var commentTempFn = doT.template(commentTemplate);
var noCommentTemplateFn = doT.template(noCommentTemplate);

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
            url:'http://vip.woqu.com/moment/get-list?flag=2&pageNo=1&pageSize=10',
            type:'post',
            beforeSend:function(){
                if(!$('.checking-tips').length){
                   $('.comment-box').prepend('<p class="checking-tips">正在查询数据...</p>');
                }
            },
            success:function(data){
                if (!data.rs) {
                    alert(data.msg);
                    return;
                }
                var html = '';
                if(flag == 1){
                    html = noCommentTemplateFn(data.data);
                }else{
                    html = commentTempFn(data.data);
                }
                $('.comment-box').html(html);
                if(needInitPagination && data.data.length){
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