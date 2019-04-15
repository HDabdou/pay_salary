import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  closeUpdateModal(){
    this.modalRef1.hide();
  }
  constructor(private modalService: BsModalService) { }
 
   modalRef1: BsModalRef;
  openModal1(template1: TemplateRef<any>) {
    //this.modalRef = this.modalService.show(template ,Object.assign({}, { class: 'modal-lg' }));
    //this.modalRef1 = this.modalService.show(template1);
    this.modalRef1 = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-lg' }));
   }
   countInsertion:number;
   choice:string;
   date:any;
   user:any;
   domaine:any;
   listeInsertion =[
    {date:new Date().toJSON(),nom:"naby",prenom:"NDIAYE",salaire:"45000",user:"Abdou",domaine:"Messagerie"},
    {date:new Date().toJSON(),nom:"Ali",prenom:"DIENG",salaire:"55000",user:"Fallou",domaine:"Salarie"},
    {date:new Date().toJSON(),nom:"AISSATOU",prenom:"NDIAYE",salaire:"40000",user:"Fatou",domaine:"Messagerie"},
    {date:new Date().toJSON(),nom:"Ablaye",prenom:"Barry",salaire:"45000",user:"Abdou",domaine:"Salarie"},
    {date:new Date().toJSON(),nom:"naby",prenom:"NDIAYE",salaire:"45000",user:"Cheikh",domaine:"Messagerie"},
    {date:new Date().toJSON(),nom:"Pape",prenom:"Dieye",salaire:"45000",user:"Abdou",domaine:"Salarie"},
    {date:new Date().toJSON(),nom:"Djibril",prenom:"DIOP",salaire:"65000",user:"Dieynaba",domaine:"Messagerie"},
    {date:new Date().toJSON(),nom:"naby",prenom:"NDIAYE",salaire:"49000",user:"Maty",domaine:"Messagerie"}
  ]
  resultSeach:any=null;
  auditInsertion(){
    this.choice="insertion";
  }

  seachInsertion(date,user,domaine){
    this.resultSeach=[];
    console.log(this.listeInsertion);
    
    for(let i of this.listeInsertion){
      if( i.user == user && i.domaine == domaine){
        this.resultSeach.push(i);
      }
    }
    console.log(this.resultSeach);

  }

  ngOnInit() {
    this.countInsertion = this.listeInsertion.length;
  }

}
