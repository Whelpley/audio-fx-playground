import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Effect } from './effect';
import { EffectService } from './effect.service';

@Component({
  selector: 'my-effects',
  templateUrl: './effects.component.html',
  styleUrls: [ './effects.component.css' ]
})
export class EffectsComponent implements OnInit {
  effects: Effect[];
  selectedeffect: Effect;

  constructor(
    private router: Router,
    private effectService: EffectService) { }

  getEffects(): void {
    this.effectService.geteffects().then(effects => this.effects = effects);
  }

  ngOnInit(): void {
    this.getEffects();
  }

  onSelect(effect: Effect): void {
    this.selectedEffect = effect;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedeffect.id]);
  }
}
