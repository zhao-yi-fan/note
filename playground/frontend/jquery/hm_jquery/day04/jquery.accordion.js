$.fn.accordion = function (width, colors) {
    colors = colors || [];
    width = width || 0;

    var $li = this.find("li");
    var widthMax = parseInt(this.css("width")) - width * ($li.length - 1);
    var widthMin = width;
    var widthAvg = parseInt(this.css("width")) / $li.length;
    $li.each(function (i, e) {
        $(e).css("backgroundColor", colors[i]);
    });
    $li.on("mouseenter", function () {
        $(this).stop().animate({ "width": widthMax }).siblings().stop().animate({ "width": widthMin });
    });
    $li.on("mouseleave", function () {
        $li.stop().animate({ "width": widthAvg });
    });
    return this;
}