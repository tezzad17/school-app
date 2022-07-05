import { IsEmail } from 'class-validator';
import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';
import { Assignment } from './Assignment';

@ObjectType()
export class Professor {
    @Field((type) => ID)
    id: string

    @Field()
    @IsEmail()
    email: string

    @Field((type) => String)
    name: string 

    @Field((type) => [Assignment])
    assignments?: Assignment[]

}