export class TransactionEntity {
    user_id: number;
    product_id: number;
    product_count: number;
    total_price: number;
    constructor(user_id: number, product_id: number, product_count: number, total_price: number) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.product_count = product_count;
        this.total_price = total_price;
    }
}

