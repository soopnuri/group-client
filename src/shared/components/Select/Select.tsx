"use client";

import { useState } from "react";
import * as styles from "./styles.css";
import { FiChevronDown } from "react-icons/fi";

type Options = {
  label: string;
  value: string;
};
interface SelectProps {
  title?: string;
  options: Options[];
}

const Select = ({ title, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState(options[0] || { label: "", value: "" });

  const handleSetFilter = (option: Options) => {
    setFilter(option);
    setIsOpen(false);
  };

  return (
    <section className={styles.container}>
      <div
        className={`${styles.select} ${isOpen && styles.active}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {filter.label}{" "}
        <FiChevronDown
          size={14}
          className={`${isOpen ? styles.upArrow : styles.downArrow}`}
        />
      </div>
      {isOpen && (
        <section className={styles.optionBox}>
          <strong className={styles.selectTitle}>{title}</strong>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSetFilter(option)}
              className={`${styles.option} ${
                filter.value === option.value && styles.active
              }`}
            >
              {option.label}
            </div>
          ))}
        </section>
      )}
    </section>
  );
};

export default Select;
