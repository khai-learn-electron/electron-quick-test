
'use strict'

document.getElementById('theme')
    .href = `styles/themes/${require('process').env.ELECTRON_THEME || 'light'}.css`
