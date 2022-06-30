import 'reflect-metadata'
import {
    Resolver,
    FieldResolver,
    Root,
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
import { Score } from '../../db/entities/Score';


@InputType()
class ScoreCreateInput implements Partial<Score> {

    @Field()
    score: number 
    
    @Field()
    student_email: string;

    @Field()
    assignment_name: string;
}



@Resolver(Score)
export class ScoreMutation {

    // @FieldResolver()
    // async assignments(@Root() course: Score, @Ctx() ctx: Context): Promise<Assignment[]> {
    //     return ctx.prisma.course.findUnique({
    //         where: {
    //             name_period : { name: course.name, period: course.period }
    //         }
    //     }).assignments()
    // }

    // @Mutation((returns) => Score)
    // async createCourse(
    //     @Arg('data') data: ScoreCreateInput,
    //     @Ctx() ctx: Context
    // ): Promise<Score> {
    //     return ctx.prisma.score.create({
    //         data: {
    //             score: data.score
    //             name: data.name,
    //             period: data.period
    //         }
    //     })
    // }

    // @Mutation((returns) => Score)
    // async upsertScoreAssignment(
    //     @Arg('data') data: ScoreCreateInput,
    //     @Ctx() ctx: Context
    // ): Promise<Score> {

    //     return ctx.prisma.score.upsert({
    //         where: {
    //             studentId_assignmentId: {assignmentId: }
    //             studentEmail_assignmentName: { : data.assignment_name, studentEmail: data.student_email}                
    //         },
    //         create: {
    //             score: data.score,
    //             student: {
    //                 connect: { email: data.student_email }
    //             },
    //             assignment: {
    //                 connect: { name: data.assignment_name }
    //             }
    //         },
    //         update: {
    //             score: data.score,
    //             student: {
    //                 connect: { email: data.student_email }
    //             },
    //             assignment: {
    //                 connect: { name: data.assignment_name }
    //             }
    //         }
    //     })
    // }
}