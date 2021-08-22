import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export const buildRollupConfig = (externals = [], entry = "src/index.ts") => {
  externals = [
    ...externals,
    /@babel\/runtime/,
    "react",
    "react-router",
    "react-dom",
    "react-router-dom",
    "react/jsx-runtime",
  ];

  const outputs = [
    {
      format: "es",
      sourcemap: true,
      dir: "dist/esm",
    },
    {
      format: "cjs",
      sourcemap: true,
      dir: "dist/cjs",
    },
  ];

  const extendedOutputs = [
    ...outputs,
    ...outputs.map((x) => {
      const result = { ...x };
      result.plugins = [...(x.plugins || []), terser()];
      result.dir = result.dir + "/minified";
      return result;
    }),
  ];

  return {
    input: entry,
    onwarn(warning, warn) {
      if (warning.code === "EVAL") return;
      warn(warning);
    },
    output: extendedOutputs,
    external: externals,
    plugins: [
      del({ targets: ["dist/*", "types/*"] }),
      external(),
      resolve({ extensions }),
      commonjs({
        include: ["node_modules/**"],
      }),
      babel({
        babelHelpers: "runtime",
        extensions,
        include: ["src/**/*"],
        exclude: "node_modules/**",
        babelrc: true,
      }),
    ],
  };
};

const config = buildRollupConfig();

export default [config];
