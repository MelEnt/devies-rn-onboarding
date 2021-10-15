import React, { useRef } from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, GestureResponderEvent, Pressable } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Center } from './Center';
import { ToDoItemProps } from "../Context/DataProvider";


const DOUBLE_TAP_DELAY_MS = 300;


export interface IToDoItem extends ToDoItemProps {
    onCheck: (id: string, isChecked: boolean) => void,
    onDoubleTap: (todoId: string) => void
}

export function ToDoItem({ id, title, deadline, done, onCheck, onDoubleTap }: IToDoItem) {
    console.log(done);
    let lastTap: number = 0;

    function handleDoubleTap(event: GestureResponderEvent) {
        const now = Date.now();
        if (lastTap && (now - lastTap) < DOUBLE_TAP_DELAY_MS) {
            // console.log("DOUBLEE TAB");
            onDoubleTap(id);
        } else {
            // console.log("SINGLE TAP", now, lastTap, now - lastTap);
            lastTap = now;
        }

        event.stopPropagation();
    }

    return (
        <Pressable onPress={handleDoubleTap}>
            <Center style={styles.container}>
                <View style={styles.textContainer}>
                    <Text>{title}</Text>
                    <Text>{deadline || "-"}</Text>
                </View>
                <View style={styles.checkboxContainer}>
                    <BouncyCheckbox size={50} isChecked={done} onPress={(isChecked) => onCheck(id, isChecked!)} />
                </View>
            </Center>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 7.5,
        marginBottom: 7.5,
        padding: 20,
        borderRadius: 5,
        backgroundColor: "white",
        flexDirection: "row",
        maxHeight: 75,
        height: 75,
    },
    textContainer: {
        flex: 2,
    },
    checkboxContainer: {
        flex: 1,
        alignItems: "flex-end",
    }
})