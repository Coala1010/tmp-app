import environment from '../../development.json';

export function VideoProvider(userVideoActivityGroupId:number, resultCallback: any) {
    let url = environment.API_URL + '/api/v1/app/videoactivity/' + userVideoActivityGroupId;
    fetch(url, {
        method: 'GET',
    })
    .then((response) => {
        response.json().then(json => {
            resultCallback(json);
        });
    });
}

export function updateVideoActivity(body): Promise<any> {
    const  url = `${environment.API_URL}/api/v1/app/videoactivity/`;
    return fetch(
        url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        },
    ).then((response) => response.json());
}