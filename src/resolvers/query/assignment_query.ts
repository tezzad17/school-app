import 'reflect-metadata'
import {
    Resolver,
    Query,
    Ctx,
    InputType,
    Field,
    FieldResolver,
    Root,
    Arg,
} from 'type-graphql'
import { Context } from '../../config/context'
import { Assignment } from '../../db/entities/Assignment'
import { Score } from '../../db/entities/Score'

@Resolver(Assignment)
export class AssignmentQuery {


    @FieldResolver()
    async scoreAverage(@Root() assignment: Assignment, @Ctx() ctx: Context) {
        const assignmentObject = await ctx.prisma.assignment.findUnique({ 
            where: { id: assignment.id},
            include: { scores: true }
        });

        if (assignmentObject == null){
            throw new Assignment();
        }

        //console.log(studentObject.scores);
        const sumScores = assignmentObject.scores.reduce((a: number, b: Score) => a + b.score, 0)
        const scoreAverage = assignmentObject.scores.length ? sumScores / assignmentObject.scores.length : null;

        return scoreAverage;

    }

    @Query(() => [Assignment])
    async getAssignments(@Ctx() ctx: Context) {
        return ctx.prisma.assignment.findMany({
            include: { course: true, students: true, professor: true}
        })
    }

    @Query(() => Assignment)
    async getAssignmentById(@Ctx() ctx: Context, @Arg("name") id: string) {

        return ctx.prisma.assignment.findUnique({
            where: {
                id: id
            }
        });

    }

}