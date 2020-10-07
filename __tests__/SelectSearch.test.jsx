import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import pretty from "pretty";
import SelectSearch from "../src/SelectSearch";

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

function renderFontOption(props, { stack, name }, snapshot, className) {
    return (
        <button {...props} className={className} type="button">
            <span style={{ fontFamily: stack }}>{name}</span>
        </button>
    );
}

function renderFontValue(valueProps, snapshot, className) {
    const { selectedOption } = snapshot;
    const style = {
        fontFamily:
            selectedOption && "stack" in selectedOption
                ? selectedOption.stack
                : null,
    };

    return (
        <input
            {...valueProps}
            className={className}
            style={style}
            value={snapshot.displayValue}
        />
    );
}

describe("Test SelectSearch component", () => {
    test("Renders with default props", () => {
        act(() => {
            render(
                <SelectSearch
                    options={[
                        { value: "foo", name: "Foo" },
                        { value: "bar", name: "Bar" },
                    ]}
                />,
                container
            );
        });

        expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"select-search\\">
              <div class=\\"select-search__value\\"><input tabindex=\\"0\\" readonly=\\"\\" autocomplete=\\"on\\" class=\\"select-search__input\\" value=\\"Foo\\"></div>
            </div>"
        `);
    });

    test("Renders with multiple", () => {
        act(() => {
            render(
                <SelectSearch
                    options={[
                        { value: "foo", name: "Foo" },
                        { value: "bar", name: "Bar" },
                    ]}
                    multiple
                />,
                container
            );
        });

        expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"select-search\\">
              <div class=\\"select-search__select\\">
                <ul class=\\"select-search__options\\">
                  <li class=\\"select-search__row\\" role=\\"menuitem\\" data-index=\\"0\\" data-value=\\"foo\\"><button class=\\"select-search__option\\" tabindex=\\"-1\\" value=\\"foo\\">Foo</button></li>
                  <li class=\\"select-search__row\\" role=\\"menuitem\\" data-index=\\"1\\" data-value=\\"bar\\"><button class=\\"select-search__option\\" tabindex=\\"-1\\" value=\\"bar\\">Bar</button></li>
                </ul>
              </div>
            </div>"
        `);
    });

    test("Focus displays options", () => {
        act(() => {
            render(
                <SelectSearch
                    options={[
                        { value: "foo", name: "Foo" },
                        { value: "bar", name: "Bar" },
                    ]}
                />,
                container
            );
        });

        expect(
            container.querySelectorAll(".select-search__option").length
        ).toBe(0);
        expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"select-search\\">
              <div class=\\"select-search__value\\"><input tabindex=\\"0\\" readonly=\\"\\" autocomplete=\\"on\\" class=\\"select-search__input\\" value=\\"Foo\\"></div>
            </div>"
        `);

        act(() => {
            Simulate.focus(container.querySelector(".select-search__input"));
        });

        expect(
            container.querySelectorAll(".select-search__option").length
        ).toBe(2);
        expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
            "<div class=\\"select-search has-focus\\">
              <div class=\\"select-search__value\\"><input tabindex=\\"0\\" readonly=\\"\\" autocomplete=\\"on\\" class=\\"select-search__input\\" value=\\"Foo\\"></div>
              <div class=\\"select-search__select\\">
                <ul class=\\"select-search__options\\">
                  <li class=\\"select-search__row\\" role=\\"menuitem\\" data-index=\\"0\\" data-value=\\"foo\\"><button class=\\"select-search__option is-selected\\" tabindex=\\"-1\\" value=\\"foo\\">Foo</button></li>
                  <li class=\\"select-search__row\\" role=\\"menuitem\\" data-index=\\"1\\" data-value=\\"bar\\"><button class=\\"select-search__option\\" tabindex=\\"-1\\" value=\\"bar\\">Bar</button></li>
                </ul>
              </div>
            </div>"
        `);
    });
});
