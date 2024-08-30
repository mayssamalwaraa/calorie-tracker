import { useContext } from "react";
import AppContext from "../../context/app-context";
import CalorieRecord from "./CalorieRecord";
import styles from "./RecordList.module.css";
import { Link } from "react-router-dom";

function RecordList(props) {
  const { totalCalories } = useContext(AppContext);
  const resultElement = props.records?.length ? (
    <ul className={styles["record-list"]}>
      {props.records.map((record) => (
        <li className={styles["list-item"]} key={record.id}>
          <Link to={`${record.id}`}>
            <CalorieRecord
              date={record.date}
              meal={record.meal}
              content={record.content}
              calorie={record.calories}
            />
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles.placeholder}>No records found for this date</div>
  );
  return (
    <>
      {resultElement}
      <label>Total Calories : {totalCalories}</label>
    </>
  );
}

export default RecordList;
