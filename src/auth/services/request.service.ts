import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "../dtos/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {RolesEnum} from "../roles/roles.enum";
import {LoginDto} from "../dtos/login.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {CreateRequestDto} from "../dtos/create-request.dto";
import {Request} from "../entities/messages.entity";
import {MetaDto} from "../../shared/dtos/meta.dto";
import {RequestMetaDto} from "../dtos/request.meta.dto";


@Injectable()
export class RequestService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Request) private requestRepository: Repository<Request>,
    ) {
    }

    async createRequest(userId: number, body: CreateRequestDto) {
        const user = await this.userRepository.findOne({where: {id: userId}})

        const message = this.requestRepository.create()

        message.dateOfCreation = new Date()
        message.text = body.text
        message.isRead = false
        message.user = user
        message.isAdminRequest = body.isAdminRequest
        
        await this.requestRepository.save(message)

        return {message: 'Request sent'}
    }

    async markAsRead(requestId: number) {
        await this.requestRepository.update(requestId, {isRead: true})
        return {message: 'Set as read'}
    }

    async getAmountOfUnread(): Promise<MetaDto> {
        const total = await this.requestRepository.count({where: {isRead: false}})

        return {total}
    }

    async getListOfMessages(perPage: number, onlyAdmin: string): Promise<RequestMetaDto> {

        const onlyAdminBool = onlyAdmin.toLowerCase() === 'true'

        let query = this.requestRepository.createQueryBuilder('request')
            .leftJoinAndSelect('request.user', 'user')

        if(onlyAdminBool) {
            query = query.andWhere('request.isAdminRequest IS TRUE')
        }

        query = query.orderBy('request.isRead', 'ASC')
            .take(perPage)

        const [data, total] = await query.getManyAndCount()

        return {data, meta: {total}}
    }

    async deleteMessage(id: number): Promise<{ message: string }> {
        await this.requestRepository.delete(id)

        return {message: 'Request deleted'}
    }
}
