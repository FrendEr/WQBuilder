webpackJsonp([9,12],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var util = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../../../common/woqu.util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	/*
	 * vip center common op
	 */
	var vipCommon = __webpack_require__(3);
	//vipCommon.vipCommonOp();

	/*update user info*/
	var updateUserInfo = (function(){

	    //show
	    $('.edit-base-info').on('click',function(e){
	        e.preventDefault();
	        $('#baseInfoWrapper').hide();
	        $('#baseInfoEdit').show();
	    });

	    //cancel
	    $('#baseInfoEdit').find('.btn-cancel').on('click',function(){
	        $('#baseInfoEdit').hide();
	        $('#baseInfoWrapper').show();
	    });

	    //confirm
	    $('#baseInfoEdit').find('.btn-confirm').on('click',function(){
	        var str = $('#baseInfoForm').serialize();
	        $.post('http://vip.woqu.com/modify/update-all',function(data){
	            if(data.rs){
	                layer.dialog({
	                    content:'<div style="padding:40px 0;text-align:center;">用户信息修改成功<br/><button class="btn btn-confirm btn-w60 btn-h30" type="button">保存</button></div>'
	                });
	            }else{
	                alert(data.msg);
	            }
	        });
	    });

	})();

	/*update password*/
	var updatePassWord = (function(){

	    //show
	    $('#passwordWrapper').find('.update-password').on('click',function(e){
	        e.preventDefault();
	        $('#passwordWrapper').hide();
	        $('#passwordEdit').show();
	    });

	    //cancel
	    $('#passwordEdit').find('.btn-cancel').on('click',function(){
	        $('#passwordEdit').hide();
	        $('#passwordWrapper').show();
	    });

	    //confirm
	    $('#passwordEdit').find('.btn-confirm').on('click',function(){
	        
	    });

	})();

	/*update phone*/
	var updatePhone = (function(){

	    //show
	    $('#phoneWrapper').find('.update-phone').on('click',function(e){
	        e.preventDefault();
	        $('#phoneWrapper').hide();
	        $('#phoneVerify').show();
	    });

	    //cancel
	    $('#phoneVerify').find('.btn-cancel').on('click',function(){
	        $('#phoneVerify').hide();
	        $('#phoneWrapper').show();
	    });

	    //confirm
	    $('#phoneVerify').find('.btn-confirm').on('click',function(){
	        
	    });

	})();

	/*update email*/
	var updateEmail = (function(){

	    //show
	    $('#emailWrapper').find('.update-email').on('click',function(e){
	        e.preventDefault();
	        $('#emailWrapper').hide();
	        $('#emailVerify').show();
	    });

	    //cancel
	    $('#emailVerify').find('.btn-cancel').on('click',function(){
	        $('#emailVerify').hide();
	        $('#emailWrapper').show();
	    });

	    //confirm
	    $('#emailVerify').find('.btn-confirm').on('click',function(){
	        
	    });

	})();

/***/ }
]);