import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Platform } from 'react-native';
import { Main } from '../Main/Main';
import { DataProvider } from './DataProvider';
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

interface ProvidersProps {

}

/* declare global {
    namespace ReactNativePaper {
        interface ThemeColors {

        }
    }
} */

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "blue"
    }
}

export function Providers({ }: ProvidersProps) {
    return (
        <DataProvider>
            <PaperProvider theme={theme} >
                <Main />
                <StatusBar />
            </PaperProvider>
        </DataProvider>
    );
}