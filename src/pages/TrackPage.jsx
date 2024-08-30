import { useState } from "react";
import ListingSection from "../components/CalorieRecordSection/ListingSection";
import CalorieRecordEdit from "../components/edit/CalorieRecordEdit";
import Modal from "react-modal";
import styles from "./TrackPage.module.css";
import { useEffect } from "react";
const LOCAL_STORAGE_KEY = "caloriesRecords";
const INITAIL_RECORD = [
  {
    id: 1,
    date: new Date(2023, 6, 3),
    meal: `Breakfast`,
    content: `Eggs`,
    calories: 340,
  },
  {
    id: 2,
    date: new Date(2023, 5, 3),
    meal: `Lunch`,
    content: `Eggs`,
    calories: 500,
  },
  {
    id: 3,
    date: new Date(2023, 6, 3),
    meal: `Breakfast`,
    content: `Eggs`,
    calories: 550,
  },
  {
    id: 4,
    date: new Date(2023, 6, 3),
    meal: `Breakfast`,
    content: `Eggs`,
    calories: 450,
  },
];
export function TrackPage() {
  const [records, setRecords] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }
  function loadRecords() {
    const storageRecord = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageRecord != null && storageRecord !== "undefined") {
      setRecords(
        JSON.parse(storageRecord).map((record) => ({
          ...record,
          date: new Date(record.date),
          calories: Number(record.calories),
        }))
      );
    } else {
      setRecords([]);
    }
  }
  useEffect(() => {
    if (!records) {
      loadRecords();
    } else {
      save();
    }
  }, [records]);
  const handelOpenModal = () => {
    setIsModalOpen(true);
  };
  const handelCloseModal = () => {
    setIsModalOpen(false);
  };
  const onFormSubmitHandler = (record) => {
    const formatedRecord = {
      ...record,
      date: record.date,
      id: crypto.randomUUID(),
    };
    setRecords((prev) => [formatedRecord, ...prev]);
    handelCloseModal();
    console.log({ record });
  };
  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none", // Remove the border
      padding: "0px", // Remove padding
      borderRadius: "var(--theme-border-radius-smooth)",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  return (
    <div className="App">
      <h1 className={styles.title}>Calorie Traker</h1>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handelCloseModal}
        contentLabel="Modale"
        style={modalStyles}
      >
        <CalorieRecordEdit
          onFormSubmitHandler={onFormSubmitHandler}
          onCancel={handelCloseModal}
        />
      </Modal>

      {records && <ListingSection allRecords={records} />}

      <button onClick={handelOpenModal} className={styles["open-modal-btn"]}>
        {" "}
        Track Food
      </button>
    </div>
  );
}
