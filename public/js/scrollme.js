(function ($) {
    $(document).ready(function(){
  
      // hide .navbar first
      $("#navscroll").hide();
  
      // fade in .navbar
      $(function () {
          $(window).scroll(function () {
  
                   // set distance user needs to scroll before we start fadeIn
              if ($(this).scrollTop() > 450) {
                  $('#navscroll').show();
              } else {
                  $('#navscroll').hide();
              }
          });
      });
  
  });
    }(jQuery));

    (function ($) {
        $(document).ready(function(){
      
    
          // fade in .navbar
          $(function () {
              $(window).scroll(function () {
      
                var page_y = document.getElementsByTagName("body")[0].scrollTop;
                       // set distance user needs to scroll before we start fadeIn
                  if (page_y < 500) {
                      $('#navsc').show();
                  } else {
                      $('#navsc').hide();
                       
                  }
              });
          });
      
      });
        }(jQuery));

        
    (function ($) {
        $(document).ready(function(){
      
    
          // fade in .navbar
          $(function () {
              $(window).scroll(function () {
      
                       // set distance user needs to scroll before we start fadeIn
                  if ($(this).scrollTop() < 150) {
                      $('#arr').show();
                  } else {
                      $('#arr').hide();
                      $('#heading').hide();
                  }
              });
          });
      
      });
        }(jQuery));

        $(window).scroll(function(){
            $(".topinfo").css({"marginTop": -($(window).scrollTop())/8 + "px", "marginLeft":($(window).scrollLeft()) + "px"});
          });