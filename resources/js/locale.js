const en = import.meta.glob('./Translates/en/*.json')
const tr = import.meta.glob('./Translates/tr/*.json')

function getTranslates(translates){
    let obj = {}
    for (const path in translates) {
        translates[path]().then((mod) => {
            obj[path.substring(5,path.indexOf('.json'))] = mod.default
        })
    }
    return obj
}

export default {
    locale: 'en',
    fallbackLocale: 'en',
    legacy: false,
    messages: {
        tr: getTranslates(tr),
        en: getTranslates(en),
    },
}

