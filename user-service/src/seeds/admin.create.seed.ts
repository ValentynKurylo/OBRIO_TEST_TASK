import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { RoleEnum, StatusEnum } from 'src/common/enums';

@Injectable()
export class SeedService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async seedAdmin(): Promise<void> {
		const adminEmail = process.env.ADMIN_EMAIL;
		const adminPassword = process.env.ADMIN_PASSWORD;

		const existingAdmin = await this.userRepository.findOne({
			where: { email: adminEmail },
		});

		if (!existingAdmin) {
			const adminUser = await this.userRepository.create({
				email: adminEmail,
				password: adminPassword,
				name: 'Admin',
				role: RoleEnum.ADMIN,
				status: StatusEnum.ACCEPTED
			});

			await this.userRepository.save(adminUser);

			console.log('Admin user created successfully');
		} else {
			console.log('Admin already exists');
		}
	}
}
