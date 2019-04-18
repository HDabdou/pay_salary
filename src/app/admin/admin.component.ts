import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HandlerService } from '../service/handler.service';
import { Chart } from 'chart.js';
import { Router} from '@angular/router';
import * as XLSX from 'xlsx';
//import { Template } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  soumettre:number = 0;
  reponse:string='';
  message:string='';
 
  indice:number;
  myChart:any;
  myChart2:any;
  display:number=0;
  intervalledateinit:string;
  intervalleddatefinal:string;
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
    {nom:'Tamba',prenom:'Issa',telephone:'779854080',salaire:'85000',zone:'Pikine',jAbsence:5,etat:1},
    {nom:'Tamba',prenom:'Issa',telephone:'778981663',salaire:'45000',zone:'Pikine',jAbsence:5,etat:1},
    {nom:'Tamba',prenom:'Issa',telephone:'778981663',salaire:'65000',zone:'Pikine',jAbsence:5,etat:1},
    {nom:'Dieye',prenom:'Pape',telephone:'775662089',salaire:'45000',zone:'fann',jAbsence:5,etat:1},
    {nom:'Dieng',prenom:'Aliou',telephone:'773250277',salaire:'50000',zone:'Yoff',jAbsence:5,etat:1},
    {nom:'Fall',prenom:'Modou',telephone:'779857780',salaire:'40000',zone:'Foire',jAbsence:5,etat:1},
    {nom:'Tamba',prenom:'Issa',telephone:'779854080',salaire:'85000',zone:'Pikine',jAbsence:5,etat:1},
    {nom:'Tamba',prenom:'Issa',telephone:'778981663',salaire:'45000',zone:'Pikine',jAbsence:5,etat:1},
    {nom:'Tamba',prenom:'Issa',telephone:'778981663',salaire:'65000',zone:'Pikine',jAbsence:5,etat:1},
    {nom:'Dieye',prenom:'Pape',telephone:'775662089',salaire:'45000',zone:'fann',jAbsence:5,etat:1},
  ]
  inputRecherche:string = '';
  listRechecher:any =[]
  suiviAgnet(){
    this.listRechecher = [];
    for(let i of this.listSalary){
      if(i.nom == this.inputRecherche || i.prenom == this.inputRecherche || i.telephone == this.inputRecherche ){
        this.listRechecher.push(i)
      }
    }
  }
  listSalaryAgent =[]
  displayEvolutionbi:number = 0;
  evolutionBi(i){
    this.listSalaryAgent =[]
    let tel = this.listRechecher[i].telephone
    for(let i of this.listSalary){
       this.listSalaryAgent.push(i.salaire)
        console.log(i.salaire);
    }
    console.log(this.listSalaryAgent);
    
    this.myChart2 = new Chart('myChart3', {
      responsive: true,
      type: 'line',
      data: {
         
          labels: ['janvier','fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
          datasets: [{
             label:'les salaires de l\'année',
              data: this.listSalaryAgent,
              borderColor: [
                '#A52A2A',
              ],
              borderWidth: 3
              },
            
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
  this.displayEvolutionbi = 1
  }
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
      for(let i = 0; i < this.listeExcel.length ;++i){
        this.listSalary.push(this.listeExcel[i])
      }
      console.log(this.listSalary);
      //this._derService.soumettre(this.listeRecrutement).then(res=>{console.log(res);
      //})
      this.boutonFaye = 1;
    } 
    fileReader.readAsArrayBuffer(this.file);
    for(let i of this.listeExcel){
      console.log(i.nom);
    }
   
  }
 
  update(){
   
  }
  them:any;
  
  sombre(){
    this.them = 1;
  }
  claire(){
    this.them = 2;
  }

  element = document.getElementById('navbarNavDropdown') as HTMLElement;
  hideMenu(){
    this.element.remove();
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
    //this.modalRef = this.modalService.show(template ,Object.assign({}, { class: 'modal-lg' }));
    this.modalRef = this.modalService.show(template);
   }
  modalRef1: BsModalRef;
  openModal1(template1: TemplateRef<any>) {
    this.modalRef1 = this.modalService.show(template1);
  }
  constructor(private modalService: BsModalService,public _derService:HandlerService,private route:Router) { }
  lNewListe = [];
  newNotif:number=0;
  hideNotif(){
    this.newNotif=0;
  }

  modalRef4: BsModalRef;
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef4 = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  deconnexion(){
    this.route.navigate(['/login']);
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
 
 myDiv;
  closeNav(){
    this.myDiv = document.getElementById("navbarNavDropdown");
    //if(this.myDiv.classList.length == 3){
      if(this.myDiv.style.display === "none"){
        this.myDiv.style.display ="block";
      }else{
        this.myDiv.style.display = "none";
      }
    //} 
  }
  ngOnInit() {
    this.myDiv = document.getElementById("navbarNavDropdown");
    this.myDiv.style.display = "none"
   // var path = d3.geo.path() 
    this.selectionjour =  ((new Date()).toJSON()).split("T",2)[0];
    
       //this.listRecouvremet = this.Recouvrement
       console.log( this.tabDate); 
       this.myChart2 = new Chart('myChart2', {
        responsive: true,
        type: 'line',
        data: {
           
            labels: ['janvier','fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
            datasets: [{
               label:'les salaires de l\'année',
                data: [50000,52500,48000,60000,59000,55000,55500,38000,50000,49000,89000,35000],
                borderColor: [
                  '#A52A2A',
                ],
                borderWidth: 3
                },
              
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
    
      //this.listRecouvremet = this.Recouvrement
      this.myChart = new Chart('myChart', {
        responsive: true,
        type: 'doughnut',
        data: {
            labels: ["Yoff", "Pikine", "Fann"],
            datasets: [{
                label: '# of Votes',
               
                data: [500000,490000, 510000],
                backgroundColor: [
                  '#A52A2A',
                  '#007bff',
                  'darkorange'
                ],
                borderColor: [
                  'white',
                  'white',
                  'white',
                  'white',
                  'white',
                  'white'
                ],
                borderWidth: 3
            }]
        },
        options: {
          events: ['click'],
          legend: {
            labels: {
              fontColor: '#007bff'
            }
        },
        
         onClick: function(e) {
            var element = this.getElementAtEvent(e);
            if (element.length) {
              console.log(element[0]);
              var chartData = element[0]['_chart'].config.data;
              var idx = element[0]['_index'];
              console.log('Recouvrement '+this.nomRec+' Rendez vous '+this.nomRV+' Finaliser '+this.nomFN);
  
              console.log(idx);
              this.liste=1
              var label = chartData.labels[idx];
              var value = chartData.datasets[0].data[idx];
              
              this.modalRef1.show('template1');
              var url =label + "  à  " + value;
              console.log(url);
              alert(url);
            }
          }
        }
    });

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
          console.log(this.newNotif);
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
    if(nom == "montant"){
      return req.montant ;
    }
    if(nom == "nom"){
      return req.nom;
    }
    if(nom == "prenom"){
      return req.prenom;   
    }
    if(nom == "telephone"){
      return req.telephone;   
    }
    if(nom == "adresse"){
      return req.adresse;   
    }
    return "null";
  }

}
