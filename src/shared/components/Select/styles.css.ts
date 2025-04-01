import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  // selectors: {
  //   "&:hover": {
  //     backgroundColor: vars.color.gray_100,
  //   },
  // },
});

export const select = style({
  fontSize: vars.font.small,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.4rem",
  borderRadius: vars.border.normal,
  color: vars.color.gray_500,
  padding: "0.6rem 0rem",
  width: "8rem",
});

export const selectTitle = style({
  display: "flex",
  justifyContent: "center",
  padding: "1.4rem 0",
  fontSize: vars.font.small,
  color: vars.color.gray_400,
});

export const optionBox = style({
  position: "absolute",
  width: "8rem",
  top: 40,
  borderRadius: vars.border.normal,
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
});
export const option = style({
  padding: "1rem",
  fontSize: vars.font.small,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.gray_100,
    },
  },
});

export const active = style({
  backgroundColor: vars.color.gray_100,
});

export const upArrow = style({
  transform: "rotate(180deg)",
  transition: `transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)`,
});

export const downArrow = style({
  transform: "rotate(0deg)",
  transition: `transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)`,
});
