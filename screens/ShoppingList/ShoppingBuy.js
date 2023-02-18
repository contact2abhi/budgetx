import { useState } from "react";
import { StyleSheet, TextInput, View, Text, ScrollView } from "react-native";
import Chooser from "../../components/Chooser";
import { Colors } from "../../utils/Colors";

function ShoppingBuy({onSave, item}) {
    const unitTypes = ['NOS' ,'KG'];
    function onUnitTypeSelect(option) {
        onSave('unitType', option);
    }

    function onUnitChange(enteredUnit){
        onSave('unit', enteredUnit);
    }

    function onUnitPriceChange(enteredUnitPrice){
        onSave('price', enteredUnitPrice);
    }

    return <ScrollView style={styles.container}>
        <View style={styles.row}>
            <View style={styles.col1}>
                <Text style={styles.label}>Unit Type</Text>

            </View>
            <View style={styles.col2}>
                <Chooser options={unitTypes}
                    choosenOption={item.unitType}
                    onSelectionChange={onUnitTypeSelect} />
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.col1}>
                <Text style={styles.label}>How many unit you pick?</Text>
            </View>
            <View style={styles.col2}>
                <TextInput style={styles.input} maxLength={5} placeholder='00.00' keyboardType="number-pad" value={item.unit} onChangeText={onUnitChange}></TextInput>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.col1}>
                <Text style={styles.label}>Unit Price</Text>
            </View>
            <View style={styles.col2}>
                <TextInput style={styles.input} maxLength={7} placeholder='0000.00' keyboardType="number-pad" value={item.price} onChangeText={onUnitPriceChange}></TextInput>
            </View>
        </View>
    </ScrollView>
}

export default ShoppingBuy;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8
    },
    row: {
        flexDirection: 'row',
        marginTop: 10
    },
    col1: {
        flex: 3,
        marginRight: 10,
        paddingTop: 10,
        justifyContent: 'center'
    },
    col2: {
        flex: 2,
        marginRight: 10,
        paddingTop: 10,
        justifyContent: 'center'
    },
    label: {
        color: Colors.main800,
        fontWeight: "500",
        fontSize: 10
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: Colors.main800,
        borderRadius: 20,
        paddingHorizontal: 22,
        padding: 5,
        color: Colors.main800,
        alignContent: 'center'
    },
});