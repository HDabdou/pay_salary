import { Component, OnInit } from '@angular/core';
import { HandlerService } from '../service/handler.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {
  private employes:any;
  private liste:boolean=true;
  private new:boolean=false;
  private listeAbsence=[];
  private emp:any;
  private empTempon:any;
  private date:any;
  private bsModaldetail:BsModalRef;

  constructor(private handlerService:HandlerService,private bsModal:BsModalService) { }

  ngOnInit() {
    this.ListeEmplye();
    this.ListeAbsence();
  }
  ListeEmplye(){
    this.handlerService.getEmolyes().then(rep =>{
      console.log(rep);
      this.employes=rep.rep;
    });
  }
  ListeAbsence(){
    this.handlerService.getAbsent().then(rep =>{
      this.listeAbsence=rep['rep'];
      console.log(rep);
    });
  }
  value(v:any){
    console.log(v);
  }
  switch(el:string){
    if(el=="liste"){
      this.liste=true;
      this.new=false;
      this.ListeAbsence();
    }
    if(el=="new"){
      this.liste=false;
      this.new=true;
    }

  }
  addInfo(){
    console.log(this.emp.prenom);
    console.log(this.date);
  }
  marquer(e:any,template){
    console.log(e);
    this.empTempon=e;
    this.bsModaldetail=this.bsModal.show(template);
  }
  hideMOdalMarquer(){
    this.bsModaldetail.hide();
  }
  validerEnregistrementAbsence(){
    if(this.date!=undefined && this.date!=""){
      console.log(this.date);
      this.handlerService.validerEnregistrementAbsence(this.empTempon.prenom,this.empTempon.nom,this.empTempon.id,this.date).then(rep =>{
        console.log(rep);
        if(rep["rep"]==1){
          this.hideMOdalMarquer();
        }else{
          alert("something is wrong please try again.");
        }
      });
    }else{
      alert("veuillez choisir une date");
    }
  }
  supprimerAbsence(a:any){
    console.log(a);
    if(confirm("Etes vous sure de vouloir supprimer cette ligne?")){
      this.handlerService.supprimerAbsence(a.id).then(rep=>{
        if(rep['rep']==true){
          this.ListeAbsence();
        }else{
          alert("something is wrong.");
        }
        //console.log(rep);
      });
    }
  }
}
