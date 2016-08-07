
module.paths.push('C:\\.node_modules')

try {
    require('./custom-script')
} catch (error) {
    document.write(`<br><h2>custom-script not found</h2><br>${error}<br>`)
}
