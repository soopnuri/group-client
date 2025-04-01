import { vars } from "@/shared/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const divider = style({
  borderBottom: `1px solid ${vars.color.border}`,
});
