import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable, Text, View, StyleSheet, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import IconButton from '../../components/IconButton';
import { Colors } from '../../utils/Colors';
import { getAllShoppingList } from '../../utils/database';
import BaseScreen from '../BaseScreen';

function ShoppingLists({ navigation }) {
    const [shoppings, setShoppings] = useState();
    const hasFocus = useIsFocused();
    function addShoppingHandler() {
        navigation.navigate('ShoppingForm');
    }

    useEffect(() => {
        async function fetchShoppings() {
            const res = await getAllShoppingList().catch((err) => {
                console.log(err);
                Alert.alert("Error", JSON.stringify(err))
            });
            setShoppings(res);
        }
        fetchShoppings();
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon="add-circle" color={tintColor} size={40} onPress={addShoppingHandler} ></IconButton>
        });
    }, [hasFocus]);

    function ShoppinngSelectHandler(id, name) {
        navigation.navigate('ShoppingView', { id: id, name: name });
    }

    function viewBill(id, name) {
        navigation.navigate('ShoppingBill', { id, name });
    }

    function renderShopping(shopping) {

        return <Pressable key={shopping.id} style={styles.listItemOuter} onPress={ShoppinngSelectHandler.bind(this, shopping.id, shopping.title)}>
            <Text style={styles.headingText}>{shopping.title}</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.text}>{shopping.discription}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.text}>{shopping.date}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Amount</Text>
                <IconButton icon="eye" size={30} color={Colors.main500} onPress={viewBill.bind(this, shopping.id, shopping.title)}></IconButton>
            </View>
        </Pressable>
    }

    const noItems = <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LinearGradient colors={[Colors.main100, Colors.main300, Colors.main500]} style={{
            width: '80%',
            backgroundColor: Colors.main100,
            borderColor: Colors.main800,
            borderWidth: 1,
            borderRadius: 50,
            padding: 50,
            alignContent: 'center'
        }}>
            <Text style={{ color: Colors.main800 }}>You do not have planned any shopping list, Please click on '+' to create your first</Text>
        </LinearGradient></View>;

    if (!shoppings || shoppings.length == 0) {
        return noItems;
    }

    return <BaseScreen>
        <View style={styles.container}>
            {(shoppings && shoppings.length > 0) && shoppings.map(list => {
                return renderShopping(list)
            })}
        </View>
    </BaseScreen>;
}

export default ShoppingLists;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItemOuter: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginTop: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: Colors.main300,
        shadowColor: Colors.main800,
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowOffset: { width: 10, height: 10 },
        overflow: 'hidden'
    },
    headingText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 10
    },
    label: {
        fontSize: 10,
        color: Colors.main800,
        fontWeight: 'bold'
    },
    detailContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});