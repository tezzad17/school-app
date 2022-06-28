import { Assignment } from '@prisma/client'
import 'reflect-metadata'
import {
    Resolver,
    Query,
    Ctx,
    InputType,
    Field,
    Arg,
    FieldResolver,
    Root,
} from 'type-graphql'
import { Context } from '../../config/context'
import { Professor } from '../../db/entities/Professor'

@Resolver(Professor)
export class ProfessorQuery {

    @FieldResolver()
    async assignments(@Root() professor: Professor, @Ctx() ctx: Context): Promise<Assignment[]> {
        return ctx.prisma.professor.findUnique({
            where: {
                email: professor.email
            }
        }).assignments()
    }


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

        return ctx.prisma.professor.findUnique({
            where: {
                id: userId
            }
        });

    }

}