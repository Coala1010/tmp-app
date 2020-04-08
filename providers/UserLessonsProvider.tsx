import environment from '../development.json';

export default function UserLessonsProvider(userToken: string, unitId:number, resultCallback: any) {
    let url = environment.API_URL + '/api/v1/app/lesson/' + userToken + '/unit/' + unitId + '/all';
    fetch(url, {
        method: 'GET',
    })
    .then((response) => {
        response.json().then(json => {
            console.log(json);
            resultCallback(json);
        });
    });
}