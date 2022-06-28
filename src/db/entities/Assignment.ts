import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { type } from 'os';
import { Student } from './Student';
import { Course } from './Course';
import { Professor } from './Professor';

@ObjectType()
export class Assignment {
    @Field((type) => ID)
    id: string

    @Field((type) => String)
    name: String 

    @Field((type) => Course)
    course?: Course 

    @Field((type) => Professor)
    professor?: Professor 

    @Field((type) => Student)
    students?: Student[]

}