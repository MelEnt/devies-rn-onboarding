import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
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


    const { getTodos, updateTodo } = useContext(DataContext);
    const { userId, name } = route.params;
    const todos = getTodos(userId);

    useEffect(() => {
        navigation.setOptions({
            title: `Onboarding - ${name}`
        })
    }, [userId]);


    function handleOnCheck(todoId: string, isChecked: boolean) {
        updateTodo(userId!, todoId, isChecked);
    }

    function handleDoubleTap(todoId: string) {
        /*         navigation.navigate("EditTodoModal", {
                    todoId: todoId,
                    userId: userId
                }) */

        // Temp. disable
    }

    return (
        <ScrollView>

            <FlatList
                renderItem={({ item }: { item: IToDoItem }) => {
                    return <ToDoItem {...item} onCheck={handleOnCheck} onDoubleTap={handleDoubleTap} />
                }}
                keyExtractor={(item: IToDoItem) => item.id}
                data={todos} />
        </ScrollView>
    );
}