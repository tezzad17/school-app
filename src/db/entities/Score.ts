import 'reflect-metadata';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { type } from 'os';
import { Student } from './Student';
import { Assignment } from './Assignment';

@ObjectType()
export class Score {
    @Field((type) => ID)
    id: string

    @Field((type) => Number)
    score: number 

    @Field((type) => Assignment)
    assignment?: Assignment 

    @Field((type) => Student)
    student?: Student

}