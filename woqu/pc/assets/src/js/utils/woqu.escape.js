/*
 * html转码，对于表单数据、ajax参数需要使用
 */
module.exports = function(string) {
    return string
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace('&', '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
};
