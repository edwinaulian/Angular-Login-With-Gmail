import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GmailService } from '../service/gmail.service';
import { GoogleSignService } from '../service/google.sign.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: gapi.auth2.GoogleUser | null;
  messages: gapi.client.gmail.Message[];
  message: string;

  constructor(
    private signinService: GoogleSignService,
    private ref: ChangeDetectorRef,
    private gmailService: GmailService,
  ) {

  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.signinService.observable().subscribe(user => {
      this.user = user;
      this.messages = null;
      this.message = null;
      this.refChanges();
    })
  }

  refChanges() {
    this.ref.detectChanges();
  }

  sign() {
    this.signinService.signin();
  }

  signOut() {
    this.signinService.signOut();
  }

  list() {
    this.gmailService.list(this.user).then(result => {
        this.messages = result.messages;
        console.log("msg", this.message)
        this.refChanges();
    })
  }

  getMessage(id: string) {
    this.gmailService.getMessage(this.user, id).then(result => {
      this.message = result;
      this.refChanges();
    })
  }

  dataNotFound(messages: any) {
      return messages == null || messages == undefined || messages == '';
  }
}
