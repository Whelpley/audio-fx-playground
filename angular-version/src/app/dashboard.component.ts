import { Component, OnInit } from '@angular/core';

import { Effect } from './effect';
import { EffectService } from './effect.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  effects: effect[] = [];

  constructor(private effectService: EffectService) { }

  ngOnInit(): void {
    this.effectService.geteffects()
      .then(effects => this.effects = effects.slice(1, 5));
  }
}
