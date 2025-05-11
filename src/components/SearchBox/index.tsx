import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import {
  convertToEnglishDigit,
  removeWhiteSpaceFromString,
} from "@/src/utils/resources/Functions";
import TextField from "../TextField/TextField";

interface Props {
  onSearch(value: string): void;
  placeholder?: string;
}

const SearchBox = forwardRef<{ getValue(): string }, Props>(
  ({ onSearch, placeholder = "Search..." }, ref) => {
    const [value, setValue] = useState<string>("");

    useImperativeHandle(ref, () => ({
      getValue() {
        return value;
      },
    }));

    const handleOnChange = (value: string) => {
      const newValue = convertToEnglishDigit(value);
      setValue(removeWhiteSpaceFromString(newValue));
    };

    const handleOnClick = () => {
      onSearch(value);
    };

    return (
      <div className="flex w-full items-center space-x-2">
        <TextField
          id="search"
          type="text"
          placeholder={placeholder}
          value={value}
          onChangeText={handleOnChange}
          handleSubmit={handleOnClick}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleOnClick}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    );
  }
);

SearchBox.displayName = "SearchBox";

export default SearchBox;
