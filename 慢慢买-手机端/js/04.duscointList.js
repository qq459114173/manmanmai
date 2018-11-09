$(function() {
    var id = location.hash.substr(1, ) || 0;
    // 发送省钱控商品详情api
   duscointDetails(id);
})

function duscointDetails(id){
     $.ajax({
        url: 'http://localhost:9090/api/getdiscountproduct',
        data: {
            productid: id,
        },
        success: function(obj) {
            var html = template('duscointLIstTpl', obj);
            $('#section').html(html);

            var lis = template('duscointLIstTpl2',obj);
            $('#comment').html(lis);
        },
    })
}