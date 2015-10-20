webpackJsonp([0,10],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//jquery
	var $ = __webpack_require__(1);

	$(function(){

		var w = $(window).width();
		$('.slideBar').css('left',w/2 - 490 -177-23);

		$(window).on('scroll',function(){
			var top = $(window).scrollTop();
			if(top > 430){
				$('.slideBar').stop().animate({
					top : top + 40
				},100);
			}else{
				$('.slideBar').css('top','470px');
			}
		});
	});


/***/ }
]);