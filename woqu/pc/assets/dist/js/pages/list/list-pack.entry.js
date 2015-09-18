webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var PackList = {
	    version: 'v0.6.0',
	    defenders: 'Frend',

	    packLog: function() {
	        console.log('pack list js');
	    }
	};

	// test jquery
	var $ = __webpack_require__(1);
	console.log($('p').length);

	// test woqu common js
	var WoquCommon = __webpack_require__(3);
	WoquCommon.commonLog();

	// test list common js
	var ListCommon = __webpack_require__(4);
	ListCommon.listLog();

	// test pack list js
	PackList.packLog();

	// test slider plugin
	var Slider = __webpack_require__(5);
	var bannerSlider = new Slider($('#bannerSlider'), {
		time: 5000,
		delay: 400,
		event: 'hover',
		auto: true,
		mode: 'fade',
		controller: $('#bannerCtrl'),
		activeControllerCls: 'active'
	});

	__webpack_require__(6)();


/***/ },

/***/ 6:
/***/ function(module, exports) {

	module.exports = function() {
	    console.log('pack list special!');
	};


/***/ }

});