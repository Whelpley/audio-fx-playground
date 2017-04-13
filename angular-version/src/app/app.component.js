"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// import { Inject, Injectable } from '@angular/core';
// import { AudioContext } from 'angular-audio-context';
var Effect = (function () {
    function Effect() {
    }
    return Effect;
}());
exports.Effect = Effect;
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Live Audio Transformation with Angular';
        this.effect = {
            id: 0,
            name: 'Delay',
            description: 'A basic digital delay'
        };
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <h1>{{title}}</h1>\n    <br>\n    <h4>Select menu for effects</h4>\n    <div id=\"effectMix\">Effect: \n\t\t\t<select id=\"effect\">\n\t\t\t\t<option>Delay </option>\n\t\t\t</select>\n\t\t</div>\n    <br>\n    <h4>Control panel for {{effect.name}} effect:</h4>\t\n    <div>\n      <label>Effect ID: </label>{{effect.id}}\n    </div>  \t\n\t\t<div id=\"controls\">\n\t\t\t<div id=\"delayControls\">Description: {{effect.description}}<br>\n\t\t\t\tDelay time: <input id=\"dtime\" type=\"range\" min=\"0.01\" max=\"3\" step=\"0.01\" value=\"0.15\" style=\"height: 20px; width: 200px\" onInput=\"if (dtime) dtime.delayTime.value = event.target.value;\"><br>\n\t\t\t\tRegen: <input id=\"dregen\" type=\"range\" min=\"0.0\" max=\"1.0\" step=\"0.01\" value=\"0.75\" style=\"height: 20px; width: 200px;\" \n\t\t\t\tonInput=\"if (dregen) dregen.gain.value = event.target.value;\">\n\t\t\t</div>\n\t\t</div>\n    "
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map