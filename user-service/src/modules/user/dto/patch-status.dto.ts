import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../../../common/enums';

export class PatchStatusDto {
	@ApiProperty({ example: 'accepted', enum: StatusEnum })
	@IsNotEmpty()
	@IsEnum(StatusEnum, { message: 'status must be a valid enum value' })
	status: StatusEnum;
}
