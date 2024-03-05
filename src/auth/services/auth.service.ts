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



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {
    }

    async createUser(body: CreateUserDto) {
        const user = await this.userRepository.create(body)

        const userEmailCheck = await this.userRepository.findOne({where: {email: body.email}})

        if(userEmailCheck) {
            throw new HttpException('Email_in_use', HttpStatus.CONFLICT)
        }

        if (body.email === this.configService.get('ADMIN_EMAIL')) {
            user.role = RolesEnum.ADMIN
        } else {
            user.role = RolesEnum.USER
        }

        user.password = await bcrypt.hash(body.password, 10)

        await this.userRepository.save(user)

        return this.login({email: user.email, password: user.password})
    }

    async login(body: LoginDto) {
        const user = await this.userRepository.findOne({where: {email: body.email}})

        if(!user) {
            throw new HttpException('User_not_found', HttpStatus.NOT_FOUND)
        }

        const payload = {email: user.email, sub: user.id, role: user.role}

        return {
            access_token: `Bearer ${this.jwtService.sign(payload)}`
        }

    }

    async validateUser(email: string, pass: string) {
        const user: User = await this.userRepository.findOne({where: {email}})

        if(!user) {
            throw new HttpException('User_not_found', HttpStatus.NOT_FOUND)
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password)

        if(!isPasswordValid) {
            throw new HttpException('Password_invalid', HttpStatus.CONFLICT)
        }

        const { password, ...result } = user;
        return result;
    }

    async setRoleAsAdmin(userId: number) {
        const user = await this.userRepository.findOne({where: {id: userId}})

        if(user.role !== RolesEnum.USER) {
         throw new HttpException('User already Admin', HttpStatus.CONFLICT)
        }

        user.role = RolesEnum.ADMIN

        await this.userRepository.update(userId, user)

        return {message: 'User set as admin'}
    }
}
