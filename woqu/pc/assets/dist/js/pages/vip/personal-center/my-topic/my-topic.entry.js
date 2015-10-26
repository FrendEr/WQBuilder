webpackJsonp([11,12],{

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
	var collectTemplate = __webpack_require__(20);
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

/***/ },

/***/ 20:
/***/ function(module, exports) {

	module.exports = "{{? it.length === 0 }}\r\n<p class=\"empty-tips\">暂无话题信息</p>\r\n{{?}}\r\n\r\n{{? it.length !== 0 }}\r\n\r\n<table class=\"topic-table\">\r\n    <col width=\"460px\"></col>\r\n    <col width=\"160px\"></col>\r\n    <col width=\"160px\"></col>\r\n    <col width=\"160px\"></col>\r\n    <tr class=\"table-header\">\r\n        <th>话题</th>\r\n        <th>主题板块</th>\r\n        <th>回应数</th>\r\n        <th>关注数</th>\r\n    </tr>\r\n    {{~it:value:index}}\r\n        <tr>\r\n            <td><a href=\"{{=value.url}}\">{{=value.title}}</a></td>\r\n            <td>\r\n                {{? value.section === 1}}\r\n                图文\r\n                {{?? value.section === 2}}\r\n                旅游攻略\r\n                {{?? value.section === 3}}\r\n                投诉建议\r\n                {{?}}\r\n            </td>\r\n            <td>{{=value.replyCount}}</td>\r\n            <td>{{=value.followCount}}</td>\r\n        </tr>\r\n    {{~}}\r\n</table>\r\n{{?}}";

/***/ }

});