$(document).ready(function() {

    $('.main_content__slider-list').slick({
        centerMode: true,
        variableWidth: true,
        slidesToShow: 4,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              slidesToShow: 1
            }
          }
        ]
      });



    // $('.modal__menu-btn').on('click', () => {
    //     $('.modal__menu-wrap').toggleClass('modal__menu-wrap--open')
    // })
    // //select
    // let widthSelect = 0
    // let widthOpenSelect = 355
    // $('.select__active').on('click', function() {
    //     if ($(window).width() >= 1024) {
    //         widthSelect = $(this)
    //             .children('.select__title')
    //             .outerWidth(true)
    //         let widthTitle = widthOpenSelect > widthSelect ? widthOpenSelect : widthSelect
    //         $(this)
    //             .children('.select__title')
    //             .animate(
    //                 {
    //                     width: widthTitle + 'px'
    //                 },
    //                 400,
    //                 function() {
    //                     $(this)
    //                         .parent()
    //                         .siblings('.select__list')
    //                         .slideDown('slow')
    //                 }
    //             )
    //     } else {
    //         $(this)
    //             .siblings('.select__list')
    //             .slideDown('slow')
    //     }
    // })
    // $(document).on('click', function(e) {
    //     $('.select__list').each(function(i, elem) {
    //         if ($(elem).css('display') == 'block') {
    //             if (
    //                 $(e.target).closest('.select__list').length === 0 &&
    //                 $(e.target).closest('.select__active').length === 0 &&
    //                 $(elem).css('display') == 'block'
    //             ) {
    //                 if ($(window).width() >= 1024) {
    //                     $('.select__list').slideUp('slow', function() {
    //                         $(elem)
    //                             .siblings()
    //                             .children('.select__title')
    //                             .animate(
    //                                 {
    //                                     width: widthSelect + 'px'
    //                                 },
    //                                 400
    //                             )
    //                     })
    //                 } else {
    //                     $('.select__list').slideUp('slow')
    //                 }
    //             }
    //         }
    //     })
    // })
})
