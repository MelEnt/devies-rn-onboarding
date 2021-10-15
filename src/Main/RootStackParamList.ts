import { NavigatorScreenParams, RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { IToDoItem } from "../Components/ToDoItem";
import { DrawerParamList } from "../Drawer/DrawerParamList";

export type RootStackParamList = {
    Root: NavigatorScreenParams<DrawerParamList>,
    GoBackButton: undefined
} & ModalParamList

export type ModalParamList = {
    AddNewEmployeeModal: { submit: React.MutableRefObject<() => string>, employeeName: string },
    EditTodoModal: { userId: string, todoId: string }
}


export type StackNavProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>,
    route: RouteProp<RootStackParamList, T>
}