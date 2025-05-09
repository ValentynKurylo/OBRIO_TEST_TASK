import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { UserPayloadInterface } from "../../common/interfaces/user.payload.interface";
import { NotificationService } from "./notification.service";
import {USER_CREATED, USER_STATUS_UPDATED} from '../../common/consts/envents.const'
import { UserStatusUpdatePayloadInterface } from "../../common/interfaces/user.status.update.payload.interface";

@Controller()
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {
	}
	@EventPattern(USER_CREATED)
	async handleUserCreated(@Payload() payload: UserPayloadInterface): Promise<void> {
		await this.notificationService.userCreateEvent(payload)
	}

	@EventPattern(USER_STATUS_UPDATED)
	async handleUserStatusUpdate(@Payload() payload: UserStatusUpdatePayloadInterface): Promise<void> {
		await this.notificationService.userStatusUpdateEvent(payload)
	}
}
