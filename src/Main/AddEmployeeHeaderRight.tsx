import React, { useContext, useState } from 'react'
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { DataContext } from '../Context/DataProvider';
import { StackNavProps } from './RootStackParamList';

interface AddEmployeeHeaderRightProps {

}

export function AddEmployeeHeaderRight({ route, navigation }: StackNavProps<"AddNewEmployeeModal">) {
    const { addEmployee } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(false);
    const { employeeName } = route.params;
    const hasValue = employeeName.length > 0;

    if (isLoading) {
        return (
            <ActivityIndicator size={"small"} color={"blue"} />
        )
    }

    return (
        <Pressable style={{ marginRight: 15 }} disabled={!hasValue} onPress={async () => {
            setIsLoading(true);
            const newEmployee = await addEmployee(employeeName);
            setIsLoading(false);

            navigation.navigate("Root", {
                screen: "Onboarding",
                params: { name: newEmployee.name, userId: newEmployee.id }
            })
        }}>
            <Text style={{ color: hasValue ? "blue" : "grey", fontWeight: "bold" }}>
                Lägg till
            </Text>
        </Pressable>
    )
}
