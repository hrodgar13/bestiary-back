import { Injectable } from '@nestjs/common';
import {Entity, Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable({})
export class AdditionMeasureService<Entity> {
  constructor(
      @InjectRepository(Entity) private repository: Repository<Entity>
  ) {
  }

  async createMeasure(body: any) {
    return this.repository.create(body)
  }

}
