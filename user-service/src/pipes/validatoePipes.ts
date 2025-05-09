import {ArgumentMetadata, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {Exceptions} from "./exceptions";

export class ValidatorPipes implements PipeTransform<any>{
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value)
        const errors = await validate(obj)
        if(errors.length){
            let message = errors.map(e => {
                return `${e.property} - ${Object.values(e.constraints).join(', ')}`
            })
            throw new Exceptions(message)
        }
        return value
    }

}