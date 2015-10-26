var $ = require('../../../../vendors/jquery.min');
var layer = require('../../../../plugins/wq.layer');

/*
 * vip center common op
 */
//var vipCommon = require('../../vip-common');
//vipCommon.vipCommonOp();

/*
 * template op
 */
var doT = vipCommon.doT;
var template = require('./views/add-general-template.dot');
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
