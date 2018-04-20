/**
 * Author: Nikolay Kovalenko
 * Date: 04.07.2017
 * Email: nikolay.arkadjevi4@gmail.com
 * */

var Samurai = {
    header: '.navbar',
    menuWrapper : '.header',
    menuList : 'ul.menu',
    banner: '.bottom-fixed-banner',
    footer: '.footer',
    sidebg: ['sidebar-bg', 'hidden-xs'],
    menuitem: 'menuttoggle',
    socials: '.sharing',
    contactForm: '#contactForm',
    windows: window,
    search: '#search',
    chat: '#chat',

    init: function () {
        this.scrollHeader(this.header);
        this.bannerScroll(this.banner);
        this.bannerClose(this.banner);
        this.headerMenu(this.menuWrapper, this.menuList);
        this.sidebarBg(this.sidebg);
        this.initSocials(this.socials);
        this.contactValidate(this.contactForm);
        this.initPopup();
        this.searchAnimate(this.search);
        this.chatAnimate(this.chat);
        this.flashcard();
    },

    headerMenu: function (header, menu) {
        var windows = $(this.windows);

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
            $('body').find(".overlay").fadeIn(300).on("click touchstart", function(o) {
                closeMenu();
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
            })
        }

        function initMenu() {
            window.innerWidth < 768 ? ($(header).addClass("mobile"), subMenu()) : ($(header).removeClass("mobile"), openDropdown(), removeOverlay(),closeMenu())
        }

        $(header).on("click touchstart", ".menutoggle", function(event) {
            event.stopPropagation();
            event.preventDefault();
            openMenu();
        });

        initDropdown(); initMenu();

        windows.resize(function() {
            initMenu();
        });

    },

    checkState: function (btn) {
        var btnClasses = btn.classList;
        if (btnClasses.contains("open")) {
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

    bannerScroll: function (banner) {
        if ($(banner).offset().top + $(banner).height() >= $(this.footer).offset().top - 10) {
            $(banner).css({
                'position': 'absolute',
                'top': '-67px'
            });
        }
        if (window.matchMedia('(max-width: 768px)').matches) {
            $('.bottom-fixed-banner').css({
                'position': 'absolute',
                'top': '-67px'
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

    sidebarBg: function (bg) {
        $('.sidebar-bg').remove();

        var sidebarCheck = false;
        var sidebar = $('.samurai__sidebar');

        if (sidebar.length > 0){
            $('.samurai__page').prepend("<div class='" + bg[0] + " " + bg[1] + "'></div>");
            sidebarCheck = true;
        }

        var blockTarget = $('.samurai__widget-posts')[0];

        function getMargin() {
            var bodyWidth = $('body').width();
            var contWidth = $('.container').width();
            return (bodyWidth - contWidth - 10) / 2;
        }

        var widgetHeight = $(blockTarget).height();
        var widgetWidth = $(blockTarget).width();

        if (sidebarCheck === true){
            $('.' + bg[0])
                .css('height', 96 + widgetHeight + 33 + 'px')
                .css('width', widgetWidth + 15 + 'px')
                .css('right', getMargin() + 15 + 'px');
        }
    },
    
    initSocials: function (socials) {
        $(socials).jsSocials({
            showLabel: false,
            showCount: false,
            shares: ["facebook", "twitter", "linkedin"]
        });
    },

    contactValidate: function (form) {
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
            },
            messages: {
                InputName: {
                    required: "Please enter a name",
                    minlength: "Your name must consist of at least 2 characters"
                },
                InputEmail1: "Please enter a valid email address",
                textSubj:  {
                    required: "Please enter a subject",
                    minlength: "Your subject must consist of at least 5 characters"
                }
            },
            errorElement: "em",
            errorPlacement: function ( error, element ) {
                error.addClass( "help-block" );

                if ( element.prop( "type" ) === "checkbox" ) {
                    error.insertAfter( element.parent( "label" ) );
                } else {
                   // error.insertAfter( element );
                }
            },
            highlight: function ( element, errorClass, validClass ) {
                $( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
            },
            unhighlight: function (element, errorClass, validClass) {
                $( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
            }
        } );
    },

    initPopup: function () {
        $('.popup-with-zoom-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
        });

        $('.exit-popup-open').magnificPopup({
            type: 'inline',

            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
        });

        $(document).on('click', '.popup-modal-dismiss', function(e) {
            e.preventDefault();
            $.magnificPopup.close();
        });

        $('#samurai-exit .mfp-close').remove();
    },

    searchAnimate: function (search) {
        $(search).focus(function () {
            $('#search_submit').addClass('active');
            $(this).addClass('shown');
            // $(this).focus();
        });

        $(search).blur(function () {
            if ($(this).val() === "") {
                $(this).removeClass('shown');
                $('#search_submit').removeClass('active');
            } else {
                $(this).addClass('shown');
            }
        });
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
    flashcard: function () {
        $('.first-col').each(function(){
            if ($(this).html() !== "") {
                $('.first-col').addClass('not-empty');
                $('.sam-flex-item').addClass('width-33');
            }
        });
    }
};

$(document).ready(
    function () {
        Samurai.init();
        SmoothScroll({
            stepSize: 80
        });

        document.querySelector('.menutoggle').onclick = function() {
            Samurai.checkState(this);
        }
    }
);

$(window).scroll(
    function () {
        Samurai.scrollHeader(Samurai.header);
        if ($(Samurai.banner).length > 0) {
            Samurai.bannerScroll(Samurai.banner);
        }
    }
);

$(window).resize(function() {
    Samurai.sidebarBg(Samurai.sidebg);
});

