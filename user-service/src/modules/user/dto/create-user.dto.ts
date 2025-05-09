import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
	@ApiProperty({example: "User User"})
	@IsString({message: "User Name must be string"})
	readonly name: string
	@ApiProperty({example: "user@gamil.com"})
	@IsEmail({}, {message: "Wrong email"})
	readonly email: string
	@ApiProperty({example:"1111"})
	@Length(4, 16,{ message: "Length of Password must be > 4 and < 16"})
	readonly password: string
}
