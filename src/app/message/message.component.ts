import { Component, OnInit } from '@angular/core';
import { HandlerService } from '../service/handler.service';
import * as XLSX from 'xlsx';

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

  constructor(public _derService:HandlerService) { }

  ngOnInit() {
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
        //this.listeGroup.push("this.groupName");
        console.log(this.groupName);
        
      }
    }
  }
  addContact(){
    if(confirm("Etes-Vous sure de vouloir enregistrer ce liste ?")){
      console.log(this.listeExcel);
      console.log(this.groupSelect);
      this.reinitialiser();
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
    console.log(this.message+" au "+this.groupSelect);
    this.reinitialiser();
  }
}
