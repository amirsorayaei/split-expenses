import React, {
  useState,
  useImperativeHandle,
  ChangeEvent,
  forwardRef,
} from "react";
import {
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  styled,
  TextFieldProps,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

import {
  convertToEnglishDigit,
  removeWhiteSpaceFromString,
} from "@/core/resources/Functions";

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
    padding-right: ${theme.spacing(0.7)}
`
);

interface Props {
  onSearch(value: string): void;
}

const SearchBox = forwardRef(
  ({ onSearch, placeholder, ...props }: TextFieldProps & Props, ref) => {
    const [value, setValue] = useState<string>("");

    useImperativeHandle(ref, () => ({
      setValue(value: string) {
        setValue(value);
      },
      getValue() {
        return value;
      },
    }));

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;

      if (props.inputMode === "numeric") {
        var regex = /^[\u06F0-\u06F90-9]+$/;

        if (!regex.test(newValue) && newValue !== "") {
          return;
        }
        newValue = removeWhiteSpaceFromString(newValue); // Remove all whitespace characters from the string
        newValue = convertToEnglishDigit(newValue);
      }

      setValue(newValue);
    };

    const onClickSearch = () => {
      onSearch(value);
    };

    const onKeyDown = (e: any) => {
      //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        onClickSearch();
      }
    };

    return (
      <FormControl variant="outlined" fullWidth>
        <OutlinedInputWrapper
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" size="small" onClick={onClickSearch}>
                {"جستجو"}
              </Button>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
);

SearchBox.displayName = "SearchBox";

export default SearchBox;
