<script setup>
    import moment from 'moment';
import InputLabel from './InputLabel.vue';
import TextInput from './TextInput.vue';
import InputError from './InputError.vue';
import PrimaryButton from './PrimaryButton.vue';
import InfoButton from './InfoButton.vue';
import Modal from './Modal.vue';

    const props = defineProps(['ip_address']);
    
    const modalActive = ref(false);
    const isProcessing = ref(false);

    const updateLabelForm = ref({
        label: props.ip_address.label,
    });

    const errors = ref({
        data: {
            label: [],
        },
        status: 422,
        message: ''
    })

    const updateLabel = async () => {
        isProcessing.value = true;
        clearErrors

        await $fetch(`/api/ip-address/update/${props.ip_address.id}`, {
            method: 'PATCH',
            body: updateLabelForm.value,
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
                    text: 'Label has been updated.',
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
            label: [],
        };
        errors.value.status = 422;
        errors.value.message = '';
    }
</script>
 
<template>
    <tr class="text-gray-700">
        <td class="px-4 py-3 text-xs capitalize font-bold">
            {{ip_address.ip_address}}
        </td>
        <td class="px-4 py-3 text-xs capitalize">
            {{ip_address.label}}
        </td>
        <td class="px-4 py-3 text-xs capitalize">
            {{moment(ip_address.created_at).format("MMMM DD, YYYY")}} at {{moment(ip_address.created_at).format("hh:mm:ss A")}}
        </td>
        <td class="px-4 py-3 text-xs capitalize">
            {{moment(ip_address.updated_at).format("MMMM DD, YYYY")}} at {{moment(ip_address.updated_at).format("hh:mm:ss A")}}
        </td>
        <td class="px-4 py-3 text-sm">
            <button class="truncate" @click="modalActive = true">
                <span class="text-sky-500 hover:text-sky-700 font-medium mr-4">Change Label</span>
            </button>
        </td>
    </tr>

    <!-- UPDATE LABEL MODAL -->
    <Modal v-show="modalActive" @keydown.escape.prevent.stop="modalActive = false" @click="modalActive = false">
        <template v-slot:header>
            <h3 class="text-xl font-semibold text-gray-900 ">
                Change IP Address Label
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
            <form @submit.prevent="updateLabel">
                <p class="font-semibold">IP Address: {{ ip_address.ip_address }}</p>
                <div
                    class="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-2 items-center">
                    <div class="relative mb-2">
                        <InputLabel for="label" value="Label" />
                        <TextInput id="label" type="text" 
                            class="mt-1 block w-full"
                            v-model="updateLabelForm.label"
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
                        Update
                    </PrimaryButton>
                    <InfoButton type="button" class="ml-4" @click="modalActive = false">Cancel</InfoButton>
                </div>
            </form>
        </template>
    </Modal>
</template>