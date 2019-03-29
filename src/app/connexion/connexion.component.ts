import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccueilComponent } from '../accueil/accueil.component';
import { HandlerService } from '../service/handler.service';
import { ConnexionService } from '../service/connexion.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  login:string;
  password:string;
  loginTest1:string='admin1';
  passwordTest1:string='passer1';
  Error:boolean=false;
  onConnect(){
  // console.log('ok');
  if(this.login!=undefined && this.login!="" && this.password!="" && this.password!=""){
    console.log(this.login);
   this.connectionService.connection(this.login,this.password).then(rep =>{
     console.log(rep);
     if(rep.status=="1"){
       sessionStorage.setItem("token",rep.token);
       sessionStorage.setItem("id",rep.id.toString());
      this.router.navigate(['/accueil']);
     }else{
       this.Error=true;
     }
   });
  }
  /*if(this.login==this.loginTest1 && this.password==this.passwordTest1){
    this.router.navigate(['/admin']);
  }else if(this.login==this.loginTest && this.password==this.passwordTest){
      this.router.navigate(['/accueil']);
    }else{
      alert("ko")
    }*/
      
   
  }
  constructor(private router: Router,public accueilService:HandlerService,private connectionService:ConnexionService) { }

  ngOnInit() {
   
  }

}
