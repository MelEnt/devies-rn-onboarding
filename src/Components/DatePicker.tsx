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
    const [confirmedDate, setConfirmedDate] = useState<Date>(new Date(value));
    const isAndroid = Platform.OS === "android";


    const [newDate, setNewDate] = useState<Date>(new Date(value));


    function handleSetDate(e: any, date?: Date) {
        // console.log("onchange", date, tempDate, showDate);
        if (isAndroid) {
            setShowDate(false);
        }

        if (date) {
            setTempDate(date);
        };

    }

    function handleSetTime(e: any, date?: Date) {
        setShowTime(false);
        if (date) {
            const outputDate = new Date(date);
            outputDate.setSeconds(0);
            setTempDate(date);
            console.log("OuTPUTDATE", outputDate, date);
        }
    }

    function handleShowDatePicker() {
        setShowTime(false);
        setShowDate(true);
        Keyboard.dismiss();
    }

    function handleShowTimePicker() {
        setShowTime(true);
        setShowDate(false);
        Keyboard.dismiss();
    }

    function handleCloseDatePicker() {
        setShowDate(false);
        setTempDate(confirmedDate);
    }

    function handleConfirmDate() {
        setShowDate(false);
        setConfirmedDate(tempDate);
    }

    function handleSetNotification() {

    }

    console.log(showDate, showTime, tempDate, new Date(value));

    return (
        <View>
            <View>
                <DeadlineDisplay
                    date={isAndroid ? tempDate : confirmedDate}
                    onPressDate={handleShowDatePicker}
                    onPressTime={isAndroid ? handleShowTimePicker : handleShowDatePicker}
                    hasNotification={hasNotification}
                    onSetNotification={handleSetNotification} />
            </View>
            {/* {isAndroid ? } */}
            {isAndroid &&
                <View>
                    {showDate && <DateTimePicker value={tempDate} mode={"date"}
                        display={"default"} onChange={handleSetDate} />}
                    {showTime && <DateTimePicker value={tempDate} mode={"time"}
                        display={"default"} onChange={handleSetTime} />}
                </View>}
            {!isAndroid &&
                <Portal>
                    <Modal dismissable onDismiss={() => setShowDate(false)}
                        visible={showDate} contentContainerStyle={styles.modalContainerStyle}>
                        <View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontSize: 24, padding: 10 }}>
                                    {label}
                                </Text>
                            </View>
                            <DateTimePicker value={tempDate} mode={"datetime"}
                                display={"spinner"} onChange={handleSetDate} />
                            <View>
                                <View>
                                    <Button color={"blue"} onPress={handleConfirmDate} >{"Bekräfta"}</Button>
                                </View>
                                <View>
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
        margin: 15,
        padding: 15,
        borderRadius: 10
    }
})