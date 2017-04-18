import { Effect } from './effect';
import { EFFECTS } from './mock-effects';
import { Injectable } from '@angular/core';

@Injectable()
export class effectService {
  geteffects(): Promise<Effect[]> {
    return Promise.resolve(EFFECTS);
  }

  geteffectsSlowly(): Promise<Effect[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.geteffects()), 2000);
    });
  }

  geteffect(id: number): Promise<Effect> {
    return this.geteffects()
               .then(effects => effects.find(effect => effect.id === id));
  }
}
