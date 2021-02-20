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
import { USER } from "../constants";

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

  @Column()
  password!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profileId: number;

  @OneToOne(() => Profile, { onDelete: "CASCADE" })
  @JoinColumn()
  profile: Profile;

  /**
   * User -> [Hotel]
   * field hotels has userId key in hotel entity
   */
  @OneToMany(() => Hotel, (hotel) => hotel.user, { cascade: true })
  hotels: Hotel[];

  /**
   * User -> [Vote]
   * field votes has userId key in vote entity
   */
  @OneToMany(() => Vote, (vote) => vote.user, { cascade: true })
  votes: Vote[];

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ precision: 3 })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ precision: 3 })
  updatedAt: Date;
}
