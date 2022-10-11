import {Component} from '@angular/core';

@Component({
	selector:"personlist",
	templateUrl:"./personlist.component.html"
})
export class PersonList {
	list = [
	{
		"firstname":"Matti",
		"lastname":"Meikäläinen"
	},
	{
		"firstname":"Jaska",
		"lastname":"Jokunen"
	},
	{
		"firstname":"Otto",
		"lastname":"Normalverbraucher"
	}
	]
}