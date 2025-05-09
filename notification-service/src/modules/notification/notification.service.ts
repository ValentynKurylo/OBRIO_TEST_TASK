import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UserPayloadInterface } from '../../common/interfaces/user.payload.interface';
import {PUSH_ADMIN, PUSH_STATUS_UPDATE, PUSH_USER, SEND_PUSH } from '../../common/consts/envents.const';
import { UserStatusUpdatePayloadInterface } from '../../common/interfaces/user.status.update.payload.interface';

@Injectable()
export class NotificationService {
	constructor(
		@InjectQueue(SEND_PUSH) private queue: Queue,
	) {}

	async userCreateEvent(payload: UserPayloadInterface): Promise<void> {
		await this.queue.add(
			PUSH_USER,
			payload,
			{
				jobId: `push-user-${payload.id}`,
				delay: 24 * 60 * 60 * 1000,
				attempts: 3, 
				backoff: 10000, 
				removeOnComplete: true,
				removeOnFail: true,
			},
		);
	
		await this.queue.add(
			PUSH_ADMIN,
			payload,
			{
				jobId: `push-admin-${payload.id}`,
				delay: 1 * 60 * 1000,
				attempts: 3,
				backoff: 10000,
				removeOnComplete: true,
				removeOnFail: true,
			},
		);
	}

	async userStatusUpdateEvent(payload: UserStatusUpdatePayloadInterface): Promise<void> {
		const jobId = `push-update-status-${payload.id}`; 
		
		await this.queue.add(
			PUSH_STATUS_UPDATE,
			payload,
			{
				jobId,  
				delay: 24 * 60 * 60 * 1000,
				attempts: 3,
				backoff: 10000,
				removeOnComplete: true,
				removeOnFail: true,
			},
		);
	}
}
