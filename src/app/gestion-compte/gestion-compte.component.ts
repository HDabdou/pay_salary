import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HandlerService } from '../service/handler.service';
import { ConnexionService } from '../service/connexion.service';

@Component({
  selector: 'app-gestion-compte',
  templateUrl: './gestion-compte.component.html',
  styleUrls: ['./gestion-compte.component.css']
})
export class GestionCompteComponent implements OnInit {

  password:string;
  Rpassword:string;
  Restartpassword:string;
  filtre:string;
  indice:any;
  user={nom:"",prenom:"",login:"",etat:0};
  users=[]  ; /*[
    {nom:"NDIAYE",prenom:"Naby",login:"naby@naby.sn",etat:0},
    {nom:"DIOP",prenom:"Alioune",login:"alioune@alioune.sn",etat:1},
    {nom:"FALL",prenom:"Oumar",login:"oumar@oumar.sn",etat:0},
    {nom:"NDIAYE",prenom:"Fatou",login:"fatou@fatou.sn",etat:1},
  ] */
  userClick:any=null;


  addUser(){
     this.modalRef.hide()
     this.connectionService.dolliUsers(this.user.prenom, this.user.nom, this.user.login, this.password).then(rep =>{
      this.users = rep.rep ;
      if(this.password == this.Rpassword){
          this.users.push(this.user);
      }
    }) ;
  }

  soppiUser(){
    this.modalRef1.hide();
    this.connectionService.soppiMbirriUser(this.Mid, this.Mprenom, this.Mnom, this.Mlogin, this.Restartpassword).then(rep =>{
      console.log(rep) ;
    }) ;
  }

  Mnom:"";
  Mprenom:"";
  Mlogin:"";
  Mid:any;

  getIndex(i){
    this.indice=i;
    this.userClick=this.users[i];
    console.log(this.userClick);
    this.Mid=this.userClick.id;
    this.Mnom=this.userClick.nom;
    this.Mprenom=this.userClick.prenom;
    this.Mlogin=this.userClick.login;
    console.log(this.Mnom);
    
  }
  updateUser(){
    this.users[this.indice].nom=this.Mnom;
    this.users[this.indice].prenom=this.Mprenom;
    this.users[this.indice].login=this.Mlogin;
    this.modalRef1.hide();
  }
  closeUpdateModal(){
    this.modalRef1.hide();
  }
  constructor(private modalService: BsModalService,public _derService:HandlerService, private connectionService:ConnexionService) { }
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    //this.modalRef = this.modalService.show(template ,Object.assign({}, { class: 'modal-lg' }));
    this.modalRef = this.modalService.show(template);
   }
   modalRef1: BsModalRef;
  openModal1(template1: TemplateRef<any>) {
    //this.modalRef = this.modalService.show(template ,Object.assign({}, { class: 'modal-lg' }));
    this.modalRef1 = this.modalService.show(template1);
   }

   deleteUser(i){
     if(confirm("Voulez-vous supprimer l'utilisareur !!!")){
        this.connectionService.farrUser(this.users[i].id).then(rep =>{
        console.log(rep.rep) ;
        this.users = rep.rep ;
       }) ;
     }
   }


  ngOnInit() {
   this.connectionService.getUsers().then(rep =>{
    console.log(rep.rep) ;
    this.users = rep.rep ;
   }) ;
  }

}
