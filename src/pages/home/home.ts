import { Component } from '@angular/core';
import { LoadingController  } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  feeds: FirebaseListObservable<any>

  constructor(public af: AngularFire, public loadingCtrl: LoadingController) {
	  this.buscarFeeds(af);
  }
  
  buscarFeeds (af: AngularFire): void{

    let loading = this.loadingCtrl.create({
      content: 'Buscando Feeds...'
    });

    loading.present();

    this.feeds = af.database.list('/feeds');
  
    loading.dismiss();
  }

  itemSelected (feed):void {    
    if(feed.link != ""){
      new InAppBrowser(feed.link, '_system');
    }     
  } 
}
