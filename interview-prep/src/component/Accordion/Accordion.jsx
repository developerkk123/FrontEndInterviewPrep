import React from "react";
import "./style.css";
const Accordion = () => {
  const [active, setActive] = React.useState(0);
  const list = [
    {
      id: "1",
      title: "first",
      content: "First Accordion content",
    },
    {
      id: "2",
      title: "second",
      content: "Second Accordion content",
    },
  ];
  //   const accordion = document.getElementById("accordion");
  //   accordion.addEventListener("click", (event) => {
  //     console.log(event.target, "event");
  //   });
  const handleClick = (id) => {
    // console.log("clicked", id);
    setActive(id);
    // const activeElem = document.getElementsByClassName(`content-${id}`);
    // console.log(activeElem, "activeElem");
    // if (activeElem.length > 0) activeElem[0].style.display = "block";
    // activeElem.style.display = "block";
  };
  // console.log("active", active);
  return (
    <div className="accordion-wrapper">
      {list.map((item) => {
        return (
          <div
            onClick={() => handleClick(item.id)}
            id="accordion"
            key={item.title}
          >
            <div className="title">{item.title}</div>
            <div
              className="content display"
              style={{ display: active == item.id ? "block" : "none" }}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Accordion;
