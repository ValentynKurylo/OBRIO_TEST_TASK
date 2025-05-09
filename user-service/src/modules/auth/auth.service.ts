import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {UserService} from "../user/user.service";
import {UserAuthDto} from "./dto/auth-dto";
import {TokenDto} from "./dto/token-dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {USER_ALREADY_EXIST, WRONG_EMAIL_OR_PASSWORD} from "../../common/errors/errors";
import {User} from "../../entities/user.entity";

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private jwtService: JwtService) {
	}

	async login(userDTO: UserAuthDto):Promise<TokenDto>{
		const user = await this.validateUser(userDTO)
		return this.generateToken(user)
	}
	async register(userDTO: CreateUserDto):Promise<string>{

		const candidate = await this.userService.findOneByEmail(userDTO.email)

		if(candidate) throw  new  HttpException(USER_ALREADY_EXIST, HttpStatus.BAD_REQUEST)

		const user = await this.userService.create(userDTO)
		return `You have successfully registered. Please wait for a message.`;
	}

	private generateToken(user: User):TokenDto{
		const payload = {id: user.id, role: user.role, status: user.status}
		return {
			token: this.jwtService.sign(payload),
		}
	}

	private async validateUser(userDto: UserAuthDto):Promise<User>{
		const user = await this.userService.findOneByEmail(userDto.email)
		if (!user) throw new HttpException(WRONG_EMAIL_OR_PASSWORD, HttpStatus.BAD_REQUEST)

		const passwordEquals = await bcrypt.compare(userDto.password, user.password)
		if(!passwordEquals) throw new HttpException(WRONG_EMAIL_OR_PASSWORD, HttpStatus.BAD_REQUEST)

		return user
	}
}
