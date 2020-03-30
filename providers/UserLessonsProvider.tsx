import UserLessons from '../types/UserLessons';
import UserLesson from '../types/UserLesson';

export default function UserLessonsProvider(userToken: string): UserLessons {
    const userLessons : UserLessons = new UserLessons();
  
    const userLesson: UserLesson = new UserLesson();
    userLesson.lessonId = 1;
    userLesson.lessonNumber = 1;
    userLesson.title = "Lesson One";
    
    userLessons.userLessonsArray = new Array<UserLesson>();
    userLessons.userLessonsArray.push(userLesson);

    const userLesson2: UserLesson = new UserLesson();
    userLesson2.lessonId = 2;
    userLesson2.lessonNumber = 2;
    userLesson2.title = "Lesson TWO";
    userLessons.userLessonsArray.push(userLesson2);

    return userLessons;
}