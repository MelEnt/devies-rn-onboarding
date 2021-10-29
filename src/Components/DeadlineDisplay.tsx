import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SWE_MONTHS } from "../Data/Constants";

interface DeadlineDisplay {
    date: Date,
    onPressDate: () => void,
    hasNotification: boolean,
    onSetNotification: () => void
}

const LOCALE = "sv-SE";

function addZero(i: number | string) {
    let input = i;
    if (typeof i === "string") {
        input = Number(i);
    }
    return input < 10 ? "0" + input : input;
}

function DeadlineDisplay(props: DeadlineDisplay) {
    const { date, onPressDate, hasNotification, onSetNotification } = props;
    // const formattedDate = new Date(date).;
    const isAndroid = Platform.OS === "android";

    let stringDate, stringTime;

    if (isAndroid) {
        stringDate = date.getDate() + ":e " + SWE_MONTHS[date.getMonth()] + " '" + date.getFullYear().toString().substring(2);
        stringTime = addZero(date.getHours()) + ":" + addZero(date.getMinutes());
    } else {
        stringDate = date.toLocaleDateString(LOCALE, { day: "2-digit" }) + ":e "
            + date.toLocaleString(LOCALE, { month: "short" }) +
            " '" + date.getFullYear().toString().substring(2);
        stringTime = date.toLocaleString(LOCALE, { hour: "numeric" }) +
            ":" + addZero(date.toLocaleString(LOCALE, { minute: "numeric" }));
    }
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Pressable onPress={() => console.log("ABOW")} style={{ flex: 1, backgroundColor: "orange", alignItems: "center", borderRadius: 10, padding: 5 }}>
                {hasNotification ?
                    <MaterialIcons name="notifications-on" size={25} color="black" /> :
                    <MaterialIcons name="notifications-off" size={25} color="black" />}
            </Pressable>
            <Pressable onPress={onPressDate}
                style={{ flex: 4, marginLeft: 10, backgroundColor: "lightblue", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                <Text style={deadlineStyles.dateText}>
                    {date ? stringDate + " • " + stringTime : "Sätt datum"}
                </Text>
            </Pressable>
        </View>
    )
}

const deadlineStyles = StyleSheet.create({
    dateText: {
        fontSize: 18
    }
})

export default DeadlineDisplay;