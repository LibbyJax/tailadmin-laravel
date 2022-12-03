import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

/* FontAwesome */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/Sources/icons";

/* Multi-language */
import { createI18n } from "vue-i18n";
import generalLangBg from "@/Lang/bg/general_lang_bg";
import generalLangDe from "@/Lang/de/general_lang_de";
import generalLangEn from "@/Lang/en/general_lang_en";
import generalLangFr from "@/Lang/fr/general_lang_fr";
import generalLangRu from "@/Lang/ru/general_lang_ru";
import generalLangTr from "@/Lang/tr/general_lang_tr";
import generalLangZh from "@/Lang/zh/general_lang_zh";

/*Floating Vue*/
import FloatingVue from 'floating-vue'

/*Pinia*/
import { createPinia } from 'pinia'
const pinia = createPinia()

const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    fallbackRoot: "en",
    messages: {
        bg: generalLangBg,
        de: generalLangDe,
        en: generalLangEn,
        fr: generalLangFr,
        ru: generalLangRu,
        tr: generalLangTr,
        zh: generalLangZh,
    },
});

/* Highlighter */
import VueHighlightJS from 'vue3-highlightjs'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, app, props, plugin }) {
        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(i18n)
            .use(VueHighlightJS)
            .use(FloatingVue)
            .use(pinia)
            .component("FontAwesomeIcon", FontAwesomeIcon)
            .use(ZiggyVue, Ziggy)
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
