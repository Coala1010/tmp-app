import NavigationActivity from './NavigationActivity';
import UserLessonProvider from '../../providers/UserLessonProvider';
import UserLesson from '../../types/UserLesson';

export default function OnSuccessNavigation(nextActivity : NavigationActivity, activities: Map<string, NavigationActivity>,
    navigation: any) {
        
    const nextPayload = { 
        userGroupId: nextActivity.userGroupId,
        lessonTitle: nextActivity.lessonTitle,
        lessonId: nextActivity.lessonId,
        userToken: nextActivity.userToken,
        unitTitle: nextActivity.unitTitle,
        unitId: nextActivity.unitId,
        activities: activities
    };
    if (nextActivity.navigationScreen == 'Lessons') {
        UserLessonProvider(nextActivity.lessonId, (json) => {
            let userLesson : UserLesson = json;
            if (userLesson.userLessonProgress == 1.0) {
                navigation.push('Congratulations', nextPayload);
            } else {
                navigation.push(nextActivity.navigationScreen, nextPayload);
            }
        })
    } else {  
        navigation.push(nextActivity.navigationScreen, nextPayload);
    } 
} 