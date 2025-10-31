import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { RecadoCreateDTO } from './dto/RecadoCreateDTO';
import { RecadoUpdateDTO } from './dto/RecadoUpdateDTO';

@Injectable()
export class RecadosService {
  private lastId: number = 1;
  private recados: Recado[] = [
    {
      id: 1,
      text: 'esse é um recado de teste',
      from: 'Joana',
      to: 'joao',
      readed: false,
      date: new Date(),
    },
  ];

  findAll(): Recado[] {
    return this.recados;
  }

  findOne(id: string): Recado {
    const recado = this.recados.find(recado => recado.id === +id);

    if (recado) return recado;

    throw new NotFoundException('Recado não encontrado');
  }

  create(createRecadoDTO: RecadoCreateDTO): Recado {
    this.lastId++;
    const id = this.lastId;
    const newRecado = {
      id,
      ...createRecadoDTO,
      readed: false,
      date: new Date(),
    };
    this.recados.push(newRecado);
    return newRecado;
  }

  update(id: string, recadoUpdateDTO: RecadoUpdateDTO): Recado {
    const recadoIndex = this.recados.findIndex(recado => recado.id === +id);
    if (recadoIndex === -1) {
      throw new NotFoundException('Recado não encontrado');
    }
    const updatedRecado = {
      ...this.recados[recadoIndex],
      ...recadoUpdateDTO,
    };

    this.recados[recadoIndex] = updatedRecado;

    return updatedRecado;
  }

  remove(id: string): Recado {
    const recadoIndex = this.recados.findIndex(recado => recado.id === +id);
    if (recadoIndex === -1) {
      throw new NotFoundException('Recado não encontrado');
    }
    const removedRecado = this.recados[recadoIndex];
    this.recados.splice(recadoIndex, 1);

    return removedRecado;
  }
}
