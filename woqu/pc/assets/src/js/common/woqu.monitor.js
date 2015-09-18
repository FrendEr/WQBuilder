/*
 * pc analytics code
 */

module.exports = function() {

	//ga
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//analytics.woqu.com/analytics.js','ga');
	ga('create', 'UA-48465131-1', 'auto');
	ga('send', 'pageview');

	//baidu
	var _hmt = _hmt || [];
	(function() {
		if (location.protocol == 'https:') return;
		var hm = document.createElement('script');
		hm.src = '//hm.baidu.com/hm.js?526799ce499fd4724a6483fd5b33fdce';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(hm, s);
	})();

};
