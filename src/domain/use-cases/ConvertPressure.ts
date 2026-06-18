import { PressureConversionInput, PressureConversionResult } from "../entities/PressureConversion";
import { ValidationError } from "../errors/ValidationError";

const HPA_PER_INHG = 33.8639;
const STANDARD_HPA = 1013.25;
const STANDARD_INHG = 29.92;

export class ConvertPressureUseCase {
  execute(input: PressureConversionInput): PressureConversionResult {
    this.validate(input);

    const qnhHpa =
      input.inputUnit === "hPa"
        ? input.value
        : Math.round(input.value * HPA_PER_INHG * 100) / 100;

    const baroInHg =
      input.inputUnit === "inHg"
        ? input.value
        : Math.round((input.value / HPA_PER_INHG) * 100) / 100;

    return {
      qnhHpa,
      baroInHg,
      deltaFromStandardHpa: Math.round((qnhHpa - STANDARD_HPA) * 100) / 100,
      deltaFromStandardInHg: Math.round((baroInHg - STANDARD_INHG) * 100) / 100,
    };
  }

  private validate(input: PressureConversionInput): void {
    if (input.inputUnit === "hPa") {
      if (isNaN(input.value) || input.value < 800 || input.value > 1100) {
        throw new ValidationError("QNH must be between 800 and 1,100 hPa");
      }
    } else {
      if (isNaN(input.value) || input.value < 23.62 || input.value > 32.48) {
        throw new ValidationError("BARO must be between 23.62 and 32.48 inHg");
      }
    }
  }
}
