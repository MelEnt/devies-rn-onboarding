import React, { useContext, useEffect, useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, View, TextInput, Keyboard, GestureResponderEvent, Pressable } from 'react-native';
import { StackNavProps } from './RootStackParamList';
import { StatusBar } from 'expo-status-bar';
import { DataContext } from '../Context/DataProvider';
import { Text } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { DatePicker } from '../Components/DatePicker';
import { MaterialIcons } from '@expo/vector-icons';



interface EditTodoModalProps {
}

export function EditTodoModal({ route }: StackNavProps<"EditTodoModal">) {
    const todoId = route.params.todoId;
    const userId = route.params.userId;
    const { getTodoById } = useContext(DataContext);
    const { title, description, deadline, done, hasNotification } = getTodoById(userId, todoId);

    const [newTitle, setTitle] = useState<string>(title);
    const [newDescription, setDescription] = useState<string>(description);
    const [newDeadline, setNewDeadline] = useState<string>(deadline);
    const [newReminderDate, setNewReminderDate] = useState<string>("");


    useEffect(() => {
        console.log("MODAL RENDRD!!");

        return () => console.log("MODAL DERENDER!!")
    }, []);


    function handleSetDeadline(date: Date) {
        console.log("NEW DAT", date);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable onPress={Keyboard.dismiss} style={styles.container}>
                <View style={styles.textContainer}>
                    <View>
                        <TextInput multiline style={styles.titleInput} value={newTitle} onChangeText={setTitle} />
                    </View>
                    <View>
                        {/* Deadline */}
                        <DatePicker label={"Deadline"} value={newDeadline} onChange={handleSetDeadline} hasNotification={hasNotification} />
                    </View>
                    <View>
                        <TextInput placeholder={"Beskriving"} numberOfLines={3} textAlignVertical={"top"} multiline style={styles.descInput}
                            value={newDescription} onChangeText={setDescription} />
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <BouncyCheckbox size={60} onPress={() => { }} />
                </View>
            </Pressable>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "flex-start",
        paddingTop: 20,
        paddingLeft: 10
    },
    textContainer: {
        flex: 2,
        flexDirection: "column"
    },
    titleInput: {
        fontSize: 24,
        marginBottom: 5,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    descInput: {
        paddingRight: 5
    },
    checkboxContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});