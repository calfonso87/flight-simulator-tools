import { create } from "zustand";
import { DescentProfileInput, DescentProfileResult } from "@domain/entities/DescentProfile";

type CalculationStatus = "idle" | "loading" | "success" | "error";

interface HistoryEntry {
  input: DescentProfileInput;
  result: DescentProfileResult;
  calculatedAt: Date;
}

interface DescentCalculatorState {
  status: CalculationStatus;
  result: DescentProfileResult | null;
  error: string | null;
  history: HistoryEntry[];
  setStatus: (status: CalculationStatus) => void;
  setResult: (result: DescentProfileResult) => void;
  setError: (error: string) => void;
  addToHistory: (input: DescentProfileInput, result: DescentProfileResult) => void;
  reset: () => void;
}

export const useDescentCalculatorStore = create<DescentCalculatorState>((set, get) => ({
  status: "idle",
  result: null,
  error: null,
  history: [],

  setStatus: (status) => set({ status }),
  setResult: (result) => set({ result, status: "success", error: null }),
  setError: (error) => set({ error, status: "error", result: null }),

  addToHistory: (input, result) =>
    set({
      history: [
        { input, result, calculatedAt: new Date() },
        ...get().history,
      ].slice(0, 20),
    }),

  reset: () => set({ status: "idle", result: null, error: null }),
}));
