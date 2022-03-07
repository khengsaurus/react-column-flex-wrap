import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React, { CSSProperties } from "react";
import Column from "../../src/components/Column";
import "./testStyles.css";

beforeAll(() => {
  process.env.test = "rcfw-test";
});

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

function renderTestColumn(
  boxes: number,
  style?: CSSProperties,
  className?: string
) {
  return (
    <Column className={className} style={style} id="test-column">
      {[...Array(boxes).keys()].map((i) => renderTestBox(i, 20))}
    </Column>
  );
}

describe("Renders Column with children and correct dimensions", () => {
  it("no styles, defaults to column-wrap", () => {
    const { getByTestId } = render(renderTestColumn(1));

    const testColumn = getByTestId("rcfw-c");
    expect(testColumn).toBeTruthy();
    expect(testColumn).toHaveStyle("display: flex");
    expect(testColumn).toHaveStyle("flex-direction: column");
    expect(testColumn).toHaveStyle("flex-wrap: wrap");
  });

  it("column-wrap, max-height via in-line style, 5 children of dimensions increasing from 20px by 1px", () => {
    const { getByTestId } = render(renderTestColumn(5, { maxHeight: 50 }));

    const testColumn = getByTestId("rcfw-c");
    expect(testColumn).toBeTruthy();
    for (let i = 0; i < 5; i++) {
      const box = getByTestId("box-" + i);
      expect(box).toBeTruthy();
      expect(box).toHaveStyle(`width: ${20 + i}px`);
    }
    expect(testColumn).toHaveStyle("display: flex");
    expect(testColumn).toHaveStyle("flex-direction: column");
    expect(testColumn).toHaveStyle("flex-wrap: wrap");
    expect(testColumn).toHaveStyle("max-height: 50px");
    expect(testColumn).toHaveStyle("width: 68px"); // 21px + 23px + 24px
  });

  it("column-wrap with css, 5 children of dimensions increasing from 20px by 1px", () => {
    const { getByTestId } = render(
      renderTestColumn(5, {}, "column-reverse-wrap-reverse _50px")
    );

    const testColumn = getByTestId("rcfw-c");
    expect(testColumn).toBeTruthy();
    for (let i = 0; i < 5; i++) {
      const box = getByTestId("box-" + i);
      expect(box).toBeTruthy();
      expect(box).toHaveStyle(`width: ${20 + i}px`);
    }
    expect(testColumn).toHaveStyle("display: flex");
    expect(testColumn).toHaveStyle("flex-direction: column-reverse");
    expect(testColumn).toHaveStyle("flex-wrap: wrap-reverse");
    expect(testColumn).toHaveStyle("max-height: 50px");
    expect(testColumn).toHaveStyle("width: 68px"); // 21px + 23px + 24px
  });
});
