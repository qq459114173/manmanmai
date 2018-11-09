$(function() {
    var mmb = new MMB();
    //调用新增搜索历史记录
    mmb.addHistory();
    //调用查询搜索历史记录
    mmb.queryHistory();
    //调用删除搜索历史记录
    mmb.deleteHistory();
    //调用清空搜索历史记录
    mmb.clearHistory();
})

var MMB = function() {

};

MMB.prototype = {
    addHistory: function() {
        var that = this;
        $('#search a').on('tap', function() {
            var searchText = $('#search input').val();
            //对空值进行判断
            if (!searchText) {
                alert('请输入要搜索的商品');
                return false;
            };
            var historyData = localStorage.getItem('historyData');
            if (historyData) {
                historyData = JSON.parse(historyData);
            } else {
                historyData = [];
            }
            // console.log(historyData);
            // 对已有的数组值进行判断,如果已存在就删除已存在数据，再进添加，
            // 如果不存在就直接添加
            if (historyData.indexOf(searchText) != -1) {
                // 说明已存在数据
                historyData.splice(historyData.indexOf(searchText), 1);
                historyData.unshift(searchText);
            } else {
                // 说明不存在，直接添加
                historyData.unshift(searchText);
            }
            // 把添加的数组保存到本地存储中，把数组转换成字符串
            localStorage.setItem('historyData', JSON.stringify(historyData));
            that.queryHistory();
            $('#search input').val('');

            //进行页面跳转到商品列表页面
            location.href='11-productlist.html?search='+searchText;
        });
    },
    // 查询搜索历史记录
    queryHistory: function() {
        var historyData = JSON.parse(localStorage.getItem('historyData')) || [];
        //调用模板渲染到页面上
        var html = template('searchTpl', { list: historyData });
        $('.content ul').html(html);
    },
    //删除搜索历史记录
    deleteHistory: function() {
        var that = this;
        //给所有i委托点击事件
        $('.content ul').on('tap', 'li i', function() {
            var index = $(this).data('id');
            var historyData = JSON.parse(localStorage.getItem('historyData')) || [];
            historyData.splice(index, 1);
            //删除完之后，再存储到本地数据当中去
            localStorage.setItem('historyData', JSON.stringify(historyData));
            // 再调用查询搜索历史记录函数
            that.queryHistory();
        })
    },
    // 清空搜索历史记录
    clearHistory: function() {
        var that = this;
        $('.title .mui-pull-right').on('tap', function() {
            localStorage.removeItem('historyData');
            that.queryHistory();
        });
    }
};
