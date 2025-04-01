import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  borderRightStyle: "solid",
  borderRightColor: vars.color.border,
  borderRightWidth: "1px",
  width: "16em",
  height: "100vh",
  padding: "2rem",
  gap: "1rem",
});

export const closed = style({
  width: "4rem",
  transition: "width 0.2s ease-in-out",
});

export const collpaseIcon = style({
  position: "absolute",
  right: -16,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: "3rem",
  height: "3rem",
  border: `1px solid ${vars.color.border}`,
  backgroundColor: "white",
  cursor: "pointer",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.disabled,
    },
  },
});

export const button = style({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  cursor: "pointer",
  padding: "1rem",
  borderRadius: vars.border.normal,
  fontSize: vars.font.small,
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.gray_100,
    },
  },
});

export const subTitle = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: vars.font.small,
  color: vars.color.gray_400,
  borderRadius: vars.border.normal,
  cursor: "pointer",
  width: "100%",
  letterSpacing: "0.2rem",
  padding: "1rem",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.gray_100,
    },
  },
});

export const upArrow = style({
  transform: "rotate(180deg)",
  transition: `transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)`,
});

export const downArrow = style({
  transform: "rotate(0deg)",
  transition: `transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)`,
});


export const active = style({
  fontWeight: vars.weight.bold,
  backgroundColor: vars.color.gray_100,
});
export const iconActive = style({
  stroke: vars.color.primary,
});
