import Vue from 'vue'

const Indicator = Vue.extend(require('./indicator.vue'))
let instance
let timer

module.exports = {
  open (options) {
    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div')
      })
    }
    if (instance.visible) return
    if (typeof options === 'string') {
      instance.message = options
      instance.spinnerType = 'snake'
    } else if (Object.prototype.toString.call(options) === '[object Object]') {
      instance.message = options.message || ''
      instance.spinnerType = options.spinnerType || 'snake'
    } else {
      instance.message = ''
      instance.spinnerType = 'snake'
    }
    document.body.appendChild(instance.$el)
    if (timer) {
      clearTimeout(timer)
    }

    Vue.nextTick(() => {
      instance.visible = true
    })
  },

  close () {
    if (instance) {
      Vue.nextTick(() => {
        instance.visible = false
        timer = setTimeout(() => {
          if (instance.$el) {
            instance.$el.style.display = 'none'
          }
        }, 400)
      })
    }
  }
}
