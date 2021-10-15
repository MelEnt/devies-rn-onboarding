import { Ionicons, Entypo } from '@expo/vector-icons';
import React from 'react'
import { Text, View, StyleSheet, Pressable, GestureResponderEvent } from 'react-native';

interface DrawerListFooterProps {
    onShowAdd: ((event: GestureResponderEvent) => void)
}

export function DrawerListFooter({ onShowAdd }: DrawerListFooterProps) {
    return (
        <View>
            <Text>{"\n"}</Text>
            <View style={styles.borderTop} />
            <Text>{"\n"}</Text>
            <Pressable onPress={onShowAdd} onLongPress={onShowAdd}>
                <Text style={styles.addNewButton}>
                    <Entypo name={"plus"} size={16} color={"blue"} />
                    <Text style={styles.addNewButtonText}>
                        {"Lägg till ny"}
                    </Text>
                </Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: "#00000040",
        width: "75%",
    },
    addNewButton: {
        fontWeight: "bold",
    },
    addNewButtonText: {
        marginLeft: 5
    }
});


