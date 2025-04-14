import { z } from "zod";
import { zInt, zNumber, zPositive, zString } from "./schema.utils";

export const QRLogSchema = z.object({
  eventsNo: z.number().int().positive(),
  clientNo: z
    .number(zNumber("클라이언트 번호"))
    .int(zInt("클라이언트 번호"))
    .positive(zPositive("클라이언트 번호")),
  attendeeNo: z
    .number(zNumber("참석자 번호"))
    .int(zInt("참석자 번호"))
    .positive(zPositive("참석자 번호")),

  qrlogJobtype: z.string(zString("직무")).optional(),
  qrlogDays: z.number().nonnegative().optional(),
  qrlogType: z.string().nullable().optional(),
  qrlogQrcode: z.string().nullable().optional(),
  qrlogGroup: z.enum(["attendee", "client"]).nullable().optional(),
  qrlogSection: z.string(zString("섹션")).optional(),
});
