import {ApiProperty} from "@nestjs/swagger";

export class TokenDto{
	@ApiProperty({example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"})
	readonly token: string
}