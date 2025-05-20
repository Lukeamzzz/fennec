import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  staticDirs: ["../public"],
  webpackFinal: async (storybookConfig) => {
    // Asegúrate de no sobreescribir otros alias
    storybookConfig.resolve = storybookConfig.resolve || {};
    storybookConfig.resolve.alias = {
      ...(storybookConfig.resolve.alias ?? {}),
      "@": path.resolve(__dirname, "../src"),
    };
    return storybookConfig;
  },
};

export default config;