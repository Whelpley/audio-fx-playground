"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var effect_service_1 = require("./effect.service");
var EffectDetailComponent = (function () {
    function EffectDetailComponent(
        // public audioContext: AudioContext,
        effectService, route, location) {
        this.effectService = effectService;
        this.route = route;
        this.location = location;
    }
    EffectDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.effectService.getEffect(+params['id']); })
            .subscribe(function (effect) { return _this.effect = effect; });
    };
    EffectDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return EffectDetailComponent;
}());
EffectDetailComponent = __decorate([
    core_1.Component({
        selector: 'effect-detail',
        templateUrl: './effect-detail.component.html',
        styleUrls: ['./effect-detail.component.css']
    }),
    __metadata("design:paramtypes", [effect_service_1.EffectService,
        router_1.ActivatedRoute,
        common_1.Location])
], EffectDetailComponent);
exports.EffectDetailComponent = EffectDetailComponent;
//# sourceMappingURL=effect-detail.component.js.map