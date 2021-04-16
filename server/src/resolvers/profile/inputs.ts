import { Field, InputType } from "type-graphql";

@InputType()
export class ProfileInput {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  birthDate: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  image: string;
}
