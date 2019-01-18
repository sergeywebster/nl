import $ from 'jquery'

export default {
    init() {
        $('.modal__menu-btn').on('click', () => {
            $('.modal__menu-wrap').toggleClass('modal__menu-wrap--open')
        })
    }
}
