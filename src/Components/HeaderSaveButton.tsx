import React from 'react'
import { Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { ModalParamList, StackNavProps } from '../Main/RootStackParamList';

interface HeaderSaveButtonProps {
    onSave: () => void
}

export function HeaderSaveButton({ navigation, onSave }: StackNavProps<any> & HeaderSaveButtonProps) {
    return (
        <Pressable style={{ marginRight: 15 }} onPress={onSave}>
            <Text style={{ color: "blue" }}>
                Spara
            </Text>
        </Pressable>
    );
}