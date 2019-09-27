const moduleFiles = require.context('./', true, /\.js$/);

const modules = moduleFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    if(moduleName != 'index'){
        const value = moduleFiles(modulePath)
        return Object.assign({}, modules, value.default)
    } else {
        return modules;
    }
}, {})

export default modules;