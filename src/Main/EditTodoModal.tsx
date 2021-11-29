import React, { useContext, useEffect, useRef, useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, View, TextInput, Keyboard, GestureResponderEvent, Pressable } from 'react-native';
import { StackNavProps } from './RootStackParamList';
import { StatusBar } from 'expo-status-bar';
import { DataContext, ToDoItemProps } from '../Context/DataProvider';
import { Text } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { DatePicker } from '../Components/DatePicker';
import { MaterialIcons } from '@expo/vector-icons';
import { onChange } from 'react-native-reanimated';


interface EditTodoModalProps {
}

export function EditTodoModal({ route, navigation }: StackNavProps<"EditTodoModal">) {
    const todoId = route.params.todoId;
    const userId = route.params.userId;
    const { getTodoById } = useContext(DataContext);
    const todoItem = getTodoById(userId, todoId);
    const { title, description, deadline, done, hasNotification } = todoItem;

    const [newTitle, setTitle] = useState<string>(title);
    const [newDescription, setDescription] = useState<string>(description);
    const [newDeadline, setNewDeadline] = useState<Date>(new Date(deadline));
    const [newDone, setNewDone] = useState<boolean>(done);
    const [newHasNotification, setHasNotification] = useState<boolean>(hasNotification);

    const [savedData, setSavedData] = useState<ToDoItemProps>({ ...todoItem });


    useEffect(() => {
        console.log("MODAL RENDRD!!");

        return () => console.log("MODAL DERENDER!!")
    }, []);


    useEffect(() => {
        navigation.setParams({ savedData });
    }, [savedData])


    function handleSetDeadline(date: Date) {
        setNewDeadline(date);
        setSavedData({ ...savedData, deadline: date.toJSON() });
    }

    function handleNewDone(isChecked: boolean) {
        setNewDone(!isChecked);
        setSavedData({ ...savedData, done: newDone });
        console.log(newDone);
    }

    function handleSetTitle(newTitle: string) {
        setTitle(newTitle);
        setSavedData({ ...savedData, title: newTitle });
    }

    function handleSetDescription(newDesc: string) {
        setDescription(newDesc);
        setSavedData({ ...savedData, description: newDesc });
    }

    function handleSetNotification(hasNotification: boolean) {
        setHasNotification(hasNotification);
        setSavedData({ ...savedData, hasNotification });
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Pressable onPress={Keyboard.dismiss} style={styles.container}>
                <View style={styles.textContainer}>
                    <View>
                        <TextInput multiline style={styles.titleInput} value={newTitle} onChangeText={handleSetTitle} />
                    </View>
                    <View>
                        {/* Deadline */}
                        <DatePicker label={"Deadline"} value={newDeadline} onChange={handleSetDeadline} hasNotification={newHasNotification} onChangeNotification={handleSetNotification} />
                    </View>
                    <View>
                        <TextInput placeholder={"Beskriving"} numberOfLines={3} textAlignVertical={"top"} multiline style={styles.descInput}
                            value={newDescription} onChangeText={handleSetDescription} />
                    </View>
                </View>
                <View style={styles.checkboxContainer}>
                    <BouncyCheckbox size={60} isChecked={newDone} onPress={handleNewDone} />
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