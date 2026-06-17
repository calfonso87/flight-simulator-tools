import { DescentProfileInput, DescentProfileResult } from "../entities/DescentProfile";
import { ValidationError } from "../errors/ValidationError";

const FEET_PER_NM = 6076.115;

export class CalculateDescentProfileUseCase {
  execute(input: DescentProfileInput): DescentProfileResult {
    this.validate(input);

    const altitudeDeltaFt = input.currentAltitudeFt - input.targetAltitudeFt;
    const distanceFt = input.distanceToDestinationNm * FEET_PER_NM;

    // Geometric descent angle
    const descentAngleDegrees =
      Math.atan(altitudeDeltaFt / distanceFt) * (180 / Math.PI);

    // Time = distance / speed (nm / kts * 60 = minutes)
    const timeToDescendMinutes =
      (input.distanceToDestinationNm / input.groundSpeedKts) * 60;

    // Descent rate = altitude to lose / time available
    const requiredDescentRateFpm = altitudeDeltaFt / timeToDescendMinutes;

    // Top of descent = start distance from destination (same as input distance)
    const topOfDescentNm = input.distanceToDestinationNm;

    return {
      requiredDescentRateFpm: Math.round(requiredDescentRateFpm),
      descentAngleDegrees: Math.round(descentAngleDegrees * 100) / 100,
      timeToDescendMinutes: Math.round(timeToDescendMinutes * 10) / 10,
      topOfDescentNm: Math.round(topOfDescentNm * 10) / 10,
    };
  }

  private validate(input: DescentProfileInput): void {
    if (input.currentAltitudeFt <= input.targetAltitudeFt) {
      throw new ValidationError("Current altitude must be above target altitude");
    }
    if (input.distanceToDestinationNm <= 0) {
      throw new ValidationError("Distance must be greater than zero");
    }
    if (input.groundSpeedKts <= 0) {
      throw new ValidationError("Ground speed must be greater than zero");
    }
    if (input.currentAltitudeFt < 0 || input.currentAltitudeFt > 60000) {
      throw new ValidationError("Altitude must be between 0 and 60,000 ft");
    }
  }
}
