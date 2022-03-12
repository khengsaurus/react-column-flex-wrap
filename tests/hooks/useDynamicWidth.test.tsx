import { render } from "@testing-library/react";
import { cleanup, renderHook } from "@testing-library/react-hooks";
import React from "react";
import * as hooks from "../../src/hooks";
import { unfreezeImport } from "../helper";

beforeAll(() => {
  unfreezeImport(hooks, "useIsoEffect");
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe("useDynamicWidth with props", () => {
  it("when window is undefined, call useEffect once to set CSS properties via props", () => {
    const spyIsoEffect = jest.spyOn(hooks, "useIsoEffect");
    const mockRef = { current: null };
    render(
      <div ref={mockRef}>
        <div style={{ height: 50, width: 50 }} />
        <div style={{ height: 50, width: 50 }} />
        <div style={{ height: 50, width: 50 }} />
      </div>
    );
    renderHook(() => {
      hooks.useDynamicWidth({
        columnRef: mockRef,
        columnReverse: true,
        wrapReverse: true,
        maxHeight: 100,
      });
    });

    const styles = window.getComputedStyle(mockRef.current);
    expect(spyIsoEffect).toHaveBeenCalledTimes(1);
    expect(styles.display).toBe("flex");
    expect(styles.flexDirection).toBe("column-reverse");
    expect(styles.flexWrap).toBe("wrap-reverse");
    expect(styles.width).toBe("100px");
    // 3 child divs 50px each with container max-height 100px -> container width of 100px
  });
});
