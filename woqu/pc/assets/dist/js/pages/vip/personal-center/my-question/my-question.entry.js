webpackJsonp([10,12],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);

	/*
	 * vip center common op
	 */
	var vipCommon = __webpack_require__(3);
	//vipCommon.vipCommonOp();

	/*
	 * template op
	 */
	var doT = vipCommon.doT;
	var template = __webpack_require__(19);
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

/***/ },

/***/ 19:
/***/ function(module, exports) {

	module.exports = "{{? it.length === 0 }}\r\n<p class=\"empty-tips\">暂无提问信息</p>\r\n{{?}}\r\n\r\n{{? it.length !== 0 }}\r\n\r\n<table class=\"question-table\">\r\n    <col width=\"490px\"></col>\r\n    <col width=\"160px\"></col>\r\n    <col width=\"330px\"></col>\r\n    <tr class=\"table-header\">\r\n        <th>问题/回答</th>\r\n        <th>提问时间</th>\r\n        <th>产品信息</th>\r\n    </tr>\r\n    {{~it:value:index}}\r\n        <tr>\r\n            <td>\r\n                <p class=\"question-centent\"><i></i>问题：{{=value.comment}}</p>\r\n                {{? value.reply !== ''}}\r\n                    <p class=\"anwser-content\"><i></i>回答：{{=value.reply}}</p>\r\n                {{?}}\r\n            </td>\r\n            <td class=\"question-time\">\r\n                {{=value.createTime}}\r\n            </td>\r\n            <td class=\"product-info\">\r\n                <span>【境外参团】</span>\r\n                <p>{{=value.productTitle}}</p>\r\n            </td>\r\n        </tr>\r\n        {{? index !== it.length - 1}}\r\n            <tr class=\"question-divide\">\r\n                <td colspan=\"3\"></td>\r\n            </tr>\r\n        {{?}}\r\n    {{~}}\r\n</table>\r\n{{?}}";

/***/ }

});