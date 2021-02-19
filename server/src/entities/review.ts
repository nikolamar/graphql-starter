import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hotel } from "./hotel";
import { Vote } from "./vote";

@ObjectType()
@Entity({ name: "reviews" })
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "text" })
  message!: string;

  @Field()
  @Column({ default: 0 })
  likes!: number;

  @Field()
  @Column({ default: 0 })
  dislikes!: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null;

  // Review -> [Vote]
  // @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.review, { cascade: true })
  votes: Vote[];

  // review.hotelId = hotel.id
  @Field()
  @Column()
  hotelId: number;

  // [Review] -> Hotel
  @ManyToOne(() => Hotel, (hotel) => hotel.reviews, { onDelete: "CASCADE" })
  hotel: Hotel;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ precision: 3 })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ precision: 3 })
  updatedAt: Date;
}
