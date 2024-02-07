import {Postgres} from "../../lib/pg";

interface IProductEntity {
    name: string;
    price: number;
    count: number;
}

export class ProductRepository extends Postgres{
    async findName<T>(name: string): Promise<T> {
        return await this.fetch("select * from products where name = $1", name)
    }

    async getAll<T>(): Promise<T[]> {
        return await this.fetch("select * from products")
    }


    async getOneById<T>(id: number): Promise<T[]> {
        return await this.fetch("select * from products where id = $1", id)
    }

    async insert<T>(product: IProductEntity): Promise<T[]> {
        return await this.fetch("insert into products(name, price, count) values($1, $2, $3) returning *", product.name, product.price, product.count)
    }

    async update<T>(id: number, product: IProductEntity): Promise<T[]> {
        return await this.fetch("update products set name = $1, price = $2, count = $3 where id = $4 returning *", product.name, product.price, product.count, id)
    }

    async delete<T>(id: number): Promise<T[]> {
        return await this.fetch("delete from products where id = $1 returning *", id)
    }

}