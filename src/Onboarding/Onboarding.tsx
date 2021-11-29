import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Center } from '../Components/Center';
import { IToDoItem, ToDoItem } from '../Components/ToDoItem';
import { DataContext } from '../Context/DataProvider';
import { DrawerStackNavProps } from '../Drawer/DrawerParamList';

interface OnboardingScreenProps {
}


export function Onboarding({ route, navigation }: DrawerStackNavProps<"Onboarding">) {


    // console.log(route, navigation)
    if (!route.params) {
        return <Center>
            <Text>
                Välj person
            </Text>
        </Center>
    }


    const { getTodoById, getTodosByUserId, updateTodo, setSelectedEmployeeId } = useContext(DataContext);
    const { userId, name } = route.params;
    const todos = getTodosByUserId(userId);

    useEffect(() => {
        if (userId) {
            setSelectedEmployeeId(userId);
            navigation.setOptions({
                title: `Onboarding - ${name}`
            })
        }
    }, [userId]);


    function handleOnCheck(todoId: string, isChecked: boolean) {
        const todo = getTodoById(userId, todoId);
        todo.done = isChecked;
        updateTodo(userId, todoId, todo);
    }

    function handleDoubleTap(todoId: string) {
        navigation.navigate("EditTodoModal", {
            todoId: todoId,
            userId: userId
        })

    }

    return (
        <View>
            <FlatList
                renderItem={({ item }: { item: IToDoItem }) => {
                    return <ToDoItem {...item} onCheck={handleOnCheck} onDoubleTap={handleDoubleTap} />
                }}
                keyExtractor={(item: IToDoItem) => item.id}
                data={todos} />
        </View>

    );
}