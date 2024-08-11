<script setup>
    const props = defineProps(['audit_log']);
</script>
 
<template>
    <tr class="text-gray-700">
        <td class="px-4 py-3 text-xs capitalize font-bold">
            {{audit_log.action}}
        </td>
        <td class="px-4 py-3 text-xs font-bold">
            {{audit_log.user}}
        </td>
        <td class="px-4 py-3 text-xs ">
            {{audit_log.description}}
        </td>
        <td class="px-4 py-3 text-xs ">
            {{ audit_log.date_created }} at {{ audit_log.time_created }}
        </td>
    </tr>
</template>