import { useContext } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { useEffect, useReducer, useState } from "react";
import AppContext from "../../context/app-context";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import styles from "./CalorieRecordEdit.module.css";

const DEFAULT_VALUE = {
  meal: true,
  content: false,
  calories: true,
};
function formReducer(state, action) {
  const { key, value, auxvalue } = action;

  let valid = false;
  switch (key) {
    case "content":
      valid =
        (value === "sport" && auxvalue < 0) ||
        (value !== "sport" && auxvalue >= 0);
      return {
        ...state,
        content: !!value,
        calories: valid,
      };
    case "calories":
      valid =
        (auxvalue === "sport" && value < 0) ||
        (auxvalue !== "sport" && value >= 0);
      return {
        ...state,
        calories: valid,
      };

    default:
      return {
        ...state,
        meal: !!value,
      };
  }
}
function CalorieRecordEdit(props) {
  const {
    currentDate,
    currentDateStr,
    setCurrentDate,
    totalCalories,
    isValidDate,
  } = useContext(AppContext);
  const [fromState, dispatchFn] = useReducer(formReducer, DEFAULT_VALUE);
  const { content: isContentValid, calories: isCaloriesValid } = fromState;
  const contentRef = useRef();
  const caloriesRef = useRef();
  const mealRef = useRef();
  const isValidForm = useMemo(() => {
    return !!currentDateStr && isContentValid && isCaloriesValid;
  }, [currentDateStr, isContentValid, isCaloriesValid]);
  useEffect(() => {
    if (!isContentValid) contentRef.current.focus();
  }, [isContentValid]);

  const onDateChange = (event) => {
    setCurrentDate(event.target.value);
  };
  const onMealBlur = (event) => {
    dispatchFn({
      key: "meal",
      value: event.target.value,
    });
  };
  const onContentBlur = (event) => {
    dispatchFn({
      key: "content",
      value: event.target.value,
      auxvalue: Number(caloriesRef.current.value),
    });
  };
  const onCaloriesBlur = (event) => {
    dispatchFn({
      key: "calories",
      value: Number(event.target.value),
      content: contentRef.current.value,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    //date{value,valid}
    //{date:value,meal:value}
    console.log(contentRef.current.value);
    props.onFormSubmitHandler({
      date: currentDate,
      meal: mealRef.current.value,
      content: contentRef.current.value,
      calories: Number(caloriesRef.current.value),
    });

    console.log({ fromState });
  };

  const onCancelHandler = useCallback(() => {
    if (isValidForm) props.onCancel();
  }, [isValidForm]);

  return (
    <form onSubmit={onSubmitHandler}>
      <p className={styles.warning}>You spent {totalCalories} calories</p>
      <FormInput
        type="date"
        id="date"
        label="Date"
        onChange={onDateChange}
        value={currentDateStr}
        isValid={isValidDate}
      />
      <FormInput
        type="select"
        label="Meal"
        id="meal"
        onBlur={onMealBlur}
        value={fromState.meal.value}
        className={styles["form-input"]}
        ref={mealRef}
        isValid
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </FormInput>
      <FormInput
        label="Content"
        id="content"
        type="text"
        onBlur={onContentBlur}
        isValid={isContentValid}
        ref={contentRef}
      />
      <FormInput
        label="Calories"
        id="calories"
        type="number"
        onBlur={onCaloriesBlur}
        isValid={isCaloriesValid}
        ref={caloriesRef}
      />

      <footer>
        <div className={styles.footer}>
          <Button disabled={!isValidForm} varient="primary">
            Add Record
          </Button>
          <Button type="button" onClick={onCancelHandler} varient="secondary">
            Cancel
          </Button>
        </div>
      </footer>
    </form>
  );
}

export default CalorieRecordEdit;
