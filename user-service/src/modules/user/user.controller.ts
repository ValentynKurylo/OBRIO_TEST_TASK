import {Body, Controller, Get, Param, ParseIntPipe, Patch, Query, UseGuards, UsePipes } from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiHeaders, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import {User} from "../../entities/user.entity";
import { UserQueryDto } from './dto/user-query.dto';
import { UserListResponse } from './dto/user-response.dto';
import { PatchStatusDto } from './dto/patch-status.dto';
import { Role } from 'src/guards/role.auth.decorator';
import { RoleEnum } from 'src/common/enums';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@ApiHeaders([{ name: 'Authorization', description: 'Bearer {token}', required: true }])
@ApiUnauthorizedResponse()
@Role(RoleEnum.ADMIN)
@UseGuards(AuthGuard)
@UseGuards(AdminGuard)
@Controller('user')
export class UserController {

	constructor(private readonly usersService: UserService) {}
	@Get()
	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({
		status: 200,
		description: 'List of users returned',
		type: UserListResponse,
	})
	async findAll(
		@Query() query: UserQueryDto
	):Promise<{ data: Partial<User>[]; total: number }> {
		return this.usersService.findAll(query.status, query.search, query.page, query.limit);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user by ID' })
	@ApiParam({ name: 'id', type: Number })
	@ApiResponse({ status: 200, description: 'User found', type: User })
	async findOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<Partial<User> | null> {
		return this.usersService.findOneById(id);
	}

	@Patch(':id/status')
	@ApiOperation({ summary: 'Update user status by ID' })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: PatchStatusDto })
	@ApiResponse({ status: 200, description: 'User status updated', type: String })
	async patchStatus(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: PatchStatusDto
	): Promise<string> {
		return this.usersService.patchStatus(body.status, id);
	}
}
