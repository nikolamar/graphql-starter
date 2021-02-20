import { ImageResponse } from "../objects";
import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Image } from "../entities/image";

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

  /**
   * profile.imageId = image.id
   */
  @Field({ nullable: true })
  @Column({ nullable: true })
  imageId: number;

  /**
   * field image has foreign key imageId
   * in this entity
   */
  @OneToOne(() => Image, { nullable: true })
  @JoinColumn()
  image: ImageResponse;

  /**
   * User -> [Image]
   * field images has profileId key in image entity
   */
  @OneToMany(() => Image, (image) => image.profile, { cascade: true })
  images: Image[];

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ precision: 3 })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ precision: 3 })
  updatedAt: Date;
}
