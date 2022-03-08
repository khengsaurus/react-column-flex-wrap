import { render } from "@testing-library/react";
import { cleanup, renderHook } from "@testing-library/react-hooks";
import React from "react";
import useDynamicWidth from "../../src/hooks/useDynamicWidth";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe("useDynamicWidth with props", () => {
  it("call useLayoutEffect once to set CSS properties via props", () => {
    const spyLayoutEffect = jest.spyOn(React, "useLayoutEffect");
    const mockRef = { current: null };
    render(
      <div ref={mockRef}>
        <div style={{ height: 50, width: 50 }} />
      </div>
    );
    renderHook(() => {
      useDynamicWidth({
        columnRef: mockRef,
        columnReverse: true,
        wrapReverse: true,
        maxHeight: 100,
      });
    });

    const styles = window.getComputedStyle(mockRef.current);
    expect(styles.display).toBe("flex");
    expect(styles.flexDirection).toBe("column-reverse");
    expect(styles.flexWrap).toBe("wrap-reverse");
    expect(styles.width).toBe("50px");
    expect(spyLayoutEffect).toHaveBeenCalledTimes(1);
  });
});
