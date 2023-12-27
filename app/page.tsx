"use client";

import { CSSProperties, useMemo, useState } from "react";
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
}

const fontSizes = [8, 10, 14, 18, 24, 32, 64];

type EditorState = EditorStateV1;

const IconButton = (props: {
  children: React.ReactNode;
  onClick?: () => void;
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
    value: "I am away from my computer right now.",
  });

  const style = useMemo<CSSProperties>(
    () => ({
      fontFamily: state.fontFamily,
      overflowY: "auto",
      height: 64,
      fontSize: state.fontSize,
      fontWeight: state.bold ? "bold" : "normal",
      fontStyle: state.italic ? "italic" : "normal",
      textDecoration: state.underline ? "underline" : "none",
    }),
    [
      state.bold,
      state.fontFamily,
      state.fontSize,
      state.italic,
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
      <div className="window away-message">
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
              <IconButton>
                <TextColorIcon fill="#1618FD" />
              </IconButton>
              <IconButton>
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
      </div>
    </main>
  );
}
