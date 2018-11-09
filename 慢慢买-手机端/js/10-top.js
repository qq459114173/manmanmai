$(function() {
    var mmb = new Mmb();
    // 获取品牌大全标题
    mmb.getbrandtitle();
});

var Mmb = function() {
}

Mmb.prototype = {
    getbrandtitle: function() {
        $.ajax({
            url: 'http://localhost:9090/api/getbrandtitle',
            dataType: 'json',
            success: function(result) {
                var html = template('getbrandtitleTpl', result);
                $('#main #top10 ul').html(html);
            }
        });
    },
}
