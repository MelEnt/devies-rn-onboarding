import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerScreenProps } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/routers';
import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { DataContext, Employee } from '../Context/DataProvider';
import { Onboarding } from '../Onboarding/Onboarding';
import { IToDoItem } from '../Components/ToDoItem';
import { DrawerParamList } from './DrawerParamList';
import { DrawerListHeader } from './DrawerListHeader';
import { DrawerListFooter } from './DrawerListFooter';

interface DrawerRootProps {
}

function DrawerList(props: DrawerContentComponentProps) {
    /*     const items = Array.from(Array(10), (_, i) =>
            <DrawerItem key={i} label={`Test ${i + 1}`} onPress={() => alert("abolän")} />) */

    const { employees } = useContext(DataContext);


    return (
        <View style={{ flex: 1, padding: 10 }}>
            <DrawerContentScrollView {...props}>
                <DrawerListHeader />
                <FlatList
                    renderItem={({ item }: { item: Employee }) => {
                        return (
                            <DrawerItem
                                key={item.id}
                                label={item.name}
                                onPress={() => {
                                    props.navigation.navigate("Onboarding", {
                                        userId: item.id,
                                        name: item.name
                                    })
                                }} />)
                    }}
                    keyExtractor={(item) => item.id}
                    data={employees} />
                <DrawerListFooter onShowAdd={() => props.navigation.navigate("AddNewEmployeeModal")} />
            </DrawerContentScrollView>
        </View>)
}


const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerRoot({ }: DrawerRootProps) {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerList {...props} />}>
            <Drawer.Screen name={"Onboarding"} component={Onboarding} />
        </Drawer.Navigator>
    );
}