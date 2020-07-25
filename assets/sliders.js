$(".slider-items").slick({

  // normal options...
  slidesToShow: 2,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  cssEase: 'linear',
  nextArrow: '<div class="slick--next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="100px" width="50px" fill="#ffcc00" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve"><polygon points="75,50 25,0 25,15 60,50 25,85 25,100 "/></svg></div>',
  prevArrow: '<div class="slick--prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="100px" width="50px" fill="#ffcc00" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve"><polygon points="75,50 25,0 25,15 60,50 25,85 25,100 "/></svg></div>',

  // the magic
  responsive: [{

      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true
      }

    }, {

      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        dots: true
      }

    }, {

      breakpoint: 300,
      //settings: "unslick" // destroys slick

    }]
});
