import {useState} from "react";
import {province} from "@/province-sigle";
import Downshift, {useCombobox} from "downshift";

export const AutocompleteProvince = () => {
    const p = province.map(p => p.provincia)
	const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: p,
    onInputValueChange: ({ inputValue }) => {
      // Handle input value changes here
    },
  });

  return (
    <div {...getComboboxProps}>
        <input {...getInputProps()} />
        <ul {...getMenuProps()}>
            {isOpen &&
            p
                .filter((item) => !inputValue || item.includes(inputValue))
                .map((item, index) => (
                    <li
                        style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
                        key={`${item}${index}`}
                        {...getItemProps({ item, index })}
                    >
                        {item}
                    </li>
                ))}
        </ul>
    </div>
  );
}