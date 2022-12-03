<script setup>
/*Main Functions*/
import {onMounted, provide, ref, watch} from "vue";
import {Head, usePage} from "@inertiajs/inertia-vue3";
import {breakpointsTailwind, useBreakpoints} from '@vueuse/core'

/*Components*/
import JetBanner from "@/Jetstream/Banner.vue";
import MainMenu from "@/Layouts/MainMenu.vue";
import TAlert from "@/Components/Alert/TAlert.vue";
import TNotification from "@/Components/Notification/TNotification.vue";
import TopMenu from "@/Layouts/TopMenu/TopMenu.vue";

/*Sources*/
import {appConf, footerConf} from "@/config";
import DarkMode from "@/Functions/darkMode";
import windowSizeCalculator from "@/Functions/windowSizeCalculator";
import {useNotification} from "@/Stores/useNotification.js";

/*Multi Language*/
import {useI18n} from "vue-i18n";

defineProps({
    title: {
        type: String,
        default: null
    },
    header: {
        type: String,
        default: null
    },
    subHeader: {
        type: String,
        default: null
    }
})

/*Notification*/
const notification = useNotification();
const addNotification = () => {
    let msg = usePage().props.value.flash.notification
    if (msg) {
        notification.add({
            "content": msg.content,
            "html": msg.html ?? false,
            "id": msg.id,
            "type": msg.type ?? 'info',
            "radius": msg.radius ?? 'regular',
            "position": msg.position ?? 'br',
            "snack": msg.snack ?? false,
            "snack-position": msg.snackPosition ?? 'bottom',
            "icon": msg.icon ?? '',
            "fixed": msg.fixed ?? false,
            "timer": msg.timer ?? 0,
            "_token": msg._token
        })
    }
}

onMounted(() => {
    addNotification()
})

watch(() => usePage().props.value.flash.notification, () => {
    addNotification();
})

/*Definitions*/
const {deviceType} = windowSizeCalculator();

/*Multi Language*/
const {t} = useI18n();

/*Providers*/
provide("breakpoints", ref(useBreakpoints(breakpointsTailwind)));
provide("appearingMode", ref(DarkMode().appearingMode));
provide("appConf", ref(appConf));
</script>

<template>
    <!--Browser Title-->
    <Head :title="title"/>
    <!--TODO: Convert to Announcement Bar Component(TA-23)-->
    <jet-banner/>
    <!--Main Container-->
    <div class="main-container">
        <!--Main Menu -->
        <main-menu/>
        <!--Content Container-->
        <div class="content-wrapper">
            <!--Top Menu-->
            <top-menu/>
            <!--TODO: Sync with Popup Menu-->
            <!--Content-->
            <div class="content-container">
                <!--Content Header-->
                <div class="container-header">
                    <!--Page Header-->
                    <header class="page-header">
                        <!--Page Title-->
                        <h1 v-if="$slots.hasOwnProperty('header') || header" class="page-title">
                            <slot v-if="$slots.hasOwnProperty('header')" name="header"/>
                            <span v-else v-text="header"/>
                        </h1>
                        <!--Page SubTitle-->
                        <h2 v-if="$slots.hasOwnProperty('subHeader') || subHeader" class="page-subtitle">
                            <slot v-if="$slots.hasOwnProperty('subHeader')" name="subHeader"></slot>
                            <span v-else v-text="subHeader"/>
                        </h2>
                    </header>
                    <!--Page Action Buttons-->
                    <div v-if="$slots.hasOwnProperty('action-buttons')" class="page-action-buttons">
                        <slot name="action-buttons"></slot>
                    </div>
                </div>
                <!--Breadcrumb-->
                <slot name="breadcrumb"></slot>
                <!--Content-->
                <main class="flex flex-col flex-grow">
                    <!--Flash Messages-->
                    <div v-if="$page.props.flash.message" class="alert">
                        <t-alert :color="$page.props.flash.message.type" :timer="5000" class="my-2">
                            <span v-html="$page.props.flash.message.content"></span>
                        </t-alert>
                    </div>
                    <slot></slot>
                </main>
            </div>
            <footer v-if="footerConf.visible" class="footer">
                <span class="mt-1 space-x-1 select-none" v-html="footerConf.content"/>
            </footer>
        </div>
    </div>
    <!--Modals-->
    <teleport to="body">
        <t-notification/>
    </teleport>
</template>
