import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfiguration = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  ...(process.env.STAGE === 'dev' && {
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE') as string,
  }),
  ...(process.env.STAGE === 'prod' && {
    url: process.env.DB_URL,
  }),
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migration/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  cli: {
    migrationsDir: 'migration',
  },
});
