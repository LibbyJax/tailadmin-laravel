<template>
    <t-form-content :reset-button="false" :submit-button="false">
        <template #status>
            <t-button v-if="form.recentlySuccessful" :radius="3" color="gray" disabled="disabled">
                <t-check-icon class="w-5 h-5"/>
                Done
            </t-button>
        </template>
        <t-form-section
            description="Permanently delete your account."
            title="Delete Account">
            <!--Info Box-->
            <div class="col-span-full text-sm text-gray-600">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
            </div>
            <!-- Delete Account Confirmation Modal -->
            <t-modal :radius="3" :show="confirmingUserDeletion" @close="closeModal">
                <template #header>
                    Delete Account
                </template>
                <template #content>
                    Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                    <t-input-group :error="form.errors.password">
                        <t-input-text
                            :radius="3"
                            ref="password"
                            v-model="form.password"
                            class="mt-1 block w-3/4"
                            placeholder="Password"
                            type="password"
                            @keyup.enter.native="deleteUser"
                        />
                    </t-input-group>
                </template>
                <template #footer-left>
                    <t-button :radius="3" color="white" @click.native="closeModal">
                        Cancel
                    </t-button>
                </template>
                <template #footer-right>
                    <t-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing" :radius="3"
                              color="red" @click.native="deleteUser">
                        Delete Account
                    </t-button>
                </template>
            </t-modal>
        </t-form-section>
        <!--Buttons-->
        <div class="flex flex-warp p-4 justify-end">
            <div class="flex flex-wrap">
                <!--Regenerate Button for Recovery Codes-->
                <t-button :radius="3" class="mr-3" color="red"
                          @click.native="confirmUserDeletion">
                    <t-trash-icon class="w-5 h-5"/>
                    Delete Account
                </t-button>
            </div>
        </div>
    </t-form-content>
</template>

<script>
    import JetActionSection from '@/Jetstream/ActionSection.vue'
    import JetDialogModal from '@/Jetstream/DialogModal.vue'
    import JetDangerButton from '@/Jetstream/DangerButton.vue'
    import JetInput from '@/Jetstream/Input.vue'
    import JetInputError from '@/Jetstream/InputError.vue'
    import JetSecondaryButton from '@/Jetstream/SecondaryButton.vue'
    import TFormContent from "@/Components/Form/TFormContent.vue";
    import TButton from "@/Components/Button/TButton.vue";
    import TCheckIcon from "@/Components/Icon/TCheckIcon.vue";
    import TFormSection from "@/Components/Form/TFormSection.vue";
    import TModal from "@/Components/Modal/TModal.vue";
    import TTrashIcon from "@/Components/Icon/TTrashIcon.vue";
    import TInputGroup from "@/Components/Form/TInputGroup.vue";
    import TInputText from "@/Components/Form/Inputs/TInputText.vue";

    export default {
        components: {
            TInputText,
            TInputGroup,
            TTrashIcon,
            TModal,
            TFormSection,
            TCheckIcon,
            TButton,
            TFormContent,
            JetActionSection,
            JetDangerButton,
            JetDialogModal,
            JetInput,
            JetInputError,
            JetSecondaryButton,
        },

        data() {
            return {
                confirmingUserDeletion: false,

                form: this.$inertia.form({
                    password: '',
                })
            }
        },

        methods: {
            confirmUserDeletion() {
                this.confirmingUserDeletion = true;

                setTimeout(() => this.$refs.password.focus(), 250)
            },

            deleteUser() {
                this.form.delete(route('current-user.destroy'), {
                    preserveScroll: true,
                    onSuccess: () => this.closeModal(),
                    onError: () => this.$refs.password.focus(),
                    onFinish: () => this.form.reset(),
                })
            },

            closeModal() {
                this.confirmingUserDeletion = false

                this.form.reset()
            },
        },
    }
</script>
