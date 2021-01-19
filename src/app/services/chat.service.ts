import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { tap, map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario:any = {};

  constructor(private afs: AngularFirestore, public auth: AngularFireAuth ) { 

    this.auth.authState.subscribe( user => {
      console.log('Estado del usuario: ',user);

      if(!user){
        return;
      }

      this.usuario.nombre=user.displayName;
      this.usuario.uid = user.uid;
    })
  }

  cargarMensaje() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(40));
    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[]) => {
      console.log(mensajes);
      this.chats = [];

      for (let mensaje of mensajes ){
        this.chats.unshift(mensaje);
      }

      return this.chats;
    }));
  }

  agregarMensaje(texto: string) {

    //falta uid del usuario
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }

    return this.itemsCollection.add(mensaje);

  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {}
    this.auth.signOut();
  }
}
