<script setup>
    import { ref } from 'vue';
    const showNavbarMobile = ref(false);
    const showLogout = ref(false);
    const route = useRoute();

    defineProps({
        title: {
            type: String,
        },
    });

    let user = useCookie('user').value;

    const logout = async () => {
        await $fetch('/api/logout', {
            method: 'POST', 
        })
        .then((res) => {
            if(typeof res !== 'undefined' && res.status == 201)
            {
                navigateTo('/login');
            }
        })
    }
    
</script>

<template>
    <div class="min-h-full">
    <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
            <div class="flex-shrink-0">
                <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
            </div>
            <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <a href="/dashboard" :class="route.name == 'dashboard' ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'" class="rounded-md  px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
                <a href="/audit-logs" :class="route.name == 'audit-logs' ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'" class="rounded-md px-3 py-2 text-sm font-medium ">Audit Logs</a>
                </div>
            </div>
            </div>
            <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">

                <!-- Profile dropdown -->
                <div class="relative ml-3">
                <div>
                    <button type="button" @click="showLogout = !showLogout" class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span class="absolute -inset-1.5"></span>
                    <span class="sr-only">Open user menu</span>

                    <svg class="w-8 h-8 object-cover rounded-full text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd">
                        </path>
                    </svg>
                </button>
                </div>
                <div v-if="showLogout" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <a href="#" @click="logout" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                </div>
                </div>
            </div>
            </div>
            <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button type="button" @click="showNavbarMobile = !showNavbarMobile" class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Open main menu</span>
                <!-- Menu open: "hidden", Menu closed: "block" -->
                <svg :class="showNavbarMobile ? 'hidden' : 'block'" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <!-- Menu open: "block", Menu closed: "hidden" -->
                <svg :class="showNavbarMobile ? 'block' : 'hidden'" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
        </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <div class="md:hidden" id="mobile-menu" v-if="showNavbarMobile">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a href="/dashboard"  :class="route.name == 'dashboard' ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'" class="block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
            <a href="/audit-logs"  :class="route.name == 'audit-logs' ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'" class="block rounded-md px-3 py-2 text-base font-medium">Audit Logs</a>
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
            <div class="flex items-center px-5">
            <div class="flex-shrink-0">
                <svg class="w-8 h-8 object-cover rounded-full text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd">
                    </path>
                </svg>
            </div>
            <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">{{user.name}}</div>
                <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
            </div>
            </div>
            <div class="mt-3 space-y-1 px-2">
            <a href="#" @click="logout" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white" >Sign out</a>
            </div>
        </div>
        </div>
    </nav>
    
    <main>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <slot />
        </div>
    </main>
    </div>

</template>