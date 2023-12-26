"use client";

import { CSSProperties, useMemo, useState } from "react";

interface EditorStateV1 {
  version: 1;
  value: string;
  fontFamily: "Times New Roman";
  fontSize: (typeof fontSizes)[number];
}

const fontSizes = [8, 10, 14, 18, 24, 32, 64];

type EditorState = EditorStateV1;

export default function Home() {
  const [state, setState] = useState<EditorState>({
    version: 1,
    fontSize: 14,
    fontFamily: "Times New Roman",
    value: `BRB mom needs computer lol "chocolate milk?" HAHAHA derek`,
  });

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

  const style = useMemo<CSSProperties>(
    () => ({
      fontFamily: state.fontFamily,
      overflowY: "auto",
      height: 64,
      fontSize: state.fontSize,
    }),
    [state.fontFamily, state.fontSize]
  );

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
              <button onClick={() => increaseFontSize()}>{"+"}</button>
              <button onClick={() => decreaseFontSize()}>{"-"}</button>
            </fieldset>
            <textarea
              spellCheck="false"
              defaultValue={state.value}
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
