import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class GmailService {

    constructor() {
        gapi.load('client', () => {
            gapi.client.init({
                apiKey: 'AIzaSyA1ZyGCQWdVJG9FyiJR-5VUsiG_ySq6HJ4',
                clientId: '600252352095-838o8eplmq114jepfo2qmf1rimp5joo4.apps.googleusercontent.com',
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
                scope: 'https://www.googleapis.com/auth/gmail.readonly'
            })
        })
    }

    public list(user: gapi.auth2.GoogleUser): Promise<gapi.client.gmail.ListMessagesResponse> {
        console.log(user.getAuthResponse().expires_at)
        return new Promise(resolve => {
            user.reloadAuthResponse().then(refresh => {
            gapi.client.gmail.users.messages.list({
                userId: user.getId(),
                access_token: refresh.access_token,
                maxResults: 5
            }).then(res => {
                resolve(res.result);
            })
            })
        })
    }

    public getMessage(user: gapi.auth2.GoogleUser, id: string): Promise<string> {
        console.log(user.getAuthResponse().expires_at)
        return new Promise(resolve => {
            gapi.client.gmail.users.messages.get({
                userId: user.getId(),
                access_token: user.getAuthResponse().access_token,
                id: id
            }).then(res => {
                resolve(res.result.snippet);
            })
        })
    }

}