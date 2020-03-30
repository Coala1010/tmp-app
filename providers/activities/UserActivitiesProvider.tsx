import UserActivities from '../../types/activities/UserActivities';
import VideoActivity from '../../types/activities/VideoActivity';

export default function UserActivitiesProvider(userToken: string, lessonId: number): UserActivities {
    const userActivities : UserActivities = new UserActivities();
  
    const videoActivitiy = new VideoActivity();
    userActivities.videoActivity = videoActivitiy;

    return userActivities;
}