import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  closeUpdateModal(){
    this.modalRef1.hide();
    this.reinitialiser();
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
    {id:1,date:new Date().toJSON(),nom:"naby",prenom:"NDIAYE",salaire:"45000",user:"Abdou",domaine:"Messagerie",etat:0},
    {id:9,date:new Date().toJSON(),nom:"Abdou",prenom:"NDIAYE",salaire:"45000",user:"Abdou",domaine:"Messagerie",etat:0},
    {id:2,date:new Date().toJSON(),nom:"Ali",prenom:"DIENG",salaire:"55000",user:"Fallou",domaine:"Salarie"},
    {id:3,date:new Date().toJSON(),nom:"AISSATOU",prenom:"NDIAYE",salaire:"40000",user:"Fatou",domaine:"Messagerie",etat:0},
    {id:4,date:new Date().toJSON(),nom:"Ablaye",prenom:"Barry",salaire:"45000",user:"Abdou",domaine:"Salarie",etat:0},
    {id:5,date:new Date().toJSON(),nom:"naby",prenom:"NDIAYE",salaire:"45000",user:"Cheikh",domaine:"Messagerie",etat:0},
    {id:6,date:new Date().toJSON(),nom:"Pape",prenom:"Dieye",salaire:"45000",user:"Abdou",domaine:"Salarie",etat:0},
    {id:7,date:new Date().toJSON(),nom:"Djibril",prenom:"DIOP",salaire:"65000",user:"Dieynaba",domaine:"Messagerie",etat:0},
    {id:8,date:new Date().toJSON(),nom:"naby",prenom:"NDIAYE",salaire:"49000",user:"Maty",domaine:"Messagerie",etat:0}
  ]

  listeDelete =[
    {id:1,date:new Date().toJSON(),nom:"naby",prenom:"DIOP",salaire:"45000",user:"Abdou",domaine:"Messagerie"},
    {id:2,date:new Date().toJSON(),nom:"Ali",prenom:"DIENG",salaire:"55000",user:"Fallou",domaine:"Salarie"},
    {id:3,date:new Date().toJSON(),nom:"AISSATOU",prenom:"NDIAYE",salaire:"40000",user:"Fatou",domaine:"Messagerie"},
    {id:4,date:new Date().toJSON(),nom:"Ablaye",prenom:"Barry",salaire:"45000",user:"Abdou",domaine:"Salarie"},
    {id:5,date:new Date().toJSON(),nom:"naby",prenom:"NDIAYE",salaire:"45000",user:"Cheikh",domaine:"Messagerie"},
    {id:6,date:new Date().toJSON(),nom:"Pape",prenom:"Dieye",salaire:"45000",user:"Abdou",domaine:"Salarie"},
    {id:9,date:new Date().toJSON(),nom:"Djibril",prenom:"DIOP",salaire:"65000",user:"Dieynaba",domaine:"Messagerie"},
    {id:8,date:new Date().toJSON(),nom:"naby",prenom:"NDIAYE",salaire:"49000",user:"Maty",domaine:"Messagerie"}
  ]
  resultSeach:any=null;
  searchResponse:boolean;
  message:boolean;
  auditInsertion(){
    this.choice="insertion";
  }
  auditSuppression(){
    this.choice="suppression";
  }
  auditUpdate(){
    this.choice="mise à jour";
  }
  lineClickedBefore:any;
  lineClickedAfter:any;
  click:boolean=false;
  indice:number;
  detailDelete(id,index){
    this.lineClickedBefore = [];
    this.lineClickedBefore.push(this.listeInsertion[index]);
    this.indice=index;
    this.lineClickedAfter = [];
    for(let i of this.listeDelete){
      if(i.id == id){
        this.lineClickedAfter.push(i);
        this.click=true;
      }
    }
  }
  reClick(){
    this.click=false;
    this.lineClickedAfter = [];
    this.lineClickedBefore = [];
    this.reinitialiser();
  }
  seachInsertion(date,user,domaine){
    this.resultSeach=[];
    console.log(this.listeInsertion);
    
    for(let i of this.listeInsertion){
      if( i.user == user && i.domaine == domaine){
        this.resultSeach.push(i);
      }
    }
    if(this.resultSeach.length == 0){
      this.searchResponse = false;
      this.message = true;
    }else{
      this.searchResponse = true;
      this.message = true;
    }
    console.log(this.resultSeach);
  }

  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }
  reinitialiser(){
    this.searchResponse = false;
    this.message = false;
    this.resultSeach=[];
    this.click=false;
    this.lineClickedAfter = [];
    this.lineClickedBefore = [];
    this.choice = null;
    this.date = null;
    this.user = null;
    this.domaine = null;
  }

  ngOnInit() {
    this.countInsertion = this.listeInsertion.length;
  }

}
