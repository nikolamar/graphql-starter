import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";
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
  middleName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  birthDate: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ precision: 3 })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ precision: 3 })
  updatedAt: Date;
}
