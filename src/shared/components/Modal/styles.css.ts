import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const backdrop = style({
  zIndex: 1000,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

export const wrap = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});
export const modal = style({
  zIndex: 1050,
  borderRadius: vars.border.normal,
  backgroundColor: "white",
  width: "20rem",
  height: "20rem",
});
