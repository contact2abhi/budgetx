import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text} from "react-native";
import { Colors } from "../../utils/Colors";
import { getAllShoppingItems } from "../../utils/database";
import BaseScreen from "../BaseScreen";

function ShoppingBill(){
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    useEffect(() => {
        async function getItems(){
            const res = await getAllShoppingItems(route.params.id);
            let price = 0;
            res.forEach(i => {
                price += isNaN(i.totalPrice) ? 0 : i.totalPrice;
            });
            setTotal(price);
            setItems(res);
        }
        getItems();
    }, [route.params.id]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `Bill for ${route.params.name}`
        });
    }, [route]);

    return <BaseScreen>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.row}><Text style={{ justifyContent: 'center' }}>Bill</Text></View>
            </View>
            <View style={styles.row}>
                <View style={[styles.col, styles.headingCol]}><Text style={[styles.label, styles.headingLabel]}>Name</Text></View>
                <View style={[styles.col, styles.headingCol]}><Text style={[styles.label, styles.headingLabel]}>Unit</Text></View>
                <View style={[styles.col, styles.headingCol]}><Text style={[styles.label, styles.headingLabel]}>Unit Price</Text></View>                
                <View style={[styles.col, styles.headingCol]}><Text style={[styles.label, styles.headingLabel]}>Total</Text></View>
            </View>
            {items.map(i => <View style={styles.row} key={i.name}>
                <View style={styles.col}><Text style={[styles.label]}>{i.name}</Text></View>                
                <View style={styles.col}><Text style={[styles.label]}>{i.unit.toFixed(2)} {i.unitType}</Text></View>
                <View style={styles.col}><Text style={[styles.label]}>{i.price.toFixed(2)}</Text></View>
                <View style={styles.col}><Text style={[styles.label]}>{i.totalPrice.toFixed(2)}</Text></View>
            </View>)}
            <View style={styles.dottedline}></View>
            <View style={styles.row}>
                <View style={[styles.col, styles.headingCol]}><Text style={[styles.label, styles.headingLabel]}>Total</Text></View>
                <View style={[styles.col, styles.headingCol]}><Text style={[styles.label, styles.headingLabel]}></Text></View>
                <View style={[styles.col, styles.headingCol]}><Text style={[styles.label, styles.headingLabel]}></Text></View>
                <View style={[styles.col, styles.headingCol]}><Text style={[styles.label, styles.headingLabel]}>{total}</Text></View>
            </View>
            <View style={styles.dottedline}></View>
        </View>
    </BaseScreen>;
}

export default ShoppingBill;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 8
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    col:{
        flex: 1
    },
    headingCol:{
        backgroundColor: Colors.main800
    },
    label:{
        fontSize: 10,
        color: Colors.main800
    },
    headingLabel:{
        color: 'white',
        fontWeight: 'bold'
    },
    dottedline:{
        borderWidth: 1,
        borderColor: Colors.main800,
        borderStyle: "dashed"
    },
    header:{
        marginVertical: 10
    }
});