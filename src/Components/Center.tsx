import React from 'react'
import { View } from 'react-native';

interface CenterProps {
    children: React.ReactNode,
    style?: any
}

export function Center({ children, style }: CenterProps) {
    return (<View style={[{ flex: 1, alignItems: "center", justifyContent: "center" }, style]}>
        {children}
    </View>);
}