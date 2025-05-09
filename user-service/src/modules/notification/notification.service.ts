import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import { NOTIFICATION_SERVICE, USER_CREATED, USER_STATUS_UPDATED } from '../../common/consts/events.const';
import { UserPayloadInterface } from '../../common/interfaces/user.payload.interface';

@Injectable()
export class NotificationService {
	constructor(
		@Inject(NOTIFICATION_SERVICE) private readonly notificationClient: ClientProxy,
	) {}

	async notifyOnUserCreate(user: UserPayloadInterface):Promise<void> {
		this.notificationClient.emit(USER_CREATED, user);
	}

	async notifyOnStatusChange(userId: number, status: string):Promise<void> {
		this.notificationClient.emit(USER_STATUS_UPDATED, { userId, status });
	}
}
