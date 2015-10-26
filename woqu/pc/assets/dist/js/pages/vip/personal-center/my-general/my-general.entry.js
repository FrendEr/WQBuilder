webpackJsonp([8,12],{

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
	var template = __webpack_require__(18);
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

/***/ },

/***/ 18:
/***/ function(module, exports) {

	module.exports = "{{? it.length === 0 }}\r\n<p class=\"empty-tips\">暂无联系人信息</p>\r\n{{?}}\r\n\r\n{{? it.length !== 0 }}\r\n<table class=\"gv-table\">\r\n    <col width=\"80px\">\r\n    <col width=\"100px\">\r\n    <col width=\"150px\">\r\n    <col width=\"100px\">\r\n    <col width=\"70px\">\r\n    <col width=\"150px\">\r\n    <col width=\"150px\">\r\n    <col width=\"140px\">\r\n    <tr class=\"table-header\">\r\n        <th><input type=\"checkbox\" class=\"select-all\">&nbsp;&nbsp;全选</th>\r\n        <th>中文名</th>\r\n        <th>英文名</th>\r\n        <th>旅客类型</th>\r\n        <th>性别</th>\r\n        <th>联系号码</th>\r\n        <th>护照号码</th>\r\n        <th>操作</th>\r\n    </tr>\r\n    {{~it:value:index}}\r\n        <tr>\r\n            <td>\r\n                <input type=\"checkbox\" class=\"checkbox-li\" data-id=\"{{=value.id}}\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n            </td>\r\n            <td>{{=value.cnName}}</td>\r\n            <td>{{=value.enLastName}}</td>\r\n            <td>\r\n                {{? value.personType === 'aged'}}\r\n                老人\r\n                {{?? value.personType === 'adult'}}\r\n                成人\r\n                {{?? value.personType === 'child'}}\r\n                小孩\r\n                {{?}}\r\n            </td>\r\n            <td>\r\n                {{? value.gender === 1}}\r\n                男\r\n                {{??}}\r\n                女\r\n                {{?}}\r\n            </td>\r\n            <td>{{=value.mobile}}</td>\r\n            <td>\r\n                {{? value.certificateInfo === null}}\r\n                无\r\n                {{??}}\r\n                {{=value.certificateInfo}}\r\n                {{?}}\r\n            </td>\r\n            <td>\r\n                <a class=\"gv-edit-btn\" href=\"#\">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;\r\n                <a class=\"gv-delete-btn\" href=\"#\" data-id=\"{{=value.id}}\">删除</a>\r\n            </td>\r\n        </tr>\r\n        {{? index !== it.length - 1}}\r\n            <tr class=\"order-divide\">\r\n                <td colspan=\"8\"></td>\r\n            </tr>\r\n        {{?}}\r\n    {{~}}\r\n</table>\r\n{{?}}";

/***/ }

});