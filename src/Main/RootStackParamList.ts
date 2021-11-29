import { NavigatorScreenParams, RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { IToDoItem } from "../Components/ToDoItem";
import { ToDoItemProps } from "../Context/DataProvider";
import { DrawerParamList } from "../Drawer/DrawerParamList";

export type RootStackParamList = {
    Root: NavigatorScreenParams<DrawerParamList>,
} & ModalParamList

export type ModalParamList = {
    AddNewEmployeeModal: { employeeName: string },
    EditTodoModal: { userId: string, todoId: string, savedData?: ToDoItemProps }
}

export type StackNavProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>,
    route: RouteProp<RootStackParamList, T>
}