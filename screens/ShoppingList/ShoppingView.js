import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import CategoryList from "../../components/CategoryList";
import IconButton from "../../components/IconButton";
import SlidingModal from "../../components/SlidingModal";
import { Colors } from "../../utils/Colors";
import { createShoppingItem, deleteShoppingItem, deleteShoppingItems, deleteShoppingList, getAllShoppingItems, updateShoppingItem } from "../../utils/database";
import BaseScreen from "../BaseScreen";
import ShoppingBuy from "./ShoppingBuy";

function ShoppingView() {
    
    const [showEdit, setShowEdit] = useState(false);
    const [shoppingId, setShoppingId] = useState();
    const [itemData, setItemData] = useState({
        categoryId: 1,
        categoryName: '',
        name: ''
    });
    const [shopingItems, setShopingItems] = useState([]);

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        setShoppingId(route.params.id);
        async function getItems() {
            let items = [];
            try {
                items = await getAllShoppingItems(shoppingId);
                setShopingItems(items);
            }
            catch (ex) {
                console.log('error: ' + ex);
            }
        }
        getItems();
    }, [route, shoppingId]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.name,
            headerRight: ({tintColor}) => <IconButton icon="trash" color="red" size={25} onPress={deleteHandler} ></IconButton>
        });
    }, [route]);

    async function deleteHandler() {
        if (route.params.id) {
            let response = await deleteShoppingList(route.params.id);
            response = await deleteShoppingItems(route.params.id);
            if (response) {
                navigation.navigate("Shopping");
            }
            else {
                Alert.alert("Error!", "Not able to delete the shopping.");
            }
        }
        else {
            Alert.alert("Error!", "Not able to delete the shopping.");
        }
    }

    function onCategoryChange(catid, catname) {
        setItemData((current) => { return { ...current, categoryId: catid, categoryName: catname } });
    }

    function onItemChange(propertyName, propertyValue) {
        console.log(propertyName, propertyValue);
        setItemData((current) => { return { ...current, [propertyName]: propertyValue } });
    }

    async function saveItem() {
        const itemId = await createShoppingItem({ ...itemData, shoppingId });
        setShopingItems((current) => {
            return [{
                id: itemId,
                name: itemData.name,
                categoryId: itemData.categoryId,
                categoryName: itemData.categoryName,
                shoppingId: shoppingId
            }, ...current];
        });
        setItemData((current) => {
            return { ...current, name: '' }
        });
    }

    async function deleteItem(id) {
        await deleteShoppingItem(id);
        setShopingItems((current) => {
            return current.filter(item => item.id !== id)
        });
    }

    function shopItem(id) {
        const item = shopingItems.filter(i => i.id === id);
        console.log(item[0].isShopped);
        if (item[0] && item[0].isShopped !== 1) {
            setShowEdit(true);
            setItemData(item[0]);
        }
    }

    async function setItemShopped() {
        const totalPrice = itemData.price * itemData.unit;
        setItemData((current) =>{ return {...current, isShopped: 1, totalPrice}; });
        const data = shopingItems.filter(i => i.id !== itemData.id);
        setShopingItems([...data, {...itemData, isShopped: 1, totalPrice}]);
        const res = await updateShoppingItem({...itemData, isShopped: 1, totalPrice});
        setShowEdit(false);
    }


    const itemsList = shopingItems && shopingItems.length > 0
        ? shopingItems.map(item =>{ 
            const isShopped = item.isShopped === 1;
            return <View key={item.id} style={styles.item}>
            <Text style={styles.itemtext}>{item.name}</Text>
            <View style={{ flexDirection: 'row' }}>
                <IconButton icon="checkmark-done-circle" color={isShopped ? 'green' : 'red'} size={30} onPress={shopItem.bind(this, item.id, item.name)}></IconButton>
                {!isShopped && <IconButton icon="trash" color='red' size={30} onPress={deleteItem.bind(this, item.id)}></IconButton>}
            </View>
        </View>;
        })
        :   <LinearGradient colors={[Colors.main100, Colors.main300, Colors.main500]}  style={styles.empty}><Text style={styles.emptyText}>No item exist in your shopping list.</Text></LinearGradient>

    return <BaseScreen>
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.headingText}>Add Item</Text>
                <Text>Select Category</Text>
                <CategoryList onChange={onCategoryChange}></CategoryList>
                <View><Text>Item</Text></View>
                <TextInput
                    style={styles.textinput}
                    onChangeText={onItemChange.bind(this, 'name')}
                    onSubmitEditing={saveItem}
                    value={itemData.name}></TextInput>
            </View>
            <View style={styles.itemsContainer}>
                {itemsList}
            </View>
        </View>
        <SlidingModal onCancel={() => { setShowEdit(false) }}
            onConfirm={setItemShopped}
            show={showEdit} heading={`Have you bought ${itemData.name} ?`}>
            <ShoppingBuy onSave={onItemChange} item={itemData} />
        </SlidingModal>
    </BaseScreen>;
}

export default ShoppingView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center'
    },
    heading: {
        flex: 2,
        width: '100%',
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.main200,
        borderColor: Colors.main800,
        borderWidth: 1
    },
    headingText: {
        color: Colors.main800,
        fontSize: 16,
        fontWeight: 'bold'
    },
    textinput: {
        borderBottomColor: Colors.main800,
        borderBottomWidth: 1,
        minWidth: 200
    },
    itemsContainer: {
        flex: 3,
        marginTop: 10,
        backgroundColor: Colors.main100,
        width: '100%',
        minHeight: 300,
        padding: 10
    },
    item: {
        margin: 5,
        padding: 5,
        backgroundColor: Colors.main100,
        borderRadius: 10,
        borderColor: Colors.main800,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemtext: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontStyle: 'italic',
        fontWeight: "bold",
        color: 'red',
        fontSize: 14
    }
});