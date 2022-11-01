import postcss from "postcss";
import stylelint from "stylelint";

const plugin = stylelint({
  rules: { "color-no-invalid-hex": true },
  plugins: [],
});

postcss([plugin])
  .process(`:root { color: #AB; }`, { from: undefined })
  .then(() => console.log("Processed"))
  .catch((e) => console.error("Failed to process: ", e));
