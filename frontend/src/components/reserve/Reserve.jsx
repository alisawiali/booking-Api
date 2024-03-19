import React, { useContext, useState } from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { serachContext } from "../../context/serachContext";

// Reserve
const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedtRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(serachContext);

  const getDatesInRange = (startDates, endDates) => {
    const start = new Date(startDates);
    const end = new Date(endDates);
    const date = new Date(start.getTime());

    const list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  // Checkt die Verfügbarkeit eines Zimmers für die ausgewählten Daten
  const isAvailable = (roomNumber) => {
    // Durchlaufe die Liste der unbelegten Daten für das Zimmer
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    // Das Zimmer ist verfügbar, wenn die ausgewählten Daten nicht in den unbelegten Daten enthalten sind
    return !isFound;
  };
  //    Check in and out
  const handelSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedtRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms);

  const handelBtnClick = () => {};
  return (
    <div className="reserve">
      <div className="reContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div key={item.id} className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rselectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handelSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handelBtnClick} className="rButton">
          Reserve now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
