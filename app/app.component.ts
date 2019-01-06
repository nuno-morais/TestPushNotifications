import { Component, OnInit, OnDestroy } from "@angular/core";
import { isAndroid, isIOS } from "tns-core-modules/platform";

import * as firebase from "nativescript-plugin-firebase";

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html",
})

export class AppComponent implements OnInit, OnDestroy {
  // using async-await just for show
  async ngOnInit(): Promise<void> {
    console.log("Connecting firebase...")
    try {
      await firebase.init({
        showNotifications: true,
        showNotificationsWhenInForeground: true,
        onPushTokenReceivedCallback: token => {
          // you can use this token to send to your own backend server,
          // so you can send notifications to this specific device
          console.log("Firebase plugin received a push token: " + token);
        },
        onMessageReceivedCallback: message => {
          console.log("Push message received");
          setTimeout(() => {
            alert({
              title: "Push message!",
              message: (message.title !== undefined ? message.title : ""),
              okButtonText: "Sw33t"
            });
          }, 500);
        },
      });
      console.log(">>>>> Firebase initialized");
    } catch (err) {
      console.log(">>>>> Firebase init error: " + err);
    }
    // firebase.addOnMessageReceivedCallback((data: any) => {
    //   console.log("Receiving push a notification: ", data);
    // });
    // firebase.addOnPushTokenReceivedCallback((token: any) => {
    //   console.log("REGISTRATION ID: ", token);
    // });
  }

  async ngOnDestroy() {
    console.log("Destroying")
  }
}
