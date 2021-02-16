import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Review } from "./review";
import { User } from "./user";

/**
 * m to n
 * users <-> hotels
 * users -> (join table) <- hotels
 */
@Entity({ name: "votes" })
export class Vote extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.votes, { onDelete: "CASCADE" })
  user: User;

  @PrimaryColumn()
  reviewId: number;

  @ManyToOne(() => Review, (review) => review.votes, { onDelete: "CASCADE" })
  review: Review;
}
