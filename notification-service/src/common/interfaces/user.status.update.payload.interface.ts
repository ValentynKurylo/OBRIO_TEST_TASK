import { StatusEnum } from "../enums";

export interface UserStatusUpdatePayloadInterface{
	id: number,
	status: StatusEnum
}