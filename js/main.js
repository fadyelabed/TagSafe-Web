$(function () {
    $(".logonav").mouseenter(function () {
        $(this).attr('src', "../images/mouseenter.gif");
    }).finish().mouseleave(function () {
        $(this).attr('src', "../images/mouseleave.gif");
    })
});
