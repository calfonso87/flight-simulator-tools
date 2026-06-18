import { create } from "zustand";
import { PressureConversionResult } from "@domain/entities/PressureConversion";

type CalculationStatus = "idle" | "loading" | "success" | "error";

interface PressureConverterState {
  status: CalculationStatus;
  result: PressureConversionResult | null;
  error: string | null;
  setStatus: (status: CalculationStatus) => void;
  setResult: (result: PressureConversionResult) => void;
  setError: (error: string) => void;
  reset: () => void;
}

export const usePressureConverterStore = create<PressureConverterState>((set) => ({
  status: "idle",
  result: null,
  error: null,

  setStatus: (status) => set({ status }),
  setResult: (result) => set({ result, status: "success", error: null }),
  setError: (error) => set({ error, status: "error", result: null }),
  reset: () => set({ status: "idle", result: null, error: null }),
}));
