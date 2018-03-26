$(function() {

    $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

//(function($) {
//  $(document).ready(function() {  
//    var $this = $('#menu'), resizeTimer, self = this;    
//    var initCollapse = function(el) {
//      if ($(window).width() >= 768) {
//        this.find('li').has('ul').children('a').off('click');
//      }
//    }
//    $(window).resize(function() {
//        clearTimeout(resizeTimer);
//        resizeTimer = setTimeout(self.initCollapse($this), 250);
//    });    
//  });
//})(jQuery);
//    var url = window.location;
//    var element = $('ul.nav a').filter(function() {
//        return this.href == url || url.href.indexOf(this.href) == 0;
//    }).addClass('active').parent().parent().addClass('in').parent();
//    if (element.is('li')) {
//        element.addClass('active');
//    }
    
});
