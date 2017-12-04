import { Component, OnInit } from '@angular/core';
import {PageActionsService} from './../../services/page-actions.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftpane',
  templateUrl: './leftpane.component.html',
  styleUrls: ['./leftpane.component.css']
})
export class LeftpaneComponent implements OnInit {

  showSetting: boolean;
  optionsStatus: boolean;
  userStatus: string;
  editForm: boolean;
  aboutPage: boolean;
  wallet: boolean;
  contact: boolean;
  

  constructor(
  	private pageAction: PageActionsService,    
    private authService: AuthService,    
    private router: Router,
  	) { }

  ngOnInit() {
  	this.showSetting = false;
  	this.optionsStatus = false;
  	this.userStatus = 'online';
  	this.editForm = false;
  	this.wallet = false;
    this.contact = false;

  	this.pageAction.getEmitter().subscribe(data => {

  		switch (data) {
        case "open_contact":
          this.contact = true;
          break;
        case "close_contact":
          this.contact = false;
          break;
        case "open_about":
          this.aboutPage = true;
          break;
  			case "close_about":
  				this.aboutPage = false;
  				break;
  			case "close_profile":
  				this.editForm = false;
  				break;
  			case "close_wallet":
  				this.wallet = false;
  				break;
  			default:
  				// code...
  				break;
  		}
  	})
  }


  signout(e) {
    e.preventDefault()
    this.authService.setLoginStatus(false);
    this.router.navigateByUrl('/signin');
  }

  toggleStatusOptions(event) {
  	event.preventDefault()
  	if(this.optionsStatus) {
  		this.optionsStatus = false;
  		return
  	}
  	this.optionsStatus = true;
  }

  openSetting(event) {
  	event.preventDefault()
  	if(this.showSetting) {
  		this.showSetting = false;
  		return
  	}
  	this.showSetting = true;
  }

  setStatus(status, event){
  	event.preventDefault()
  	this.userStatus = status
  	this.toggleStatusOptions(event)
  }

  toggleEditForm(event) {
  	event.preventDefault()
  	if(this.editForm) {
  		this.editForm = false;
  		return
  	}
  	this.editForm = true;
  }

  toggleAboutpage(e) {
  	e.preventDefault();
  	if(this.aboutPage) {
  		this.aboutPage = false;
  		return
  	}
  	this.aboutPage = true;

  }

  toggleWallet(e) {
  	e.preventDefault();
  	if(this.wallet) {
  		this.wallet = false;
  		return
  	}
  	this.wallet = true;

  }

  toggleContact(e) {
    e.preventDefault();
    if(this.contact) {
      this.contact = false;
      return
    }
    this.contact = true;

  }

}
