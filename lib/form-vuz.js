'use strict';
const packageJson = require('../package.json')
const components = {}

const req = require['context']('../packages/', true, /index\.js$/)
const requireAll = (requireContext) => {
    const files = requireContext.keys()
    return files.map((file, index, arr) => {
        const requireApi = requireContext(file, index, arr)
        const fileDefault = requireApi.default || requireApi
        if (fileDefault.name) {
            components[fileDefault.name] = fileDefault
        }
        return requireApi
    })
}
requireAll(req)

const install = function (Vue, opts = {}) {
    for (const componentsKey in components) {
        Vue.component(components[componentsKey].name, components[componentsKey])
    }
    Vue.use(utils, opts)
}

export default {
    version: packageJson.version,
    install,
    ...components
}
