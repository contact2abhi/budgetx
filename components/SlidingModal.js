import { useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { Colors } from "../utils/Colors";

function SlidingModal({children, onCancel, onConfirm, show , heading}) {
    return <Modal animationType="slide" transparent={true} visible={show} hardwareAccelerated={true} style={{ flex: 1 }}>
        <View style={styles.modelContainer}>
            <View style={styles.inner}>
                <View style={styles.subheading}>
                    <Text style={styles.subheadingText}>{heading}</Text>
                </View>
                {children}
                <View style={styles.modelBottom}>
                    <Pressable style={[styles.button, { backgroundColor: 'red' }]} onPress={onCancel}><Text>Cancel</Text></Pressable>
                    <Pressable style={[styles.button, { backgroundColor: 'green' }]} onPress={onConfirm}><Text>Confirm</Text></Pressable>
                </View>
            </View>
        </View>
    </Modal>;
}

export default SlidingModal;

const styles = StyleSheet.create({
    subheading:{
        width: '100%',
        backgroundColor: Colors.main800,
        height: 30
    },
    subheadingText:{
        color: 'white'
    },
    button: {
        flex: 1,
        padding: 8,
        alignItems: 'center'
    },
    modelContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    inner: {
        height: 300,
        backgroundColor: Colors.main200,
        borderWidth: 2,
        borderColor: Colors.main800
    },
    modelBottom: {       
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }
});