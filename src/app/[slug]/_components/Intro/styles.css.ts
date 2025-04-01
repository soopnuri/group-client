import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  // padding: "2rem",
});

export const shaodw = style({
  backgroundColor: vars.color.gray_100,
  width: "100%",
  borderRadius: vars.border.normal,
  height: "6rem",
  marginBottom: "1rem",
});

export const communityName = style({
  fontSize: vars.font.subTitle,
  fontWeight: vars.weight.bold,
});

export const introBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
export const buttonBox = style({
  display: "flex",
  gap: "1rem",
});
export const button = style({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: vars.border.large,
  border: `1px solid ${vars.color.border}`,
  padding: "0.5rem 1rem",
  gap: "0.4rem",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.gray_100,
    },
  },
});
