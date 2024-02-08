import {Postgres} from "../../lib/pg";

interface ITransactionEntity {
    user_id: number;
    product_id: number;
    product_count: number;
    total_price: number;
}


export class TransactionRepository extends Postgres {
    async insert<T>(transaction: ITransactionEntity): Promise<T> {
        const pool = this.getPool;
        const client = await pool.connect();
        try{
            await client.query("BEGIN");
            const {user_id, product_id, product_count, total_price} = transaction;

            const query = "INSERT INTO transactions (user_id, product_id, product_count, total_price) VALUES ($1, $2, $3, $4) RETURNING *";
            const values = [user_id, product_id, product_count, total_price];

            const {rows} = await client.query(query, values);

            // CHECK USER BALANCE
            const userCheckQuery = "SELECT * FROM users WHERE id = $1";
            const resultUserData = await client.query(userCheckQuery, [rows[0].user_id]);
            if (resultUserData.rows[0].balance < rows[0].total_price) {
                throw new Error("Not enough balance");
            }


            const queryUserUpdate = "UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING *";
            const updatedUser = await client.query(queryUserUpdate, [rows[0].total_price, rows[0].user_id]);

            const queryProductUpdate = "UPDATE products SET count = count - $1 WHERE id = $2 RETURNING *";
            const updatedProduct = await client.query(queryProductUpdate, [rows[0].product_count, rows[0].product_id]);

            await client.query("COMMIT");
            return rows[0];
        }
        catch (error) {
            await client.query("ROLLBACK");
            throw error;
        }
        finally {
            client.release();
        }
    }


    async getAll<T>(): Promise<T[]> {
        return await this.fetchAll("select * from transactions")
    }

    async getOneById<T>(id: number): Promise<T> {
        return await this.fetch("select * from transactions where id = $1", id)
    }

}