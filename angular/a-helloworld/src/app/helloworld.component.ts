import {Component,Input} from '@angular/core';

@Component({
	selector:"helloworld",
	templateUrl:"./helloworld.component.html"
})
export class HelloWorld {
	@Input() name = "World";
}