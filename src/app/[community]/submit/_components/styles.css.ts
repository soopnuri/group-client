import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { globalStyle } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
});
export const inputLabel = style({
  display: "flex",
  fontSize: vars.font.text,
  fontWeight: vars.weight.bold,
  marginBottom: "0.6rem",
});
export const titleInput = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.border.medium,
  selectors: {
    "&:focus-within": {
      borderColor: vars.color.primary,
    },
  },
  width: "100%",
  marginBottom: "1rem",
});
export const wrap = style({
  border: `1px solid ${vars.color.border}`,
  minHeight: "20rem",
  borderRadius: vars.border.medium,
  selectors: {
    "&:focus-within": {
      borderColor: vars.color.primary,
    },
  },
});
export const buttonBox = style({
  display: "flex",
  justifyContent: "flex-end",
});
export const button = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.border.normal,
  backgroundColor: "white",
  padding: "0.6rem 1rem",
  marginTop: "1rem",
  cursor: "pointer",
});
export const title = style({
  fontSize: vars.font.subTitle,
  fontWeight: vars.weight.bold,
  marginBottom: "4rem",
});
export const editor = style({
  padding: "1rem",
  lineHeight: vars.lineheight.l_160,
});

globalStyle(`${editor} h2`, {
  fontSize: "3rem",
  fontWeight: "bold",
  backgroundColor: vars.color.gray_100,
});
globalStyle(`${editor} strong`, {
  fontWeight: vars.weight.bold,
});

globalStyle(".ProseMirror-focused", {
  border: "none !important",
  outline: "none !important",
});

export const active = style({
  backgroundColor: vars.color.primary,
  color: "white",
});

export const toolbar = style({
  // position: "absolute",
  padding: "0.4rem 1rem",
  display: "flex",
  // gap: "1rem",
  borderBottom: `1px solid ${vars.color.border}`,
});

export const toolbarItem = style({
  cursor: "pointer",
  display: "flex",
  fontSize: vars.font.small,
  fontWeight: vars.weight.bold,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: "4rem",
  height: "4rem",
  // padding: "0.8rem",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.gray_100,
    },
  },
});
