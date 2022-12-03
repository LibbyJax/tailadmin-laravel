<script setup>
import TNotificationItem from "./TNotificationItem.vue"
import TTrashIcon from "@/Components/Icon/TTrashIcon.vue";

/*Pinia Store:Notification*/
import {useNotification} from "@/Stores/useNotification.js";
import {storeToRefs} from "pinia";
const notification = useNotification();
const {notifications} = storeToRefs(notification)

/*Multi language*/
import {useI18n} from "vue-i18n";
const {t} = useI18n()
</script>

<template>
    <div class="fixed right-0 bottom-0">
    <transition-group name="fade">
        <template v-for="i in notifications" :key="i.id">
            <t-notification-item
                :id="i.id"
                :token="i._token"
                :content="i.content"
                :type="i.type ?? 'info'"
                :html="i.html ?? false"
                :radius="i.radius ?? 'regular'"
                :position="i.position ?? 'br'"
                :snack="i.snack ?? false"
                :snack-position="i.snackPosition ?? 'bottom'"
                :icon="i.icon ?? ''"
                :clearable="i.fixed ?? false"
                :timer="i.timer ?? 0"
            />
        </template>

        <!--Bulk Delete-->
        <div
            v-if="notifications.length>1"
            class="notification-bulk-delete"
            @click="notification.clear()"
        >
            <span v-text="t('action.clearAllNotifications')"></span>
            <t-trash-icon class="w-5 h-5 -mt-1 animate-bounce"/>
        </div>
    </transition-group>
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
