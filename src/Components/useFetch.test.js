import React from "react";
import UseFetch from "./useFetch";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

// the below isnt working yet. it's still timing out and there's very little in docs about how to test custom hooks

describe("UseFetch hook", () => {
  // We will get the "Invariant Violation: Invalid hook call. Hooks can only be called inside of the body of a function component" error, because our hook is not being used within a React function component. Which is why we need the above "renderHook" method
  it("fetchData", done => {
    expect.assertions();
    const { result } = renderHook(() =>
      UseFetch("https://swapi.co/api/planets/3", false)
    );

    act(() => {
      result.current.fetchData();
    });

    expect(result.current.data)
      .resolves()
      .toMatchObject({
        name: "Yavin IV",
        rotation_period: "24",
        orbital_period: "4818",
        diameter: "10200",
        climate: "temperate, tropical",
        gravity: "1 standard",
        terrain: "jungle, rainforests",
        surface_water: "8",
        population: "1000",
        residents: [],
        films: ["https://swapi.co/api/films/1/"],
        created: "2014-12-10T11:37:19.144000Z",
        edited: "2014-12-20T20:58:18.421000Z",
        url: "https://swapi.co/api/planets/3/"
      });
  });
});