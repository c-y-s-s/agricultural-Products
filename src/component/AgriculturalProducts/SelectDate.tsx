import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";
import { setDate } from "../../reducers/AgriculturalProductsController";
import { useDispatch } from "react-redux";
import * as Styles from "./style";
const SelectDate: FC<any> = ({ setBeforeDate, setSelectData }) => {
  const dispatch = useDispatch();
  const dateData: Dayjs = dayjs();
  console.log(setBeforeDate, setSelectData);
  return (
    <Styles.SelectDateContainer className="select-date">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            className="date-picker"
            defaultValue={
              // api 早上7點才更新,7點前先渲染前一天的
              dateData.hour() >= 7 ? dateData : dateData.subtract(1, "day")
            }
            onChange={(e: Dayjs | null) => {
              if (e === null) return;
              // 選到的日期前一天
              const beforeDate: any = dayjs(e).subtract(1, "day");
              const beforeOneYear: any = beforeDate && beforeDate?.$y - 1911;
              const beforeOneMonth =
                beforeDate.$M + 1 < 10
                  ? "0" + (beforeDate.$M + 1)
                  : beforeDate.$M + 1;
              const beforeOneDay =
                beforeDate.$D < 10 ? "0" + beforeDate.$D : beforeDate.$D;

              // 選到的日期
              const nowDate: any = dayjs(e);
              const selectYear = e.year() - 1911;
              const selectMonth =
                e.month() + 1 < 10 ? "0" + (e.month() + 1) : e.month() + 1;
              const selectDay = nowDate.$D < 10 ? "0" + nowDate.$D : nowDate.$D;
              setBeforeDate(
                `${beforeOneYear}.${beforeOneMonth}.${beforeOneDay}`
              );
              setSelectData(`${selectYear}.${selectMonth}.${selectDay}`);

              dispatch(
                setDate(`${selectYear + 1911}/${selectMonth}/${selectDay}`)
              );
            }}
            format="YYYY-MM-DD"
          />
        </DemoContainer>
      </LocalizationProvider>
    </Styles.SelectDateContainer>
  );
};

export default SelectDate;
