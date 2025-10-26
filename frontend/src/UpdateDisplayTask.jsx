import React from "react";
import { useState, useEffect } from "react";

const UpdateDisplayTask = ({ taskData }) => {
  const [listObject, setListObject] = useState({ taskName: "", upd: [] });

  const setZoomInBox = async (props) => {
    setListObject(props);
  };
  const setZoomInBoxMouseOut = async () => {
    setListObject({ taskName: "", upd: [] });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <section className="main">
        <table
          style={{ width: "500px", display: "flex", "flex-direction": "row" }}
        >
          <thead></thead>
          <tbody>
            {taskData.map((task) => (
              <tr
                key={task.id}
                onMouseEnter={() => setZoomInBox(task)}
                onMouseLeave={() => setZoomInBoxMouseOut()}
              >
                <td style={{ "text-align": "left" }}>{task.taskName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table style={{ width: "500px" }}>
          <thead>{listObject.taskName}</thead>
          <tbody>
            {listObject.upd ? (
              listObject.upd.map((update) => (
                <tr key={update.id}>
                  <td>
                    <div
                      className="square"
                      style={{ background: update.color }}
                    ></div>
                  </td>
                  <td>{update.date}</td>
                  <td>{update.description}</td>
                </tr>
              ))
            ) : (
              <div></div>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UpdateDisplayTask;
