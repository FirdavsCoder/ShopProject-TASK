import {UserRepository} from "./user.Repository";
import {ResData} from "../../common/ResData";
import {UserEntity} from "./Entity/user.Entity";
import {BadRequestException} from "../../common/exception/exception";
import {hashPassword} from "../../lib/bcrypt";
import {jwtSign} from "../../lib/jwt";


interface IUser {
    id: number;
    login: string;
    password: string;
    balance: number;
}

interface IUserBody {
    login: string;
    password: string;
    balance: number;
}

export class UserService {
    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository()
    }

    async getAll(): Promise<ResData> {
        const foundUsers: IUser[] = await this.userRepository.getAll<IUser>();
        return new ResData("All users", 200, foundUsers);
    }

    async getOneById(id: number): Promise<ResData> {
        const foundUser: IUser[] = await this.userRepository.getOneById<IUser>(id);
        if (!foundUser) {
            throw new BadRequestException("User not found")
        }
        return new ResData("User found", 200, foundUser);
    }

    async insert(user: IUserBody): Promise<ResData> {
        const foundUser: IUser = await this.userRepository.findLogin(user.login);
        if (foundUser) {
            throw new BadRequestException("User already exists")
        }
        const hashedPassword = hashPassword(user.password);
        const newUser = new UserEntity(user.login, hashedPassword, user.balance);
        const insertedUser = await this.userRepository.insert<IUser>(newUser);
        const token = jwtSign(insertedUser.id)
        return new ResData("User inserted", 201, {insertedUser, token});
    }

    async update(id: number, user: IUserBody): Promise<ResData> {
        const foundUser = await this.userRepository.getOneById<IUser>(id);
        if (!foundUser) {
            throw new BadRequestException("User not found")
        }
        const hashedPassword = hashPassword(user.password);
        const updatedUser = new UserEntity(user.login, hashedPassword, user.balance);


        const updatedUserRes = await this.userRepository.update<IUser>(id, updatedUser);
        return new ResData("User updated", 200, updatedUserRes);
    }

    async delete(id: number): Promise<ResData> {
        const foundUser = await this.userRepository.getOneById<IUser>(id);
        if (!foundUser) {
            throw new BadRequestException("User not found")
        }
        const deletedUser = await this.userRepository.delete<IUser>(id);
        return new ResData("User deleted", 200, deletedUser);
    }


}

