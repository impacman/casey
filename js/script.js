$(function() {
    // ---------------------------------------------------------------- img -> background
    function ibg() {
        let ibg = document.querySelectorAll('.ibg');

        for (let f = 0; f < ibg.length; f++) {
            if (ibg[f].querySelector('img')) {
                ibg[f].style.backgroundImage = 'url(' + ibg[f].querySelector('img').getAttribute('src') + ')';
            }
        }
    }

    // ---------------------------------------------------------------- background webp
    function webp(callback) {
        let webp = new Image();
    
        webp.onload = webp.onerror = function() {
            callback(webp.height == 2);
        };
        
        webp.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    webp(function (support){
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    }); 

    // ---------------------------------------------------------------- shop - tabs
    function tabs() {
        $('.catalog__tabs').on('click', 'li:not(.catalog__tab .active)', function() {
            $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.catalog').find('.catalog__content').removeClass('active').eq($(this).index()).addClass('active');
        });

        let idTabs = window.location.hash.replace('#tab','') -1;
        if (idTabs != -1) $('.catalog__tabs li').eq(idTabs).click();

        $('a[href*="#tab"]').click(function() {
            let idTabs = $(this).attr('href').replace(/(.*)#tab/, '') -1;
            $('.catalog__tabs li').eq(idTabs).click();
        });
    }

    //  ---------------------------------------------------------------- scroll -> header (sticky) & pageUp
    function scroll() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                $('.header').addClass('sticky');
            } else if ($(this).scrollTop() < 1) {
                $('.header').removeClass('sticky');
            };
            if ( $(this).scrollTop() > 1000 ) {
                $('.pageup').fadeIn(200);
            } 
            else {
                $('.pageup').fadeOut(200);
            }
        });   
    }

    //  ---------------------------------------------------------------- links
    function links() {
        $('a[href^="#"]').on('click', function() {
            let href = $(this).attr('href');
        
            $('html, body').animate({
                scrollTop: $(href).offset().top
            }, 700);
        
            return false;
        });
    }

    //  ---------------------------------------------------------------- active menu
    function menu() {
        $('.menu__phone').on('click', function() {
            $(this).addClass('active');
            $('.menu__wrapper').addClass('active');
            $('.menu__close').addClass('active');;
            $('body').css({
                'overflow': 'hidden'
            });
        });
    
        $('.menu__close').on('click', function() {
            $('.menu__wrapper').removeClass('active');
            $(this).removeClass('active');
            $('.menu__phone').removeClass('active');;
            $('body').css({
                'overflow': ''
            })
        })
    }

    // ---------------------------------------------------------------- modal window (link - brand)
    function modalWindow() {
        $('[data-modal=link]').on('click', function() {
            $('#link').fadeIn(300);
            $('body').css({
                'overflow': 'hidden'
            })
        }); 
        $('#link .modal__close').on('click', function() {
            $('#link').fadeOut(100);;
            $('body').css({
                'overflow': ''
            })
        });
    }

    ibg();
    tabs();
    scroll();
    links();
    menu();

    //  ---------------------------------------------------------------- validate forms
    function validateForms(form) {
        $(form).validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            }
        });

        $(form).focusin(function() {
            if ($('.form__el[name="email"]').hasClass('error')) {
                $('.form__el[name="email"]').parent().addClass('active');
            } else if ($('.form__el[name="email"]').hasClass('valid')) {
                $('.form__el[name="email"]').parent().removeClass('active');
            } 
        });
    }

    validateForms('#masterclass-form');
    validateForms('#contact-form');
    validateForms('#info-form');
    validateForms('#subscribe');

    modalWindow();
});