<script setup>
import {onMounted, ref} from "vue";
import TXIcon from "@/Components/Icon/TXIcon.vue";
import Styles from "./styles.json"

/*Pinia Store:Notification*/
import {useNotification} from "@/Stores/useNotification.js";
const notification = useNotification();

/*Props*/
const props = defineProps({
    id:{
        type: String,
        default: ''
    },
    token:{
        type: String,
        default: ''
    },
    icon:{
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'blue',
        validator: (value) => (['success', 'danger', 'warning', 'info', 'regular-light', 'regular-dark'].includes(value))
    },
    html: {
        type: Boolean,
        default: () => false
    },
    content: {
        type: String,
        default: ''
    },
    radius: {
        type: String,
        default: 'regular',
        validator: (value) => (['sm', 'md', 'regular', 'lg', 'xl'].includes(value))
    },
    fixed: {
        type: Boolean,
        default: () => false
    },
    snack: {
        type: Boolean,
        default: () => false
    },
    snackPosition: {
        type: String,
        default: 'bottom'
    },
    timer: {
        type: Number,
        required: false
    },
    position: {
        type: String,
        default: 'rb'
    },
    border: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['destroy'])

const showAlertBox = ref(true)

onMounted(() => {
    if (props.timer) {
        setTimeout(() => {
            showAlertBox.value = false;
            emit('destroy', props.id)
        }, props.timer)
    }
})
</script>

<template>
    <div
        v-if="id === token"
        :class="[
                'notification-container',
                Styles.type[type].container,
                Styles.radius[radius],
             ]">
        <!--Icon-->
        <font-awesome-icon v-if="icon" :icon="icon"/>

        <!--Message-->
        <span v-if="html" v-html="content"/>
        <span v-else v-text="content"/>

        <!-- Clear Button -->
        <div
            v-if="!fixed"
            :class="Styles.type[type].clearIcon"
            class="notification-clear-icon"
        >
            <t-x-icon
                class="w-5 h-5"
                @click="notification.delete(id)"
            />
        </div>

    </div>
</template>

<style lang="sass" scoped>
.fade-enter-active,
.fade-leave-active
    transition: all 500ms ease-in-out

.fade-enter-from,
.fade-leave-to
    opacity: 0
    transform: translateY(30px)

.fade-enter-to,
.fade-leave-from
    opacity: 1
    transform: translateY(0)
</style>
