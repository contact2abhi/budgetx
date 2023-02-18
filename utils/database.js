import * as SQLite from 'expo-sqlite';
import Category from '../models/Category';
import Shopping from '../models/Shopping';
import ShoppingItem from '../models/ShoppingItem';
import { CREATE_CATEGORY_TABLE, 
    CREATE_SHOPPINGITEM_TABLE, 
    CREATE_SHOPPING_TABLE, 
    CREATE_STATE_TABLE, 
    GET_DB_STATE, 
    INSERT_CATEGORY, 
    INSERT_SHOPPING,
    DELETE_SHOPPING,
    INSERT_DB_STATE,
    GET_ALL_SHOPPING,
    GET_ALL_SHOPPING_ITEMS,
    INSERT_SHOPPING_ITEM,
    DELETE_SHOPPING_ITEM,
    DELETE_SHOPPING_ITEMS,
    UPDATE_SHOPPING_ITEM
 } from './dbScripts';

const database = SQLite.openDatabase('budget_data1.db');

export async function init(){
    await createShoppingTable();
    await createShoppingItemTable();
    await createCategoryTable();
    await createStateTable();
    const isDBInstalled = await getDBState();
    if (!isDBInstalled) {
        await createCategory(INSERT_CATEGORY, ['Miscellaneous', 'construct-outline']);
        await createCategory(INSERT_CATEGORY, ['Health', 'medkit-outline']);
        await createCategory(INSERT_CATEGORY, ['Electrical', 'bulb-outline']);
        await createCategory(INSERT_CATEGORY, ['Electronic', 'desktop-outline']);
        await createCategory(INSERT_CATEGORY, ['Cloth', 'shirt-outline']);
        await createCategory(INSERT_CATEGORY, ['Sports', 'game-controller-outline']);
        await createCategory(INSERT_CATEGORY, ['Gym', 'barbell-outline']);
        await createCategory(INSERT_CATEGORY, ['Food', 'fast-food-outline']);
        await createCategory(INSERT_CATEGORY, ['Travel', 'airplane-outline']);
        setDBState(1);
    }
}

function createStateTable(){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(CREATE_STATE_TABLE, [], (_, response) => { resolve(response); }, (_, error) => { reject(error); });
        });
    });
    return promise;
}

function createShoppingTable(){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(CREATE_SHOPPING_TABLE, [], (_, response) => { resolve(response); }, (_, error) => { reject(error); });
        });
    });
    return promise;
}

function createShoppingItemTable(){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(CREATE_SHOPPINGITEM_TABLE, [], (_, response) => { resolve(response); }, (_, error) => { reject(error); });
        });
    });
    return promise;
}

function createCategoryTable(){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(CREATE_CATEGORY_TABLE, [], (_, response) => { resolve(response); }, (_, error) => { reject(error); });
        });
    });
    return promise;
}

function createCategory(query, params){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(query, params, (_, response) => { resolve(response); }, (_, error) => { reject(error); });
        });
    });
    return promise;
}

export function createShoppingItem(item){
    const itemObj = new ShoppingItem(item);
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(INSERT_SHOPPING_ITEM,
            [itemObj.name, itemObj.categoryId, itemObj.shoppingId, 0],
            (_, response) => {
                resolve(response.insertId);
            },
            (_, error) => {
                reject(error);
            });
        });
    });

    return promise;
}

export function createShoppingList(shopping){
    const shoppingObj = new Shopping(shopping);
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(INSERT_SHOPPING,
            [shoppingObj.title, shoppingObj.discription, shoppingObj.date, 0.00],
            (_, response) => {
                resolve(response);
            },
            (_, error) => {
                reject(error);
            });
        });
    });

    return promise;
}

export function deleteShoppingList(id){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(DELETE_SHOPPING,
            [id],
            (_, response) => {
                console.log(response, id);
                resolve(true);
            },
            (_, error) => {
                reject(error);
            });
        });
    });

    return promise;
}

export function getAllShoppingList(){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(GET_ALL_SHOPPING,
            [],
            (_, response) => {
                const dataLst = [];
                response.rows._array.map(row => dataLst.push(new Shopping(row)) );
                resolve(dataLst);
            },
            (_, error) => {
                reject(error);
            });
        });
    });

    return promise;
}

export function getAllShoppingItems(shoppingId){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(GET_ALL_SHOPPING_ITEMS,
            [shoppingId],
            (_, response) => {
                const dataLst = [];
                response.rows._array.map(row => dataLst.push(new ShoppingItem(row)) );
                console.log(dataLst);
                resolve(dataLst);
            },
            (_, error) => {
                reject(error);
            });
        });
    });

    return promise;
}

export function deleteShoppingItem(itemId){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(DELETE_SHOPPING_ITEM,
            [itemId],
            (_, response) => {
                resolve(true);
            },
            (_, error) => {
                reject(error);
            });
        });
    });

    return promise;
}

export function deleteShoppingItems(itemId){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(DELETE_SHOPPING_ITEMS,
            [itemId],
            (_, response) => {
                resolve(true);
            },
            (_, error) => {
                reject(error);
            });
        });
    });

    return promise;
}


export function updateShoppingItem(item){
    const sItem = new ShoppingItem(item);
    console.log(sItem);

    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(UPDATE_SHOPPING_ITEM,
            [sItem.isShopped, sItem.unitType, sItem.unit, sItem.price, sItem.totalPrice, sItem.id],
            (_, response) => {
                resolve(true);
            },
            (_, error) => {
                reject(error);
            });
        });
    });

    return promise;
}
//

//state
function getDBState() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(GET_DB_STATE,
                [],
                (_, response) => {
                    try {
                        if (parseInt(response.rows._array[0].db) === 1) {
                            resolve(true);
                        }
                        else{
                            resolve(false);
                        }
                    }
                    catch {
                        resolve(false);
                    }
                },
                (_, error) => {
                    resolve(false);
                });
        });
    });

    return promise;
}

function setDBState(val) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(INSERT_DB_STATE,
                [val],
                (_, response) => {
                    try {
                        if (parseInt(response.rows._array[0].db) === 1) {
                            resolve(true);
                        }
                    }
                    catch {
                        resolve(false);
                    }
                },
                (_, error) => {
                    resolve(false);
                });
        });
    });

    return promise;
}

// category
export function getAllCategories(){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`SELECT * FROM category`,
            [],
            (_, response) => {
                const categories = [];
                response.rows._array.map(row => categories.push(new Category(row)) );
                resolve(categories);
            },
            (_, error) => {
                reject(error);
            });
        });
    });

    return promise;
}