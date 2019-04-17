import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HandlerService } from '../service/handler.service';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { PaySalaryService } from '../service/pay-salary.service';
import { Router} from '@angular/router';
import { ConnexionService } from '../service/connexion.service';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  soumettre:number = 0;
  reponse:string='';
  message:string='';
 
  indice:number;
  myChart:any;
  myChart2:any;
  display:number=0;
  intervalledateinit:string;
  intervalleddatefinal:string;
  
 myDiv;
  closeNav(){
    this.myDiv = document.getElementById("navbarNavDropdown");
    if(this.myDiv.style.display === "none"){
      this.myDiv.style.display ="block";
    }else{
      this.myDiv.style.display = "none";
    }
    console.log(this.myDiv.classList);
   
  }

  constructor(private modalService: BsModalService,public _derService:HandlerService,public _paySarary:PaySalaryService,private route:Router,private connectionService:ConnexionService) { }
  rechercheIntervalle(){
    this.tabDate=[]
    this.tabRecouv=[]
    this.tabRecouv=[];
    this.tabRV=[];
    this.tabFN=[];
    this.listDay = [];
    this._derService.rechercheIntervalle(this.intervalledateinit,this.intervalleddatefinal).then(res =>{
      // console.log(res['message']);
       this.listDay= res['message'];
       if(this.listDay != undefined){
        for(let i of this.listDay){
          this.tabDate.push(i.dateEnregistremet)
           if(i.etat == 0){
            this.tabRecouv.push(this.getInfo1(i.client,'montant'));
            this.tabFN.push(0);
            this.tabRV.push(0);
           }
           if(i.etat == 1){
            this.tabRV.push(this.getInfo1(i.client,'montant'));
            this.tabRecouv.push(0);
            this.tabFN.push(0);
           }
           if(i.etat == 2){
            this.tabFN.push(this.getInfo1(i.client,'montant'));
            this.tabRV.push(0);
            this.tabRecouv.push(0);
           }
          
         }
       }else{
        this.tabDate.push(this.intervalledateinit)
        this.tabDate.push(this.intervalledateinit)
        this.tabFN.push(0);
        this.tabRV.push(0);
        this.tabRecouv.push(0);
        console.log(this.tabDate);
       }
      
       //this.listRecouvremet = this.Recouvrement
       console.log( this.tabDate); 
       this.myChart2 = new Chart('myChart2', {
        type: 'line',
        data: {
            labels: this.tabDate,
            datasets: [{
                label: 'Recouvrement',
                data: this.tabRecouv,
                borderColor: [
                  '#A52A2A',
                ],
                borderWidth: 3
                },
               {
                label: 'Rendez-vous',
                data: this.tabRV,
                borderColor: [
                  '#007bff',
                ],
                borderWidth: 3
                },
                {
                label: 'Finaliser',
                data: this.tabFN,
                borderColor: [
                  'darkorange',
                ],
                borderWidth: 3
              }
          ]
        },
        options: {
          events: ['click'],
          legend: {
            labels: {
              fontColor: 'black'
            }
        }
        
        }
    });
     })
  }
  boutonFaye:number = 0;
  listSalary =[
    {nom:'Dieng',prenom:'Aliou',telephone:'773250277',salaire:'50000',zone:'Yoff',jAbsence:5,etat:1},
    {nom:'Fall',prenom:'Modou',telephone:'779857780',salaire:'40000',zone:'Foire',jAbsence:5,etat:1},
    {nom:'Tamba',prenom:'Issa',telephone:'778981663',salaire:'55000',zone:'Pikine',jAbsence:5,etat:1},
    {nom:'Dieye',prenom:'Pape',telephone:'775662089',salaire:'45000',zone:'fann',jAbsence:5,etat:1},
  ]
  soumettreClieck(){
    //if(this.soumettre == 0){
      this.soumettre=1
    //}
    //if(this.soumettre == 1){
    //  this.soumettre=0
   // }
    
  }
 

  home(){
    //this.getClassCSS();
    this.display = 0;
  }
 
  liste:number=0;
  Recouvrement = []
  getClassCSS(){
    this.getColor.bntClick=false;
    this.getColor.bntNotClick=true;
  }
  getColor = {
    'bntClick': false,
    'bntNotClick':true
  }
  nomRec :any=0;
  nomRV :any=0;
  nomFN :any=0;
  file :any;
  data:any;
  selectionjour:string
  listeExcel:any = [];
  listeRecrutement:any = [];
  fileName:any;
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
      this.listeExcel= XLSX.utils.sheet_to_json(worksheet,{raw:true}) 
      console.log(this.listeExcel);
      this._derService.insertToBd(JSON.stringify(this.listeExcel)).then(rep =>{
          console.log(rep);
      });
      for(let i = 0; i < this.listeExcel.length ;++i){
        console.log(this.listeExcel[i]);
        this.listeRecrutement.push(this.listeExcel[i])
       // this.listToPay = this.listeExcel[i];
      }
      for(let i of this.listeRecrutement){
        console.log(i.JOURS_D_ABSENCE);
        
      }
     // console.log(this.listeRecrutement);
      //this._paySarary.(this.listeRecrutement).then(res=>{console.log(res);
      this._derService.soumettre(this.listeRecrutement).then(res => {console.log(res);
      })
      //})
      this.boutonFaye = 1;
    } 
    fileReader.readAsArrayBuffer(this.file);
    for(let i of this.listeExcel){
      console.log(i.nom);
    }
   
  }
  listId:any = [];
  listToPay:any;
  fayelene(){
    for(let l of this.listSalarees ){
      if(l.etat == 0){
        l.etat = -1
        this.listId.push(l.id) 
        let requette = "3/"+this.getInfo1(l.infoSalaries,'USSD')+"/"+this.getInfo1(l.infoSalaries,'SALAIRE')
        console.log(requette);
        this._paySarary.requerirControllerOM(requette).then(res =>{});
      }
    }

     setInterval(() => {
      this._derService.recherche(this.listId).then(res =>{
        console.log(res);
      })
      for(let l of this.listSalarees){
        for(let i of this.listId){
          if(l.id == i){
            l.etat = 1;
          }
        }
      }
      this.boutonFaye = 0;
    }, 9000);
     
  }
  update(){
    this._derService.liste().then(res =>{
       this.Recouvrement= res['message'];
       for(let i of this.Recouvrement){
         
         if(i.etat == 0){
           this.nbRecouvrement = this.nbRecouvrement +1;
           this.nomRec = this.nomRec + this.getInfo1(i.client,'montant');
         }
         if(i.etat == 1){
           this.nbRV = this.nbRV +1;
           this.nomRV = this.nomRV + this.getInfo1(i.client,'montant');
         }
         if(i.etat == 2){
           this.nbFinalaliser = this.nbFinalaliser +1;
           this.nomFN = this.nomFN + this.getInfo1(i.client,'montant');
         }
        
       }
    })
  }
  them:any;
  
  sombre(){
    this.them = 1;
  }
  claire(){
    this.them = 2;
  }
  changeThem(){
    if(this.them == 1){
      return  { 'themClaire': false,'themSombre':true};
    }
    if(this.them == 2){
      return  { 'themClaire': true,'themSombre':false};
    }
  }
  changeBackThem(){
    if(this.them == 1){
      return  { 'backThemSombre':true,'backThemClaire':false};
    }
    if(this.them == 2){
      return  { 'backThemSombre':false,'backThemClaire':true};
    }
  }
  dtheme:number=0;
  displayTheme(){
    this.dtheme=1;
  }
  soumission(){   
    this.soumettre = 0;
  }
  lRecouvrement =[];
  lRendezVous = [];
  lFinaliser = [];
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  modalRef1: BsModalRef;
  openModal1(template1: TemplateRef<any>) {
    this.modalRef1 = this.modalService.show(template1);
  }
  
  lNewListe = [];
  newNotif:number=0;
  hideNotif(){
    this.newNotif=0;
  }
  Recherche(){
    console.log(this.selectionjour);
    this.tabDate=[]
    this.tabRecouv=[]
    this.tabRecouv=[];
    this.tabRV=[];
    this.tabFN=[];
    this.listDay = [];
    this._derService.recherche(this.selectionjour).then(res =>{
      // console.log(res['message']);
       this.listDay= res['message'];
       if(this.listDay != undefined){
        for(let i of this.listDay){
          this.tabDate.push(i.dateEnregistremet)
           if(i.etat == 0){
            this.tabRecouv.push(this.getInfo1(i.client,'montant'));
            this.tabFN.push(0);
            this.tabRV.push(0);
           }
           if(i.etat == 1){
            this.tabRV.push(this.getInfo1(i.client,'montant'));
            this.tabRecouv.push(0);
            this.tabFN.push(0);
           }
           if(i.etat == 2){
            this.tabFN.push(this.getInfo1(i.client,'montant'));
            this.tabRV.push(0);
            this.tabRecouv.push(0);
           }
         }
       }else{
        this.tabDate.push(this.selectionjour)
        this.tabFN.push(0);
        this.tabRV.push(0);
        this.tabRecouv.push(0);
        console.log(this.tabDate);
       }
      
       //this.listRecouvremet = this.Recouvrement
       console.log( this.tabDate); 
       this.myChart2 = new Chart('myChart2', {
        type: 'line',
        data: {
            labels: this.tabDate,
            datasets: [{
                label: 'Recouvrement',
                data: this.tabRecouv,
                borderColor: [
                  '#A52A2A',
                ],
                borderWidth: 3
                },
               {
                label: 'Rendez-vous',
                data: this.tabRV,
                borderColor: [
                  '#007bff',
                ],
                borderWidth: 3
                },
                {
                label: 'Finaliser',
                data: this.tabFN,
                borderColor: [
                  'darkorange',
                ],
                borderWidth: 3
              }
          ]
        },
        options: {
          events: ['click'],
          legend: {
            labels: {
              fontColor: 'black'
            }
        }
        
        }
    });
     })
  }
  
  nbRecouvrement:number=0;
  nbRV:number=0;
  nbFinalaliser:number=0;
  tabDate:any=[]
  tabRecouv:any=[]
  tabRV:any=[]
  tabFN:any=[]
  listDay:any = []
  listSalarees:any =[];
  ngOnInit() {
    this.myDiv = document.getElementById("navbarNavDropdown");
    this.myDiv.style.display = "none"
    let token=sessionStorage.getItem("token");
    let id=sessionStorage.getItem("id");
    this.connectionService.verifUser(token,id).then(rep =>{
      console.log(rep);
      if(rep["status"]=="0"){
        this.route.navigate(['/login']);
      }

    });
    this.selectionjour =  ((new Date()).toJSON()).split("T",2)[0];
    console.log(this.selectionjour);
    this._derService.recherche(this.selectionjour).then(res =>{
      this.tabDate=[]
      this.tabRecouv=[]
      this.tabRecouv=[];
      this.tabRV=[];
      this.tabFN=[];
      this.listDay = [];
      // console.log(res['message']);
       this.listDay= res['message'];
       if(this.listDay != undefined){
        for(let i of this.listDay){
          this.tabDate.push(i.dateEnregistremet)
           if(i.etat == 0){
            this.tabRecouv.push(this.getInfo1(i.client,'montant'));
            this.tabFN.push(0);
            this.tabRV.push(0);
           }
           if(i.etat == 1){
            this.tabRV.push(this.getInfo1(i.client,'montant'));
            this.tabRecouv.push(0);
            this.tabFN.push(0);
           }
           if(i.etat == 2){
            this.tabFN.push(this.getInfo1(i.client,'montant'));
            this.tabRV.push(0);
            this.tabRecouv.push(0);
           }
         }
       }else{
        this.tabDate.push(this.selectionjour)
        this.tabFN.push(0);
        this.tabRV.push(0);
        this.tabRecouv.push(0);
        console.log(this.tabDate);
       }
       
       //this.listRecouvremet = this.Recouvrement
       console.log( this.tabDate); 
       this.myChart2 = new Chart('myChart2', {
        type: 'line',
        data: {
            labels: this.tabDate,
            datasets: [{
                label: 'Recouvrement',
                data: this.tabRecouv,
                borderColor: [
                  '#A52A2A',
                ],
                borderWidth: 3
                },
               {
                label: 'Rendez-vous',
                data: this.tabRV,
                borderColor: [
                  '#007bff',
                ],
                borderWidth: 3
                },
                {
                label: 'Finaliser',
                data: this.tabFN,
                borderColor: [
                  'darkorange',
                ],
                borderWidth: 3
              }
          ]
        },
        options: {
          events: ['click'],
          legend: {
            labels: {
              fontColor: '#007bff'
            }
        }
        
        }
    });
     })
    
    this._derService.liste().then(res =>{
     // console.log(res['message']);
      this.listSalarees = res['message'];
      for(let i of  this.listSalarees){
        if(i.etat == 0){
          this.boutonFaye = 1;
        }
      }

    })
    /*setInterval(() => {
      this._derService.callPeriodicHandler().then( res => {
      //console.log(res['message']);
      if(res['code']==1){
        this.lNewListe =[]
        let id
        for(let i = 0;i <this.Recouvrement.length - 1;++i){
          id =this.Recouvrement[this.Recouvrement.length-1].id
        }
       this._derService.newListe(id).then(rep =>{
          this.lNewListe = rep['message'];
          this.newNotif =this.lNewListe.length;
         // console.log(this.newNotif);
          for(let i of this.lNewListe){
            this.Recouvrement.push(i);
          }
        })
            this._derService.liste().then(res =>{
     // console.log(res['message']);
      this.Recouvrement= res['message'];
      for(let i of this.Recouvrement){
        
        if(i.etat == 0){
          this.nbRecouvrement = this.nbRecouvrement +1;
          this.nomRec = this.nomRec + this.getInfo1(i.client,'montant');
        }
        if(i.etat == 1){
          this.nbRV = this.nbRV +1;
          this.nomRV = this.nomRV + this.getInfo1(i.client,'montant');
        }
        if(i.etat == 2){
          this.nbFinalaliser = this.nbFinalaliser +1;
          this.nomFN = this.nomFN + this.getInfo1(i.client,'montant');
        }
       
      }
      //this.listRecouvremet = this.Recouvrement
      console.log('Recouvrement '+this.nomRec+' Rendez vous '+this.nomRV+' Finaliser '+this.nomFN); 

    })
      }
   
    } );
      
    }, 10000); */
     // console.log(this.listRecouvremet);

  }
  getInfo1(requete,nom){
    let req = JSON.parse(requete);
    if(nom == "INTERIM"){
      return req.INTERIM ;
    }
    if(nom == "LOCALITES"){
      return req.LOCALITES;
    }
    if(nom == "USSD"){
      return req.USSD;   
    }
    if(nom == "KIOSQUES"){
      return req.KIOSQUES;   
    }
    if(nom == "SALAIRE"){
      return req.SALAIRE;   
    }
    if(nom == "PRIME_UV"){
      return req.PRIME_UV;   
    }
    if(nom == "MANQUANT_PAYE"){
      return req.MANQUANT_PAYE;   
    }
    if(nom == "AVOIR"){
      return req.AVOIR;   
    }
    if(nom == "JOURS_D_ABSENCE"){
      return req.JOURS_D_ABSENCE;   
    }
    if(nom == "SALAIRE_PERCU"){
      return req.SALAIRE_PERCU;   
    }
    if(nom == "COM_INTERIM"){
      return req.COM_INTERIM;   
    }
    return "null";
  }
  deconnection(){
    this.connectionService.deconnection().then(rep =>{
      if(rep["status"]=="1"){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");
        this.route.navigate(['/login']);
      }
    });
   
  }
}
