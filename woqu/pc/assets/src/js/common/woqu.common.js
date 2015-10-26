var $ = require('../vendors/jquery.min');
var escape = require('../utils/woqu.escape');
var regExpTest = require('../utils/woqu.regexptest');

module.exports = function() {
    /*
     * 回到顶部
     */
    var topBubble = $('.top-bubble');
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            topBubble.fadeIn();
        } else {
            topBubble.hide();
        }
    });

    topBubble.on('click', function() {
        $(window).scrollTop(0);
    });

    /*
     * 用户反馈
     */
    var feedbackBubble = $('#feedbackBubble');
    var feedbackWrapper = $('#feedbackWrapper');
    feedbackBubble.on('click', function() {
        $('#feedbackContent').val('');
        $('#feedbackContact').val('');
        $.get(window.location.protocol + '//w.woqu.com/feedback', function(data) {
			if (data === '') {
				$('#feedbackContact').show();
			} else {
                $('#feedbackContact').val(data);
            }
			feedbackWrapper.show();
    	});
    });
    feedbackWrapper.on('click', '.mask, #feedbackCancel', function() {
        feedbackWrapper.hide();
    });
    feedbackWrapper.on('click', '#feedbackSubmit', function() {
        var content = escape($.trim($('#feedbackContent').val())),
            contact = escape($.trim($('#feedbackContact').val()));

        if (content === '') {
            alert('请输入您的意见内容');
            return;
        }

        if (!regExpTest('email', contact).code && !regExpTest('mobileCN', contact).code) {
            alert('请输入正确的邮箱或者手机号码');
            return;
        }

        $.post(window.location.protocol + '//w.woqu.com/feedback/submit', {
			content: content,
			contact: contact,
			sourceUrl: window.location.href
		}, function(data) {
			var jsonData = JSON.parse(data);
			if (jsonData.result) {
				window.alert('提交成功！');
				setTimeout(function() {
					$('#feedbackWrapper').hide();
				}, 2000);
            } else {
                window.alert('提交失败！');
            }
        });
    });

    /*
     * 全站placeholder兼容
     */
    if (!Modernizr.placeholder) {           // Modernizr为全局引入变量，用于兼容性检测，请不要自己手动检测
        $('input[type="text"][placeholder], textarea[placeholder]').each(function() {
            var $this = $(this),
                placecontent = $this.attr('placeholder');

            if (placecontent !== '') {
                $this
                .val(placecontent)
                .css('color', '#848484')
                .on('focus', function() {
                    $this.css('color', '#333');
                    if ($.trim($this.val()) == placecontent) {
                        $this.val('');
                    }
                })
                .on('blur', function() {
                    if ($.trim($this.val()) === '' || $.trim($this.val()) == placecontent) {
                        $this.val(placecontent).css('color', '#848484');
                    } else {
                        $this.css('color', '#333');
                    }
                });
            }
        });
    }
};
