/**
 * Author: Nikolay Kovalenko
 * Date: 06.08.2017
 * Email: nikolay.arkadjevi4@gmail.com
 * */

var PhdEssay = {
    header: '.navbar',
    menuWrapper : '.header',
    menuList : 'ul.menu',
    menuitem: 'menuttoggle',
    footer: '.phdessay__footer',
    banner: '.bottom-fixed-banner',
    contactForm: '#contactForm',
    windows: window,
    chat: '#chat',
    socials: '#shares',
    curDevice: window.Detectizr.device.type,
    openSearch: false,
    showBlur: true,


    init: function () {
        this.scrollHeader(this.header);
        this.headerMenu(this.menuWrapper, this.menuList);
        this.aboutSLider();
        this.searchBtn();
        this.chatAnimate(this.chat);
        if ($(this.banner).length) {
            this.bannerScroll(this.banner);
            this.bannerClose(this.banner);
        }
        this.flashcard();
        this.contactValidate(this.contactForm);
        this.initPopup();
        this.initSocials(this.socials);

        try {
            this.shareToSee();
        } catch (err) {
            console.log(err);
        }

        

    },

    headerMenu: function (header, menu) {
        $this = this;

        var windows = $(this.windows);

        // if (this.curDevice === "tablet"){
        //     console.log("tru");
        //     $('.has-dropdown > a').click(function (e) {
        //         e.preventDefault();
        //         e.stopPropagation();
        //     });
        // }

        function initDropdown() {
            $(menu).find("li").each(function() {
                if ($(this).children("ul.dropdown").length > 0){
                    $(this).children("ul.dropdown").addClass("submenu");
                    $(this).children("a").append("<span class='indicator'><i class='fa fa-angle-down'></i></span>");
                }
            })
        }

        function addOverlay() {
            $('body').append("<div class='overlay'></div>");

            $('body').find(".overlay").fadeIn(300).on("click", function(o) {
                closeMenu();
                $('.menutoggle-close').removeClass('open');
                $('.menutoggle').removeClass('open');
            });

            $('body').find(".menutoggle-close").on("click", function(o) {
                o.preventDefault();
                closeMenu();
                $(this).removeClass('open');
                $('.menutoggle').removeClass('open');
            })
        }

        function removeOverlay() {
            $('body').find(".overlay").fadeOut(400, function() {
                $(this).remove();
            })
        }

        function openMenu() {
            $(header).on("click touchstart", "a.close-icon-wrap", function(event) {
                event.stopPropagation();
                event.preventDefault();
                closeMenu();
            });
            $(header).find("ul.menu").addClass("open");
            addOverlay();
        }

        function closeMenu() {
            $(header).find("ul.menu").removeClass("open");
            removeOverlay();
        }

        function initEvent() {
            $(menu).off("mouseenter mouseleave")
        }

        function openDropdown() {
            initEvent();
            $(menu).on("mouseenter mouseleave", "li", function() {
                $(this).children("ul.dropdown").stop(!0, !1).fadeToggle(150)
            })
        }

        function subMenu() {
            initEvent();
            $(menu).find("ul.submenu").hide(0);
            $(menu).find(".indicator").removeClass("indicator-up");
            $(menu).on("click", ".indicator", function(event) {
                return event.stopPropagation(), event.preventDefault(), $(this).parent("a").parent("li").siblings("li").find(".submenu").stop(!0, !0).delay(300).slideUp(300), $(this).closest(".nav-menu").siblings(".nav-menu").children("li").parent("li").siblings("li").find("ul.submenu").stop(!0, !0).delay(300).slideUp(300), "none" == $(this).parent("a").siblings(".submenu").css("display") ? ($(this).addClass("indicator-up"), $(this).parent("a").parent("li").siblings("li").find(".indicator").removeClass("indicator-up"), $(this).closest("ul.menu").siblings("ul.menu").find(".indicator").removeClass("indicator-up"), $(this).parent("a").parent("li").children(".submenu").stop(!0, !0).delay(300).slideDown(300), !1) : ($(this).parent("a").parent("li").find(".indicator").removeClass("indicator-up"), void $(this).parent("a").parent("li").find(".submenu").stop(!0, !0).delay(300).slideUp(300))
            });
        }

        function initMenu() {
            window.innerWidth < 1199 ? ($(header).addClass("mobile"), subMenu()) : ($(header).removeClass("mobile"), openDropdown(), removeOverlay(),closeMenu())
        }

        $(header).on("click", ".menutoggle", function(event) {
            event.stopPropagation();
            event.preventDefault();
            openMenu();
            $(this).addClass('open');
            $('.menutoggle-close').toggleClass('open');
        });

        initDropdown(); initMenu();

        windows.resize(function() {
            initMenu();
        });

    },

    checkState: function (btn) {
        var btnClasses = btn.classList;
        if (!btnClasses.contains("open")) {
            btn.classList.add("open");
        } else {
            btn.classList.remove("open");
        }

    },

    scrollHeader: function (header) {
        if ($(window).scrollTop() > $(header).height()) {
            $(header).addClass("scrolled");
        } else {
            $(header).removeClass("scrolled");
        }
    },

    aboutSLider: function () {


        /* About Slider */
        var aboutSLiderEl = $('.phdessay__about-slider');

        var slickOptions = {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                infinite: true,
                speed: 700,
                dots: true,
                autoplay: true,
                autoplaySpeed: 4000,
                touchMove: false,
                customPaging : function() {
                    return '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-296 386.75 19 19"><circle fill="none" stroke="#FFAF32" stroke-width="2" cx="-286.5" cy="396.5" r="8"/>';
                }
            };

        aboutSLiderEl.slick(slickOptions);

        aboutSLiderEl.on("swipe", function(event, slick, direction) {
            reinitSlick();
        });

        var reinitSlick = function() {
            aboutSLiderEl.slick(
                "slickSetOption",
                {
                    autoplay: false
                },
                false
            );
        };

        /* About Slider END */


        /* INIT BLOG SLIDER ON PAGE LOAD*/

        var  blogSlider = $('.blog-now'),
             recentSlider =$('.blog-recent');

        var blogDesctopOptions = {
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 4000,
            dots: true,
            customPaging : function() {
                return '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-296 386.75 19 19"><circle fill="none" stroke="#FFAF32" stroke-width="2" cx="-286.5" cy="396.5" r="8"/>';
            }
        };

        var blogMobileOptions = {
            slidesPerRow: 1,
            rows: 2,
            arrows: false,
            speed: 500,
            infinite: false,
            autoplay: true,
            autoplaySpeed: 4000,
            dots: true,
            customPaging : function() {
                return '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-296 386.75 19 19"><circle fill="none" stroke="#FFAF32" stroke-width="2" cx="-286.5" cy="396.5" r="8"/>';
            }
        };

        blogSlider.slick(blogDesctopOptions);
        recentSlider.slick(blogDesctopOptions);

        /* INIT BLOG SLIDER ON TAB CHANGE */
        $('a[data-toggle="tab"]').on('shown.bs.tab',function (e) {
            e.preventDefault();

            var targetHeader = $(this).attr('data-header');

            $('.js-header').removeClass('active');

            $(targetHeader).addClass('active');


            blogSlider.slick('unslick');
            blogSlider.slick(blogDesctopOptions);

            recentSlider.slick('unslick');
            recentSlider.slick(blogDesctopOptions);

        });

        enquire.register("(max-width: 767px)", {
            match: function() {
                blogSlider.slick('unslick');
                blogSlider.slick(
                    blogMobileOptions
                );

                recentSlider.slick('unslick');
                recentSlider.slick(
                    blogMobileOptions
                );


                $('a[data-toggle="tab"]').on('shown.bs.tab',function (e) {

                    e.preventDefault();
                    blogSlider.slick('unslick');
                    blogSlider.slick(blogMobileOptions);

                    recentSlider.slick('unslick');
                    recentSlider.slick(blogMobileOptions);

                });

            },
            unmatch: function() {

                blogSlider.slick('unslick');
                blogSlider.slick(blogDesctopOptions);

                recentSlider.slick('unslick');
                recentSlider.slick(blogDesctopOptions);
            }
        });

    },

    searchBtn: function () {
        var wrap = $('.search__toggle-wrap'),
            searchInput =  $('.search__toggle-inptut'),
            removeEl = $('.search__toggle-close-icon');
            $this = this;


        $('.navbar').on('click', '.search-toggle', function(e) {
            e.preventDefault();

            var selector = $(this).data('selector');

            if ($('body').find(".overlay-s").length){
                searchInput.val('');
                $(selector).removeClass('show');
                $('li.search').removeClass('shown');
                $('.navbar').removeClass('show');
                $('.search__toggle').removeClass('show');
                wrap.removeClass('has-text');
                $('body').find(".overlay-s").remove();
                return;
            }


            $('body').append("<div class='overlay-s'></div>");

            $(this).closest('.search').toggleClass('shown');

            $(selector).toggleClass('show').find('.search-input').focus();
            $('.search__toggle').toggleClass('show');

            $('body').find(".overlay-s").fadeIn().on("click touchstart", function() {
                searchInput.val('');
                $(selector).removeClass('show');
                $('li.search').removeClass('shown');
                $('.navbar').removeClass('show');
                $('.search__toggle').removeClass('show');
                wrap.removeClass('has-text');
                $(this).remove();
            });
        });

        searchInput.on('keyup', function(){
            wrap.addClass('has-text');
            if ($(this).val() === "") {
                wrap.removeClass('has-text');
            }
        }).
        on('blur', function(){
            if ($(this).val() === "") {
                wrap.removeClass('has-text');
            }
        });

        removeEl.on('click', function (e) {
            e.preventDefault();
            searchInput.val('');
            $('li.search').removeClass('shown');
            $('.navbar').removeClass('show');
            $('.search__toggle').removeClass('show');
            wrap.removeClass('has-text');

            $('body').find(".overlay-s").remove();
        })
    },

    chatAnimate: function (chat) {
        // find end of animation css
        function whichAnimationEvent() {
            var t,
                el = document.createElement("fakeelement");

            var animations = {
                "animation": "animationend",
                "OAnimation": "oAnimationEnd",
                "MozAnimation": "animationend",
                "WebkitAnimation": "webkitAnimationEnd"
            }

            for (t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        }
        var animationEvent = whichAnimationEvent();

        // main
        $(chat).one(animationEvent, function(event) {
        });

        $(chat).find('.chat__close').click(function() {
            $(chat).fadeOut();
        });
    },

    bannerScroll: function (banner) {
        if ($(banner).offset().top + $(banner).height() >= $(this.footer).offset().top - 10) {
            $(banner).css({
                'position': 'absolute',
                'top': '-60px'
            });
        }
        if (window.matchMedia('(max-width: 768px)').matches) {
            $('.bottom-fixed-banner').css({
                'position': 'absolute',
                'top': '-60px'
            });
        }

        if ($(document).scrollTop() + window.innerHeight < $(this.footer).offset().top) {
            $(banner).css({
                'position': 'fixed',
                'top': 'auto'
            });
        }
    },

    bannerClose: function (banner) {
        $('#banner-close').click(function () {
            $(banner).fadeOut();
        });
    },

    flashcard: function () {
        $('.first-col').each(function(){
            if ($(this).html() !== "") {
                $('.first-col').addClass('not-empty');
                $('.flex-item').addClass('width-33');
            }
        });
    },

    contactValidate: function (form) {
        if( $(form).length ) {
            $(form).validate( {
                rules: {
                    InputName: {
                        required: true,
                        minlength: 2
                    },
                    InputEmail1: {
                        required: true,
                        email: true
                    },
                    textSubj: {
                        required: true,
                        minlength: 5
                    },
                    message: {
                        required: true,
                        minlength: 1
                    }
                },
                messages: {
                    name: {
                        required: "Please enter a name",
                        minlength: "Your name must consist of at least 2 characters"
                    },
                    email: "Please enter a valid email address",
                    subject:  {
                        required: "Please enter a subject",
                        minlength: "Your subject must consist of at least 5 characters"
                    },
                    message: {
                        required: "Please enter a message",
                        minlength: "Your message can`t be empty"
                    }

                },
                errorElement: "span",
                errorPlacement: function ( error, element ) {
                    error.addClass( "help-block" );

                    if ( element.prop( "type" ) === "checkbox" ) {
                        error.insertAfter( element.parent( "label" ) );
                    } else {
                        error.insertAfter( element );
                    }
                },
                highlight: function ( element, errorClass, validClass ) {
                    $( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
                },
                unhighlight: function (element, errorClass, validClass) {
                    $( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
                }
            } );
        }
    },

    initPopup: function () {
        if( $('.popup-with-zoom-anim').length ) {
            $('.popup-with-zoom-anim').magnificPopup({
                type: 'inline',
                fixedContentPos: false,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                preloader: false,
                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in',
                callbacks: {
                    open: function() {
                        $('body').toggleClass('overflow-hidden');
                    },
                    close: function () {
                        $('body').removeClass('overflow-hidden');
                    }
                }
            });
        }

        if( $('.exit-popup-open').length ) {
            $('.exit-popup-open').magnificPopup({
                type: 'inline',

                fixedContentPos: false,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                preloader: false,
                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in',
                callbacks: {
                    open: function() {
                        $('body').toggleClass('overflow-hidden');
                    },
                    close: function () {
                        $('body').removeClass('overflow-hidden');
                    }
                }
            });
        }

        /*$(document).on('click', '.popup-modal-dismiss', function(e) {
            e.preventDefault();
            $.magnificPopup.close();
        });*/

        $('#phdessay-exit .mfp-close').remove();
    },

    initSocials: function (socials) {
        if( $('#shares').length != 0 ) {
            $(socials).jsSocials({
                showLabel: false,
                showCount: false,
                shares: ["facebook", "twitter", "googleplus", "pinterest", "linkedin"]
            });
        }
    },
    
    shareToSee: function () {
        

        var $this = this;
        SocialShareKit.init({
            selector: '.shareToSess li a',
            onClose: function(targetElement, network, networkUrl, popupWindow){

                $this.showBlur = false;

                if ($this.showBlur === false) {
                    $('.phdessay__article-full').addClass('showContent');
                    $('.is-blurred').addClass('showContent');

                    setCookie('showBlurText', JSData.postID , 365);

                    var cookieArr2 = [];
                    
                    var pageCookie = getCookie('pageUrl');
                    var cookieArr = JSON.parse(pageCookie);

                    if (cookieArr.indexOf(window.location.href) == -1) {
                        cookieArr.push(window.location.href);
                        setCookie('pageUrl', JSON.stringify(cookieArr), 365);
                    }

                    $.post('/wp-admin/admin-ajax.php', {
                        'action'    : 'set__encoded_social_action',
                        'page_ID'   : JSData.postID
                    });

                    $('.phdessay__article-share-tosee').fadeOut();
                }

            }
        });
    },

    chatScroll: function (chat) {
        if ($(chat).offset().top + $(chat).height() >= $(this.footer).offset().top - 10) {
            $(chat).css({
                'position': 'absolute',
                'bottom': $(this.footer).height() + $(PhdEssay.banner).height() + 90
            });
        }
        if (window.matchMedia('(max-width: 768px)').matches) {
            $('#chat').css({
                'position': 'absolute',
                'bottom': $(this.footer).height() + $(PhdEssay.banner).height() + 90
            });
        }

        if ($(document).scrollTop() + window.innerHeight < $(this.footer).offset().top) {
            $(chat).css({
                'position': 'fixed',
                'bottom': '70px'
            });
        }
    },

};



        

$(document).ready(
    function () {
        if( getCookie('pageUrl') == false ) {
            setCookie('pageUrl', '["1"]');
        }


        PhdEssay.init();
        document.querySelector('.menutoggle').onclick = function() {
            PhdEssay.checkState(this);
        }
    }
);

$(window).scroll(
    function () {
        PhdEssay.scrollHeader(PhdEssay.header);
        if ($(PhdEssay.banner).length > 0) {
            PhdEssay.bannerScroll(PhdEssay.banner);
        }

        if ($(PhdEssay.chat).length) {
            PhdEssay.chatScroll(PhdEssay.chat);
        }


    }
);

$(window).resize(function() {

});


function getCookie(cname) {
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

function setCookie(cname, cvalue, exdays) {
    var d, expires;
    d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    return document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };