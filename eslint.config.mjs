import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "**/corsir.ts",
      "corsir.ts",
      "*.tsbuildinfo",
    ],
  },
  ...nextVitals,
  ...nextTs,
];

export default eslintConfig;
