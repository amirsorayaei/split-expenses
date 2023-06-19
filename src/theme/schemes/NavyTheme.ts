import { alpha, createTheme, darken } from "@mui/material";

const themeColors = {
  primary: "#0F0F0F",
  primaryAlt: "#121212",
  secondary: "#5D8D7B",
  success: "#57CA22",
  warning: "#FFA319",
  error: "#FF1943",
  info: "#33C2FF", // #A5D7E8 Maybe this one - Try it
  black: "#252525",
  white: "#FFFFFF",
  trueWhite: "#FFFFFF",
};

const colors = {
  gradients: {
    blue1: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
    blue2: "linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)",
    blue3: "linear-gradient(127.55deg, #141E30 3.73%, #243B55 92.26%)",
    blue4: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
    blue5: "linear-gradient(135deg, #97ABFF 10%, #123597 100%)",
    orange1: "linear-gradient(135deg, #FCCF31 0%, #F55555 100%)",
    orange2: "linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)",
    orange3: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    purple1: "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
    purple3: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    pink1: "linear-gradient(135deg, #F6CEEC 0%, #D939CD 100%)",
    pink2: "linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)",
    green1: "linear-gradient(135deg, #FFF720 0%, #3CD500 100%)",
    green2: "linear-gradient(to bottom, #00b09b, #96c93d)",
    black1: "linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%)",
    black2: "linear-gradient(60deg, #29323c 0%, #485563 100%)",
  },
  shadows: {
    success:
      "0px 1px 4px rgba(68, 214, 0, 0.25), 0px 3px 12px 2px rgba(68, 214, 0, 0.35)",
    error:
      "0px 1px 4px rgba(255, 25, 67, 0.25), 0px 3px 12px 2px rgba(255, 25, 67, 0.35)",
    info: "0px 1px 4px rgba(51, 194, 255, 0.25), 0px 3px 12px 2px rgba(51, 194, 255, 0.35)",
    primary:
      "0px 1px 4px rgba(162, 48, 23, 0.25), 0px 3px 12px 2px rgba(162, 48, 23, 0.35)",
    warning:
      "0px 1px 4px rgba(255, 163, 25, 0.25), 0px 3px 12px 2px rgba(255, 163, 25, 0.35)",
    card: "0px 0px 2px #996a6a",
    cardSm: "0px 0px 2px #996a6a",
    cardLg:
      "0 0rem 14rem 0 rgb(255 255 255 / 20%), 0 0.8rem 2.3rem rgb(111 130 156 / 3%), 0 0.2rem 0.7rem rgb(17 29 57 / 15%)",
  },
  layout: {
    general: {
      bodyBg: themeColors.primary,
    },
    sidebar: {
      background: themeColors.primary,
      textColor: themeColors.secondary,
      dividerBg: "#1d1818",
      menuItemColor: "#A3A3A3",
      menuItemColorActive: "#ffffff",
      menuItemBg: themeColors.primaryAlt,
      menuItemBgActive: "#221e1e",
      menuItemIconColor: themeColors.secondary,
      menuItemIconColorActive: "#ffffff",
      menuItemHeadingColor: darken(themeColors.secondary, 0.3),
    },
  },
  alpha: {
    white: {
      5: alpha(themeColors.white, 0.02),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white,
    },
    trueWhite: {
      5: alpha(themeColors.trueWhite, 0.02),
      10: alpha(themeColors.trueWhite, 0.1),
      30: alpha(themeColors.trueWhite, 0.3),
      50: alpha(themeColors.trueWhite, 0.5),
      70: alpha(themeColors.trueWhite, 0.7),
      100: themeColors.trueWhite,
    },
    black: {
      5: alpha(themeColors.black, 0.02),
      10: alpha(themeColors.black, 0.1),
      30: alpha(themeColors.black, 0.3),
      50: alpha(themeColors.black, 0.5),
      70: alpha(themeColors.black, 0.7),
      100: themeColors.black,
    },
  },
  secondary: {
    lighter: alpha(themeColors.secondary, 0.85),
    light: alpha(themeColors.secondary, 0.6),
    main: themeColors.secondary,
    dark: darken(themeColors.secondary, 0.2),
  },
  primary: {
    lighter: alpha(themeColors.primary, 0.85),
    light: alpha(themeColors.primary, 0.3),
    main: themeColors.primary,
    dark: darken(themeColors.primary, 0.2),
  },
  primaryAlt: {
    lighter: alpha(themeColors.primaryAlt, 0.85),
    light: alpha(themeColors.primaryAlt, 0.3),
    main: themeColors.primaryAlt,
    dark: darken(themeColors.primaryAlt, 0.2),
  },
  success: {
    lighter: alpha(themeColors.success, 0.85),
    light: alpha(themeColors.success, 0.3),
    main: themeColors.success,
    dark: darken(themeColors.success, 0.2),
  },
  warning: {
    lighter: alpha(themeColors.warning, 0.85),
    light: alpha(themeColors.warning, 0.3),
    main: themeColors.warning,
    dark: darken(themeColors.warning, 0.2),
  },
  error: {
    lighter: alpha(themeColors.error, 0.85),
    light: alpha(themeColors.error, 0.3),
    main: themeColors.error,
    dark: darken(themeColors.error, 0.2),
  },
  info: {
    lighter: alpha(themeColors.info, 0.85),
    light: alpha(themeColors.info, 0.3),
    main: themeColors.info,
    dark: darken(themeColors.info, 0.2),
  },
};

export const NavyTheme = createTheme({
  // direction: i18n.dir(),
  colors: {
    gradients: {
      blue1: colors.gradients.blue1,
      blue2: colors.gradients.blue2,
      blue3: colors.gradients.blue3,
      blue4: colors.gradients.blue4,
      blue5: colors.gradients.blue5,
      orange1: colors.gradients.orange1,
      orange2: colors.gradients.orange2,
      orange3: colors.gradients.orange3,
      purple1: colors.gradients.purple1,
      purple3: colors.gradients.purple3,
      pink1: colors.gradients.pink1,
      pink2: colors.gradients.pink2,
      green1: colors.gradients.green1,
      green2: colors.gradients.green2,
      black1: colors.gradients.black1,
      black2: colors.gradients.black2,
    },
    shadows: {
      success: colors.shadows.success,
      error: colors.shadows.error,
      primary: colors.shadows.primary,
      info: colors.shadows.info,
      warning: colors.shadows.warning,
    },
    alpha: {
      white: {
        5: alpha(themeColors.white, 0.02),
        10: alpha(themeColors.white, 0.1),
        30: alpha(themeColors.white, 0.3),
        50: alpha(themeColors.white, 0.5),
        70: alpha(themeColors.white, 0.7),
        100: themeColors.white,
      },
      trueWhite: {
        5: alpha(themeColors.trueWhite, 0.02),
        10: alpha(themeColors.trueWhite, 0.1),
        30: alpha(themeColors.trueWhite, 0.3),
        50: alpha(themeColors.trueWhite, 0.5),
        70: alpha(themeColors.trueWhite, 0.7),
        100: themeColors.trueWhite,
      },
      black: {
        5: alpha(themeColors.black, 0.02),
        10: alpha(themeColors.black, 0.1),
        30: alpha(themeColors.black, 0.3),
        50: alpha(themeColors.black, 0.5),
        70: alpha(themeColors.black, 0.7),
        100: themeColors.black,
      },
    },
    secondary: {
      lighter: alpha(themeColors.secondary, 0.1),
      light: alpha(themeColors.secondary, 0.3),
      main: themeColors.secondary,
      dark: darken(themeColors.secondary, 0.2),
    },
    primary: {
      lighter: alpha(themeColors.primary, 0.1),
      light: alpha(themeColors.primary, 0.3),
      main: themeColors.primary,
      dark: darken(themeColors.primary, 0.2),
    },
    success: {
      lighter: alpha(themeColors.success, 0.1),
      light: alpha(themeColors.success, 0.3),
      main: themeColors.success,
      dark: darken(themeColors.success, 0.2),
    },
    warning: {
      lighter: alpha(themeColors.warning, 0.1),
      light: alpha(themeColors.warning, 0.3),
      main: themeColors.warning,
      dark: darken(themeColors.warning, 0.2),
    },
    error: {
      lighter: alpha(themeColors.error, 0.1),
      light: alpha(themeColors.error, 0.3),
      main: themeColors.error,
      dark: darken(themeColors.error, 0.2),
    },
    info: {
      lighter: alpha(themeColors.info, 0.1),
      light: alpha(themeColors.info, 0.3),
      main: themeColors.info,
      dark: darken(themeColors.info, 0.2),
    },
  },
  general: {
    borderRadiusSm: "20px",
    borderRadius: "28px",
    borderRadiusLg: "32px",
    borderRadiusXl: "40px",
  },
  sidebar: {
    background: colors.layout.sidebar.background,
    textColor: colors.layout.sidebar.textColor,
    dividerBg: colors.layout.sidebar.dividerBg,
    menuItemColor: colors.layout.sidebar.menuItemColor,
    menuItemColorActive: colors.layout.sidebar.menuItemColorActive,
    menuItemBg: colors.layout.sidebar.menuItemBg,
    menuItemBgActive: colors.layout.sidebar.menuItemBgActive,
    menuItemIconColor: colors.layout.sidebar.menuItemIconColor,
    menuItemIconColorActive: colors.layout.sidebar.menuItemIconColorActive,
    menuItemHeadingColor: colors.layout.sidebar.menuItemHeadingColor,
    boxShadow: "1px 0 0 #413333",
    parentWidth: "290px",
    actualWidth: "250px",
  },
  header: {
    height: "80px",
    background: themeColors.primaryAlt,
    boxShadow: "0px 1px 0px" + themeColors.primaryAlt,
    textColor: colors.secondary.main,
  },
  palette: {
    mode: "dark",
    common: {
      black: colors.alpha.black[100],
      white: colors.alpha.white[100],
    },
    primary: {
      light: colors.primary.light,
      main: colors.primary.main,
      dark: colors.primary.dark,
      contrastText: themeColors.trueWhite,
    },
    secondary: {
      light: colors.secondary.light,
      main: colors.secondary.main,
      dark: colors.secondary.dark,
      contrastText: themeColors.black,
    },
    error: {
      light: colors.error.light,
      main: colors.error.main,
      dark: colors.error.dark,
      contrastText: themeColors.trueWhite,
    },
    success: {
      light: colors.success.light,
      main: colors.success.main,
      dark: colors.success.dark,
      contrastText: themeColors.trueWhite,
    },
    info: {
      light: colors.info.light,
      main: colors.info.main,
      dark: colors.info.dark,
      contrastText: themeColors.trueWhite,
    },
    warning: {
      light: colors.warning.light,
      main: colors.warning.main,
      dark: colors.warning.dark,
      contrastText: themeColors.trueWhite,
    },
    text: {
      primary: colors.alpha.white[100],
      secondary: colors.alpha.white[70],
      disabled: colors.alpha.white[50],
    },
    background: {
      paper: colors.primaryAlt.main,
      default: colors.layout.general.bodyBg,
    },
  },
  typography: {
    fontFamily: "TFN",
    h1: {
      fontWeight: 700,
      fontSize: 35,
    },
    h2: {
      fontWeight: 700,
      fontSize: 30,
    },
    h3: {
      fontWeight: 700,
      fontSize: 25,
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 700,
      fontSize: 16,
    },
    h5: {
      fontWeight: 700,
      fontSize: 14,
    },
    h6: {
      fontSize: 15,
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 14,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: 13,
    },
    subtitle1: {
      fontSize: 14,
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: 15,
    },
    overline: {
      fontSize: 13,
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "::-webkit-scrollbar": {
          width: 0,
          height: 0,
        },
        "html, body": {
          width: "100%",
          height: "100%",
        },
        body: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
          flex: 1,
        },
        "#__next": {
          width: "100%",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        },
        html: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
        },
        ".child-popover .MuiPaper-root .MuiList-root": {
          flexDirection: "column",
        },
        ":root": {
          "--swiper-theme-color": colors.secondary.main,
          colorScheme: "dark",
        },
        code: {
          background: colors.info.lighter,
          color: colors.alpha.white[100],
          borderRadius: 4,
          padding: 4,
        },
      },
    },
    MuiButton: {
      defaultProps: { color: "secondary" },
      styleOverrides: {
        contained: {
          color: colors.alpha.white[100],
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 0.3s ease 0s",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 0,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          color: colors.alpha.white[100],
          backgroundColor: colors.alpha.white[100],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: "20px",
        },
      },
    },
    MuiInputBase: {
      defaultProps: { color: "secondary" },
    },
    MuiInputLabel: {
      defaultProps: { color: "secondary" },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1840,
    },
  },
});
