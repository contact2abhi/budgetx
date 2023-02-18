function ShoppingItem({name, categoryId, shoppingId, id, isShopped, unitType, unit, price, totalPrice}) {
    this.name = name;
    this.categoryId = categoryId;
    this.shoppingId = shoppingId;
    this.isShopped = isShopped;
    this.unitType = unitType;
    this.unit = parseFloat(unit);
    this.price = parseFloat(price);
    this.totalPrice = Math.round(parseFloat(totalPrice), 2);
    this.id = id;
}

export default ShoppingItem;