import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavProps } from './RootStackParamList';

interface AddEmployeeModalProps {

}

export function AddEmployeeModal({ route, navigation }: StackNavProps<"AddNewEmployeeModal">) {
    const [employeeName, setEmployeeName] = useState<string>("");

    function handleSetEmployeeName(text: string) {
        navigation.setParams({ employeeName: text })
        setEmployeeName(text);
    }

    console.log(employeeName);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TextInput label={"Namn på anställd"}
                value={employeeName} clearButtonMode={"while-editing"}
                onChangeText={handleSetEmployeeName} />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "lightgrey",
        fontSize: 17,
        paddingLeft: 17.5,
        paddingRight: 17.5,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: "white",
        marginTop: 10
    }
});