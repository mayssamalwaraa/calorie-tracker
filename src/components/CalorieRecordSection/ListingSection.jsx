import RecordList from "./RecordList";
import styles from "./ListingSection.module.css";
import { useContext, useState } from "react";
import AppContext from "../../context/app-context";
import { useEffect } from "react";
import { useRef } from "react";

function ListingSection(props) {
  const { allRecords } = props;
  const { currentDate, currentDateStr, setCurrentDate } =
    useContext(AppContext);
  const refreshCount = useRef(0);
  useEffect(() => {
    refreshCount.current++;
  });

  const dateHandleChange = (e) => {
    setCurrentDate(e.target.value);
  };
  const dateFilter = (record) => {
    return (
      record.date.getDate() === currentDate.getDate() &&
      record.date.getMonth() === currentDate.getMonth() &&
      record.date.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <>
      <label className={styles["listing-picker-label"]} htmlFor="listingDate">
        Select Date
      </label>
      <input
        className={styles["listing-picker-input"]}
        type="date"
        id="listingDate"
        value={currentDateStr}
        onChange={dateHandleChange}
      />
      <RecordList records={allRecords.filter(dateFilter)} />
      <p>refresh counter :{refreshCount.current}</p>
    </>
  );
}

export default ListingSection;
