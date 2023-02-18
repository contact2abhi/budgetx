import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

function IconButton({icon, size, color, onPress}){
    return <Pressable onPress={onPress} style={({pressed}) => [pressed && styles.press]}>
        <Ionicons name={icon} size={size} color={color} />
    </Pressable>;
}

export default IconButton;

const styles = StyleSheet.create({
    press: {
        opacity: 0.4
    }
});