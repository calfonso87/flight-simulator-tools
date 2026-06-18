import { z } from "zod";

export const pressureConverterSchema = z.object({
  value: z.string().min(1, "Required"),
  inputUnit: z.enum(["hPa", "inHg"]),
}).superRefine((data, ctx) => {
  const num = parseFloat(data.value);

  if (data.inputUnit === "hPa") {
    if (isNaN(num) || num < 800 || num > 1100) {
      ctx.addIssue({
        code: "custom",
        path: ["value"],
        message: "Enter a value between 800 and 1,100",
      });
    }
  } else {
    if (isNaN(num) || num < 23.62 || num > 32.48) {
      ctx.addIssue({
        code: "custom",
        path: ["value"],
        message: "Enter a value between 23.62 and 32.48",
      });
    }
  }
});

export type PressureConverterFormValues = z.infer<typeof pressureConverterSchema>;
