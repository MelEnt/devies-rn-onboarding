import React, { useEffect, useState } from 'react'
import { Keyboard, Platform, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import DeadlineDisplay from './DeadlineDisplay';


interface DatePickerProps {
    value: string,
    onChange: (date: Date) => void,
    label: string,
    hasNotification: boolean
}



export function DatePicker({ label = "label", value, onChange, hasNotification }: DatePickerProps) {
    const [showDate, setShowDate] = useState<boolean>(false);
    const [showTime, setShowTime] = useState<boolean>(false);
    const [tempDate, setTempDate] = useState<Date>(new Date(value));



    const [newDate, setNewDate] = useState<Date>(new Date(value));

    const isAndroid = Platform.OS === "android";

    function handleSetDate(e: any, date?: Date) {
        // console.log("onchange", date, tempDate, showDate);
        if (date) {
            setTempDate(date);
        };

        if (isAndroid) {
            if (date) {
                setShowTime(true);
                setShowDate(false);
            }

            setShowDate(false);
        }

    }

    function handleSetTime(e: any, date?: Date) {
        if (date) {
            const outputDate = new Date(date);
            outputDate.setSeconds(0);
            setTempDate(date);
            console.log("OuTPUTDATE", outputDate, date);
        }

        setShowTime(false);
        setShowDate(false);
    }

    function handleShowDatePicker() {
        setShowDate(true);
        Keyboard.dismiss();
    }

    function handleCloseDatePicker() {
        setShowDate(false);
        setTempDate(new Date(value));
    }

    function handleConfirmDate() {
        setNewDate(tempDate);
        handleCloseDatePicker();
    }

    function handleSetNotification() {

    }

    console.log(showDate, showTime);

    return (
        <View>
            <View>
                <DeadlineDisplay
                    date={tempDate}
                    onPressDate={handleShowDatePicker}
                    hasNotification={hasNotification}
                    onSetNotification={handleSetNotification} />
            </View>
            {/* {isAndroid ? } */}
            {isAndroid ?
                <View>
                    {showDate && <DateTimePicker value={tempDate} mode={"date"}
                        display={"default"} onChange={handleSetDate} />}
                    {showTime && <DateTimePicker value={tempDate} mode={"time"}
                        display={"default"} onChange={handleSetTime} />}
                </View>
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