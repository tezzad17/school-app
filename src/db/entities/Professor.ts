import 'reflect-metadata';
import { ObjectType, Field, ID, Float } from 'type-graphql';
import { IsEmail } from 'class-validator';
import { type } from 'os';
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