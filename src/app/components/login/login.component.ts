import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
  }

  ingresar(){
    console.log("Google");
    this.chatService.login();
    sessionStorage.setItem("uid",this.chatService.usuario.uid)
  }
}
