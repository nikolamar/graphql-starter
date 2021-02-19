import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Hotel } from "./hotel";
import { Profile } from "./profile";
import { Vote } from "./vote";
import { Image } from "./image";
import { USER } from "../constants";
import { ImageResponse } from "../objects";

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ default : 0 })
  count: number;

  @Field()
  @Column({ default : USER })
  type: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profileId: number;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @Column()
  password!: string;

  // User -> [Image]
  @OneToMany(() => Image, (image) => image.user, { cascade: true })
  images: Image[];

  // User -> [Hotel]
  @OneToMany(() => Hotel, (hotel) => hotel.user, { cascade: true })
  hotels: Hotel[];

  // User -> [Vote]
  @OneToMany(() => Vote, (vote) => vote.user, { cascade: true })
  votes: Vote[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageId: number;

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn()
  image: ImageResponse;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ precision: 3 })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ precision: 3 })
  updatedAt: Date;
}
