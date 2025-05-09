import { ApiProperty } from '@nestjs/swagger';

export class UserResponseItem {
	@ApiProperty({ example: 1 })
	id: number;

	@ApiProperty({ example: 'John' })
	name: string;

	@ApiProperty({ example: 'john@example.com' })
	email: string;

	@ApiProperty({ example: 'active' })
	status: string;
}

export class UserListResponse {
	@ApiProperty({ type: [UserResponseItem] })
	data: UserResponseItem[];

	@ApiProperty({ example: 1 })
	total: number;
}
