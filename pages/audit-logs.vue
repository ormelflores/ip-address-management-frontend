<script setup>
    import AuditLog from '~/components/AuditLog.vue';
import AuthenticatedLayout from '~/components/AuthenticatedLayout.vue';
    import Table from '~/components/Table.vue';

    useHead({
        titleTemplate: ' Audit Logs'
    })

    definePageMeta({
        middleware: 'auth',
    })

    const auditLogs = ref([]);

    onMounted(async () => {
        auditLogs.value = await $fetch('/api/audit-logs')
    });

    const nextPage = async (value) => {
        auditLogs.value= await $fetch('/api/audit-logs', {
            query: {audit_logs: value}
        })
    }

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
                        <th class="px-4 py-3">Action</th>
                        <th class="px-4 py-3">User</th>
                        <th class="px-4 py-3">Description</th>
                        <th class="px-4 py-3">Timestamp</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y" v-if="auditLogs.data && auditLogs.data.length > 0">
                    <AuditLog v-for="audit_log in auditLogs.data"
                        :key="audit_log.id"
                        :audit_log="audit_log"
                    >
                    </AuditLog>
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

            <!-- PAGINATION -->
            <div
                class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9"
                v-if="auditLogs.meta && auditLogs.meta.links && auditLogs.meta.links.length > 3">
                <span class="flex items-center col-span-3"></span>
                <span class="col-span-2"></span>
                <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                    <ul class="inline-flex items-center">
                    <li v-for="(link, k) in auditLogs.meta.links" :key="k">
                        <a class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-gray cursor-pointer"
                        v-html="link.label" @click="nextPage(link.url.split('audit_logs=')[1])"
                        :class="{'px-3 py-1 text-white transition-colors duration-150 bg-gray-800 border border-r-0 border-gray-800 rounded-md focus:outline-none focus:shadow-outline-gray': link.active}">
                        </a>
                    </li>
                    </ul>
                </nav>
                </span>
            </div>
        </Table>
    </AuthenticatedLayout>

</template>