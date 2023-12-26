"use client";

import { CSSProperties, useMemo, useState } from "react";
import { BackgroundColorIcon, TextColorIcon } from "./icons";

interface EditorStateV1 {
  version: 1;
  value: string;
  fontFamily: "Times New Roman";
  fontSize: (typeof fontSizes)[number];
}

const fontSizes = [8, 10, 14, 18, 24, 32, 64];

type EditorState = EditorStateV1;

const IconButton = (props: { children: React.ReactNode }) => (
  <button
    className="icon-button"
    style={{
      padding: "2px 0 0 0",
      minWidth: 0,
      minHeight: 0,
    }}
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
    value: `BRB mom needs computer lol "chocolate milk?" HAHAHA derek`,
  });

  const style = useMemo<CSSProperties>(
    () => ({
      fontFamily: state.fontFamily,
      overflowY: "auto",
      height: 64,
      fontSize: state.fontSize,
    }),
    [state.fontFamily, state.fontSize]
  );

  const increaseFontSize = () => {
    const idx = fontSizes.indexOf(state.fontSize);
    if (idx === fontSizes.length - 1) return;
    setState({ ...state, fontSize: fontSizes[idx + 1] });
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
              <IconButton>
                <TextColorIcon fill="#1618FD" />
              </IconButton>
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
