export default function Home() {
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
            <fieldset className="editing-controls"></fieldset>
            <textarea
              rows={4}
              spellCheck="false"
              defaultValue={`BRB mom needs computer lol "chocolate milk?" HAHAHA derek`}
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

      <a href="https://glitch.com/edit/#!/away-message">remix this</a>
    </main>
  );
}
