import { CalculateDescentProfileUseCase } from "@domain/use-cases/CalculateDescentProfile";
import { ConvertPressureUseCase } from "@domain/use-cases/ConvertPressure";
import { MockFlightDataRepository } from "@infra/repositories/MockFlightDataRepository";

// Swap MockFlightDataRepository → ApiFlightDataRepository when backend is ready
export const flightDataRepository = new MockFlightDataRepository();
export const calculateDescentProfileUseCase = new CalculateDescentProfileUseCase();
export const convertPressureUseCase = new ConvertPressureUseCase();
