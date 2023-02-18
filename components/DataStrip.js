import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../utils/Colors";

function DataStrip({ icon, label, value, onPress, style }){
    return <Pressable onPress={onPress} style={({pressed}) => [styles.root, pressed && styles.pressed]}>
        <View style={styles.root}>
        <View style={[styles.container, style]}>
            <View style={styles.lableContainer}>
                <Ionicons name={icon} color={Colors.main100} size={25} ></Ionicons>
                <Text style={[styles.text, styles.label]}>{label}</Text>
            </View>
            <View style={styles.valueContainer}><Text style={styles.text}>{value}</Text></View>
        </View>
    </View>
    </Pressable>;
}

export default DataStrip;

const styles = StyleSheet.create({
    root:{
        width: '100%',
        marginTop: 10,
        borderRadius: 10,
        shadowColor: Colors.main800,
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowOffset: { width: 10, height: 10 },
        overflow: 'hidden'
    },
    container:{
        flexDirection: 'row',
        marginHorizontal: 10,
        backgroundColor: Colors.main600,
        borderRadius: 10
    },
    pressed:{
        opacity: 0.7
    },
    lableContainer:{
        flex: 6,
        flexDirection:'row',
        paddingHorizontal: 15,
        paddingVertical: 18,
        alignItems: 'center'
    },
    valueContainer:{
        flex: 2,
        paddingVertical: 18,
        paddingRight: 12
    },
    text:{
        color: 'white',
        fontSize: 12
    },
    label:{
        fontWeight: 'bold',
        marginLeft: 8
    }
});