# Domain Layer

Pure TypeScript. Zero external dependencies. No React, no Expo, no AsyncStorage.

## Rules

- Never import from `@infra`, `@app`, or `@ui` — dependency flow is inward only
- Use cases throw `ValidationError` (extends `DomainError`) for invalid inputs; callers catch at the application layer
- Repository interfaces live here (`IFlightDataRepository`); implementations live in `src/infrastructure/`

## Use Case Pattern

```ts
export class CalculateXxxUseCase {
  execute(input: XxxInput): XxxResult {
    // validate → throw ValidationError if invalid
    // compute → return result
  }
}
```

## Descent Calculator Formula

```
FEET_PER_NM    = 6076.115
distanceFt     = distanceNm × FEET_PER_NM
descentAngle   = atan(altDelta / distanceFt) × (180 / π)
timeMinutes    = (distanceNm / groundSpeedKts) × 60
descentRate    = altDelta / timeMinutes          (ft/min)
topOfDescent   = distanceNm                      (nm before destination)
```

Cross-check: `altDelta / 300 ≈ TOD in nm` (standard 3:1 rule).
