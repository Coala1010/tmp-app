import environment from '../development.json';

export default function UserLevelsProvider(userToken: string, resultCallback : any) {
    let url = environment.API_URL + '/api/v1/app/level/' + userToken + '/all';
    fetch(url, {
        method: 'GET'
      })
    .then((response) => {
        response.json().then(json => {
            console.log(json);
            resultCallback(json);
        });
    });
}