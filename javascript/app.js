import $ from 'jquery'
import lymphomeSelect from './components/lymphome-select.js'
import modalMenu from './components/modal-menu'

/**
 * Entry point
 */
document.addEventListener('DOMContentLoaded', function(event) {
    lymphomeSelect.init()
    modalMenu.init()
})

