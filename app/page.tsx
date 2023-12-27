"use client";

import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BackgroundColorIcon,
  BoldIcon,
  ItalicIcon,
  LargerFontIcon,
  NormalFontIcon,
  SmallerFontIcon,
  TextColorIcon,
  UnderlineIcon,
} from "./icons";

interface EditorStateV1 {
  version: 1;
  value: string;
  fontFamily: "Times New Roman";
  fontSize: (typeof fontSizes)[number];
  bold: boolean;
  italic: boolean;
  underline: boolean;
  textColor: colorChoice;
  backgroundColor: colorChoice;
}

type colorChoice = ["basic" | "custom", string];
const fontSizes = [8, 10, 14, 18, 24, 32, 64];

type EditorState = EditorStateV1;

const IconButton = (props: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    className="icon-button"
    style={{
      padding: "2px 0 0 0",
      minWidth: 0,
      minHeight: 0,
    }}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

const Divider = () => (
  <div
    style={{
      display: "inline-block",
      height: 18,
      width: 2,
      boxShadow: "inset -1px 0 #fff, inset 1px 0 grey",
      margin: "2px 6px 0 6px",
    }}
  />
);

export default function Home() {
  const [state, setState] = useState<EditorState>({
    version: 1,
    fontSize: 14,
    fontFamily: "Times New Roman",
    bold: false,
    italic: false,
    underline: false,
    textColor: ["basic", "#000000"],
    backgroundColor: ["basic", "#FFFFFF"],
    value: "I am away from my computer right now.",
  });

  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
    useState(false);

  const style = useMemo<CSSProperties>(
    () => ({
      fontFamily: state.fontFamily,
      overflowY: "auto",
      height: 64,
      fontSize: state.fontSize,
      fontWeight: state.bold ? "bold" : "normal",
      fontStyle: state.italic ? "italic" : "normal",
      textDecoration: state.underline ? "underline" : "none",
      color: state.textColor?.[1] || "#000000",
      backgroundColor: state.backgroundColor?.[1] || "#FFFFFF",
    }),
    [
      state.backgroundColor,
      state.bold,
      state.fontFamily,
      state.fontSize,
      state.italic,
      state.textColor,
      state.underline,
    ]
  );

  const increaseFontSize = () => {
    const idx = fontSizes.indexOf(state.fontSize);
    if (idx === fontSizes.length - 1) return;
    setState({ ...state, fontSize: fontSizes[idx + 1] });
  };

  const resetFontSize = () => {
    setState({ ...state, fontSize: 14 });
  };

  const decreaseFontSize = () => {
    const idx = fontSizes.indexOf(state.fontSize);
    if (idx === 0) return;
    setState({ ...state, fontSize: fontSizes[idx - 1] });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, value: e.target.value });
  };

  return (
    <main>
      <div className="window away-message" style={{ position: "relative" }}>
        <div className="title-bar">
          <div className="title-bar-text">Edit Away Message</div>
          <div className="title-bar-controls">
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <section className="field-row label">
            <label>Enter label:</label>
            <select>
              <option>Message Title</option>
              <option>Gaming</option>
            </select>
          </section>

          <section className="field-row-stacked message-input">
            <label>Enter new Away message:</label>
            <fieldset className="editing-controls">
              <IconButton onClick={() => setShowTextColorPicker(true)}>
                <TextColorIcon fill="#1618FD" />
              </IconButton>
              <IconButton onClick={() => setShowBackgroundColorPicker(true)}>
                <BackgroundColorIcon fill="#1618FD" />
              </IconButton>

              <Divider />

              <IconButton onClick={decreaseFontSize}>
                <SmallerFontIcon letterFill="black" trailFill="#898986" />
              </IconButton>
              <IconButton onClick={resetFontSize}>
                <NormalFontIcon fill="black" />
              </IconButton>
              <IconButton onClick={increaseFontSize}>
                <LargerFontIcon letterFill="black" trailFill="#898986" />
              </IconButton>

              <Divider />

              <IconButton
                onClick={() => setState({ ...state, bold: !state.bold })}
              >
                <BoldIcon fill="black" />
              </IconButton>
              <IconButton
                onClick={() => setState({ ...state, italic: !state.italic })}
              >
                <ItalicIcon fill="black" />
              </IconButton>
              <IconButton
                onClick={() =>
                  setState({ ...state, underline: !state.underline })
                }
              >
                <UnderlineIcon fill="black" />
              </IconButton>

              <Divider />
            </fieldset>
            <textarea
              spellCheck="false"
              value={state.value}
              onChange={handleChange}
              style={style}
            />
          </section>

          <div className="bottom-section">
            <section className="field-row-stacked">
              Special Characters:
              <table className="special-chars">
                <tbody>
                  <tr>
                    <td className="code">%n</td>
                    <td>
                      =<span className="sp"></span>Screen name of buddy
                    </td>
                  </tr>
                  <tr>
                    <td className="code">%d</td>
                    <td>
                      =<span className="sp"></span>Current date
                    </td>
                  </tr>
                  <tr>
                    <td className="code">%t</td>
                    <td>
                      =<span className="sp"></span>Current time
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="field-row later-use">
              <label htmlFor="save-for-later">
                Save for&nbsp;<u>l</u>ater use
              </label>
              <input id="save-for-later" type="checkbox" />
              <label>&nbsp;</label>
            </section>
          </div>

          <section className="field-row submit">
            <button>
              <u>I</u>&apos;m Away
            </button>
            <div className="button-gap"></div>
            <button>Cancel</button>
          </section>
        </div>

        {showTextColorPicker && (
          <ColorPickerWindow
            chosenColor={state.textColor}
            onSelect={(colorChoice) => {
              setState({ ...state, textColor: colorChoice });
              setShowTextColorPicker(false);
            }}
            onClose={() => {
              setShowTextColorPicker(false);
            }}
          />
        )}

        {showBackgroundColorPicker && (
          <ColorPickerWindow
            chosenColor={state.backgroundColor}
            onSelect={(colorChoice) => {
              setState({ ...state, backgroundColor: colorChoice });
              setShowBackgroundColorPicker(false);
            }}
            onClose={() => {
              setShowBackgroundColorPicker(false);
            }}
          />
        )}
      </div>
    </main>
  );
}

const ColorWell = (props: {
  isSelected: boolean;
  color: string;
  onSelect: () => void;
}) => {
  const buttonEl = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (props.isSelected) {
      buttonEl.current?.focus();
    }
  });

  return (
    <button
      ref={buttonEl}
      className="color-well-btn"
      style={{
        backgroundColor: props.color,
        // override 98.css min-width and min-height
        minWidth: 0,
        minHeight: 0,
        padding: 0,
        width: 22,
        height: 17,
        boxShadow: props.isSelected
          ? // The black edges are in the right place but these colors are wrong
            "inset -1px -1px black, inset 1px 1px black, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a"
          : "inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a",
        outline: props.isSelected ? "1px dotted #000" : "none",
        outlineOffset: 1,
      }}
      onClick={props.onSelect}
    ></button>
  );
};

// TODO: Persist the last chosen color?
const ColorPickerWindow = (props: {
  chosenColor: colorChoice;
  onSelect: (chosenColor: colorChoice) => void;
  onClose: () => void;
}) => {
  const [selectedColor, setSelectedColor] = useState<colorChoice>(
    props.chosenColor
  );
  const handleSelect = useCallback((tuple: colorChoice) => {
    setSelectedColor(tuple);
  }, []);

  const gridStyle = useMemo<CSSProperties>(
    () => ({
      padding: "6px 4px",
      display: "grid",
      gridTemplateColumns: "repeat(8, 1fr)",
      gap: 6,
      marginBottom: 8,
    }),
    []
  );

  const basicColors = useMemo(
    () => [
      "#F07D77",
      "#FEFE78",
      "#8FFA76",
      "#5DF975",
      "#91FBFE",
      "#3074FD",
      "#F07DB9",
      "#F17EFF",
      "#EC301A",
      "#FEFE1E",
      "#8FFA13",
      "#5CF93A",
      "#5FFAFE",
      "#2D73B7",
      "#7575B7",
      "#ED36FF",
      "#6E3B39",
      "#F07C3E",
      "#5CF90F",
      "#2B7274",
      "#173874",
      "#7677FE",
      "#6C1739",
      "#EC3177",
      "#6C160A",
      "#F07C1B",
      "#2A7204",
      "#2A7238",
      "#1618FD",
      "#0C0D94",
      "#6C1974",
      "#6E20FD",
      "#000000",
      "#74740D",
      "#747439",
      "#757575",
      "#447374",
      "#B8B8B8",
      "#340A38",
      "#FFFFFF",
    ],
    []
  );

  const customColors = useMemo(
    () => [
      "#111111",
      "#1D1D1D",
      "#292929",
      "#373737",
      "#464646",
      "#545454",
      "#646464",
      "#747474",
      "#848484",
      "#959595",
      "#A5A5A5",
      "#B7B7B7",
      "#C8C8C8",
      "#DADADA",
      "#ECECEC",
      "#FFFFFF",
    ],
    []
  );

  return (
    <div
      className="window"
      style={{
        position: "absolute",
        top: 24,
        left: 8,
      }}
    >
      <div className="title-bar">
        <div className="title-bar-text">Color</div>
        <div className="title-bar-controls">
          {/* TODO: Info button */}
          <button aria-label="Close" onClick={props.onClose}></button>
        </div>
      </div>
      <div className="window-body">
        <section className="field-row-stacked">
          <label>Basic colors:</label>
          <div style={gridStyle}>
            {basicColors.map((color) => (
              <ColorWell
                key={`basic-${color}`}
                isSelected={
                  selectedColor?.[0] === "basic" && color === selectedColor[1]
                }
                color={color}
                onSelect={() => handleSelect(["basic", color])}
              />
            ))}
          </div>
        </section>

        <section className="field-row-stacked">
          <label>Custom colors:</label>
          <div style={gridStyle}>
            {customColors.map((color) => (
              <ColorWell
                key={`custom-${color}`}
                isSelected={
                  selectedColor?.[0] === "custom" && color === selectedColor[1]
                }
                color={color}
                onSelect={() => handleSelect(["custom", color])}
              />
            ))}
          </div>
        </section>

        <button disabled style={{ width: "100%", marginBottom: 4 }}>
          Define custom colors {">>"}
        </button>

        <div className="field-row">
          <button
            onClick={() => selectedColor && props.onSelect(selectedColor)}
          >
            OK
          </button>
          <button style={{ marginLeft: 8 }} onClick={props.onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
