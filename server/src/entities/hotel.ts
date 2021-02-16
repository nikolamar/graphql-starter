import { Field, GraphQLTimestamp, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Review } from "./review";
import { User } from "./user";
import { Image } from "./image";

@ObjectType()
@Entity({ name: "hotels" })
export class Hotel extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  city!: string;

  @Field()
  @Column()
  country!: string;

  @Field()
  @Column({ type: "text" })
  description!: string;

  @Field()
  @Column()
  location!: string;

  @Field()
  @Column({ type: "int", default: 0 })
  stars: number;

  @Field()
  @Column({ type: "int", default: 0 })
  price!: number;

  // hotel.userId = user.id
  @Field()
  @Column({ nullable: true })
  userId: number;

  // [Hotel] -> User
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.hotels)
  user: User;

  // Hotel -> [Reviews]
  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.hotel, { cascade: true })
  reviews: Review[];

  // Hotel -> [Image]
  @OneToMany(() => Image, (image) => image.hotel, { cascade: true })
  images: Image[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageId: number;

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn()
  image: Image;

  @Field(() => GraphQLTimestamp)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLTimestamp)
  @UpdateDateColumn()
  updatedAt: Date;
}
