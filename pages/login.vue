<script setup >
  import InputError from '~/components/InputError.vue';
  import InputLabel from '~/components/InputLabel.vue';
  import TextInput from '~/components/TextInput.vue';

  useHead({
    titleTemplate: ' Login'
  })
  
  definePageMeta({
    middleware: 'guest',
  })

  const isProcessing = ref(false);

  const form = ref({
      email: '',
      password: '',
  });

  const errors = ref({
    email: null,
    password: null,
    general: null,
  });

  const submit = async () => {
    isProcessing.value = true;
    errors.value.email = null;
    errors.value.password = null;
    errors.value.general = null;
    
    await $fetch('/api/login', {
      method: 'POST',
      body: form.value,
    }).catch((error) => {
        errors.value.email = error.data.data.errors?.email ? error.data.data.errors?.email[0] : '';
        errors.value.password = error.data.data.errors?.password ? error.data.data.errors?.password[0] : '';
        errors.value.general = error.data.data.errors?.details;
        
        isProcessing.value = false;
    }).then((res) => {
      if(typeof res !== 'undefined' && res.status == 201)
      {
        navigateTo('/dashboard');
        isProcessing.value = false;
      }
      else
      {
        isProcessing.value = false;
      }
    })
  }
</script>

<template>
    
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-28">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submit">
        <div>
            <InputLabel for="email" value="Email" />

            <div class="mt-2">
              <TextInput
                id="email"
                type="email"
                class="mt-1 block w-full"
                v-model="form.email"
                autofocus
                :class="{ 'border-2 border-red-500': errors.email }" 
              />
            </div>
            <InputError class="mt-2" v-if="errors.email" :message="errors.email"></InputError>
        </div>

        <div>
          <InputLabel for="password" value="Password" />

          <div class="mt-2">
            <TextInput
              id="password"
              type="password"
              v-model="form.password"
              class="mt-1 block w-full"
              required
              :class="{ 'border-2 border-red-600': errors.password }" 
            />
          </div>
          <InputError v-if="errors.password" :message="errors.password"></InputError>
        </div>

        <InputError v-if="errors.general" :message="errors.general"></InputError>

        <div>
          <button type="submit" :class="{ 'opacity-25': isProcessing }" :disabled="isProcessing" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
    </div>
  </div>
  
</template>