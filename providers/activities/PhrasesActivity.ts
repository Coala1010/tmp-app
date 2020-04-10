import environment from '../../development.json';

export function getPhrases(groupId): Promise<any> {
    const url = `${environment.API_URL}/api/v1/app/phrases/${groupId}/`;
    return fetch(url).then((response) => response.json());
}

export function uploadUserPhraseAudio(body): Promise<any> {
    const  url = `${environment.API_URL}/api/v1/app/phrases/`;
    return fetch(
        url,
        { method: 'PUT', body },
    ).then((response) => response.json());;
}
