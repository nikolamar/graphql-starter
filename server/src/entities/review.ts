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
import { User } from "./user";
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

  /**
   * Review -> [Vote]
   * field votes has reviewId key in vote entity
   */
  @OneToMany(() => Vote, (vote) => vote.review, { cascade: true })
  votes: Vote[];

  /**
   * review.hotelId = hotel.id
   */
  @Field()
  @Column()
  hotelId: number;

  /**
   * [Review] -> Hotel
   * field hotel has hotelId key
   * in this entity
   */
  @ManyToOne(() => Hotel, (hotel) => hotel.reviews, { onDelete: "CASCADE" })
  hotel: Hotel;

  /**
   * review.userId = user.id
   */
  @Field()
  @Column()
  userId: number;

  /**
   * [Review] -> Hotel
   * field hotel has hotelId key
   * in this entity
   */
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews, { onDelete: "CASCADE" })
  user: User;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ precision: 3 })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ precision: 3 })
  updatedAt: Date;
}
