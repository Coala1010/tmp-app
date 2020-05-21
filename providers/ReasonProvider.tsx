import environment from '../development.json';

export function GetReason(resultCallback : any) {
    let url = environment.API_URL + '/api/v1/app/reasons/all';
    fetch(url, {
        method: 'GET'
    })
    .then((response) => {
        response.json().then(json => {
            resultCallback(json);
        });
    });
}

export function CreateUserReasonToLearn(data, resultCallback : any) {
    let url = environment.API_URL + '/api/v1/app/reasons';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        response.json().then(json => {
            resultCallback(json);
        });
    });
}

export function DeleteReason(reasonId: number, resultCallback : any) {
    let url = environment.API_URL + '/api/v1/app/reasons/' + reasonId;
    console.log(url);
    fetch(url, {
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        response.json().then(json => {
            resultCallback(json);
        });
    });
}