import { createGlobalTheme, globalFontFace, style } from "@vanilla-extract/css";

// 전역 변수

export const vars = createGlobalTheme(":root", {
  font: {
    small: "1.4rem",
    text: "1.6rem",
    subTitle: "2.4rem",
    title: "3.4rem",
    //h
    icon: "3rem",
  },
  color: {
    primary: "#3182F6",
    //
    border: "#c2c2c2", // border
    disabled: "#F5F5F5", // bg-disabled
    //
    gray_100: "#ececec", // terms-background
    gray_200: "#e4e4e4", // text-disabled
    gray_300: "#c9c9c9", //
    gray_400: "#707070", //
    gray_500: "#555555", // text-body
    gray_600: "#444444",
    gray_700: "#1d1d1d", // text-title
    // sysmtem Colors
    danger: "#EB003B",
    warning: "#FFB724",
    success: "#008A1E",
    info: "#2768FF",
  },
  weight: {
    regular: "400",
    medium: "500",
    bold: "600",
  },
  lineheight: {
    l_140: "1.4",
    l_150: "1.5",
    l_160: "1.6",
    l_180: "1.8",
  },
  border: {
    normal: "0.6rem",
    medium: "0.9rem",
    large: "1.2rem",
  },
});

export const wantedSans = "wantedSans";
export const pretendard = "pretendard";
export const gmarketSans = "GmarketSansMedium";
export const gmarketSansBlod = "GmarketSansBold";

globalFontFace(wantedSans, {
  src: [
    'local("/fonts/WantedSansVariable")',
    'url("/fonts/WantedSansVariable.woff2") format("woff2")',
  ],
  fontWeight: "100 900",
  fontStyle: "normal",
  fontDisplay: "swap",
});

globalFontFace(pretendard, {
  src: [
    'local("/fonts/PretendardVariable.woff2")',
    'url("/fonts/PretendardVariable.woff2") format("woff2")',
  ],
  fontWeight: "100 900",
  fontStyle: "normal",
  fontDisplay: "swap",
});

// medium
globalFontFace(gmarketSans, {
  src: [
    'local("/fonts/GmarketSansMedium.otf")',
    'url("/fonts/GmarketSansMedium.otf") format("opentype")',
  ],
  fontWeight: "500",
  fontDisplay: "swap",
});

// bold
globalFontFace(gmarketSansBlod, {
  src: [
    'local("/fonts/GmarketSansBold.otf")',
    'url("/fonts/GmarketSansBold.otf") format("opentype")',
  ],
  fontWeight: "700",
  fontDisplay: "swap",
});
