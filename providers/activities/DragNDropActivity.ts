import environment from '../../development.json';

export function getDnDActivity(groupId): Promise<any> {
    const  url = `${environment.API_URL}/api/v1/app/dragndrop/${groupId}`;
    return fetch(url).then((response) => response.json());
}

export function updateDnDActivity(body): Promise<any> {
    const  url = `${environment.API_URL}/api/v1/app/dragndrop/`;
    return fetch(
        url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        },
    ).then((response) => response.json());;
}
