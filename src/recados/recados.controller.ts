import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  async findAll(): Promise<Recado[]> {
    const recados = await this.recadoService.findAll();
    return recados;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Recado> {
    const recado = await this.recadoService.findOne(id);
    return recado;
  }

  @Post()
  async create(@Body() recadoCreateDTO: RecadoCreateDTO): Promise<Recado> {
    const recado = await this.recadoService.create(recadoCreateDTO);
    return recado;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() recadoUpdateDTO: RecadoUpdateDTO,
  ): Promise<Recado> {
    const recado = await this.recadoService.update(id, recadoUpdateDTO);
    return recado;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Recado> {
    const recado = await this.recadoService.remove(id);
    return recado;
  }
}
