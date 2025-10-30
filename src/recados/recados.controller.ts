import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { Recado } from './entities/recado.entity';
import { RecadoUpdateDTO } from './dto/RecadoUpdateDTO';
import { RecadoCreateDTO } from './dto/RecadoCreateDTO';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadoService: RecadosService) {}

  @Get()
  // @HttpCode(HttpStatus.OK) so we now it exists, by default is 200
  findAll(): Recado[] {
    return this.recadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Recado {
    return this.recadoService.findOne(id);
  }

  @Post()
  create(@Body() recadoCreateDTO: RecadoCreateDTO): Recado {
    return this.recadoService.create(recadoCreateDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() recadoUpdateDTO: RecadoUpdateDTO,
  ): Recado {
    return this.recadoService.update(id, recadoUpdateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Recado {
    return this.recadoService.remove(id);
  }
}
