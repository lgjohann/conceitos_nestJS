import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { RecadoCreateDTO } from './dto/RecadoCreateDTO';
import { RecadoUpdateDTO } from './dto/RecadoUpdateDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

  async findAll(): Promise<Recado[]> {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findOne(id: number): Promise<Recado> {
    const recado = await this.recadoRepository.findOne({
      where: {
        // id: id, // pode ser só com uma linha se atributos iguais
        id,
      },
    });

    if (recado) return recado;

    throw new NotFoundException('Recado não encontrado');
  }

  async create(createRecadoDTO: RecadoCreateDTO): Promise<Recado> {
    const newRecado = {
      ...createRecadoDTO,
      readed: false,
      date: new Date(),
      updatedAt: new Date(),
    };
    const recado = this.recadoRepository.create(newRecado);
    return await this.recadoRepository.save(recado);
  }

  async update(id: number, recadoUpdateDTO: RecadoUpdateDTO): Promise<Recado> {
    const recado = await this.recadoRepository.preload({
      id,
      ...recadoUpdateDTO,
    });
    if (!recado) {
      throw new NotFoundException('recado não encontrado');
    }
    return this.recadoRepository.save(recado);
  }

  async remove(id: number): Promise<Recado> {
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });
    if (!recado) {
      throw new NotFoundException('recado não encontrado');
    }
    return this.recadoRepository.remove(recado);
  }
}
