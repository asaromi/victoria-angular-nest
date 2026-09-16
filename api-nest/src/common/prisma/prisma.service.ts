import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL') || process.env.DATABASE_URL;
    super(
      databaseUrl
        ? {
            datasources: {
              db: {
                url: databaseUrl,
              },
            },
          }
        : undefined,
    );
  }

  async onModuleInit() {
    try {
      console.log('Connecting to the database...');

      await this.$connect();

      console.log('Database connected successfully');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
