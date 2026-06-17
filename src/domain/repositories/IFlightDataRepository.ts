import { DescentProfile } from "../entities/DescentProfile";

export interface IFlightDataRepository {
  saveDescentProfile(profile: DescentProfile): Promise<void>;
  getDescentHistory(): Promise<DescentProfile[]>;
  clearHistory(): Promise<void>;
}
