import db from '../ulti/db'

module.exports = class Product{

    static findProductsByCategory(category){
        return db.execute(`select * from product
        where pid in (
            select pid from product_category
            inner join category on category.id = product_category.categoryId
            where category.title like ?
        );`,[category])

        
    }

    static findCategoryById(id){
        return db.execute(`select * from product_category
        inner join category on product_category.categoryId = category.id
        where pid=?;`,[id])
    }

    static findStoreById(id){
        return db.execute(`select * from store
        where sid = ?;`,[id])
    }
}