import { Field, GraphQLTimestamp, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn, Entity,
  ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { Hotel } from "./hotel";
import { User } from "./user";

@ObjectType()
@Entity({ name: "images" })
export class Image extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  url: string;

  // image.userId = user.id
  @Field({ nullable: true })
  @Column({ nullable: true })
  userId: number;

  // [Image] -> User
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.images)
  user: User;

  // image.hotelId = hotel.id
  @Field({ nullable: true })
  @Column({ nullable: true })
  hotelId: number;

  // [Image] -> Hotel
  @Field(() => Hotel)
  @ManyToOne(() => Hotel, (hotel) => hotel.images, { onDelete: "CASCADE" })
  hotel: Hotel;

  @Field(() => GraphQLTimestamp)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLTimestamp)
  @UpdateDateColumn()
  updatedAt: Date;
}
