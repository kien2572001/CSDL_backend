import db from '../ulti/db'

module.exports = class Product{

    static findProductsByCategory(category){
        return db.execute(`select * from product
        inner join product_category on product.pid = product_category.pid
        inner join category on category.id = product_category.categoryId
        where category.title like ?;`,[category])
    }
}