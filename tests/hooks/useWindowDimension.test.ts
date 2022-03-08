import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import { useWindowDimensionsImpl } from "../../src/hooks/useWindowDimensions";

beforeEach(() => {
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
  });
  window.innerWidth = 500;
  window.innerHeight = 500;
});

describe("useWindowDimensionsImpl without react-singleton-hook", () => {
  it("should detect window dimensions and set proxy once on mount", () => {
    const callbackSpy = jest.spyOn(React, "useCallback");
    const { result } = renderHook(() => useWindowDimensionsImpl());

    expect(callbackSpy).toHaveBeenCalledTimes(2); // twice due to strict mode
    expect(result.current).toEqual(500500);
  });

  it("should call internal callback and set proxy on resize", () => {
    const { result } = renderHook(() => useWindowDimensionsImpl());

    expect(result.current).toEqual(500500);
    act(() => {
      Object.defineProperty(window, "innerHeight", {
        value: 400,
      });
      Object.defineProperty(window, "innerWidth", {
        value: 400,
      });
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toEqual(400400);
  });
});
