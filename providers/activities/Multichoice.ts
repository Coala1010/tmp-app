import environment from '../../development.json';

export function getMultichoice(groupId): Promise<any> {
    const url = `${environment.API_URL}/api/v1/app/multichoice/${groupId}/`;
    return fetch(url).then((response) => response.json());
}

export function updateMultichoiceActivity(body): Promise<any> {
    const  url = `${environment.API_URL}/api/v1/app/multichoice/`;
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
