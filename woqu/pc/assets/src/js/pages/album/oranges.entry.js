//jquery
var $ = require('../../vendors/jquery.min.js');

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
