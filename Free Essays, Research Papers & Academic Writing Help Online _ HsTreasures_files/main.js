// Generated by CoffeeScript 1.12.7
(function() {
  var animationEvent, getCookie, popupClose, renderAlert, setCookie, setEncodedEmail, showBanner, whichAnimationEvent;

  popupClose = true;

  showBanner = function(name) {
    if (!popupClose) {
      return false;
    }
    popupClose = false;
    return $.post('/wp-admin/admin-ajax.php', {
      action: 'get_banner_action',
      banner_name: name,
      postID: JSData.postID
    }).done(function(banner) {
      $('#footer').append(banner.data);
      $.magnificPopup.open({
        items: {
          src: '#samurai-' + name,
          type: 'inline'
        },
        callbacks: {
          close: function() {
            popupClose = true;
            $('#samurai-' + name).remove();
            return ga('send', 'event', 'pop up', 'close', name);
          }
        }
      });
      return ga('send', 'event', 'pop up', 'appear', name);
    });
  };

  renderAlert = function(message, aclass) {
    if (aclass == null) {
      aclass = 'alert-success';
    }
    $('<div/>', {
      'class': aclass,
      'html': message,
      'id': 'theme-alert'
    }).appendTo('footer');
    return setTimeout(function() {
      return $('#theme-alert').fadeOut(function() {
        return this.remove();
      });
    }, 3500);
  };

  getCookie = function(cname) {
    var c, ca, decodedCookie, i, j, name, ref;
    name = cname + "=";
    decodedCookie = decodeURIComponent(document.cookie);
    ca = decodedCookie.split(';');
    for (i = j = 0, ref = ca.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return false;
  };

  setCookie = function(cname, cvalue, exdays) {
    var d, expires;
    d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    return document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  whichAnimationEvent = function() {
    var animations, el, t;
    t = void 0;
    el = document.createElement('fakeelement');
    animations = {
      'animation': 'animationend',
      'OAnimation': 'oAnimationEnd',
      'MozAnimation': 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    };
    for (t in animations) {
      t = t;
      if (el.style[t] !== void 0) {
        return animations[t];
      }
    }
  };

  animationEvent = whichAnimationEvent();


  /* Function for set email to cookie with encode effect */

  setEncodedEmail = function(email) {
    return $.post('/wp-admin/admin-ajax.php', {
      action: 'set_encoded_email_action',
      email: email
    });
  };


  /* Ready DOM */

  $(function() {
    var lastYpos;
    $(document).bind('copy cut', function(e) {
      if (JSData.isSingle) {
        e.preventDefault();
        return showBanner('copy');
      }
    });
    if (getCookie('exit_popup') !== 1 && $(window).width() > 768) {
      lastYpos = 0;
      $(window).on('mousemove', function(e) {
        if (lastYpos > e.clientY && lastYpos < 5 && !getCookie('exit_popup') && popupClose) {
          showBanner('exit');
          setCookie('exit_popup', 1, 1);
        }
        return lastYpos = e.clientY;
      });
    }
    $(document).on('submit', '#nocopy', function() {
      $.post('/wp-admin/admin-ajax.php', $(this).serialize() + '&postID=' + JSData.postID).done(function(json) {
        if (json.success) {
          popupClose = true;
          $.magnificPopup.close();
          return showBanner(json.data);
        } else {
          return console.log('Error: ' + json.data);
        }
      });
      return false;
    });
    $('#contactForm').submit(function() {
      $.post('/wp-admin/admin-ajax.php', $(this).serialize()).done(function(json) {
        if (json.success) {
          return renderAlert('<strong>Success! </strong>' + json.data);
        } else {
          return renderAlert('<strong>Error! </strong>' + json.data, 'alert-danger');
        }
      });
      return false;
    });
    $(document).on('click', '#samurai-exit__btn', function(e) {
      var email, href;
      e.preventDefault();
      email = $('#samurai-exit').find('input[name=mail]').val();
      if (email === '') {
        return window.location.href = this.href;
      } else {
        setEncodedEmail(email);
        href = this.href.replace('?login-first=1', 'fast-signup?email=' + email);
        href = href.replace('utm_content=fast-signup', 'utm_content=fast-signup');
        return window.location.href = href;
      }
    });

    /* Menus */
    $('.menu_hire_writer').click(function() {
      return ga('send', 'event', 'CTA', 'click', 'mp_menu Hire Writer');
    });
    $('.menu_login').click(function() {
      return ga('send', 'event', 'CTA', 'click', 'Login');
    });

    /* Front */
    $('.main_order_button').click(function() {
      return ga('send', 'event', 'CTA-new dis', 'click', 'mp main_button');
    });
    $('.front_search_btn').submit(function() {
      return ga('send', 'event', 'Navigation', 'click', 'search');
    });
    $('.front_page_cta').click(function() {
      return ga('send', 'event', 'CTA-new dis', 'click', 'mp Big Baner');
    });

    /* Search */
    $('.search_big_banner').click(function() {
      return ga('send', 'event', 'CTA', 'click', 'search page');
    });
    $('.search-nfp_page_cta').click(function() {
      return ga('send', 'event', 'CTA', 'click', 'search page');
    });

    /* Footer */
    $('.footer_fixed_banner').click(function() {
      return ga('send', 'event', 'CTA', 'click', 'footer');
    });

    /* CTA */
    $(document).on('click', '.copy_banner_button', function() {
      return ga('send', 'event', 'pop up', 'click', 'copy');
    });
    $(document).on('click', '.exit_banner_button', function() {
      return ga('send', 'event', 'pop up', 'click', 'exit');
    });
    $(document).on('click', '.copy_thank_banner_button', function() {
      return ga('send', 'event', 'pop up', 'click', 'copy_thank');
    });

    /* Chat */
    $('.chat').find('.chat__close').click(function() {
      return ga('send', 'event', 'pop up', 'close', '20sec_CheckItOut');
    });
    $('.chat').find('a').click(function() {
      return ga('send', 'event', 'pop up', 'click', '20sec_CheckItOut');
    });
    $('#chat').one(animationEvent, function() {
      return ga('send', 'event', 'pop up', 'appear', '20sec_CheckItOut');
    });

    /* Exit */
    $(document).on('click', '#samurai-exit__btn', function() {
      return ga('send', 'event', 'pop up', 'click', 'exit');
    });

    /* Archive */
    $('.archive_page_cta').click(function() {
      return ga('send', 'event', 'CTA', 'click', 'category topic');
    });

    /* 404 */
    $('.404_page_cta').click(function() {
      return ga('send', 'event', 'CTA', 'click', '404 page');
    });

    /* Page */
    $('.page_page_cta').click(function() {
      return ga('send', 'event', 'CTA', 'click', 'service page');
    });

    /* Sidebars */
    $('.single_sidebar_banner').click(function() {
      return ga('send', 'event', 'CTA', 'click', 'custom topic sidebar');
    });
    $('.archive_sidebar_banner').click(function() {
      return ga('send', 'event', 'CTA', 'click', 'category topic sidebar');
    });
    $('.page_sidebar_banner').click(function() {
      return ga('send', 'event', 'CTA', 'click', 'service sidebar');
    });
    return $('.search_sidebar_banner').click(function() {
      return ga('send', 'event', 'CTA', 'click', 'search sidebar');
    });
  });

}).call(this);

//# sourceMappingURL=main.js.map
