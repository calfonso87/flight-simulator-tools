import { useCallback } from "react";
import { DescentProfileInput } from "@domain/entities/DescentProfile";
import { ValidationError } from "@domain/errors/ValidationError";
import { calculateDescentProfileUseCase, flightDataRepository } from "@app/di/container";
import { useDescentCalculatorStore } from "@app/stores/descentCalculatorStore";

export function useDescentCalculator() {
  const store = useDescentCalculatorStore();

  const calculate = useCallback(
    async (input: DescentProfileInput) => {
      store.setStatus("loading");
      try {
        const result = calculateDescentProfileUseCase.execute(input);
        store.setResult(result);
        store.addToHistory(input, result);
        await flightDataRepository.saveDescentProfile({
          input,
          result,
          calculatedAt: new Date(),
        });
      } catch (err) {
        if (err instanceof ValidationError) {
          store.setError(err.message);
        } else {
          store.setError("An unexpected error occurred. Please try again.");
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    calculate,
    status: store.status,
    result: store.result,
    error: store.error,
    history: store.history,
    reset: store.reset,
  };
}
