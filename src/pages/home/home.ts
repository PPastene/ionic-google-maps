import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  //CameraPosition,
  //MarkerOptions,
  Marker,
  Environment,
  LatLng
} from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {}

  ionViewDidLoad() {
    //this.loadMap();
    this.getPosition();
  }

  getPosition(){
    this.geolocation.getCurrentPosition().then( position => {
      this.loadMap(position)
    });
  }

  loadMap(geoPosition) {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCWEj8mneiHEhS3ckjSjQIvKdZt9G0s4V0',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCWEj8mneiHEhS3ckjSjQIvKdZt9G0s4V0'
    });

    let latLng = new LatLng(geoPosition.coords.latitude, geoPosition.coords.longitude);

    let mapOptions: GoogleMapOptions = {
      camera: {
        /*target: {
          lat: 43.0741904,
          lng: -89.3809802
        },*/
        target: latLng,
        zoom: 18,
        //tilt: 30
      }
    }
    
    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }
}