import React, { useEffect, useState } from 'react'
import { Keyboard, Platform, Pressable, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createIconSetFromFontello } from '@expo/vector-icons';
import { Button, Modal, Portal, Text } from 'react-native-paper';


interface DatePickerProps {
    display: (date: string) => JSX.Element,
    value: string,
    onChange: (date: string) => void,
    label: string
}

export function DatePicker({ label = "label", display, value, onChange }: DatePickerProps) {
    const [showDate, setShowDate] = useState<boolean>(false);
    const [showTime, setShowTime] = useState<boolean>(false);
    const [tempDate, setTempDate] = useState(new Date());
    const [tempTime, setTempTime] = useState(new Date());

    const [newDate, setNewDate] = useState<string>(value);

    const isAndroid = Platform.OS === "android";

    console.log("value", value);
    function handleSetDate(e: any, date?: Date) {
        console.log("onchange", date, tempDate, showDate);
        if (date) {
            setTempDate(date);
        };

        if (isAndroid) {
            if (date) {
                setShowTime(true);
            }
            setShowDate(false);
            // setNewDate(date);
        }
    }

    function handleSetTime(e: any, date?: Date) {
        if (date) {
            setTempTime(date);
            console.log("TIME", date.getMinutes(), date.getHours());
        }
        setShowTime(false);
    }

    function handleShowDatePicker() {
        setShowDate(true);
        Keyboard.dismiss();
    }

    function handleCloseDatePicker() {
        setShowDate(false);
    }

    function handleConfirmDate() {

    }

    return (
        <View style={{ backgroundColor: "grey" }}>
            <Pressable onPress={handleShowDatePicker}>
                {display(value)}
                <Pressable>

                </Pressable>
            </Pressable>
            {/* {isAndroid ? } */}
            {isAndroid ?
                <>
                    {showDate && <DateTimePicker value={tempDate} mode={"date"}
                        display={"default"} onChange={handleSetDate} />}
                    {showTime && <DateTimePicker value={tempTime} mode={"time"}
                        display={"default"} onChange={handleSetTime} />}
                </>
                :
                <Portal>
                    <Modal dismissable onDismiss={handleCloseDatePicker}
                        visible={showDate} contentContainerStyle={styles.modalContainerStyle}>
                        <View style={{ flex: 1 }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontSize: 24, padding: 10 }}>
                                    {label}
                                </Text>
                            </View>
                            {showDate && <DateTimePicker value={tempDate} mode={"datetime"}
                                display={"spinner"} onChange={handleSetDate} />}
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <Button color={"blue"} onPress={handleConfirmDate} >{"Bekräfta"}</Button>
                                </View>
                                <View style={{ flex: 1, marginTop: 20 }}>
                                    <Button color={"red"} onPress={handleCloseDatePicker} >{"Avbryt"}</Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Portal>}

        </View>
    );
}


const styles = StyleSheet.create({
    modalContainerStyle: {
        backgroundColor: "white",
        flex: .5,
        margin: 15,
        padding: 15,
        borderRadius: 10
    }
})