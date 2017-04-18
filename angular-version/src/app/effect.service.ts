import { Effect } from './effect';
import { EFFECTS } from './mock-effects';
import { Injectable } from '@angular/core';

@Injectable()
export class EffectService {
  getEffects(): Promise<Effect[]> {
    return Promise.resolve(EFFECTS);
  }

  getEffectsSlowly(): Promise<Effect[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getEffects()), 2000);
    });
  }

  getEffect(id: number): Promise<Effect> {
    return this.getEffects()
               .then(effects => effects.find(effect => effect.id === id));
  }
}
