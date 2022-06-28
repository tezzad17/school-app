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
import { Assignment } from '../../db/entities/Assignment';
import { Professor } from '../../db/entities/Professor';


@InputType()
class ProfessorCreateInput implements Partial<Professor> {
    @Field()
    email: string;

    @Field()
    name: string;
}

@InputType()
class ProfessorCreateInputAssignment implements Partial<Professor> {
    @Field()
    email: string;

    @Field()
    name: string;

    @Field()
    assignmentName: string
}




@Resolver(Professor)
export class ProfessorMutation {

    @Mutation((returns) => Professor)
    async signupProfessor(
        @Arg('data') data: ProfessorCreateInput,
        @Ctx() ctx: Context
    ): Promise<Professor> {
        return ctx.prisma.professor.create({
            data: {
                email: data.email,
                name: data.name
            }
        })
    }

    @Mutation((returns) => Professor)
    async signupProfessorAssignment(
        @Arg('data') data: ProfessorCreateInputAssignment,
        @Ctx() ctx: Context
    ): Promise<Professor> {

        const result = ctx.prisma.assignment.create({
            data:{
                name: data.assignmentName
            }
        })

        return ctx.prisma.professor.create({
            data: {
                email: data.email,
                name: data.name,
                assignments: {
                    
                    connect: [
                        {
                            id: (await result).id
                        }
                          
                    ]
                }

            },
            include: {
                assignments: true
              }
        })
    }


}