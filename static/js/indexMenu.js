$(function() {
    console.log("llama a la funcion");
  // constants
  /*
  var SHOW_CLASS = 'show',
      HIDE_CLASS = 'hide',
      ACTIVE_CLASS = 'active';
      */
  
  $( '.tabs' ).on( 'click', 'li a', function(e){
    e.preventDefault();
    var $tab = $( this ),
         href = $tab.attr( 'href' );
         
         
  
     $( '.active' ).removeClass( 'active' );
     $tab.addClass( 'active' );
  
     $( '.show' )
        .removeClass( 'show' )
        .addClass( 'hide' )
        .hide();
    
      $(href)
        .removeClass( 'hide' )
        .addClass( 'show' )
        .hide()
        .fadeIn( 550 );
  });
  
});