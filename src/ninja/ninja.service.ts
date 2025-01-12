import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

export interface Ninja {
  id: number;
  name: string;
  weapon: 'stars' | 'nunchucks';
}

@Injectable()
export class NinjaService {
  private ninjas: Ninja[] = [
    { id: 0, name: 'ninjaA', weapon: 'stars' },
    { id: 1, name: 'ninjaB', weapon: 'nunchucks' },
  ];

  getNinjas(weapon?: 'stars' | 'nunchucks'): Ninja[] {
    if (weapon) {
      return this.ninjas.filter((ninja: Ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  getNinja(id: number): Ninja {
    const ninja: Ninja = this.ninjas.find((ninja: Ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('Ninja not found.');
    }
    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto): Ninja {
    const newNinja: Ninja = {
      ...createNinjaDto,
    };
    this.ninjas.push(createNinjaDto);
    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto): Ninja {
    this.ninjas = this.ninjas.map((ninja: Ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...updateNinjaDto };
      }
      return ninja;
    });
    return this.getNinja(id);
  }

  removeNinja(id: number): Ninja {
    const toBeRemoved: Ninja = this.getNinja(id);
    this.ninjas = this.ninjas.filter((ninja: Ninja) => ninja.id !== id);
    return toBeRemoved;
  }
}
