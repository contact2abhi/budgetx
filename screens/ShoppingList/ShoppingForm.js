import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import moment from 'moment';
import {LinearGradient} from 'expo-linear-gradient';
import IconButton from '../../components/IconButton';
import { Colors } from '../../utils/Colors';
import { createShoppingList } from '../../utils/database';
import BaseScreen from '../BaseScreen';

function ShoppingForm({ navigation }) {
    const [shopping, setShopping] = useState({
        title: '',
        date: moment().format('DD-MM-yyyy'),
        discription: '',
        id: -1
    });

    const [valid, setValid] = useState({
        title: true,
        date: true,
        discription: true
    });

    function focusHandler(ctrl){
        switch (ctrl) {
            case 'date':
                dateRef.current.focus();
                break;
            case 'discription':
                descRef.current.focus();
                break;
        }
    }
    const titleRef = React.createRef();
    const dateRef = React.createRef();
    const descRef = React.createRef();

    function onNameChange(name){
        setValid((current) => {
            return {...current, title: name.length > 0};
        });
        setShopping((current) => {
            return {...current, title: name};
        });
    }

    function onDateChange(date){
        setShopping((current) => {
            return {...current, date: date};
        });
    }

    function onDiscriptionChange(discription){
        setShopping((current) => {
            return {...current, discription: discription};
        });
    }

    function addShoppingHandler() {
        if(shopping.title.length == 0){
            setValid((current) => {
                return {...current,  title: false };
            });
            titleRef.current.focus();
        }
        if (shopping.title.length == 0 ||  !valid.title || !valid.date || !valid.discription) {
            Alert.alert("Error", "Please provide valid data")
        }
        else {
            createShoppingList(shopping);
            navigation.navigate('Shopping');
        }
    }

    function saveHandler() {
        setShopping(shopping);
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon="save" color={tintColor} size={25} onPress={addShoppingHandler} ></IconButton>
        });
    }, [shopping]);

    return <BaseScreen>
        <LinearGradient colors={[Colors.main100, Colors.main300, Colors.main500]} style={styles.container}>
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.text}>Name</Text>
                    <TextInput style={valid.title ? [styles.input] : [styles.input, styles.invalid]}
                    ref={titleRef}
                    onChangeText={onNameChange} 
                    autoFocus={true}
                    onSubmitEditing={focusHandler.bind(this, 'date')}></TextInput>
                </View>
                <View style={styles.col}>
                    <Text style={styles.text}>Date</Text>
                    <TextInput style={valid.date ? [styles.input] : [styles.input, styles.invalid]}
                    keyboardType="number-pad" 
                    value={shopping.date}
                    ref = {dateRef}
                    onChangeText={onDateChange}
                    onSubmitEditing={focusHandler.bind(this, 'discription')}></TextInput>
                </View>
            </View>
            <Text style={styles.text}>Description</Text>
            <TextInput style={valid.discription ? [styles.input, styles.multiline] : [styles.input, styles.multiline, styles.invalid]}
             multiline={true}
             ref = {descRef}
             onChangeText={onDiscriptionChange}
             onSubmitEditing={focusHandler.bind(this, '')}></TextInput>
        </LinearGradient>
    </BaseScreen>;
}

export default ShoppingForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    row:{
        flexDirection: 'row',
        marginTop: 10        
    },
    col:{
        flex: 1,
        marginRight: 10,
        paddingTop: 10
    },
    text: {
        color: Colors.main800,
        fontWeight: "500",
        fontSize: 14
    },
    input: {
        width: '100%',
        backgroundColor: Colors.main100,
        borderWidth: 2,
        borderColor: Colors.main800,
        borderRadius: 20,
        paddingHorizontal: 22,
        padding: 5,
        color: Colors.main800
    },
    multiline: {
        height: 120
    },
    invalid: {
        backgroundColor: 'pink',
        borderColor: 'red',
        borderWidth: 1
    }
});