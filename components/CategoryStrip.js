import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../utils/Colors";
import Category from "../models/Category";


function CategoryStrip({ category, onPress, style }) {
    const inputCategory = new Category(category);

    return <Pressable onPress={onPress} style={({ pressed }) => [styles.root, pressed && styles.pressed]}>
        <View style={[styles.container, style]}>
            <Ionicons
                name={inputCategory.icon}
                color={Colors.main100}
                size={25} />
            <Text style={[styles.text, styles.label]}>{category.name}</Text>
        </View>
    </Pressable>;
}

export default CategoryStrip;

const styles = StyleSheet.create({
    root:{
        flex: 1,
        width: '100%',
        width: 180,
        height: '100%',
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: Colors.main800,
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowOffset: { width: 10, height: 10 },
        overflow: 'hidden'
    },
    container:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        backgroundColor: Colors.main300,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    pressed:{
        opacity: 0.7
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