var $ = require('../vendors/jquery.min');

var cssText = [],d = document;

cssText[cssText.length] = '<style>';
cssText[cssText.length] = '.wq_dialog_cover{position:fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity: 0.4;filter: alpha(opacity=40);z-index:9997;}';
cssText[cssText.length] = '.wq_dialog{border: 1px solid #cfdfdf;position:fixed;top:50%;left:50%;background:#fff;z-index:9999;max-width:900px;border-radius:4px;box-shadow:0 0 2px #ccc;}';
cssText[cssText.length] = '.wq_dialog_title{height:40px;background:#e5fbfb;line-height:40px;font-size:16px;text-indent:20px;display:none;}';
cssText[cssText.length] = '.wq_dialog_close{display:none;position:absolute;top:10px;right:10px;width:18px;height:18px;background:url(//www.quimg.com/a7735/img/page/list/eurail/list-icon.png) no-repeat right bottom;cursor:pointer;}';
cssText[cssText.length] = '.wq_dialog_content{padding:20px;overflow:hidden;font-size:14px;}';
cssText[cssText.length] = '.wq_dialog_content h2{font-size:16px;color:#0aaa96;font-weight:700;line-height:30px;}';
cssText[cssText.length] = '.wq_dialog_content h3{font-size:14px;color:#0aaa96;}';
cssText[cssText.length] = '.wq_dialog_content p{font-size:14px;line-height:26px;}';
cssText[cssText.length] = '.wq_dialog_cusp{display:none;position:absolute;width:14px;height:7px;background: url(//www.quimg.com/a9000/img/page/channel/around/bus-all.png) no-repeat;}';
cssText[cssText.length] = '.wq_dialog_cusp_top{top:-7px;background-position: -370px 0;}';
cssText[cssText.length] = '.wq_dialog_cusp_bottom{bottom:-7px;background-position: -370px -7px;}';
cssText[cssText.length] = '</style>';

d.write(cssText.join(''));

var layer = {
	param:{
		defaults:{
			title:null,
			content:'',
			close:true,
			ok:false,
			cancel:false,
			cover:false,
			width:null,
			height:null,
			innerHTML:[
				'<div class="wq_dialog">',
					'<div class="wq_dialog_title"></div>',
					'<div class="wq_dialog_content"></div>',
					'<div class="wq_dialog_close"></div>',
					'<div class="wq_dialog_cusp"></div>',
				'</div>'].join('')
		},
		elem:null,
		timer:null
	},
	create:function(opts){
		if(this.param.timer)clearTimeout(this.param.timer);
		if(this.param.elem)this.close();		
		opts.id = 'wq_dialog_'+ (new Date() - 0);		
		var $this = this;
		var	options = $.extend({},$this.param.defaults,opts);
		var	$elem = $(options.innerHTML).appendTo($('body'));
		var backdrop;
		//set id
		$elem.attr('id', opts.id);
		$this.param.elem = $elem;	
		//cover
		if(options.cover){
			backdrop = $('<div class="wq_dialog_cover"></div>').appendTo($('body'));
			backdrop.on('click',function(){
				backdrop.hide().remove();
				$this.close();
			});
		}
		//关闭按钮
		if(options.close){
			$this._$('close')
			.on('click',function(){
				if(backdrop)backdrop.hide().remove();
				$this.close();
			}).show();
		}
		//title
		if(options.title){
			$this.title(options.title);
		}
		//content
		if(options.content){
			$this.content(options.content);		
		}
		//width
		if(options.width){
			$this.width(options.width);
		}
		//height
		if(options.height){
			$this.height(options.height);
		}
		return $this;		
	},
	dialog:function(opts){
		var $this = this;
		$this.create(opts).setDiaposi(opts).resize(opts);
		return $this;
	},
	hoverTip:function(target,opts,type){
		if(!target)return;
		var $this = this;
		opts.close = false;
		opts.cover = false;
		$this.create(opts).setHoverposi(target,type);
		$this.param.elem.hover(function(){
			if($this.param.timer)clearTimeout($this.param.timer);			
		},function(){
			$this.param.timer = setTimeout(function(){
				$this.close();
			},100);
		});	
		return $this;
	},
	_$:function(i){
		return this.param.elem.find('.wq_dialog_'+i);
	},
	content:function(v){
		this._$('content').html(v);
	},
	title:function(v){
		this._$('title').text(v).show();
	},
	width:function(v){
		this.param.elem.css('width',v);
	},
	height:function(v){
		this.param.elem.css('height',v);
	},
	show:function(){
		if(this.param.timer)clearTimeout(this.param.timer);
		this.param.elem.show();
	},
	close:function(time){
		var $this = this;
		if($this.param.timer)clearTimeout($this.param.timer);
		if(time){
			$this.param.timer = setTimeout(function(){
				$this.param.elem.hide().remove();
			},time);
		}else{
			$this.param.elem.hide().remove();
		}		
	},
	cusp:function(v){
		this._$('cusp').addClass(this._$('cusp').attr('class')+'_'+v);
	},
	setDiaposi:function(opts){
		var _content = this._$('content'),
	    	_W = this.param.elem.width(),
	    	_H = opts.height ? opts.height : this.param.elem.height(),
	    	_MAX_H = ($(window).height() > 900) ? 900 : $(window).height();
		if(_H > _MAX_H){
			this.param.elem.css({marginLeft:-_W/2,height:_MAX_H,marginTop:-_MAX_H/2});			
		}else{
			this.param.elem.css({marginLeft : -_W/2,marginTop  : -_H/2});
		}
		var _MAX_CH = this.param.elem.height() - (opts.title ? 40 : 0);
		 _content.css('height',_MAX_CH-40);
		//_content.height() > _MAX_CH ? _content.css('overflowY','scroll') : _content.css('overflowY','auto');
		if(_content.height() > _MAX_CH){
			_content.css('overflowY','scroll');
		}else{
			_content.css('overflowY','auto');
		}	
		return this;
	},
	setHoverposi:function(target,type){	
		this._$('content').css('padding','10px');
		var type = type || 'bottom';
		var	ow = this.param.elem.outerWidth();
		var	oh = this.param.elem.outerHeight();
		var	tw = $(target).outerWidth();
		var	th = $(target).outerHeight();
		var	winw = $(window).width();
		var	winh = $(window).height();
		var scrollTop = $(window).scrollTop();
		var	left = $(target).offset().left;
		var	top = $(target).offset().top;
		var	css = {position:'absolute'};
		css.left = ow/2  > (left + tw/2) ? 0 : left + tw/2 - ow/2;
		this._$('cusp').css('left',left - css.left + tw/2 - 7).show();
		if(type == 'bottom'){						
			//if(oh > winh + scrollTop - top - th){
			//	css.top = top - oh - 10;
			//	this.cusp('bottom');
			//}else{
				css.top = top + th + 10 ;
				this.cusp('top');
			//}		
		}else{			
			//if(oh > top - scrollTop){
			//	css.top = top + th + 10;
			//	this.cusp('top');
			//}else{
				css.top = top - oh - 10 ;
				this.cusp('bottom');
			//}
		}
		this.param.elem.css(css);	
		return this;
	},
	resize:function(opts){
		var $this = this;
		$(window).on('resize',function(){
			$this.setDiaposi(opts);
		});
		return this;
	}	
};
module.exports = layer;