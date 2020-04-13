import environment from '../../development.json';

export default function VideoProvider(userVideoActivityGroupId:number, resultCallback: any) {
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