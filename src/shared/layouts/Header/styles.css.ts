import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem 2rem",
  borderBottom: `1px solid ${vars.color.border}`,
});

export const end = style({
  justifyContent: "flex-end",
});

export const profile = style({
  position: "relative",
});

export const image = style({
  borderRadius: "50%",
  cursor: "pointer",
});
// set display
export const setContainer = style({
  position: "absolute",
  top: 60,
  right: 20,
  //
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem",
  backgroundColor: "white",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  borderRadius: vars.border.normal,
});
export const setItem = style({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  height: "2.4rem",
  cursor: "pointer",
});
export const setIcon = style({
  fontSize: "1.6rem",
});
