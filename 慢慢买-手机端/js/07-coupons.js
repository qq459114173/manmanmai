$(function () {
	couponsTitle()
});

function couponsTitle(){
	$.ajax({
		url:'http://localhost:9090/api/getcoupon',
		success:function(obj){
			var html=template('couponsTpl',obj);
			$('#section ul').html(html);
		}
	});
}