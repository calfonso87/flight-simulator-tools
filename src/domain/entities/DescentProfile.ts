export interface DescentProfileInput {
  currentAltitudeFt: number;
  targetAltitudeFt: number;
  distanceToDestinationNm: number;
  groundSpeedKts: number;
}

export interface DescentProfileResult {
  requiredDescentRateFpm: number;
  descentAngleDegrees: number;
  timeToDescendMinutes: number;
  topOfDescentNm: number;
}

export interface DescentProfile {
  input: DescentProfileInput;
  result: DescentProfileResult;
  calculatedAt: Date;
}
