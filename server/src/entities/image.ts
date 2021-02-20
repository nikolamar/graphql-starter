import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn, Entity,
  ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { Hotel } from "./hotel";
import { Profile } from "./profile";

@ObjectType()
@Entity({ name: "images" })
export class Image extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  url: string;

  /**
   * image.profileId = profile.id
   */
  @Field({ nullable: true })
  @Column({ nullable: true })
  profileId: number;

  /**
   * [Image] -> Profile
   * field profile has profileId key
   * in this entity
   */
  @Field(() => Profile)
  @ManyToOne(() => Profile, (profile) => profile.images, { onDelete: "CASCADE" })
  profile: Profile;

  /**
   * image.hotelId = hotel.id
   */
  @Field({ nullable: true })
  @Column({ nullable: true })
  hotelId: number;

  /**
   * [Image] -> Hotel
   * field hotel has hotelId key
   * in this entity
   */
  @Field(() => Hotel)
  @ManyToOne(() => Hotel, (hotel) => hotel.images, { onDelete: "CASCADE" })
  hotel: Hotel;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ precision: 3 })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ precision: 3 })
  updatedAt: Date;
}
