export type PressureUnit = "hPa" | "inHg";

export interface PressureConversionInput {
  value: number;
  inputUnit: PressureUnit;
}

export interface PressureConversionResult {
  qnhHpa: number;
  baroInHg: number;
  deltaFromStandardHpa: number;
  deltaFromStandardInHg: number;
}
