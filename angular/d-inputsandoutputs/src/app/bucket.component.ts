import {Component} from '@angular/core';

@Component({
	selector:"bucket",
	templateUrl:"./bucket.component.html"
})
export class Bucket {
	message:string="";
	
	getMessage(message:string) {
		this.message = "The apple color is "+message;
	}
}