/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./datepicker.css"
import {
    addDays,
    addMonths,
    differenceInMonths,
    differenceInDays,
    format,
    isSameDay,
    lastDayOfMonth,
    startOfMonth,
    getISODay, startOfWeek, endOfWeek, eachDayOfInterval,
} from "date-fns";
type Props = {
    endDate2?: any
    selectDate?: any
    getSelectedDay?: any
    color?: string
    type?: any
    labelFormat?: any
}
export default function DatePicker({ endDate2 = '', selectDate, getSelectedDay, color, labelFormat }: Props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const endDate = 40;
    const startDate = startOfWeek(new Date())
    const lastDate: any = endOfWeek(startDate)//addDays(startDate, endDate || 50);
    const primaryColor = color || 'rgb(54, 105, 238)';
    const selectedStyle: any = {
        fontWeight: "bold",
        width: "48px",
        height: "48px",
        borderRadius: "8px",
        background: "linear-gradient(108.24deg, #42BB73 40.19%, #98F2BD 129.14%) ",
        border: " 1px solid rgba(92, 185, 129, 0.4)",
        boxSizing: "border-box",
    };


    const getStyles = (day: any) => {
        if (isSameDay(day, selectedDate)) {
            return true;
            return (selectedStyle);
        }
        return false
    };

    const getId = (day: any) => {
        if (isSameDay(day, selectedDate)) {
            return ('selected')
        } else {
            return ("")
        }
    };

    function renderDays() {
        const dayFormat = "EEEEEE";//"E";
        const dateFormat = "d";
        const months = [];
        let days = [];
        // use next return one if needed more than one week
        for (let i = 0; i <= differenceInDays(lastDate, startDate); i++) {
            days.push(
                <div id={`${getId(addDays(startDate, i))}`}
                    className={`dateDayItem ${getStyles(addDays(startDate, i)) ? 'active' : ''}`}
                    key={i}
                    onClick={() => onDateClick(addDays(startDate, i))}
                >
                    <div className={"dateLabel"}>
                        {format(addDays(startDate, i), dateFormat)}
                    </div>
                    <div className={"dayLabel"}>
                        {format(addDays(startDate, i), dayFormat)}
                    </div>
                </div>
            );
        }
        return <div id={"container"} className={"dateListScrollable"}>{days}</div>;
        for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
            let start, end;
            const month: any = startOfMonth(addMonths(startDate, i));
            start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
            end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));
            for (let j = start; j < end; j++) {
                days.push(
                    <div id={`${getId(addDays(startDate, j))}`}
                        className={`dateDayItem ${getStyles(addDays(month, j)) ? 'active' : ''}`}
                        /* key={addDays(month, j)} */
                        onClick={() => onDateClick(addDays(month, j))}
                    >
                        <div className={"dateLabel"}>
                            {format(addDays(month, j), dateFormat)}
                        </div>
                        <div className={"dayLabel"}>
                            {format(addDays(month, j), dayFormat)}
                        </div>
                    </div>
                );
            }
            months.push(
                <div className={"monthContainer"} key={month}>
                    {/*  <span className={"monthYearLabel"} style={labelColor}>
                        {format(month, labelFormat || "MMMM yyyy")}
                    </span> */}
                    <div className={"daysContainer"} >
                        {days}
                    </div>
                </div>
            );
            days = [];
        }
        return <div id={"container"} className={"dateListScrollable"}>{months}</div>;
    }

    const onDateClick = (day: any) => {
        setSelectedDate(day);
        if (getSelectedDay) {
            getSelectedDay(day);
        }
    };

    useEffect(() => {
        if (getSelectedDay) {
            if (selectDate) {
                getSelectedDay(selectDate);
            } else {
                getSelectedDay(new Date());
            }
        }
    }, []);

    useEffect(() => {
        const now = new Date();
        const arr = eachDayOfInterval({ start: startOfWeek(now), end: endOfWeek(now) });

        if (selectDate) {
            if (!isSameDay(selectedDate, selectDate)) {
                setSelectedDate(selectDate);
                setTimeout(() => {
                    let view = document.getElementById('selected');
                    if (view) {
                        view.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                    }
                }, 20);
            }
        }
    }, [selectDate]);



    return (
        <div className={"container"}>
            {/*   <div className={"buttonWrapper"}>
                <button className={"button"} style={buttonColor} onClick={prevWeek}>←</button>
            </div> */}
            {renderDays()}
            {/*  <div className={"buttonWrapper"}>
                <button className={"button"} style={buttonColor} onClick={nextWeek}>→</button>
            </div> */}
        </div>
    )
}