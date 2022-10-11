import {Component,OnInit} from '@angular/core';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contactservice.service';

@Component({
	selector:"contact-list",
	templateUrl:"./contactlist.component.html"
})
export class ContactList implements OnInit {
	
	contact:Contact = new Contact("","","","",0);
	contactList:Contact[]=[];
	
	constructor(private _contactService:ContactService) {}
	
	ngOnInit() {
		this.getList();
	}
	
	getList() {
		this.contactList = this._contactService.getList();
	}
	
	addToList() {
		this._contactService.addToList(this.contact);
		this.contact = new Contact("","","","",0);
		this.getList();
	}
	
	removeFromList(id:number) {
		this._contactService.removeFromList(id);
		this.getList();
	}
}