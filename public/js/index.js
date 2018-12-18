var isMobile = false;
$(function () {
   //获取当前设备的宽度
    $(window).on('resize',function (e) {
        var width = $(window).width();
        isMobile = width < 768;
        show();
    }).trigger('resize');
    var startX = 0;
    var distanceX = 0;
    var width = $('.wjs-babber').width();
    $('.wjs-babber').on('touchstart',function (e) {
        startX = e.originalEvent.touches[0].clientX;
    });
    $('.wjs-babber').on('touchmove',function (e) {
        distanceX = e.originalEvent.touches[0].clientX - startX;
    });
    $('.wjs-babber').on('touchend',function (e) {
        if(distanceX < 0 ){
            // 往左移动
            if(Math.abs(distanceX) > width/4){
                $('.carousel').carousel('next');
            }
        }else{
            // 往右移动
            if(Math.abs(distanceX) > width/4){
                $('.carousel').carousel('prev');
            }
        }
    });
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
