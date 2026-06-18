import { useCallback } from "react";
import { PressureConversionInput } from "@domain/entities/PressureConversion";
import { ValidationError } from "@domain/errors/ValidationError";
import { convertPressureUseCase } from "@app/di/container";
import { usePressureConverterStore } from "@app/stores/pressureConverterStore";

export function usePressureConverter() {
  const store = usePressureConverterStore();

  const convert = useCallback(
    (input: PressureConversionInput) => {
      store.setStatus("loading");
      try {
        const result = convertPressureUseCase.execute(input);
        store.setResult(result);
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
    convert,
    status: store.status,
    result: store.result,
    error: store.error,
    reset: store.reset,
  };
}
