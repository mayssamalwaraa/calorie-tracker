import { useContext } from "react";
import { useEffect } from "react";
import AppContext from "../../context/app-context";
import StyledRecordCell from "../common/StyledRecordCell";
import styles from "./CalorieRecord.module.css";
import CalorieRecordDate from "./CalorieRecordDate";
function CalorieRecord(props) {
  const { setTotalCalories: addCalories } = useContext(AppContext);
  useEffect(() => {
    addCalories((prev) => prev + props.calorie);
    return () => {
      addCalories((prev) => prev - props.calorie);
    };
  }, []);

  let recordContent = (
    <>
      <li>{props.meal}</li>
      <li>{props.content}</li>
    </>
  );
  if (props.calories <= 0) {
    recordContent = (
      <>
        <li></li>
        <li>Invalid record</li>
      </>
    );
  }
  return (
    <ul className={styles.record}>
      <li>
        <CalorieRecordDate date={props.date} />
      </li>

      {recordContent}

      <li className={styles["record - calories"]}>
        <StyledRecordCell>{props.calorie}</StyledRecordCell>
      </li>
    </ul>
  );
}
export default CalorieRecord;
