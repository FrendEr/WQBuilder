/*
 * 字符串格式正则匹配
 */
module.exports = function(type, content) {
    var regExpMap = {
		'common'			: /[\s\S]*/,													//匹配任何内容
		'chinese'  			: /^[\u4e00-\u9fa5]{1,}$/,										//中文
		'noChinese'			: /^[^\u4e00-\u9fa5]{0,}$/,										//非中文
		'letter'			: /^[a-zA-Z]+([a-zA-Z]|\s)*$/,									//纯字母
		'number'			: /^\d+$/, 														//匹配数字
		'numberLimit10'		: /^\d{10}$/, 													//匹配10位数字
		'bankCard'			: /^\d{15,19}$/,												//银行卡号
		'idCard'			: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,					//身份证号码
        'creditMonth'		: /^(([0][1-9])|([1][0-2]))$/,
        'creditYear'		: /^(\d){1,2}$/,
        'creditCvc'			: /^(\d){3,4}$/,
        'creditNumberUSA'	: /^(\d){5,19}$/,
		'email'				: /^\w+([-.]\w+)*@\w+([-]\w+)*\.(\w+([-]\w+)*\.)*[a-z]{2,3}$/,
		'mobileCN'			: /^1[0-9]{10}$/,												 //中国1开头的11位数字
		'mobileUSA'			: /^[0-9]{10,11}$/, 											 //美国10位数字
		'mobileCAD'			: /^[0-9]{10,11}$/, 											 //加拿大10位数字
		'mobileAUD'			: /^[0-9]{9,10}$/, 												 //澳大利亚9位
		'mobileNZD'			: /^[0-9]{9,10}$/, 												 //新西兰9位数字
		'mobileHK'			: /^[0-9]{8,9}$/, 												 //香港
		'mobileMacau'		: /(^0\d{8}$)|(^6\d{7}$)/, 										 //澳门
		'mobileTW'			: /^[0-9]{9,10}$/, 												 //台湾
		'mobileUK'			: /(^0\d{10}$)|(^7\d{9}$)/,										 //英国手机号码位数：10位数字，7开头
		'mobileFrance'		: /^[0-9]{9,10}$/, 												 //法国手机号码位数：9位数字
		'mobileGermany'		: /^[0-9]{10,11}$/, 											 //德国手机号码位数：11位数字
		'mobileBelgium'		: /(^0\d{9}$)|(^4\d{8}$)/, 										 //比利时手机号码位数：10位数字，4开头
		'mobileItaly'		: /(^0\d{10}$)|(^3\d{9}$)/, 									 //意大利手机号码位数：10位数字
		'mobileSpain'		: /(^0\d{9}$)|(^7\d{8}$)|(^6\d{8}$)/, 							 //西班牙手机号码位数：9位数字，以6开头
		'mobileSwiss'		: /^[0-9]{9,10}$/, 												 //瑞士手机号码位数：10位数字，07开头
		'mobileHolland'		: /(^0\d{9}$)|(^6\d{8}$)/, 										 //荷兰手机号码位数：10位数字，以06开头
		'mobileGreece'		: /(^0\d{10}$)|(6\d{9}$)/, 										 //希腊手机号码位数：10位数字
		'mobileNorway'		: /(^0\d{8}$)|(^4\d{7}$)|(^9\d{7}$)/,
		'password'			: /^[a-zA-Z0-9]{6,22}$/,
		'registPassword'    : /^[0-9a-zA-Z_]{6,22}$/,                                        //验证由数字、26个英文字母或者下划线组成的密码
		'telephone' 		: /^[+]{0,1}(\d){1,4}[ ]{0,1}([-]{0,1}((\d)|[ ]){1,12})+$/,
		'date'				: /^\d{4}-\d{2}-\d{2}$/, 										 //简单日期格式判断  1990-12-12
		'flightNum'			: /^[a-zA-Z]{2}[0-9]{1,4}$/,									 //航班号格式判断	航空公司双字码（字母两位） + 2-4位数字
		'hour'				: /^(1|0)[0-9]|2[0-3]$/,										 //小时格式判断(24小时制)
		'minute'			: /^[0-5][0-9]$/,												 //分钟格式判断
		'passportNum'		: /^[0-9a-zA-Z]{0,12}?$/    									 //护照号码正则
	},
	regExpErrMap = {
		'email'				: '邮箱格式错误',
		'mobile'			: '手机格式错误',
		'letter'			: '请输入英文字母',
		'chinese'			: '请输入中文',
		'noChinese'			: '此处不允许输入中文',
		'number'			: '请输入正确数字',
		'numberLimit10'		: '请输入正确的10位数字',
		'bankCard'			: '请输入正确的银行卡号',
		'idCard'			: '请输入正确的身份证号码',
		'creditMonth'		: '请输入2位的月数',
        'creditYear'		: '请输入2位的年数',
        'creditCvc'			: '请输入正确的验证码',
        'creditNumberUSA'	: '请输入正确的卡号',
		'mobileCN'			: '手机格式错误(中国)',
		'mobileUSA'			: '手机格式错误(美国/加拿大)',
		'mobileCAD'			: '手机格式错误(美国/加拿大)',
		'mobileAUD'			: '手机格式错误(澳大利亚)',
		'mobileNZD'			: '手机格式错误(新西兰)',
		'mobileHK'			: '手机格式错误(香港)',
		'mobileMacau'		: '手机格式错误(澳门)',
		'mobileTW'			: '手机格式错误(台湾)',
		'mobileUK'			: '手机格式错误(英国)',
		'mobileFrance'		: '手机格式错误(法国)',
		'mobileGermany'		: '手机格式错误(德国)',
		'mobileBelgium'		: '手机格式错误(比利时)',
		'mobileItaly'		: '手机格式错误(意大利)',
		'mobileSpain'		: '手机格式错误(西班牙)',
		'mobileSwiss'		: '手机格式错误(瑞士)',
		'mobileHolland'		: '手机格式错误(荷兰)',
		'mobileGreece'		: '手机格式错误(希腊)',
		'mobileNorway'		: '手机格式错误(挪威)',
		'telephone' 		: '座机格式错误',
		'password'			: '密码长度必须为6-22位',
		'registPassword'    : '密码格式错误',
		'date'				: '请选择日期',
		'flightNum'			: '请输入正确的航班号码',
		'hour'				: '请输入正确的小时',
		'minute'			: '请输入正确的分钟',
		'passportNum' 		: '护照号码不符合规则'
	};

	return {
        code: regExpMap[type].test(content),
        msg: regExpErrMap[type]
    };
};
