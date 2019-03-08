import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { HandlerService } from '../service/handler.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  listeExcel:any = [];
  listeRecrutement:any = [];
  fileName:any;
  file :any;
  data:any;
  boutonFaye:number = 0;
  tableBool:boolean=false;

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
      this._derService.facture(JSON.stringify(this.listeExcel)).then(rep =>{
        console.log(rep);
      });
     /* this._derService.insertToBd(JSON.stringify(this.listeExcel)).then(rep =>{
          console.log(rep);
      });*/
      for(let i = 0; i < this.listeExcel.length ;++i){
        console.log(this.listeExcel[i]);
        this.listeRecrutement.push(this.listeExcel[i])
       // this.listToPay = this.listeExcel[i];
      }
     /* for(let i of this.listeRecrutement){
        console.log(i.JOURS_D_ABSENCE);
        
      }*/
     // console.log(this.listeRecrutement);
      //this._paySarary.(this.listeRecrutement).then(res=>{console.log(res);
     // this._derService.soumettre(this.listeRecrutement).then(res => {console.log(res);
     // });
      //})
     // this.boutonFaye = 1;
    } 
    fileReader.readAsArrayBuffer(this.file);
   /* for(let i of this.listeExcel){
      console.log(i.nom);
    }*/
   
  }
  fayelene(){
     this._derService.insertToBd(JSON.stringify(this.listeExcel)).then(rep =>{
          console.log(rep);
          this.listeExcel=[];
      });
  }
  payeOne(employe:any,i:number){
    let tabOne=[];
    tabOne.push(employe);
    this._derService.insertToBd(JSON.stringify(tabOne)).then(rep =>{
        console.log(rep);
        this.listeExcel.splice(i,1);
    });

  }

}
