import { ref } from 'vue';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const host = config.public.host;
    const body = await readBody(event)
    const url = `${host}/api/v1/login`;
    const status = ref(422);
    const userAgent = event.node.req.headers['user-agent'] || 'Unknown';
    
    const { data, pending }: any = await $fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': userAgent },
        body: body,
    });

    const cookieOption: any = {
        path: '/',
        sameSite: 'strict',
    };

    if(typeof data !== 'undefined')
    {
        setCookie(event, 'token', data.accessToken, cookieOption)
        setCookie(event, 'user', JSON.stringify(data.user), cookieOption)
        status.value = 201;
    }

    return {status: status.value};
})
    