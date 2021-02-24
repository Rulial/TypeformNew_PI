import * as initializers from './initializers'

import * as tf from './index'

module.exports = tf

function loadEmbedElements() {
  initializers.initializeWidgets()
  initializers.initializeSliders()
  initializers.initializePopups()
}

document.addEventListener('DOMContentLoaded', loadEmbedElements, false)
