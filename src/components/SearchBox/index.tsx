import React, {
  useState,
  useImperativeHandle,
  ChangeEvent,
  forwardRef,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import {
  convertToEnglishDigit,
  removeWhiteSpaceFromString,
} from "@/src/utils/resources/Functions";

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

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = convertToEnglishDigit(e.target.value);
      setValue(removeWhiteSpaceFromString(newValue));
    };

    const handleOnClick = () => {
      onSearch(value);
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch(value);
      }
    };

    return (
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
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
