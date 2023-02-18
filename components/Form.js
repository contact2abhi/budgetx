import { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";

function Form({inputs, onSave}) {
    const [formData, setformData] = useState();
    const [errorData, setErrorData] = useState();

    function onChangeHandler(name, value, isValid) {
        setformData((current) => {
            return { ...current, [name]: value };
        });
        setErrorData((current) => {
            return { ...current, [name]: isValid };           
        });
        if(errorData)
        {
            console.log(errorData);
            Alert.alert("Error !", "Please check the input")
        }
        else {
            onSave(formData);
        }        
    }
 
    return <View style={{ flex: 1 }}>
        { inputs.map((item, index) => {
            return <View key={item.id} style={[styles.container, {  }]}>
                <Input title={item.title}
                    required={item.required}
                    type={item.type}
                    dataName={item.dataName}
                    inputProps={item.inputProps}
                    labelProps={item.labelProps}
                    onChange={onChangeHandler}
                    />
            </View>;
        })}
    </View>;
}

export default Form;

const styles = StyleSheet.create({
    container: {
        width: '100%'
    }
});