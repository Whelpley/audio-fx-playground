import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Effect }         from './effect';
import { EffectService }  from './effect.service';
@Component({
  selector: 'effect-detail',
  templateUrl: './effect-detail.component.html',
  styleUrls: [ './effect-detail.component.css' ]
})
export class EffectDetailComponent implements OnInit {
  effect: Effect;

  constructor(
    private effectService: EffectService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.effectService.geteffect(+params['id']))
      .subscribe(effect => this.effect = effect);
  }

  goBack(): void {
    this.location.back();
  }
}
