import $ from 'jquery'

class Select {
    constructor(element) {
        this.el = $(element)

        this.list = $('.lymphome-select__list', element)
        this.title = $('.lymphome-select__title', element)

        this.toggle = $('.lymphome-select__active', element)

        this.states = {
            active: false
        }

        this.widthSelect = this.title.outerWidth(true)
        this.widthOpenSelect = 355
        this.widthTitle = this.widthOpenSelect > this.widthSelect ? this.widthOpenSelect : this.widthSelect

        this.init()
    }

    init() {
        this.initListeners()
    }

    initListeners() {
        this.toggle.on('click', this.toggleSelect.bind(this))

        $(document).on('click', this.closeSelect.bind(this))
    }

    toggleSelect() {
        if (!this.states.active) {
            this.openSelect()
        } else {
            this.closeSelect()
        }
    }

    openSelect() {
        $(document).trigger('click')
        this.states.active = true

        this.title.animate(
            {
                width: this.widthTitle
            },
            400,
            () => {
                this.list.slideDown('slow')
            }
        )
    }

    closeSelect(e) {
        if (
            this.states.active == true &&
            $(e.target).closest('.lymphome-select__list').length === 0 &&
            $(e.target).closest('.lymphome-select__active').length === 0
        ) {
            this.list.slideUp('fast', () => {
                this.title.animate(
                    {
                        width: this.widthSelect
                    },
                    0
                )
            })
            this.states.active = false
        }
    }

    isDesktop() {
        if ($(window).width() >= 1024) {
            return true
        } else {
            return false
        }
    }
}

export default {
    init() {
        $('.lymphome-select').each((index, el) => {
            new Select(el)
        })
    }
}
