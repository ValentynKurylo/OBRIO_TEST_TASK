import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../../entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {StatusEnum} from "../../common/enums";
import { NotificationService } from '../notification/notification.service';
import { NOT_FOUND } from '../../common/errors/errors';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private readonly notificationService: NotificationService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(createUserDto);
		const savedUser = await this.userRepository.save(user);
		await this.notificationService.notifyOnUserCreate({
			id: savedUser.id,
			email: savedUser.email,
			name: savedUser.name,
			status: savedUser.status, 
		});
		return savedUser;
	}

	async findAll(
		status?: string,
		search?: string,
		page = 1,
		limit = 10,
	): Promise<{ data: Partial<User>[]; total: number }> {
		const query = this.userRepository.createQueryBuilder('user');

		if (status) {
			query.andWhere('user.status = :status', { status });
		}

		if (search) {
			query.andWhere(
				'(user.name ILIKE :search OR user.email ILIKE :search)',
				{ search: `%${search}%` },
			);
		}

		query.skip((page - 1) * limit).take(limit);

		const [users, total] = await query.getManyAndCount();

		const data = users.map(({ password, ...rest }) => rest);

		return { data, total };
	}


	async findOneByEmail(email: string): Promise<User | null> {
		return await this.userRepository.findOne({ where: { email } });
	}

	async findOneById(id: number): Promise<Partial<User> | null> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) return null;
		const { password, ...safeUser } = user;
		return safeUser;
	}


	async patchStatus(status: StatusEnum, id: number): Promise<string> {
		const res = await this.userRepository.update(id, { status }, );
		if (res.affected === 0) {
			throw new NotFoundException(NOT_FOUND);
		}
		await this.notificationService.notifyOnStatusChange(id, status)
		return `status was updated`
	}
}
