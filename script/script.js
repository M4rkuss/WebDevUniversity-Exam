$(document).ready(() => {
  $('.benefits-slider').slick({
    arrows: false,
    dots: true,
    accessibility: false
  })

  $('.products-slider').slick({
    slidesToShow: 3,
    prevArrow: '#prodPrev',
    nextArrow: '#prodNext',
    accessibility: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  })


  let cookieSeen = localStorage.getItem('cookie_seen');

  if (cookieSeen) {
    $('#cookie-info').remove();
  } else {
    $('#cookie-info').fadeIn();
  }

  let current_year = new Date().getFullYear();
  $('#current-year').html(current_year);

  if ($(window).width() < 767) {
    $('#order-profiles').attr('placeholder','');
  }

}).on('focus', '#order-profiles', function () {
  $('#open-input-placeholder').addClass('d-none');
}).on('focusout', '#order-profiles', function () {
  let value = $('#order-profiles').val().trim();

  if (value.length == 0) {
    $('#open-input-placeholder').removeClass('d-none');
  }
}).on('click', '.scroll-to-elem', function (e) {
  e.preventDefault();

  let element = $(this).attr('data-scroll'),
    offset  = $(element).offset().top;

  $("html, body").animate({scrollTop: offset}, 1000)

  $('.close-nav').click();
}).on('click', '.accept-cookie, .close-cookie', function (e) {
  e.preventDefault();

  localStorage.setItem('cookie_seen', 'true');
  $('#cookie-info').fadeOut();
}).on('click', '.close-nav, .popup-bg', function (e) {
  e.preventDefault();

  $('.nav-menu').removeClass('opened');
  $('.popup-bg, .popup-white, .popup-green').fadeOut();
}).on('click', '.menu-header', function (e) {
  e.preventDefault();

  $('.nav-menu').addClass('opened');
  $('.popup-bg').fadeIn();
}).on('click', '.prod-slider-btn', function () {

  let new_slide = $('.products-slider-item.slick-current').attr('data-item');

  $('.products-slider-row2').css('left', (new_slide - 1) * 10 + '%')
}).on('mouseenter', '.world-map-elem', function (e) {


  let city = $(e.target).attr('id');

  console.log(city);

  if (city == 'barcelona') {
    $('#barcelona, #kharkiv').css('fill', '#47655D')
  } else if (city == 'wolomin') {
    $('#wolomin, #kharkiv').css('fill', '#47655D')
  } else if (city == 'kharkiv') {
    $('#barcelona, #wolomin, #kharkiv').css('fill', '#47655D')
  }

}).on('mouseleave', '.world-map-elem', function () {
  $('.world-map-elem').css('fill', '#F1F5F8');
}).on('click', '.open-callback', function (e) {
  e.preventDefault();

  $('.nav-menu').removeClass('opened');
  $('#popup-callback, .popup-bg').fadeIn();
}).on('click', '.close-popup', function (e) {
  e.preventDefault();

  $('.popup-bg, .popup-white, .popup-green').fadeOut();
}).on('click', '#send-callback', function (e) {
  e.preventDefault();

  let name   = $('#callback_name_input').val().trim(),
    number = $('#callback_number_input').val().trim();

  if (name.length == 0) {
    $('#callback_name_input').addClass('error-input');
  }

  if (number.length == 0) {
    $('#callback_number_input').addClass('error-input');
  }

  if (number.length == 0 || name.length == 0) return;

  $('#send-callback').html('Загрузка...')

  setTimeout(() => {
    $('#popup-callback').fadeOut();
    $('#send-callback').html('Отправить');
    $('#callback_number_input, #callback_name_input').val('')
  }, 1000)

  setTimeout(() => {
    $('#popup-ready').fadeIn();
  }, 1400)
}).on('focus', '.error-input', function () {
  $(this).removeClass('error-input');
}).on('click', '#open-price-popup', function (e) {
  e.preventDefault();

  $('#popup-get-price, .popup-bg').fadeIn();
}).on('click', '#send-get-price', function (e) {
  e.preventDefault();

  let name    = $('#get-price-name').val().trim(),
    number  = $('#get-price-number').val().trim(),
    comment = $('#get-price-comment').val().trim();

  if (name.length == 0) {
    $('#get-price-name').addClass('error-input')
  }

  if (number.length == 0) {
    $('#get-price-number').addClass('error-input')
  }

  if (comment.length == 0) {
    $('#get-price-comment').addClass('error-input')
  }

  if (name.length == 0 || number.length == 0 || comment.length == 0) return;

  $('#send-get-price').html('Отправка...')

  setTimeout(() => {
    $('#get-price-name, #get-price-comment, #get-price-number').val('')

    $('#popup-get-price').fadeOut();
    $('#send-get-price').html('Отправить')
  }, 1000)

  setTimeout(() => {
    $('#popup-ready-price').fadeIn();
  }, 1400)
}).on('click', '#open-order-popup', function (e) {
  e.preventDefault();

  let product = $('#order-product').val().trim(),
    profile = $('#order-profiles').val().trim();

  if (product.length == 0 || profile.length == 0) {

    if (product.length == 0) {
      $('#order-product').addClass('error-input')
    }

    if (profile.length == 0) {
      $('#order-profiles').addClass('error-input')
    }

    return;
  }

  $('#popup-order, .popup-bg').fadeIn();
}).on('click', '#make-order', function (e) {
  e.preventDefault();

  let all_valid = true;

  $('#popup-order').find('input').each(function () {
    if ($(this).val().trim().length == 0) {
      $(this).addClass('error-input');

      all_valid = false;
    }
  })

  if (all_valid) {
    $('#make-order').html('Отправка...');

    setTimeout(() => {
      $('#make-order').html('Отправить');
      $('#popup-order').fadeOut()
    }, 1000)

    setTimeout(() => {
      $('#popup-thanks').fadeIn();
      $('#popup-order input, .order-head-input input').val('');
    }, 1400)
  }
}).on('click', '#open-analytics-popup', function (e) {
  e.preventDefault();

  $('#popup-analytics, .popup-bg').fadeIn();
}).on('click', '#get-analytics', function (e) {
  e.preventDefault();

  let all_valid = true;

  $('#popup-analytics').find('input').each(function () {
    if ($(this).val().trim().length == 0) {
      $(this).addClass('error-input');

      all_valid = false;
    }
  })

  let email = $('#email').val().trim();

  if (!validateEmail(email)) return $('#email').addClass('error-input');

  if (all_valid) {
    $('#get-analytics').html('Отправка...')

    setTimeout(() => {
      $('#get-analytics').html('Отправить');
      $('#popup-analytics input').val('');
      $('#popup-analytics').fadeOut();
    }, 1000)

    setTimeout(() => {
      $('#popup-analytics-ready').fadeIn();
    }, 1400)
  }
}).on('keydown', function (e) {
  if (e.keyCode == 27) $('.popup-bg').click();
}).on('click', '.')

$(function () {
  $("#callback_number_input, #get-price-number, #phone").mask("+380 (99) 999-99-99");
});

function validateEmail(email) {
  const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return regex.test(email);
}

$(window).on('resize', function () {
  if ($(window).width() < 767) {
    $('#order-profiles').attr('placeholder','');
  } else {
    $('#order-profiles').attr('placeholder','Ароматические профили (можно указать несколько)');
  }
})