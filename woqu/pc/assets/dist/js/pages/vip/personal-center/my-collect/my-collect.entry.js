webpackJsonp([6,12],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var layer = __webpack_require__(13);
	/*
	 * vip center common op
	 */
	var vipCommon = __webpack_require__(3);
	//vipCommon.vipCommonOp();

	/*
	 * template op
	 */
	var doT = vipCommon.doT;
	var collectTemplate = __webpack_require__(15);
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

/***/ },

/***/ 15:
/***/ function(module, exports) {

	module.exports = "{{? it.length === 0 }}\r\n<p class=\"empty-tips\">暂无订单信息</p>\r\n{{?}}\r\n\r\n{{? it.length !== 0 }}\r\n\r\n<table class=\"collect-table\">\r\n    <col width=\"300px\"></col>\r\n    <col width=\"375px\"></col>\r\n    <col width=\"190px\"></col>\r\n    <col width=\"140px\"></col>\r\n    {{~it:value:index}}\r\n        <tr class=\"collect-divide\">\r\n            <td colspan=\"4\"></td>\r\n        </tr>\r\n        <tr class=\"collect-tr\">\r\n            <td class=\"collect-img\">\r\n                <div>\r\n                    <span><span>\r\n                    {{? value.productCategory === 'LOCAL_JOIN'}}\r\n                        境外参团\r\n                    {{?? value.productCategory === 'packline'}}\r\n                        自由行\r\n                    {{?? value.productCategory === 'ticket'}}\r\n                        门票\r\n                    {{?}}\r\n                    </span><i></i></span>\r\n                    <img src=\"{{=value.image}}\" width=\"250\" height=\"150\">\r\n                </div>\r\n            </td>\r\n            <td class=\"collect-title\">\r\n                <div>\r\n                    <a href=\"{{=value.productUrl}}\">{{=value.title}}</a>\r\n                    <span class=\"collect-time\">收藏于{{=value.createDate}}</span>\r\n                </div>\r\n            </td>\r\n            <td class=\"collect-price\">\r\n                <span>{{=value.currency}}{{=value.price}}/人起</span>\r\n            </td>\r\n            <td>\r\n                <button class=\"btn btn-confirm btn-w80 btn-h24\" type=\"button\">立即预订</button>\r\n                <span class=\"collect-delete\" data-bid=\"{{=value.productBusinessID}}\">删除</span>\r\n            </td>\r\n        </tr>\r\n    {{~}}\r\n</table>\r\n{{?}}";

/***/ }

});