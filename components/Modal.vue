<script setup>

</script>
<template>
    <div class="fixed inset-0 z-40 bg-gray-500 bg-opacity-50">
        <div @keydown.escape.prevent.stop="modalActive = false" @click="modalActive = false"
            class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full flex justify-center items-center">
            <div @click.stop class="relative p-4 w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <slot name="header">

                        </slot>
                        <slot name="button">

                        </slot>
                    </div>
                    <!-- Modal body -->
                    <div class="p-4 md:p-5 space-y-4">
                        <slot name="form">

                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>