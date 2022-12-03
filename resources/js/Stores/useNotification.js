import {defineStore} from "pinia";

export const useNotification = defineStore("notification", {
    state: () => ({
        notifications: [],
    }),
    actions: {
        add(value) {
            value["id"] = Math.floor(new Date().getTime() / 1000);

            this.notifications.push(value);
        },
        delete(id) {
            let index = this.notifications.findIndex((i) => i.id === id);

            this.notifications.splice(index, 1);
        },
        clear(){
            this.notifications = []
        }
    },
});
