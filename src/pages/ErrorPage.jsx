import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const INITIAL_COUNTER = 10;
const SET_COUNTER_SECONDS = 1000;
const HOME_PATH = "/";
export function ErrorPage() {
  const [counter, setCounter] = useState(INITIAL_COUNTER);
  const navigate = useNavigate();
  const setInervalRef = useRef();
  useEffect(() => {
    if (counter === 0) {
      clearInterval(setInervalRef.current);
      navigate(HOME_PATH);
    }
  }, [counter]);
  useEffect(() => {
    setInervalRef.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, SET_COUNTER_SECONDS);
    return () => {
      clearInterval(setInervalRef.current);
    };
  }, []);
  return (
    <>
      <h1>Something went wrong</h1>
      <p>you will redirect in :{counter}</p>
      <p>
        go back to <Link to={HOME_PATH}>Home page</Link>
      </p>
    </>
  );
}
