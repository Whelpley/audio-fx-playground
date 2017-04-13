import { Component } from '@angular/core';
// import { Inject, Injectable } from '@angular/core';
// import { AudioContext } from 'angular-audio-context';

export class Effect {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <br>
    <h4>Select menu for effects</h4>
    <div id="effectMix">Effect: 
			<select id="effect">
				<option>Delay </option>
			</select>
		</div>
    <br>
    <h4>Control panel for {{effect.name}} effect:</h4>	
    <div>
      <label>Effect ID: </label>{{effect.id}}
    </div>  	
		<div id="controls">
      <h4>Where am I?</h4>

			<div id="delayControls">Description: {{effect.description}}<br>
				Delay time: <input id="dtime" type="range" min="0.01" max="3" step="0.01" value="0.15" style="height: 20px; width: 200px" onInput="if (dtime) dtime.delayTime.value = event.target.value;"><br>
				Regen: <input id="dregen" type="range" min="0.0" max="1.0" step="0.01" value="0.75" style="height: 20px; width: 200px;" 
				onInput="if (dregen) dregen.gain.value = event.target.value;">
			</div>
		</div>
    `
})
export class AppComponent {
  title = 'Live Audio Transformation with Angular';
  effect: Effect = {
    id: 0,
    name: 'Delay',
    description: 'A basic digital delay'
  };
}