import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HandlerService } from '../service/handler.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  filtre:string;
  password:string;
  Rpassword:string;
  Restartpassword:string;
  indice:any;
  user={nom:"",prenom:"",login:"",etat:0};
  listeSalaire=[
    {interim:"LEADER PAIE MARS",ussd:"779854080",kiosque:"louga",salaire:55000,prime_uv:0,manquant_paye:0,avoire:0,jour_absence:0,salaire_percu:0,etat:0},
    {interim:"LEADER PAIE MARS",ussd:"773214569",kiosque:"thies",salaire:48500,prime_uv:0,manquant_paye:0,avoire:0,jour_absence:0,salaire_percu:0,etat:0},
    {interim:"LEADER PAIE MARS",ussd:"779632541",kiosque:"fatick",salaire:45000,prime_uv:0,manquant_paye:0,avoire:0,jour_absence:0,salaire_percu:0,etat:0},
    {interim:"LEADER PAIE MARS",ussd:"773250277",kiosque:"dakar",salaire:50000,prime_uv:0,manquant_paye:0,avoire:0,jour_absence:0,salaire_percu:0,etat:0},
    {interim:"LEADER PAIE MARS",ussd:"777896325",kiosque:"kolda",salaire:41250,prime_uv:0,manquant_paye:0,avoire:0,jour_absence:0,salaire_percu:0,etat:0},
  ]
  lineClick:any=null;
  validation(){
    for(let i of this.listeSalaire){
      i.etat=1;
    }
  }
  Mnom:"";
  Mprenom:"";
  Mlogin:"";
  getIndex(i){
    this.indice=i;
    this.lineClick=this.listeSalaire[i];
    
  }
  updateUser(){
    this.modalRef1.hide();
  }
  closeUpdateModal(){
    this.modalRef1.hide();
  }
  constructor(private modalService: BsModalService,public _derService:HandlerService) { }
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
    //this.users.splice(i,1);
     if(confirm("Voulez supprimer cette ligne !!!")){
       this.listeSalaire.splice(i,1);
     }
   }
  ngOnInit() {
  }

}
