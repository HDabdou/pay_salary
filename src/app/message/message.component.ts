import { Component, OnInit, TemplateRef } from '@angular/core';
import { HandlerService } from '../service/handler.service';
import * as XLSX from 'xlsx';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  listeExcel:any = [];
  listeRecrutement:any = [];
  fileName:any;
  file :any;
  data:any;
  boutonFaye:number = 0;
  tableBool:boolean=false;
  message:string="";
  groupName:string="";
  campagnName:string="";
  numeroRecherche:string ="" ;

  constructor(private modalService: BsModalService,public _payService:HandlerService) { }
 
   modalRef1: BsModalRef;
  openModal1(template1: TemplateRef<any>) {
    //this.modalRef = this.modalService.show(template ,Object.assign({}, { class: 'modal-lg' }));
    this.modalRef1 = this.modalService.show(template1);
   }
   closeUpdateModal(){
    this.modalRef1.hide();
   }

   loadGroup(){
    this._payService.getGroup().then(res=>{
      console.log(res["rep"]);
      this.listeGroupe =res["rep"];
    })
   }
   listeGroupe:any;
  ngOnInit() {
    this._payService.getGroup().then(res=>{
      console.log(res["rep"]);
      this.listeGroupe =res["rep"];
    })
  }
  fileChange(event) {
    this.listeRecrutement =[];
    this.file= event.target.files[0];
    console.log(this.file);
    
    this.fileName = this.file.name
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      //console.log(fileReader.result);
      this.data = fileReader.result;
      let datas = new Uint8Array(this.data);
      var arr = new Array();
      for(var i = 0; i != datas.length; ++i) arr[i] = String.fromCharCode(datas[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
      this.listeExcel= XLSX.utils.sheet_to_json(worksheet,{raw:true});
      this.boutonFaye = 1;
      this.tableBool=true;
      console.log(this.listeExcel);
/*      this._derService.facture(JSON.stringify(this.listeExcel)).then(rep =>{
        console.log(rep);
      });

      for(let i = 0; i < this.listeExcel.length ;++i){
        console.log(this.listeExcel[i]);
        this.listeRecrutement.push(this.listeExcel[i])
      }*/
     
    } 
    fileReader.readAsArrayBuffer(this.file);
   /* for(let i of this.listeExcel){
      console.log(i.nom);
    }*/
   
  }
  groupSelect:string ="";
  listeGroup=[
    {nom:"Commerciaux"},
    {nom:"Recouvreur"},
    {nom:"Comptable"},
    {nom:"Developpeur"},
  ]
  
  addGroup(){
    if(this.groupName != ""){
      if(confirm("Etes-Vous sure de vouloir enregistrer ce groupe ?")){
        this._payService.addGroup(this.groupName).then(res =>{
          console.log(res);
        })
        //this.listeGroup.push("this.groupName");
        console.log(this.groupName);
        this.loadGroup();
      }
    }
  }

  addContact(){
    if(confirm("Etes-Vous sure de vouloir enregistrer ce liste ?")){
      var listeContact = JSON.stringify(this.listeExcel) ;
      console.log(listeContact) ;

      this._payService.addContact(this.groupSelect, this.listeExcel).then(res =>{
        console.log(res);
        this.reinitialiser();
      }) ;
    }
  }

  supprimer(i){
    if(confirm("Etes-Vous sure de vouloir supprimer ce client ?")){
      this.listeExcel.splice(i,1);
    }
  }
  reinitialiser(){
    this.listeExcel = [];
    this.listeRecrutement = [];
    this.fileName="";
    this.file=null;
    this.groupSelect="";
  }

  sendSMS(){
    if(this.groupSelect != ""){
      if(confirm("Etes-Vous sure de vouloir enregistrer ce groupe ?")){
        this._payService.addCampagn(this.campagnName, this.groupSelect, this.message).then(res =>{
          console.log(res);
        }) ;
      }
    }
    this.reinitialiser();
  }


  listeSMS:any=[];
  recherche:string;
  listeMessagerie =[
    {nom:"Abdou",prenom:"FALL",tel:"779854080"},
    {nom:"Fatou",prenom:"DIENG",tel:"783854080"},
    {nom:"Naby",prenom:"NDIAYE",tel:"772220594"},
    {nom:"Coumba",prenom:"DIOP",tel:"764854080"},
  ]

  listeContact : any[] ;

  rechercherContact(){
    this._payService.findContact(this.numeroRecherche).then(res=>{
      this.listeSMS=res.rep;  
    }) ; 
  }

  supprimerReach(i){
    this.getUser(i) ;
    if(confirm("Etes-Vous sure de vouloir supprimer ce client ?")){
      this._payService.deleteContact(this.userClick.id).then(res=>{
        console.log(res) ;
        this.listeSMS.splice(i,1);
      }) ; 
      this.closeUpdateModal();
    }
  }

  userClick:any=null;
  getUser(i){
    this.userClick = this.listeSMS[i] ;
  }

  reinit(){
   this.listeExcel = [] ;
  }

  updateUser1(){
    if(confirm("Etes-Vous sure de vouloir modifier les information de ce contact ?")){      
      this._payService.updateContact(this.userClick.id, this.userClick.prenom, this.userClick.nom, this.userClick.telephone).then(res=>{
        console.log(res) ;
      }) ; 
      this.closeUpdateModal();
    }

  }
}
