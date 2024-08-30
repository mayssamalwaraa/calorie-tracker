import styles from "./CalorieRecordDate.module.css";
const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function CalorieRecordDate(props) {
  const month = MONTH[props.date.getUTCMonth()];
  const day = props.date.getUTCDate();
  const year = props.date.getUTCFullYear();

  return (
    <div className={styles["record-date"]}>
      <div className={styles["record-date-month"]}>{month}</div>
      <div className={styles["record-date-day "]}>{day}</div>
      <div className={styles["record-date-year"]}>{year}</div>
    </div>
  );
}

export default CalorieRecordDate;
