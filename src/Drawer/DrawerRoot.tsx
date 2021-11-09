import { createDrawerNavigator, DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import React, { useContext } from 'react'
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { DataContext, Employee } from '../Context/DataProvider';
import { Onboarding } from '../Onboarding/Onboarding';
import { DrawerParamList } from './DrawerParamList';
import { DrawerListHeader } from './DrawerListHeader';
import { DrawerListFooter } from './DrawerListFooter';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DrawerRootProps {
}

function DrawerList(props: DrawerContentComponentProps) {
    /*     const items = Array.from(Array(10), (_, i) =>
            <DrawerItem key={i} label={`Test ${i + 1}`} onPress={() => alert("abolän")} />) */

    const { employees, selectedEmployeeId } = useContext(DataContext);


    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <View>
                <FlatList
                    {...props}
                    horizontal={false}
                    ListHeaderComponent={
                        <DrawerListHeader />}
                    ListFooterComponent={<DrawerListFooter onShowAdd={() => props.navigation.navigate("AddNewEmployeeModal")} />}
                    renderItem={({ item: employee }: { item: Employee }) => {
                        return (
                            <DrawerItem
                                activeTintColor='#2196f3'
                                activeBackgroundColor='rgba(0, 0, 0, .04)'
                                inactiveTintColor='rgba(0, 0, 0, .87)'
                                inactiveBackgroundColor='transparent'
                                focused={selectedEmployeeId === employee.id}
                                key={employee.id}
                                label={employee.name}
                                onPress={() => {
                                    props.navigation.navigate("Onboarding", {
                                        userId: employee.id,
                                        name: employee.name
                                    })
                                }} />)
                    }}
                    keyExtractor={(item) => item.id}
                    data={employees} />
            </View>
        </SafeAreaView>
    )
}

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerRoot({ }: DrawerRootProps) {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerList {...props} />}>
            <Drawer.Screen name={"Onboarding"} component={Onboarding} />
        </Drawer.Navigator>
    );
}