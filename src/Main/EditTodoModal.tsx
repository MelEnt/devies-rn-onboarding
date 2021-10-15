import React, { useContext, useEffect, useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, View, TextInput, Keyboard } from 'react-native';
import { StackNavProps } from './RootStackParamList';
import { StatusBar } from 'expo-status-bar';
import { DataContext } from '../Context/DataProvider';
import { Text } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { DatePicker } from '../Components/DatePicker';


interface EditTodoModalProps {
}


function DeadlineDisplay(date: string) {
    // const formatedDate = new Date(date);
    return <Text>{"date"}</Text>
}

export function EditTodoModal({ route }: StackNavProps<"EditTodoModal">) {
    const todoId = route.params.todoId;
    const userId = route.params.userId;
    const { getTodos } = useContext(DataContext);
    const { title, description, deadline, done } = getTodos(userId).filter(i => i.id === todoId)[0];


    const [newTitle, setTitle] = useState<string>(title);
    const [newDescription, setDescription] = useState<string>(description);
    const [newDeadline, setNewDeadline] = useState<string>(deadline);
    const [newReminderDate, setNewReminderDate] = useState<string>("");


    useEffect(() => {
        console.log("MODAL RENDRD!!");

        return () => console.log("MODAL DERENDER!!")
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <TextInput multiline style={styles.titleInput} value={newTitle} onChangeText={setTitle} />
                    <View>
                        {/* Deadline */}
                        <DatePicker display={DeadlineDisplay} label={"Deadline"} value={newDeadline} onChange={setNewDeadline} />
                    </View>
                    <View>
                        {/* Reminder / Notification */}
                        {/* <DateTimePicker display={ReminderDate} value={newReminderDate} onChange={setNewReminderDate} /> */}
                    </View>
                    <TextInput numberOfLines={3} textAlignVertical={"top"} multiline style={styles.descInput}
                        value={newDescription} onChangeText={setDescription} />
                </View>
                <View style={styles.checkboxContainer}>
                    <BouncyCheckbox size={60} onPress={() => { }} />
                </View>
            </View>
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
        alignContent: "center",
    },
    titleInput: {
        fontSize: 24,
        marginBottom: 5
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