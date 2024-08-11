export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const host = config.public.host;
    const body = await readBody(event)
    const id = event.context.params?.id;
    const url = `${host}/api/v1/ip-address/${id}`;
    const accessToken = getCookie(event, 'token');
  
    const response = await $fetch.raw(url, {
      method: 'PATCH',
      baseURL: host,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: body,
    })
    .then((response) => ({
        data: response._data,
        status: response.status
    }))
  
    return response;
})
      