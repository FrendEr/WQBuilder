webpackJsonp([5,12],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var layer = __webpack_require__(13);

	/*
	 * vip center common op
	 */
	//var vipCommon = require('../../vip-common');
	//vipCommon.vipCommonOp();

	/*
	 * template op
	 */
	var doT = vipCommon.doT;
	var template = __webpack_require__(14);
	var tempFn = doT.template(template);

	var hash = window.location.href.hash;
	var id = '';
	var userData = '';

	if(hash !== ''){

	    id = hash.replace('#','');

	    $.post(url,function(data){
	        if(!data.rs){
	            window.alert(data.msg);
	            return;
	        }
	        userData = data.data;
	    });
	    
	}

	var html = tempFn(userData);
	$('.add-gv-form').html(html);


/***/ },

/***/ 14:
/***/ function(module, exports) {

	module.exports = "<div class=\"input-group\">\r\n    <label class=\"title-label\" for=\"cnName\">中文姓名</label>\r\n    <input type=\"text\" id=\"cnName\" value=\"{{? it.cnName !== null}}it.cnName{{?}}\">\r\n</div>\r\n<div class=\"input-group\">\r\n    <label class=\"title-label\" for=\"enLastName\">英文姓名</label>\r\n    <input type=\"text\" id=\"enLastName\" placeholder=\"姓/LastName\" value=\"{{? it.enLastName !== null}}it.enLastName{{?}}\">\r\n    <input type=\"text\" id=\"enFirstName\" placeholder=\"名/FirstName\" value=\"{{? it.enFirstName !== null}}it.enFirstName{{?}}\">\r\n</div>\r\n<div class=\"input-group\">\r\n    <label class=\"title-label\" for=\"mobilePhone\">手机号码</label>\r\n    <select>\r\n        <option>中国 (+86)</option>\r\n        <option>美国 (+0)</option>\r\n    </select>\r\n    <input type=\"text\" id=\"mobilePhone\" value=\"{{? it.mobilePhone !== null}}it.mobilePhone{{?}}\">\r\n</div>\r\n<div class=\"input-group\">\r\n    <label class=\"title-label\" for=\"certType\">证件类型</label>\r\n    <select>\r\n        <option value=\"\" {{?it.type === '0'}}selected{{?}}>护照</option>\r\n        <option value=\"\" {{?it.type === '1'}}selected{{?}}>身份证</option>\r\n    </select>\r\n    <input type=\"text\" id=\"certType\" value=\"{{? it.certType !== null}}it.certType{{?}}\">\r\n</div>\r\n<div class=\"input-group\">\r\n    <span class=\"title-label\">旅客类型</span>\r\n    <input type=\"radio\" id=\"vTypeAdult\" name=\"visitorType\" value=\"\" {{?it.visitorType === '0'}}checked{{?}}><label class=\"radio-label\" for=\"vTypeAdult\">成人</label>\r\n    <input type=\"radio\" id=\"vTypeChild\" name=\"visitorType\" value=\"\" {{?it.visitorType === '1'}}checked{{?}}><label class=\"radio-label\" for=\"vTypeChild\">儿童</label>\r\n</div>\r\n<div class=\"input-group\">\r\n    <span class=\"title-label\">性别</span>\r\n    <input type=\"radio\" id=\"genderMale\" name=\"gender\" value=\"\" {{?it.gender === '0'}}checked{{?}}><label class=\"radio-label\" for=\"genderMale\">男</label>\r\n    <input type=\"radio\" id=\"genderFemale\" name=\"gender\" value=\"\" {{?it.gender === '1'}}checked{{?}}><label class=\"radio-label\" for=\"genderFemale\">女</label>\r\n</div>\r\n<div class=\"input-group\">\r\n    <label class=\"title-label\" for=\"bornDate\">出生日期</label>\r\n    <input class=\"date-input\" type=\"text\" id=\"bornDate\" value=\"{{? it.birth !== null}}it.birth{{?}}\" readonly>\r\n</div>\r\n<div class=\"input-group\">\r\n    <label class=\"title-label\" for=\"email\">Email</label>\r\n    <input type=\"text\" id=\"email\" value=\"{{? it.email !== null}}it.email{{?}}\">\r\n</div>";

/***/ }

});