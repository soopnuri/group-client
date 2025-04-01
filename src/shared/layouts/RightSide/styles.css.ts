import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  // position: "relative",
  display: "flex",
  flexDirection: "column",
  borderRadius: vars.border.medium,
  backgroundColor: vars.color.gray_100,
  width: "16em",
  padding: "2rem",
  margin: "2rem 2rem 2rem 0",
  gap: "1rem",
});

export const title = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: vars.font.small
});
