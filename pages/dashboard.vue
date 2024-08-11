<script setup>
    import swal from 'sweetalert';
    import AuthenticatedLayout from '~/components/AuthenticatedLayout.vue';
    import InputError from '~/components/InputError.vue';
    import InputLabel from '~/components/InputLabel.vue';
    import IpAddress from '~/components/IpAddress.vue';
    import Modal from '~/components/Modal.vue';
    import PrimaryButton from '~/components/PrimaryButton.vue';
    import Table from '~/components/Table.vue';
    import TextInput from '~/components/TextInput.vue';

    useHead({
        titleTemplate: ' Dashboard'
    })

    definePageMeta({
        middleware: 'auth',
    })

    const isProcessing = ref(false);
    const modalActive = ref(false);
    const ipAddressList = ref([]);

    const addForm = ref({
        ip_address: '',
        label: '',
    });

    const errors = ref({
        data: {
        ip_address: [],
        label: [],
        },
        status: 422,
        message: ''
    })

    onMounted(async () => {
        ipAddressList.value = await $fetch('/api/ip-address/list')
    });

    const nextPage = async (value) => {
        ipAddressList.value= await $fetch('/api/ip-address/list', {
            query: {ip_addresses: value}
        })
    }

    const saveIpAddress = async () => {
        isProcessing.value = true;
        clearErrors

        await $fetch('/api/ip-address/store', {
        method: 'POST',
        body: addForm.value,
        })
        .catch((error) => {
            if(error.data.statusCode === 422)
            {
                errors.value.message = error.data.statusMessage;
                errors.value.status = error.data.statusCode;
                errors.value.data = error.data.data.errors;
            }
            else
            {
                errors.value.message = error.data.data.message;
                errors.value.status = error.data.statusCode;
            }
            isProcessing.value = false;
        })
        .then((res) => {
            if(typeof res !== 'undefined' && res.status == 201)
            {
                swal({
                    icon: 'success',
                    title: 'Success',
                    text: 'The IP address has been saved successfully.',
                    buttons: false,
                    timer: 3000
                }).then((rers) => {
                    modalActive.value = false;
                    location.reload();
                    isProcessing.value = false;
                });
            }
            else
            {
                isProcessing.value = false;
            }
        })
    }

    const clearErrors = () => {
        errors.value.data = {
        ip_address: [],
        label: [],
        };
        errors.value.status = 422;
        errors.value.message = '';
    }
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
                        <th class="px-4 py-3">Created At</th>
                        <th class="px-4 py-3">Updated At</th>
                        <th class="px-4 py-3"></th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y" v-if="ipAddressList.data && ipAddressList.data.length > 0">
                    <IpAddress v-for="ip_address in ipAddressList.data"
                        :key="ip_address.id"
                        :ip_address="ip_address"
                    >
                    </IpAddress>
                </tbody>
                <tbody class="bg-white divide-y" v-else>
                    <tr class="text-gray-700">
                        <td class="px-4 py-3 text-sm  font-bold" colspan="2">
                            There are no records as of this moment.
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div
                class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9"
                v-if="ipAddressList.meta && ipAddressList.meta.links && ipAddressList.meta.links.length > 3">
                <span class="flex items-center col-span-3"></span>
                <span class="col-span-2"></span>
                <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                    <ul class="inline-flex items-center">
                    <li v-for="(link, k) in ipAddressList.meta.links" :key="k">
                        <a class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-indigo cursor-pointer"
                        v-html="link.label" @click="nextPage(link.url.split('ip_addresses=')[1])"
                        :class="{'px-3 py-1 text-white transition-colors duration-150 bg-indigo-400 border border-r-0 border-indigo-300 rounded-md focus:outline-none focus:shadow-outline-indigo': link.active}">
                        </a>
                    </li>
                    </ul>
                </nav>
                </span>
            </div>
        </Table>
        
        <!-- ADD MODAL -->
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
                <form @submit.prevent="saveIpAddress">
                    <div
                        class="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-2 items-center">
                        <div class="relative mb-2">
                            <InputLabel for="ip-address" :value="'IP Address'" />
                            <TextInput id="ip-address" type="text" 
                                class="mt-1 block w-full"
                                v-model="addForm.ip_address"
                                autofocus
                                :class="errors.data.ip_address && errors.data.ip_address.length > 0 ? 'border-2 border-red-600' : ''"
                            />
                            <div v-if="errors.data.ip_address && errors.data.ip_address.length > 0">
                                <InputError :message="errors.data.ip_address[0]"></InputError>
                            </div>
                        </div>
                        <div class="relative mb-2">
                            <InputLabel for="label" value="Label" />
                            <TextInput id="label" type="text" 
                                class="mt-1 block w-full"
                                v-model="addForm.label"
                                autofocus
                                :class="errors.data.label && errors.data.label.length > 0 ? 'border-2 border-red-600' : ''"
                            />
                            <div v-if="errors.data.label && errors.data.label.length > 0">
                                <InputError :message="errors.data.label[0]"></InputError>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                        <PrimaryButton type="submit" 
                            :class="{ 'opacity-25': isProcessing }"
                            :disabled="isProcessing"
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