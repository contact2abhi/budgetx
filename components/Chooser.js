import { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../utils/Colors";

function Option({option, onSelect, isSelected}){
    const [selectedOption, setSelectedOption] = useState(option);

    function selectOption(){
        onSelect(selectedOption);
    }

    return <Pressable onPress={selectOption} style={[ optionstyles.option, isSelected && optionstyles.selected ]}>
        <Text style={[optionstyles.label , isSelected && optionstyles.selectedlabel]}>{option}</Text>
        </Pressable>
}


function Chooser({options, choosenOption, onSelectionChange,  style}) {
    const [selectedOption, setSelectedOption] = useState(choosenOption);
    let containerStyle = [styles.container];
    if(style){ containerStyle.push(style) }

    function onselectionHandler(option) {
        setSelectedOption(option);
        onSelectionChange(option);
    }

    function renderOption(option, index){
        const isSelected = option === selectedOption;
        return <Option key={index} option={option} onSelect={onselectionHandler} isSelected={isSelected} />
    }
    return <View style={containerStyle}>
        {options.map((op, index) => { return renderOption(op, index) }) }
    </View>;
}

export default Chooser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const optionstyles = StyleSheet.create({
    option:{
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.main800,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected:{
        backgroundColor: Colors.main400
    },
    label:{
        color: Colors.main800,
        fontSize: 10,
        fontWeight: 'bold'
    },
    selectedlabel:{
        color: 'white'
    }
});