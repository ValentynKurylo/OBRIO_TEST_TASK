import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import {generateNotificationText} from "./generateNotificationText";
import { SEND_PUSH, PUSH_USER, PUSH_ADMIN, PUSH_STATUS_UPDATE } from '../../common/consts/envents.const';

@Processor(SEND_PUSH)
export class NotificationProcessor {
	constructor() {}

	@Process(PUSH_USER)
	async handleUserPush(job: Job):Promise<void> {
		const { email, status, name } = job.data;
		const text = generateNotificationText(status);

		const res = await axios.post(process.env.WEBHOOK_URL ?? '', {
			to: email,
			message: `Hello ${name}! ${text}`,
		});
	}

	@Process(PUSH_ADMIN)
	async handleAdminPush(job: Job):Promise<void> {
		const { email, name, id } = job.data;
		const res = await axios.post(process.env.WEBHOOK_URL ?? '', {
			to: process.env.ADMIN_EMAIL,
			message: `Hello! New user ${name} was registred, email: ${email}, id: ${id}. You need to approve or reject registration!`,
		});
	}

	@Process(PUSH_STATUS_UPDATE)
	async handleUserStatusUpdatePush(job: Job):Promise<void> {
		const { status, id } = job.data;
		
		const res = await axios.post(process.env.WEBHOOK_URL ?? '', {
			to: process.env.ADMIN_EMAIL,
			message: `Hello! Your status was updated on ${status}`,
		});
	}
}
