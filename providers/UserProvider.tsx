import environment from '../development.json';
import Constants from 'expo-constants';

export default function UserProvider(resultCallback : any) {
    const uniqueDeviceId = Constants.deviceId;
    let url = environment.API_URL + '/api/v1/app/user/' + uniqueDeviceId;
    fetch(url, {
        method: 'GET'
      })
    .then((response) => {
        response.json().then(json => {
            resultCallback(json);
        });
    });
}