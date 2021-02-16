import { Field, GraphQLTimestamp, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "profiles" })
export class Profile extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field(() => GraphQLTimestamp)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLTimestamp)
  @UpdateDateColumn()
  updatedAt: Date;
}
