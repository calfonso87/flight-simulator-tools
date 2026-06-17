import { z } from "zod";

export const descentCalculatorSchema = z
  .object({
    currentAltitudeFt: z.string().min(1, "Required"),
    targetAltitudeFt: z.string().min(1, "Required"),
    distanceToDestinationNm: z.string().min(1, "Required"),
    groundSpeedKts: z.string().min(1, "Required"),
  })
  .superRefine((data, ctx) => {
    const current = parseFloat(data.currentAltitudeFt);
    const target = parseFloat(data.targetAltitudeFt);
    const distance = parseFloat(data.distanceToDestinationNm);
    const gs = parseFloat(data.groundSpeedKts);

    if (isNaN(current) || current < 100 || current > 60000) {
      ctx.addIssue({
        code: "custom",
        path: ["currentAltitudeFt"],
        message: "Enter a value between 100 and 60,000",
      });
    }
    if (isNaN(target) || target < 0 || target > 50000) {
      ctx.addIssue({
        code: "custom",
        path: ["targetAltitudeFt"],
        message: "Enter a value between 0 and 50,000",
      });
    }
    if (!isNaN(current) && !isNaN(target) && current <= target) {
      ctx.addIssue({
        code: "custom",
        path: ["targetAltitudeFt"],
        message: "Must be below current altitude",
      });
    }
    if (isNaN(distance) || distance <= 0 || distance > 1000) {
      ctx.addIssue({
        code: "custom",
        path: ["distanceToDestinationNm"],
        message: "Enter a value between 1 and 1,000",
      });
    }
    if (isNaN(gs) || gs < 50 || gs > 700) {
      ctx.addIssue({
        code: "custom",
        path: ["groundSpeedKts"],
        message: "Enter a value between 50 and 700",
      });
    }
  });

export type DescentCalculatorFormValues = z.infer<typeof descentCalculatorSchema>;
