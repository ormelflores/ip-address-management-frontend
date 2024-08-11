<script setup>
    import AuthenticatedLayout from '~/components/AuthenticatedLayout.vue';
    import InputLabel from '~/components/InputLabel.vue';
    import Modal from '~/components/Modal.vue';
    import PrimaryButton from '~/components/PrimaryButton.vue';
    import Table from '~/components/Table.vue';
    import TextInput from '~/components/TextInput.vue';

    const form = ref({
        ip_address: '',
        label: '',
    });

    const modalActive = ref(false);
</script>

<template>
    <AuthenticatedLayout title="">
        <Table :title="'IP Addresses'" :description="'Showing IP Address'">
            <template #action>
                <PrimaryButton type="button" class="ml-4" @click="modalActive = true">
                    Add IP
                </PrimaryButton>
            </template>
            <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                        <th class="px-4 py-3">IP Address</th>
                        <th class="px-4 py-3">Label</th>
                        <th class="px-4 py-3"></th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y">
                </tbody>
                <tbody class="bg-white divide-y">
                    <tr class="text-gray-700">
                        <td class="px-4 py-3 text-sm  font-bold" colspan="2">
                            There are no records as of this moment.
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </Table>
        <Modal v-show="modalActive" @keydown.escape.prevent.stop="modalActive = false" @click="modalActive = false">
            <template v-slot:header>
                <h3 class="text-xl font-semibold text-gray-900 ">
                    Add IP Address
                </h3>
            </template>
            <template v-slot:button>
                <button type="button" @click="modalActive = false"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>

            </template>
            <template v-slot:form>
                <form>
                    <div
                        class="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-2 items-center">
                        <div class="relative mb-2">
                            <InputLabel for="ip-address" :value="'IP Address'" />
                            <TextInput id="ip-address" type="text" 
                                class="mt-1 block w-full" v-model="form.ip_address" required autofocus autocomplete="ip" />
                        </div>
                        <div class="relative mb-2">
                            <InputLabel for="label" value="Label" />
                            <TextInput id="label" type="text" 
                                class="mt-1 block w-full" v-model="form.label" autofocus autocomplete="label" />
                        </div>
                    </div>

                    <div class="mt-4 flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                        <PrimaryButton type="submit" 
                            class="ml-4">
                            Create
                        </PrimaryButton>
                        <InfoButton type="button" class="ml-4" @click="modalActive = false">Cancel</InfoButton>
                    </div>
                </form>
            </template>
        </Modal>
    </AuthenticatedLayout>

</template>