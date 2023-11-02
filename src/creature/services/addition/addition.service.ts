import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AdditionService {
  async getAll(repo: Repository<any>, route: string) {
    return await repo.find({ relations: ['attrName'] });
  }

  async getOne(id: number, repo: Repository<any>) {
    return await repo.findOne({ where: { id } });
  }

  async create(body: any, repo: Repository<any>) {
    return await repo.save(body);
  }

  async update(id: number, body, repo: Repository<any>) {
    return await repo.update(id, body);
  }

  async delete(id: number, repo: Repository<any>) {
    return await repo.delete(id);
  }
}
