import UserActivities from '../../types/activities/UserActivities';
import VideoActivity from '../../types/activities/VideoActivity';
import environment from '../../development.json';

export default function UserActivitiesProvider(lessonId: number, resultCallback: any) {
    let url = environment.API_URL + '/api/v1/app/activity/groups/lesson/' + lessonId + '/all';
    fetch(url, {
        method: 'GET',
    })
    .then((response) => {
        response.json().then(json => {
            resultCallback(json);
        });
    }); 
}