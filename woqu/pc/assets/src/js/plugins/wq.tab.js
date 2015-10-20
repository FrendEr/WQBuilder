var $ = require('../vendors/jquery.min');

/**
 * tab
 */
var wqTabControl=function(opts){
	/*
	 * 按钮添加role=tab-btn属性
	 * 内容添加role=tab-content属性
	 */
	var options = $.extend({},{
		eventType:'click',
		animate:false,
		callback:null
	},opts);

	if(!options.box)return;

    var _$btn = options.box.find('[role=tab-btn]'),
        _$content = options.box.find('[role=tab-content]'),
        _index = 0,
        _flag = false;

     _$btn.on(options.eventType,function(){

         var num = options.box.find('[role=tab-btn]').index($(this)[0]);

         if(num == _index){
                return;
         }

         if(_flag)return;

         _flag = true;

         _$btn.removeClass('current').eq(num).addClass('current');

         if(options.animate){
        	 //动画切换效果需要配合css：position来实现
             _$content.delay(500).css('left','100%').eq(num).stop(true,false).animate({'left':'0'},500,function(){
            	 _index = num;
            	 if(options.callback && typeof options.callback == 'function'){options.callback(_index);}
            	 _flag = false;
             });
         }else{
        	 //一般切换
        	 _$content.hide().eq(num).show();
        	 _index = num;
        	 if(options.callback && typeof options.callback == 'function'){options.callback(_index);}
        	 _flag = false;
         }
     });

};

module.exports = wqTabControl;
