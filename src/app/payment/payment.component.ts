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
      for(var i = 0; i != datas.length; ++i) 
        arr[i] = String.fromCharCode(datas[i]);

      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
      this.listeExcel= XLSX.utils.sheet_to_json(worksheet,{raw:true});

      this.normalize();

      this.boutonFaye = 1;
      this.tableBool=true;
      console.log(this.listeExcel);
      this._derService.facture(JSON.stringify(this.listeExcel)).then(rep =>{
        console.log(rep);
      });

    } 
    fileReader.readAsArrayBuffer(this.file);   
  }

            

  normalize(){
    this.listeExcel.forEach(function(element){
      if(!element.hasOwnProperty('INTERIM')){
         element.INTERIM = "";
      }
      if(!element.hasOwnProperty('LOCALITES')){
         element.LOCALITES = "";
      }
      if(!element.hasOwnProperty('USSD')){
         element.USSD = "770000000";
      }
      if(!element.hasOwnProperty('KIOSQUES')){
         element.KIOSQUES = "";
      }
      if(!element.hasOwnProperty('SALAIRE')){
         element.SALAIRE = 0;
      }
      if(!element.hasOwnProperty('PRIME_UV')){
         element.PRIME_UV = 0;
      }
      if(!element.hasOwnProperty('MANQUANT_PAYE')){
         element.MANQUANT_PAYE = 0;
      }
      if(!element.hasOwnProperty('AVOIR')){
         element.AVOIR = 0;
      }
      if(!element.hasOwnProperty('JOURS_D_ABSENCE')){
         element.JOURS_D_ABSENCE = 0;
      }
      if(!element.hasOwnProperty('ABS_LIS')){
         element.ABS_LIS = 0;
      }
      if(!element.hasOwnProperty('SALAIRE_PERCU')){
         element.SALAIRE_PERCU = 0;
      }

    })
  }


  fayelene(){

     console.log(this.listeExcel) ;

     this._derService.insertToBd(JSON.stringify(this.listeExcel)).then(rep =>{
          console.log(rep);
          this.listeExcel=[];
      });
  }
  payeOne(employe:any,i:number){
    let tabOne=[];
    tabOne.push(employe);

     console.log(employe) ;

    this._derService.insertToBd(JSON.stringify(tabOne)).then(rep =>{
        console.log(rep);
        this.listeExcel.splice(i,1);
    });

  }

}
