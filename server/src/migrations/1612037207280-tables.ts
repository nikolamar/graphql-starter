import { MigrationInterface, QueryRunner } from "typeorm";

export class tables1612037207280 implements MigrationInterface {
  name = "tables1612037207280";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "gender" character varying NOT NULL, "photo" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "profileId" integer, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "votes" ("value" integer NOT NULL, "userId" integer NOT NULL, "reviewId" integer NOT NULL, CONSTRAINT "PK_93043c6967a67856b9589346331" PRIMARY KEY ("userId", "reviewId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "message" text NOT NULL, "likes" integer NOT NULL DEFAULT '0', "dislikes" integer NOT NULL DEFAULT '0', "hotelId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "hotels" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "image" character varying NOT NULL, "description" text NOT NULL, "location" character varying NOT NULL, "stars" integer NOT NULL DEFAULT '0', "price" integer NOT NULL DEFAULT '0', "userId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2bb06797684115a1ba7c705fc7b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "votes" ADD CONSTRAINT "FK_5169384e31d0989699a318f3ca4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "votes" ADD CONSTRAINT "FK_797be9842556f00436f8fc5d5fd" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" ADD CONSTRAINT "FK_a7cc013c66ce20ff12a192c6222" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "hotels" ADD CONSTRAINT "FK_d993201c8aab1a4681dbd53286b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hotels" DROP CONSTRAINT "FK_d993201c8aab1a4681dbd53286b"`
    );
    await queryRunner.query(
      `ALTER TABLE "reviews" DROP CONSTRAINT "FK_a7cc013c66ce20ff12a192c6222"`
    );
    await queryRunner.query(
      `ALTER TABLE "votes" DROP CONSTRAINT "FK_797be9842556f00436f8fc5d5fd"`
    );
    await queryRunner.query(
      `ALTER TABLE "votes" DROP CONSTRAINT "FK_5169384e31d0989699a318f3ca4"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`
    );
    await queryRunner.query(`DROP TABLE "hotels"`);
    await queryRunner.query(`DROP TABLE "reviews"`);
    await queryRunner.query(`DROP TABLE "votes"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "profiles"`);
  }
}
