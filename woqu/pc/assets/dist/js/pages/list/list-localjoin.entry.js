webpackJsonp([2,0,1],[
/* 0 */
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


/***/ }
]);