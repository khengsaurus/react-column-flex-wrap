import React from "react";
import { mount } from "enzyme";
import { render } from "@testing-library/react";
import Column from "../../src/components/Column";
import "@testing-library/jest-dom";
import util from "../../src/util";

function renderTestBox(key: number, dim: number, incrementDim = true) {
  return (
    <div
      key={`${key}`}
      style={{
        height: dim + (incrementDim ? key : 0),
        width: dim + (incrementDim ? key : 0),
      }}
      data-testid={"box-" + key}
    />
  );
}

function renderTestColumn(boxes: number) {
  return (
    <Column style={{ maxHeight: 50 }}>
      {[...Array(boxes).keys()].map((i) => renderTestBox(i, 20))}
    </Column>
  );
}

// beforeAll(() => {
//   jest
//     .spyOn(util, "getHeightWidth")
//     .mockImplementation((child: HTMLDivElement) => {
//       const { height, width } = child.style;
//       return { height: util.getNums(height, 2), width: util.getNums(width, 2) };
//     });
// });

// afterAll(() => {
//   jest.restoreAllMocks();
// });

describe("Renders Column with children and correct dimensions", () => {
  it("Test Column with 5 children of increasing dimensions", () => {
    function renderTestColumn(boxes: number) {
      return (
        <Column style={{ maxHeight: 50 }}>
          {[...Array(boxes).keys()].map((i) => renderTestBox(i, 20))}
        </Column>
      );
    }
    const { getByTestId } = render(renderTestColumn(5));

    const testColumn = getByTestId("rcfw-c");
    expect(testColumn).toBeTruthy();
    for (let i = 0; i < 5; i++) {
      expect(getByTestId("box-" + i)).toBeTruthy();
    }
    expect(testColumn).toHaveStyle("display: flex");
    expect(testColumn).toHaveStyle("flex-direction: column");
    expect(testColumn).toHaveStyle("max-height: 50px");
  });
});
