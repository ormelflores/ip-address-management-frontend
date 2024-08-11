<script setup>
    import AuthenticatedLayout from '~/components/AuthenticatedLayout.vue';
    import Table from '~/components/Table.vue';

    useHead({
        titleTemplate: ' Audit Logs'
    })

    definePageMeta({
        middleware: 'auth',
    })
</script>

<template>
    <AuthenticatedLayout title="">
        <Table :title="'Audit Logs'" :description="'Showing Audit Logs'">
            <template #action>
            </template>
            <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                        <th class="px-4 py-3">User</th>
                        <th class="px-4 py-3">Description</th>
                        <th class="px-4 py-3">Date</th>
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
    </AuthenticatedLayout>

</template>