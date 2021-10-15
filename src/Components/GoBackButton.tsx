import React from 'react'
import { Pressable, Text } from 'react-native'
import { RootStackParamList, StackNavProps } from '../Main/RootStackParamList'

interface GoBackButtonProps {

}

export function GoBackButton({ navigation }: StackNavProps<any>) {
    return (
        <Pressable style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
            <Text style={{ color: "red" }}>
                Avbryt
            </Text>
        </Pressable>
    )
}