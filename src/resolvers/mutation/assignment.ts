import 'reflect-metadata'
import {
    Resolver,
    Query,
    Ctx,
    InputType,
    Field,
    Mutation,
    Arg,
} from 'type-graphql'
import { Context } from '../../config/context'
import { Student } from '../../db/entities/Student';
import { Assignment } from '../../db/entities/Assignment';
import { type } from 'os';
import { Course } from '../../db/entities/Course';


@InputType()
class AssignmentCreateInput implements Partial<Assignment> {

    @Field()
    name: string;

    // @Field((type) => [Assignment])
    // assignment: Assignment[]


}


@Resolver(Assignment)
export class AssignmentMutation {

    @Mutation((returns) => Assignment)
    async createAssignment(
        @Arg('data') data: AssignmentCreateInput,
        @Ctx() ctx: Context
    ): Promise<Assignment> {
        return ctx.prisma.assignment.create({
            data: {
                name: data.name
            }
        })
    }

}