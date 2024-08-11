import { ref } from 'vue';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const host = config.public.host;
    const url = `${host}/api/v1/logout`;
    const status = ref(422);
    const accessToken = getCookie(event, 'token');
    
    const data = await $fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    if(typeof data !== 'undefined')
    {
        setCookie(event, 'token', '', {
            maxAge: 0,
            path: '/',
            sameSite: 'strict',
        })

        setCookie(event, 'user', '', {
            maxAge: 0,
            path: '/',
            sameSite: 'strict',
        })
        
        status.value = 201;
    }

    return {status: status.value};
})
    