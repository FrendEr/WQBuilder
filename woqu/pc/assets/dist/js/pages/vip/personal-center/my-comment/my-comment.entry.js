webpackJsonp([7,12],{

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
	var commentTemplate = __webpack_require__(16);
	var noCommentTemplate = __webpack_require__(17);
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

/***/ },

/***/ 16:
/***/ function(module, exports) {

	module.exports = "{{? it.length === 0 }}\r\n<p class=\"empty-tips\">暂无订单信息</p>\r\n{{?}}\r\n\r\n{{? it.length !== 0 }}\r\n\r\n<table class=\"comment-table\">\r\n    <col width=\"800px\"></col>\r\n    <col width=\"180px\"></col>\r\n    {{~it:value:index}}\r\n        <tr class=\"comment-divide\">\r\n            <td colspan=\"2\"></td>\r\n        </tr>\r\n        <tr class=\"title-tr\">\r\n            <td colspan=\"2\">\r\n                <span class=\"product-title\">{{=value.title}}</span>\r\n                <span class=\"trip-date\">出发日期：{{=value.travelDate}}</span>\r\n            </td>\r\n        </tr>\r\n        <tr class=\"comment-tr\">\r\n            <td>\r\n                <div class=\"comment-info\">\r\n                    <div class=\"score-star\">\r\n                        <span>综合评分 :<span class=\"star star3\"><i></i></span></span>\r\n                        <span>交通路线 :<span class=\"star star2\"><i></i></span></span>\r\n                        <span>住宿餐饮 :<span class=\"star star1\"><i></i></span></span>\r\n                        <span>导游讲解 :<span class=\"star star0\"><i></i></span></span>\r\n                    </div>\r\n                    <p class=\"comment-content\">{{=value.commentContent}}</p>\r\n                    <p class=\"comment-time\">评论时间：{{=value.createTime}}</p>\r\n                </div>\r\n            </td>\r\n            <td>\r\n                <div class=\"comment-coupons\">\r\n                    <p>该点评已获得</p>\r\n                    <p><span>￥100</span> 优惠券</p>\r\n                </div>\r\n            </td>\r\n        </tr>\r\n    {{~}}\r\n</table>\r\n{{?}}";

/***/ },

/***/ 17:
/***/ function(module, exports) {

	module.exports = "{{? it.length === 0 }}\r\n<p class=\"empty-tips\">暂无未点评信息</p>\r\n{{?}}\r\n\r\n{{? it.length !== 0 }}\r\n<div class=\"padding-wrapper\">\r\n    <table class=\"order-table\">\r\n        <col width=\"400px\"></col>\r\n        <col width=\"110px\"></col>\r\n        <col width=\"116px\"></col>\r\n        <col width=\"150px\"></col>\r\n        <col width=\"180px\"></col>\r\n        <tr class=\"table-header\">\r\n            <th>订单信息</th>\r\n            <th>产品类型</th>\r\n            <th>订单金额</th>\r\n            <th>订单状态</th>\r\n            <th>操作</th>\r\n        </tr>\r\n        {{~it :value:index}}\r\n            <tr class=\"order-divide {{? index === 0}}first{{?}}\">\r\n                <td colspan=\"5\"></td>\r\n            </tr>\r\n            <tr class=\"order-num-date\">\r\n                <td colspan=\"5\"><span>订单号：<font>{{=value.orderCD}}</font></span><span>预订日期：{{=value.createTime}}</span></td>\r\n            </tr>\r\n            <tr class=\"order-info\">\r\n                <td class=\"order-title\"><a target=\"_blank\" href=\"http://www.woqu.com{{=value.productUrl}}\">{{=value.title}}</a></td>\r\n                <td>{{=value.categoryMean}}</td>\r\n                <td class=\"price\">\r\n                    {{=value.price}}\r\n                </td>\r\n                <td>\r\n                    <p class=\"order-status\">已成交</p>\r\n                    <a class=\"check-detail\" href=\"http://www.woqu.com{{=value.productUrl}}\">查看详情</a>\r\n                </td>\r\n                <td>\r\n                    <button class=\"btn btn-confirm btn-w80 btn-h24\" type=\"button\">我要点评</button>\r\n                </td>\r\n            </tr>\r\n        {{~}}\r\n    </table>\r\n</div>\r\n{{?}}\r\n";

/***/ }

});