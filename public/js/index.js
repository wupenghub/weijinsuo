var isMobile = false;
$(function () {
   //获取当前设备的宽度
    $(window).on('resize',function (e) {
        var width = $(window).width();
        isMobile = width < 768;
        show();
    }).trigger('resize');
});
function show() {
    if(window.data){
        render();
    }else {
        $.ajax({
            url: 'data.json',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                window.data = data;
                render();
            }
        })
    }
}

function render() {
    var indicatorsHtml = template("indicatorsImg", {list: window.data});
    var innerHtml = template("innerImg", {list: window.data, isMobile: isMobile});
    $('#indicators-banner').html(indicatorsHtml);
    $('#inner-banner').html(innerHtml);
}