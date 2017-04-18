"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var mock_effects_1 = require("./mock-effects");
var core_1 = require("@angular/core");
var EffectService = (function () {
    function EffectService() {
    }
    EffectService.prototype.getEffects = function () {
        return Promise.resolve(mock_effects_1.EFFECTS);
    };
    EffectService.prototype.getEffectsSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // Simulate server latency with 2 second delay
            setTimeout(function () { return resolve(_this.getEffects()); }, 2000);
        });
    };
    EffectService.prototype.getEffect = function (id) {
        return this.getEffects()
            .then(function (effects) { return effects.find(function (effect) { return effect.id === id; }); });
    };
    return EffectService;
}());
EffectService = __decorate([
    core_1.Injectable()
], EffectService);
exports.EffectService = EffectService;
//# sourceMappingURL=effect.service.js.map