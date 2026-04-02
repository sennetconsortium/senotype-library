export function getAuth() {
  return 
}

export const fetchSearchAPIEntities = async (body, index = 'entities') => {
    const token = getAuth();
    const headers = getJsonHeader()
    if (token) {
        headers.append("Authorization", `Bearer ${token}`)
    }
    Addon.log('SearchAPI', {data: {body, index}, color: 'orange'})
    try {
        const res = await fetch(`${getSearchEndPoint()}${index}/search`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            return null;
        }
        return res.json();
    } catch (error) {
        log.error(error);
        return null;
    }
}