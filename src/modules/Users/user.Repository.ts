import {Postgres} from "../../lib/pg";

interface IUserEntity {
    login: string;
    password: string;
    balance: number;
}

export class UserRepository extends Postgres{
    async findLogin<T>(login: string): Promise<T> {
        return await this.fetch("select * from users where login = $1", login)
    }

    async getAll<T>(): Promise<T[]> {
        return await this.fetchAll("select * from users")
    }

    async getOneById<T>(id: number): Promise<any> {
        return await this.fetch("select * from users where id = $1", id)
    }

    async insert<T>(user: IUserEntity): Promise<T> {
        return await this.fetch("insert into users(login, password, balance) values($1, $2, $3) returning *", user.login, user.password, user.balance)
    }

    async update<T>(id: number, user: IUserEntity): Promise<T> {
        return await this.fetch("update users set login = $1, password = $2, balance = $3 where id = $4 returning *", user.login, user.password, user.balance, id)
    }

    async delete<T>(id: number): Promise<T> {
        return await this.fetch("delete from users where id = $1 returning *", id)
    }

    async updateBalance<T>(id: number, balance: number): Promise<T> {
        return await this.fetch("update users set balance = $1 where id = $2 returning *", balance, id)
    }

    async getBalance<T>(id: number): Promise<T> {
        return await this.fetch("select balance from users where id = $1", id)
    }


}