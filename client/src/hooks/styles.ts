export const useThemeSettings = (currentTheme: string) => {
  const themes: { [key: string]: any } = {
    "Mono Ocean": {
      foreground: "rgba(0, 100, 133, 1)",
      background: "#1f1f1f",
      light: "rgba(255,255,255,0.87)",
      prime: "rgba(0, 100, 133, 1)",
      harsh: "rgba(164, 22, 35, 1)",
      variant: "rgba(240, 246, 0)",
      msgField: "black",
      utilsBar: "rgba(15, 15, 15, .9)",
      fontPrimary: `"Anonymous Pro", monospace`,
      baseFontSize: "16px",
    },
    "Comet": {
      foreground: "#0A100D",
      background: "#0A100D",
      light: "rgba(255,255,255,0.87)",
      prime: "#A22C29",
      harsh: "rgba(164, 22, 35, 1)",
      variant: "rgba(240, 246, 0)",
      msgField: "black",
      utilsBar: "",
      fontPrimary: `"Dongle", sans-serif`,
      baseFontSize: "26px",
    },
    "Summer Jungle": {
      foreground: "#264027",
      background: "#1f1f1f",
      light: "rgba(255,255,255,0.87)",
      prime: "#CF5C36",
      harsh: "rgba(164, 22, 35, 1)",
      variant: "rgba(240, 246, 0)",
      msgField: "black",
      utilsBar: "rgba(15, 15, 15, .9)",
      fontPrimary: `"Nova Oval", cursive`,
      baseFontSize: "16px",
    },
  };

  const {
    foreground,
    background,
    light,
    prime,
    harsh,
    variant,
    msgField,
    utilsBar,
    fontPrimary,
    baseFontSize,
  } = themes[currentTheme];

  return {
    "--foreground": foreground,
    "--background": background,
    "--light": light,
    "--prime": prime,
    "--harsh": harsh,
    "--variant": variant,
    "--msg-field": msgField,
    "--utils-bar": utilsBar,
    "--font-primary": fontPrimary,
    "--base-font-size": baseFontSize,
  } as React.CSSProperties;
};