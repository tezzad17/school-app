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

    @Field((type) => Course, { nullable: true })
    course?: Course 

    @Field((type) => Professor, { nullable: true })
    professor?: Professor 

    @Field((type) => [Student], { nullable: true })
    students?: Student[]

}