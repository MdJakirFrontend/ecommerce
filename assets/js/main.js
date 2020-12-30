jQuery(function ($) {
    "use strict";

    $(".navbar_toggle").on('click', function () {
        $(".mobilemenu-wrapper").toggleClass('menu-show');
        $(".header-overlay").on('click', function () {
            $(".mobilemenu-wrapper").removeClass('menu-show');
        })
    });

    $("#accordion").on("hide.bs.collapse show.bs.collapse", e => {
        $(e.target)
            .prev()
            .find("i:last-child")
            .toggleClass("fa-angle-down fa-angle-up");
    });


    var rfslidergalaryone = $("#rfslidergalaryone");
    var rfslidergalarytwo = $("#rfslidergalarytwo");
    var slidesPerPage = 4; //globaly define number of elements per page
    var syncedSecondary = true;
    rfslidergalaryone.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
        navText: ["<i class= 'fas fa-angle-left'></i >", "<i class= 'fas fa-angle-right'></i >"]
        // navText: ["<img src='./img/arrow-back.png' >", "<img src='../img/arrow-back.png' >"],

    }).on('changed.owl.carousel', syncPosition);

    rfslidergalarytwo
        .on('initialized.owl.carousel', function () {
            rfslidergalarytwo.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: true,
            nav: true,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        rfslidergalarytwo
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = rfslidergalarytwo.find('.owl-item.active').length - 1;
        var start = rfslidergalarytwo.find('.owl-item.active').first().index();
        var end = rfslidergalarytwo.find('.owl-item.active').last().index();

        if (current > end) {
            rfslidergalarytwo.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            rfslidergalarytwo.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            rfslidergalaryone.data('owl.carousel').to(number, 100, true);
        }
    }
    rfslidergalarytwo.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        rfslidergalaryone.data('owl.carousel').to(number, 300, true);
    });


    //team-carousel
    $('.main-team').owlCarousel({
        items: 4,
        loop: true,
        dots: false,
        nav: true,
        margin: 20,
        navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
        responsive: {
            0: {
                items: 1,
                nav: false,
                stagePadding: 50,
                margin: 10,
            },
            450: {
                items: 1,
                nav: false,
                stagePadding: 50,

            },
            575: {
                items: 1,
                nav: false,

            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 4,
                nav: true,
                loop: false
            }
        }
        /*navText:['<img src="assets/img/team-arrow-1.png">', '<img src="assets/img/team-arrow-2.png">']*/
    });
});