import { useState, useEffect, useRef } from "react";
import { FcCollapse, FcExpand } from "react-icons/fc";
import Panel from "./Panel";

function Dropdown({ options, onChange, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) return;

      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    return (
      <div onClick={() => handleOptionClick(option)} key={option.value}>
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl} className="dropdown">
      <Panel onClick={handleClick}>
        {value?.label || "Select..."}
        {isOpen ? <FcExpand /> : <FcCollapse />}
      </Panel>
      {isOpen && <Panel>{renderedOptions}</Panel>}
    </div>
  );
}

export default Dropdown;
