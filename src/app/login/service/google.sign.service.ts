import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class GoogleSignService {

    private auth2: gapi.auth2.GoogleAuth
    private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1)

    constructor() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '600252352095-838o8eplmq114jepfo2qmf1rimp5joo4.apps.googleusercontent.com'
            })
        })
    }

    public signin() {
        this.auth2.signIn({
            scope: 'https://www.googleapis.com/auth/gmail.readonly'
        }).then(user => {
            this.subject.next(user);
        }).catch(() => {
            this.subject.next(null);
        })
    }

    public signOut() {
        this.auth2.signOut().then(() => {
            this.subject.next(null);
        })
    }

    public observable(): Observable<gapi.auth2.GoogleUser> {
        return this.subject.asObservable();
    }
}