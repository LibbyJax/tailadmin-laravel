<template>
    <t-form-content :disabled="form.processing" @submitted="updatePassword">
        <template #status>
            <t-button v-if="form.recentlySuccessful" :radius="3" color="gray" disabled="disabled">
                <t-check-icon class="w-5 h-5"/>
                Saved
            </t-button>
        </template>
            <t-form-section
                description="Ensure your account is using a long, random password to stay secure."
                title="Update Password">
                    <!-- Current Password -->
                    <t-input-group class="col-span-12" :error="form.errors.current_password" label="Current Password" label-for="current_password">
                        <t-input-text
                            id="current_password"
                            v-model="form.current_password"
                            :radius="3"
                            ref="current_password"
                            autocomplete="current-password"
                            type="password"
                        />
                    </t-input-group>

                    <!-- New Password -->
                    <t-input-group class="col-span-12 md:col-span-6" :error="form.errors.password" label="New Password" label-for="password">
                        <t-input-text
                            id="password"
                            v-model="form.password"
                            :radius="3"
                            ref="password"
                            autocomplete="new-password"
                            type="password"
                        />
                    </t-input-group>

                    <!-- Confirm New Password -->
                    <t-input-group class="col-span-12 md:col-span-6" :error="form.errors.password_confirmation" label="Confirm New Password" label-for="password_confirmation">
                        <t-input-text
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            :radius="3"
                            ref="password_confirmation"
                            autocomplete="new-password"
                            type="password"
                        />
                    </t-input-group>

            </t-form-section>
    </t-form-content>
</template>

<script>
    import JetActionMessage from '@/Jetstream/ActionMessage.vue'
    import JetButton from '@/Jetstream/Button.vue'
    import JetFormSection from '@/Jetstream/FormSection.vue'
    import JetInput from '@/Jetstream/Input.vue'
    import JetInputError from '@/Jetstream/InputError.vue'
    import JetLabel from '@/Jetstream/Label.vue'
    import TFormContent from "@/Components/Form/TFormContent.vue";
    import TButton from "@/Components/Button/TButton.vue";
    import TCheckIcon from "@/Components/Icon/TCheckIcon.vue";
    import TFormSection from "@/Components/Form/TFormSection.vue";
    import TInputGroup from "@/Components/Form/TInputGroup.vue";
    import TInputText from "@/Components/Form/Inputs/TInputText.vue";

    export default {
        components: {
            TInputText,
            TInputGroup,
            TFormSection,
            TCheckIcon,
            TButton,
            TFormContent,
            JetActionMessage,
            JetButton,
            JetFormSection,
            JetInput,
            JetInputError,
            JetLabel,
        },

        data() {
            return {
                form: this.$inertia.form({
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                }),
            }
        },

        methods: {
            updatePassword() {
                this.form.put(route('user-password.update'), {
                    errorBag: 'updatePassword',
                    preserveScroll: true,
                    onSuccess: () => this.form.reset(),
                    onError: () => {
                        if (this.form.errors.password) {
                            this.form.reset('password', 'password_confirmation')
                            this.$refs.password.focus()
                        }

                        if (this.form.errors.current_password) {
                            this.form.reset('current_password')
                            this.$refs.current_password.focus()
                        }
                    }
                })
            },
        },
    }
</script>
