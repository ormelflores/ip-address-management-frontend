<script setup >
  import InputLabel from '~/components/InputLabel.vue';
  import TextInput from '~/components/TextInput.vue';

  const form = ref({
      email: '',
      password: '',
  });
</script>

<template>
    
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-28">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
            <InputLabel for="email" value="Email" />

            <TextInput
              id="email"
              type="email"
              class="mt-1 block w-full"
              v-model="form.email"
              required
              autofocus
              autocomplete="email"
            />
        </div>

        <div>
          <InputLabel for="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            v-model="form.password"
            class="mt-1 block w-full"
            required
            autocomplete="current-password"
          />
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
    </div>
  </div>
  
</template>