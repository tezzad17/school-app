import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { type } from 'os';
import { Student } from './Student';

@ObjectType()
export class Course {
    @Field((type) => ID)
    id: string

    @Field((type) => String)
    name: string 

    @Field((type) => String)
    period: string 

    @Field((type) => Student)
    students?: Student[]

}