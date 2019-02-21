export async function callApi(method: string, url: string, path: string, data?: any) {
    const res = await fetch(url + '/api' + path, {
        method,
        // tslint:disable-next-line:object-literal-sort-keys
        headers: {
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    });
    return await res.json();
}
