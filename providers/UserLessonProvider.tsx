import environment from '../development.json';

export default function UserLessonProvider(userLessonId: number, resultCallback: any) {
    let url = environment.API_URL + '/api/v1/app/lesson/' + userLessonId;
    fetch(url, {
        method: 'GET',
    })
    .then((response) => {
        response.json().then(json => {
            resultCallback(json);
        });
    });
}