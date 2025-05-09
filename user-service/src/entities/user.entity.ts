import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {RoleEnum, StatusEnum} from "../common/enums";


@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ unique: true, nullable: false })
	email: string

	@Column({ nullable: false })
	password: string

	@Column({type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
	role: RoleEnum

	@Column({type: 'enum', enum: StatusEnum, default: StatusEnum.PENDING })
	status: StatusEnum

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword():Promise<void> {
		if (this.password) {
			const salt = await bcrypt.genSalt(10);
			this.password = await bcrypt.hash(this.password, salt);
		}
	}
}