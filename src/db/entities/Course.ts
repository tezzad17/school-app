import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';
import { Assignment } from './Assignment';

@ObjectType()
export class Course {
    @Field((type) => ID)
    id: string

    @Field((type) => String)
    name: string 

    @Field((type) => String)
    period: string 

    @Field((type) => [Assignment], { nullable: true })
    assignments?: Assignment[]

}