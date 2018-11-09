$(function() {
    var id = location.hash.substr(1, ) || 20;
    // 发送省钱控商品详情api
    saveDetails(id);
})
function saveDetails(id){
      $.ajax({
        url: 'http://localhost:9090/api/getmoneyctrlproduct',
        data: {
            productid: id,
        },
        success: function(obj) {
            var html = template('saveDetailsTpl', obj);
            $('#section').html(html);
            // pageSum = Math.floor(obj.totalCount / obj.pagesize);
            var lis = template('saveDetailsTpl2', obj);
            $('#comment').html(lis);
        },
    })
}
