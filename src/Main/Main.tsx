import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Easing, Pressable, Text, Animated } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Center } from '../Components/Center';
import { DataContext } from '../Context/DataProvider';
import { DrawerRoot } from '../Drawer/DrawerRoot';
import { AddEmployeeHeaderRight } from './AddEmployeeHeaderRight';
import { AddEmployeeModal } from './AddEmployeeModal';
import { EditTodoModal } from './EditTodoModal';
import { StackNavProps, RootStackParamList } from './RootStackParamList';
import { GoBackButton } from '../Components/GoBackButton';

interface MainProps {

}

const Stack = createStackNavigator<RootStackParamList>();

export function Main({ }: MainProps) {

    const { loadData, employees } = useContext(DataContext);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadData();
        setLoading(false);
    }, []);



    if (loading) {
        return (
            <Center>
                <ActivityIndicator size={"large"} />
            </Center>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="Root" component={DrawerRoot} />
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                    <Stack.Screen name="AddNewEmployeeModal" initialParams={{ employeeName: "" }}
                        options={(props: StackNavProps<"AddNewEmployeeModal">) => ({
                            title: "Lägg till ny",
                            headerTitleAlign: 'center',
                            headerStyle: { backgroundColor: '#fff', elevation: 0, shadowColor: "transparent" },
                            headerLeft: () => <GoBackButton {...props} />,
                            headerRight: () => <AddEmployeeHeaderRight {...props} />
                        })}
                        component={AddEmployeeModal} />
                    <Stack.Screen name="EditTodoModal" component={EditTodoModal}
                        options={(props: StackNavProps<"EditTodoModal">) => ({
                            title: "Ändra",
                            headerTitleAlign: 'center',
                            headerStyle: { backgroundColor: '#fff', elevation: 0, shadowColor: "transparent" },
                            headerLeft: () => <GoBackButton {...props} />
                        })} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>

    );
}