import { RouteProp } from "@react-navigation/core"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { ModalParamList } from "../Main/RootStackParamList"


export type DrawerParamList = {
    Onboarding: { userId: string, name: string }
} & ModalParamList

export type DrawerStackNavProps<T extends keyof DrawerParamList> = {
    navigation: DrawerNavigationProp<DrawerParamList, T>,
    route: RouteProp<DrawerParamList, T>
}