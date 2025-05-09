import { StatusEnum } from "../enums";

export interface UserPayloadInterface{
	id: number,
	name: string,
	email: string,
	status: StatusEnum
}