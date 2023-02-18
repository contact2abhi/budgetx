import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../utils/Colors';

function Input({ title, type, required, dataName, style, inputProps, labelProps, onChange }) {
    const [input, setInput] = useState({ value: '', dataName: '' });
    const [valid, setValid] = useState(true);

    useEffect(() => {
        setInput((current) => {
            return {...current, dataName: dataName};
        })
    }, []);

    useEffect(() => {
        const isValid = validate(input.value);
        onChange(input.dataName, input.value, isValid);
    }, [input.value]);

    let inputStyle = [ styles.input ];
    let inputContainerStyle = [styles.container ];
    let textStyle = [styles.text ];
    let textContainerStyle = [styles.textContainer ];
    if(inputProps && inputProps.style){
        inputStyle.push(inputProps.style);
    }
    if(inputProps && inputProps.Containerstyle){
        inputContainerStyle.push(inputProps.Containerstyle);
    }
    if(labelProps && labelProps.style){
        textStyle.push(labelProps.style);
    }
    if(labelProps && labelProps.Containerstyle){
        textContainerStyle.push(labelProps.Containerstyle);
    }

    function onChangeHandler(value){
        console.log(value);
        setInput((current) => {
            return {...current, value};
        });
    }

    function validate(value){
        let isValid = true;
        isValid = required && value.trim().length !== 0;
        setValid(isValid);
        return isValid;
    }

    return <View style={[ styles.container, style && style ]}>
        <View style={textContainerStyle}>
            <Text {...labelProps} style={textStyle}>{title}</Text>
        </View>
        <View style={inputContainerStyle}>
            <TextInput 
            {...inputProps} 
            onChangeText={onChangeHandler}
            value={input.value} 
            style={[inputStyle , !valid && styles.error ]} />
        </View>
    </View>;
}

export default Input;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5
    },
    textContainer: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    text: {
        color: Colors.main800,
        fontWeight: "500",
        fontSize: 14
    },
    inputContainer: {
        paddingHorizontal: 10,
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
    error: {
        backgroundColor: '#FFB8B6',
        borderColor: '#FF1D1D',
        borderWidth: 2,
        color: '#FF1D1D'
    }
});