import { IFlightDataRepository } from "@domain/repositories/IFlightDataRepository";
import { DescentProfile } from "@domain/entities/DescentProfile";
import { AsyncStorageService } from "../storage/AsyncStorageService";

const HISTORY_KEY = "@fst:descent_history";
const MAX_HISTORY = 50;

export class MockFlightDataRepository implements IFlightDataRepository {
  private storage = new AsyncStorageService();

  async saveDescentProfile(profile: DescentProfile): Promise<void> {
    const existing = await this.getDescentHistory();
    const updated = [profile, ...existing].slice(0, MAX_HISTORY);
    await this.storage.set(HISTORY_KEY, updated);
  }

  async getDescentHistory(): Promise<DescentProfile[]> {
    const raw = await this.storage.get<DescentProfile[]>(HISTORY_KEY);
    if (!raw) return [];
    return raw.map((p) => ({ ...p, calculatedAt: new Date(p.calculatedAt) }));
  }

  async clearHistory(): Promise<void> {
    await this.storage.remove(HISTORY_KEY);
  }
}
