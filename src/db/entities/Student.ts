import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail } from 'class-validator';
import { type } from 'os';
import { Course } from './Course';
import { Assignment } from './Assignment';

@ObjectType()
export class Student {
    @Field((type) => ID)
    id: string

    @Field()
    @IsEmail()
    email: string

    @Field((type) => String)
    name: string 

    @Field((type) => Course)
    course?: Course

    @Field((type) => [Assignment])
    assignment?: Assignment[] 

}