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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var effect_service_1 = require("./effect.service");
var EffectsComponent = (function () {
    function EffectsComponent(router, effectService) {
        this.router = router;
        this.effectService = effectService;
    }
    EffectsComponent.prototype.getEffects = function () {
        var _this = this;
        this.effectService.getEffects().then(function (effects) { return _this.effects = effects; });
    };
    EffectsComponent.prototype.ngOnInit = function () {
        this.getEffects();
    };
    EffectsComponent.prototype.onSelect = function (effect) {
        this.selectedEffect = effect;
    };
    EffectsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedEffect.id]);
    };
    return EffectsComponent;
}());
EffectsComponent = __decorate([
    core_1.Component({
        selector: 'my-effects',
        templateUrl: './effects.component.html',
        styleUrls: ['./effects.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        effect_service_1.EffectService])
], EffectsComponent);
exports.EffectsComponent = EffectsComponent;
//# sourceMappingURL=effects.component.js.map