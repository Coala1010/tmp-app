import environment from '../../development.json';

export function getWordsActivity(groupId): Promise<any> {
    const url = `${environment.API_URL}/api/v1/app/words/${groupId}/`;
    return fetch(url).then((response) => response.json());
}

export function uploadWordsActivityRecord(body): Promise<any> {
    const  url = `${environment.API_URL}/api/v1/app/words/`;
    return fetch(
      url,
      { method: 'PUT', body },
  ).then((response) => response.json());
}
