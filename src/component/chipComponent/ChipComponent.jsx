import React, { useEffect, useRef, useState } from "react";
import "./ChipComponent.css";

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedChipIndex, setHighlightedChipIndex] = useState(null);
  const inputRef = useRef(null);

  const items = [
    { name: "Alice", avatar: "avatar1.png" },
    { name: "Bob", avatar: "avatar2.png" },
    { name: "Charlie", avatar: "avatar3.png" },
    { name: "David", avatar: "avatar4.png" },
    { name: "Eva", avatar: "avatar5.png" },
    { name: "Frank", avatar: "avatar6.png" },
    { name: "Grace", avatar: "avatar7.png" },
    { name: "Henry", avatar: "avatar8.png" },
    { name: "Ivy", avatar: "avatar9.png" },
    { name: "Jack", avatar: "avatar10.png" },
  ];

  
  useEffect(() => {
    setFilteredItems(items);
  }, []);

  const chipsContains =(item) => {
    let label = false;
    chips.forEach((i)=>{
      if(i.name===item.name)
        label=true;
    })
    return label;
  }
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered =
      value === ""
        ? items.filter((item) => !chips.includes(item))
        : items.filter(
            (item) =>
              !chipsContains(item) ||
              item.name.toLowerCase().includes(value.toLowerCase())
          );

    setFilteredItems(filtered);
    setShowDropdown(true); 
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setInputValue("");
    setFilteredItems((prevFilteredItems) =>
      prevFilteredItems.filter((filteredItem) => filteredItem !== item)
    );

    setShowDropdown(false);
  };

  const handleChipRemove = (removedChipIndex) => {
    const removedChip = chips[removedChipIndex];
    setChips(chips.filter(( index) => index !== removedChipIndex));
    setFilteredItems([...filteredItems, removedChip]);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Backspace" && inputValue === "" && chips.length > 0) {
      if (highlightedChipIndex !== null) {
        handleChipRemove(highlightedChipIndex);
        setHighlightedChipIndex(null);
      } else {
        setHighlightedChipIndex(chips.length - 1);
      }
    }
  };

  const handleInputClick = () => {
    setShowDropdown(true);
  };

  const handleDropdownBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
      setHighlightedChipIndex(null); 
    }, 100);
  };

  const handleChipClick = (index) => {
    setHighlightedChipIndex(index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, setShowDropdown]);

  return (
    <div className="auto-complete-input">
      <h2>Add Users</h2>
      <div className="input-container" ref={inputRef}>
        <div className="chips-container">
          {chips.map((chip, index) => (
            <div
              key={index}
              className={`chip ${
                highlightedChipIndex === index ? "highlighted" : ""
              }`}
              onClick={() => handleChipClick(index)}
            >
              <img
                src={require(`../../assets/${chip.avatar}`)}
                alt={chip.name}
                className="avatar"
              />
              {chip.name}
              <span
                onClick={() => handleChipRemove(index)}
                className="chip-remove"
              >
                x
              </span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onClick={handleInputClick}
          placeholder="Please select users"
          ref={inputRef}
          className="input-field"
          onBlur={handleDropdownBlur}
        />
        {showDropdown && (
          <ul className="items-list-dropdown">
            {filteredItems.map((item, index) => (
              <li
                key={index}
                onMouseDown={() => handleItemClick(item)}
                className="item-dropdown"
              >
                <img
                  src={require(`../../assets/${item.avatar}`)}
                  alt={item.name}
                  className="avatar"
                />
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChipComponent;
