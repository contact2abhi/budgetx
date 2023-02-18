export const CREATE_STATE_TABLE = `CREATE TABLE IF NOT EXISTS state (
    db INTEGER NOT NULL
)`;

export const CREATE_SHOPPING_TABLE = `CREATE TABLE IF NOT EXISTS shopping (
    id INTEGER PRIMARY KEY NOT NULL,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    discription TEXT NOT NULL,
    amount REAL NOT NULL
)`;

export const CREATE_SHOPPINGITEM_TABLE = `CREATE TABLE IF NOT EXISTS shoppingItem (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    shoppingId INTEGER NOT NULL,
    categoryId INTEGER NOT NULL,
    isShopped INTEGER NOT NULL,
    unitType TEXT,
    unit REAL,
    price REAL,
    totalPrice REAL
)`;

export const CREATE_CATEGORY_TABLE = `CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    icon TEXT NOT NULL
)`;

export const INSERT_CATEGORY = 'INSERT INTO category (name, icon) VALUES (?, ?)';

export const GET_DB_STATE = 'SELECT db FROM state';

export const INSERT_DB_STATE = 'INSERT INTO state (db) values (?)';

export const INSERT_SHOPPING = 'INSERT INTO shopping (title, discription, date, amount) values (?, ?, ?, ?)';

export const DELETE_SHOPPING = 'DELETE FROM shopping WHERE id = ?';

export const GET_ALL_SHOPPING = 'SELECT * FROM shopping';

export const GET_SHOPPING = 'SELECT * FROM shopping WHERE id=?';

export const UPDATE_SHOPPING = 'UPDATE shopping SET title = ?, description = ?, date = ? WHERE id=?';

export const INSERT_SHOPPING_ITEM = 'INSERT INTO shoppingItem (name, categoryId, shoppingId, isShopped) values (?, ?, ?, ?)';

export const UPDATE_SHOPPING_ITEM = `UPDATE shoppingItem SET 
                                    isShopped = ?,
                                    unitType = ?,
                                    unit = ?,
                                    price = ?,
                                    totalPrice = ?
                                    WHERE id = ?`;

export const GET_ALL_SHOPPING_ITEMS = 'SELECT * FROM shoppingItem WHERE shoppingId = ?';

export const DELETE_SHOPPING_ITEM = 'DELETE FROM shoppingItem WHERE id = ?';

export const DELETE_SHOPPING_ITEMS = 'DELETE FROM shoppingItem WHERE shoppingId = ?';

