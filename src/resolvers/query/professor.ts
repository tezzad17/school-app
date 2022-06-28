import 'reflect-metadata'
import {
    Resolver,
    Query,
    Ctx,
    InputType,
    Field,
    Arg,
} from 'type-graphql'
import { Context } from '../../config/context'
import { Professor } from '../../db/entities/Professor'

@Resolver(Professor)
export class ProfessorQuery {

    @Query(() => [Professor])
    async allProfessors(@Ctx() ctx: Context) {
        return ctx.prisma.professor.findMany()
    }

    @Query(() => Professor)
    async getProfessorByEmail(@Ctx() ctx: Context, @Arg("email") email: string) {

        return ctx.prisma.professor.findUnique({
            where: {
                email: email
            }
        });

    }


    @Query(() => String)
    async scoreAverageByEmail(@Ctx() ctx: Context, @Arg("email") userId: string) {
        const professorFound = ctx.prisma.professor.findUnique({
            where: {
                id: userId
            }
        });

        //professorFound.assignments.
        return ctx.prisma.professor.findUnique({
            where: {
                id: userId
            }
        });

    }

}