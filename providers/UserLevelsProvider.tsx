import UserLevels from '../types/UserLevels';
import UserLevel from '../types/UserLevel';
import UserUnit from '../types/UserUnit';

export default function UserLevelsProvider(userToken: string): UserLevels {
    const userLevels : UserLevels = new UserLevels();
  
    const userLevel: UserLevel = new UserLevel();
    userLevel.levelId = 1;
    userLevel.levelNumber = 1;
    userLevel.title = "Level One";
    userLevel.units = new Array<UserUnit>();
    const userUnit = new UserUnit();
    userLevel.units.push(userUnit);
    userLevels.userLevelsArray = new Array<UserLevel>();
    userLevels.userLevelsArray.push(userLevel);

    const userLevel2: UserLevel = new UserLevel();
    userLevel2.levelId = 2;
    userLevel2.levelNumber = 2;
    userLevel2.title = "Level TWO";
    userLevels.userLevelsArray.push(userLevel2);
    userLevel2.userUnits = new Array<UserUnit>();
    const userUnit2 = new UserUnit();
    userUnit2.title='2';
    userLevel2.userUnits.push(userUnit2);
    const userUnit3 = new UserUnit();
    userUnit3.title='3';
    userLevel2.userUnits.push(userUnit3);

    const userLevel3: UserLevel = new UserLevel();
    userLevel3.levelId = 3;
    userLevel3.levelNumber = 3;
    userLevel3.title = "Level THREE";
    userLevels.userLevelsArray.push(userLevel3);
    userLevel3.userUnits = new Array<UserUnit>();
    const userUnit4 = new UserUnit();
    userUnit4.title='Family';
    userLevel3.userUnits.push(userUnit4);
    const userUnit5 = new UserUnit();
    userUnit5.title='Family';
    userLevel3.userUnits.push(userUnit5);
    const userUnit6 = new UserUnit();
    userUnit6.title='Family';
    userLevel3.userUnits.push(userUnit6);
    return userLevels;
}