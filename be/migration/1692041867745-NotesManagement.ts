import {MigrationInterface, QueryRunner} from "typeorm";

export class NotesManagement1692041867745 implements MigrationInterface {
    name = 'NotesManagement1692041867745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "text" character varying NOT NULL, "color" character varying NOT NULL DEFAULT 'white', "userId" uuid, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sharedNote" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorUserId" uuid, "sharedUserId" uuid, "noteId" uuid, CONSTRAINT "PK_3c4a752787a86ba47e904447c9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_829532ff766505ad7c71592c6a5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sharedNote" ADD CONSTRAINT "FK_9405b68a47f5ca721b1e482e2f0" FOREIGN KEY ("creatorUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sharedNote" ADD CONSTRAINT "FK_49203bd35ce106ece3dbdf90223" FOREIGN KEY ("sharedUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sharedNote" ADD CONSTRAINT "FK_4ab2bc2f120cb2dd800c81ae77c" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sharedNote" DROP CONSTRAINT "FK_4ab2bc2f120cb2dd800c81ae77c"`);
        await queryRunner.query(`ALTER TABLE "sharedNote" DROP CONSTRAINT "FK_49203bd35ce106ece3dbdf90223"`);
        await queryRunner.query(`ALTER TABLE "sharedNote" DROP CONSTRAINT "FK_9405b68a47f5ca721b1e482e2f0"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_829532ff766505ad7c71592c6a5"`);
        await queryRunner.query(`DROP TABLE "sharedNote"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
