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
import { Assignment } from '../../db/entities/Assignment'
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
    async getProfessors(@Ctx() ctx: Context) {
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

}