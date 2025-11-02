import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    RecadosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'db_nest',
      autoLoadEntities: true,
      synchronize: true, // DESATIVAR EM PRODUÇÃO
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
