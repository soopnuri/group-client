import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "2rem",
});

export const loginBox = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "2rem",
  gap: "1rem",
  // border: `1px solid ${vars.color.gray_300}`,
  borderRadius: vars.border.medium,
});

export const title = style({
  fontSize: vars.font.subTitle,
  fontWeight: vars.weight.bold,
  marginBottom: "1rem",
})

export const google = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  borderRadius: vars.border.medium,
  cursor: "pointer",
  width: "100%",
  border: `1px solid ${vars.color.gray_300}`,
  backgroundColor: "white",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.gray_100,
    },
  },
});
