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
var template = require('./views/general-template.dot');
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
    getpagesData:function(page){
        if(COLLECT.config.xhr !== null){
            COLLECT.config.xhr.abort();
            COLLECT.config.xhr = null;
        }
        COLLECT.config.xhr = $.ajax({
            url:'http://vip.woqu.com/guest/get-list?pageNo='+page+'&pageSize=10',
            type:'post',
            beforeSend:function(){
                $('.general-box').prepend('<p class="checking-tips">正在查询数据...</p>');
            },
            success:function(data){

                if (!data.rs) {
                    alert(data.msg);
                    return;
                }
                var html = tempFn(data.data);
                $('.general-box').html(html);
                if(needInitPagination){
                    needInitPagination = false;
                    COLLECT.initPage(data.total);
                }
                
            },
            error:function(e){
                console.log(e);
            }

        });
    },
    initPage:function(total){
        $('#pagination').pagination({
            items : total,
            itemsOnPage : 10,
            displayedPages:3,
            prevText:'上一页',
            nextText:'下一页',
            onPageClick : function(index) {
                COLLECT.getpagesData(index);
            }
        });
    }
};

COLLECT.getpagesData(1);

//select all or not
$('.select-all').on('click',function(){
    if($(this).is(':checked')){
        $('.checkbox-li').prop('checked',true);
    }else{
        $('.checkbox-li').prop('checked',false);
    }
});
//delete all
$('.delete-all').on('click',function(e){
    e.preventDefault();
    var _this = this;
    var len = $('.checkbox-li:checked').length;
    var ids = '';
    if(len < 1){
        layer.hoverTip(_this,{content:'请至少选择一个要删除的联系人！'}).close(2000);
        return;
    }
    //get id list
    $('.checkbox-li:checked').each(function(){
        var id = $(this).attr('data-id');
        ids += ',' + id;
    });
    //post
    $.post('http://vip.woqu.com/guest/delete-by-id?id='+ids,function(data){
        if(data.rs){
            layer.hoverTip(_this,{content:'删除成功！'}).close(2000);
        }else{
            window.alert(data.msg);
        }
    });
});
//delete
$('.gv-section').on('click','.gv-delete-btn',function(e){
    e.preventDefault();
    var _this = $(this);
    var id = _this.attr('data-id') + ',';
    //post
    $.post(
        'http://vip.woqu.com/guest/delete-by-id?id='+id,
        function(data){
            if(data.rs){
                window.alert('删除成功');
                window.location.reload(true);
            }else{
                window.alert(data.msg);
            }
        }
    );
});