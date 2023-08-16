import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfiguration = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host:
    process.env.STAGE === 'dev'
      ? configService.get('DB_HOST')
      : process.env.DB_HOST,
  port:
    process.env.STAGE === 'dev'
      ? configService.get('DB_PORT')
      : Number(process.env.DB_PORT),
  username:
    process.env.STAGE === 'dev'
      ? configService.get('DB_USERNAME')
      : process.env.DB_USERNAME,
  password:
    process.env.STAGE === 'dev'
      ? configService.get('DB_PASSWORD')
      : process.env.DB_PASSWORD,
  database:
    process.env.STAGE === 'dev'
      ? configService.get('DB_DATABASE')
      : process.env.DB_DATABASE,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migration/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    migrationsDir: 'migration',
  },
});
