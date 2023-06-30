import {
  convertToEnglishDigit,
  generateUniqueID,
  getTotalAmountOfExpenses,
  numberFormat,
  removeWhiteSpaceFromString,
} from "@/utils/resources/Functions";

describe("Several global functions", () => {
  it("Should seprate numbers with comman(,) on every three digits", () => {
    // Arrange
    const inputNumber = 123456789;
    const inputString = "987654321";
    const expectedNumber = "123,456,789";
    const expectedString = "987,654,321";

    // Act
    const numberFormatResult = numberFormat(inputNumber);
    const stringFormatResult = numberFormat(inputString);

    // Assertion
    expect(numberFormatResult).toEqual(expectedNumber);
    expect(stringFormatResult).toEqual(expectedString);
  });

  it("Should convert all the digits to English", () => {
    // Arrange
    const input = "123456789";
    const output = "123456789";

    // Act
    const result = convertToEnglishDigit(input);

    // Assertion
    expect(result).toEqual(output);
  });

  it("Should remove all the whitespaces from a string", () => {
    // Arrange
    const input = "1   2548 35 49 55  21       989        872";
    const output = "1254835495521989872";

    // Act
    const result = removeWhiteSpaceFromString(input);

    // Assertion
    expect(result).toEqual(output);
  });

  it("Should generate unique ID in a array list", () => {
    // Arrange
    interface type {
      id: number;
    }
    const input1: type[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const input2: type[] = [{ id: 152 }, { id: 153 }, { id: 154 }];
    const input3: type[] = [];
    const output1 = 5;
    const output2 = 155;
    const output3 = 1;

    // Act
    const result1 = generateUniqueID(input1);
    const result2 = generateUniqueID(input2);
    const result3 = generateUniqueID(input3);

    // Assertion
    expect(result1).toEqual(output1);
    expect(result2).toEqual(output2);
    expect(result3).toEqual(output3);
  });

  it("Should calculate the total amount of expenses and return as formatted number", () => {
    // Arrange
    const input2: undefined = undefined;
    const input1: any[] = [];
    const input3: any[] = [
      { amount: 365000 },
      { amount: 428000 },
      { amount: 1000000 },
    ];
    const output1 = "0";
    const output2 = "0";
    const output3 = "1,793,000";

    // Act
    const result1 = getTotalAmountOfExpenses(input1);
    const result2 = getTotalAmountOfExpenses(input2);
    const result3 = getTotalAmountOfExpenses(input3);

    // Assertion
    expect(result1).toEqual(output1);
    expect(result2).toEqual(output2);
    expect(result3).toEqual(output3);
  });
});
