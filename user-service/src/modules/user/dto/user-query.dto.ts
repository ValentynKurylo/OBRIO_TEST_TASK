import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class UserQueryDto {
	@ApiPropertyOptional({ description: 'Filter by status', example: 'active' })
	@IsOptional()
	@IsString()
	status?: string;

	@ApiPropertyOptional({ description: 'Search by name or email', example: 'john' })
	@IsOptional()
	@IsString()
	search?: string;

	@ApiPropertyOptional({ description: 'Page number', example: 1 })
	@IsOptional()
	@IsNumberString()
	page?: number;

	@ApiPropertyOptional({ description: 'Items per page', example: 10 })
	@IsOptional()
	@IsNumberString()
	limit?: number;
}
