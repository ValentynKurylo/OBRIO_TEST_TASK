import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserAuthDto} from "./dto/auth-dto";
import {TokenDto} from "./dto/token-dto";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import { ValidatorPipes } from 'src/pipes/validatoePipes';

@ApiTags('Auth')
@UsePipes(ValidatorPipes)
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	@ApiOperation({ summary: 'Login' })
	@ApiBody({ type: UserAuthDto })
	@ApiResponse({ status: 200, description: 'Access token returned', type: TokenDto })
	async login(@Body() userDTO: UserAuthDto): Promise<TokenDto> {
		return this.authService.login(userDTO);
	}

	@Post('/register')
	@ApiOperation({ summary: 'Registration' })
	@ApiBody({ type: CreateUserDto })
	@ApiResponse({ status: 200, description: `You have successfully registered. Please wait for a message.`, type: String })
	async register(@Body() userDTO: CreateUserDto): Promise<string> {
		return this.authService.register(userDTO);
	}
}
