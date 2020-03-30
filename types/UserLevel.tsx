import UserUnit from "./UserUnit";

export default class UserLevel {
    levelId: number;
    title: string;
	order: number;
	levelNumber: number;
	levelLastModificationDate: Date;
	levelCreationDate: Date;
	userLevelProgress: number;
	userLastModificationDate: Date;
	userCreationDate: Date;
	userUnits: Array<UserUnit>
}   