export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const host = config.public.host;
    const url = `${host}/api/v1/audit-logs`;
    const query = await getQuery(event);
    const accessToken = getCookie(event, 'token');

    const data = await $fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        query: query
    });

    return data;
})
    