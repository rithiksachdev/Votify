$(document).ready(function () {
  var owl = $('.owl-carousel');

  owl.owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5500,
    nav: true,
    margin: 10,
  });

  owl.on('changed.owl.carousel', function (event) {
    var item = event.item.index - 2;     // Position of the current item
    $('h5').removeClass('animated pulse');
    $('.owl-item').not('.cloned').eq(item).find('h5').addClass('animated pulse');
  });

});
