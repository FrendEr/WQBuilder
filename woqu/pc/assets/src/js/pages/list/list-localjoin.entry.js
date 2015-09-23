var PackList = {
    version: 'v0.6.0',
    defenders: 'Frend',

    packLog: function() {
        console.log('pack list js');
    }
};

// test jquery
var $ = require('../../vendors/jquery.min.js');
console.log($('p').length);

// test woqu common js
var WoquCommon = require('../../common/woqu.common.js');
WoquCommon.commonLog();

// test list common js
var ListCommon = require('./list-common.js');
ListCommon.listLog();

// test pack list js
PackList.packLog();
