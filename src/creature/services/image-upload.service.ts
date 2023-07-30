import {Injectable} from "@nestjs/common";
import {CreateImagesDto} from "../dtos/images/create-images.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Images} from "../entities/images.entity";
import {Creature} from "../entities/creature.entity";

@Injectable()
export class ImageUploadService {

    constructor(
        @InjectRepository(Images) private repo: Repository<Images>,
        @InjectRepository(Creature) private creatureRepo: Repository<Creature>
    ) {
    }


    addImage(data: CreateImagesDto) {
        // console.log(data)
        // const image = this.repo.create(data)
        // // image.creature = data.creature_id
        // return this.repo.save(image)
    }
}