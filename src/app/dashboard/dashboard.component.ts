import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HandlerService } from '../service/handler.service';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



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
    
  }
  boutonFaye:number = 0;
  listSalary =[
    {nom:'Dieng',prenom:'Aliou',USSD:'773250277',SALAIRE:'50000',zone:'Yoff',ABS_LIS:5,etat:1},
    {nom:'Fall',prenom:'Modou',USSD:'779857780',SALAIRE:'40000',zone:'Foire',ABS_LIS:5,etat:1},
    {nom:'Tamba',prenom:'Issa',USSD:'779854080',SALAIRE:'85000',zone:'Pikine',ABS_LIS:5,etat:1},
    {nom:'Tamba',prenom:'Issa',USSD:'778981663',SALAIRE:'45000',zone:'Pikine',ABS_LIS:5,etat:1},
    {nom:'Tamba',prenom:'Issa',USSD:'778981663',SALAIRE:'65000',zone:'Pikine',ABS_LIS:5,etat:1},
    {nom:'Dieye',prenom:'Pape',USSD:'775662089',SALAIRE:'45000',zone:'fann',ABS_LIS:5,etat:1},
    {nom:'Dieng',prenom:'Aliou',USSD:'773250277',SALAIRE:'50000',zone:'Yoff',ABS_LIS:5,etat:1},
    {nom:'Fall',prenom:'Modou',USSD:'779857780',SALAIRE:'40000',zone:'Foire',ABS_LIS:5,etat:1},
    {nom:'Tamba',prenom:'Issa',USSD:'779854080',SALAIRE:'85000',zone:'Pikine',ABS_LIS:5,etat:1},
    {nom:'Tamba',prenom:'Issa',USSD:'778981663',SALAIRE:'45000',zone:'Pikine',ABS_LIS:5,etat:1},
    {nom:'Tamba',prenom:'Issa',USSD:'778981663',SALAIRE:'65000',zone:'Pikine',ABS_LIS:5,etat:1},
    {nom:'Dieye',prenom:'Pape',USSD:'775662089',SALAIRE:'45000',zone:'fann',ABS_LIS:5,etat:1},
  ]
  inputRecherche:string = '';
  listRechecher:any =[]
  suiviAgnet(){
    this.listRechecher = [];
    for(let i of this.listSalary){
      if(i.nom == this.inputRecherche || i.prenom == this.inputRecherche || i.USSD == this.inputRecherche ){
        this.listRechecher.push(i)
      }
    }
  }
  listSalaryAgent =[]
  displayEvolutionbi:number = 0;
  evolutionBi(i){
    /*this.listSalaryAgent =[]
    let tel = this.listRechecher[i].telephone
    for(let i of this.listSalary){
       this.listSalaryAgent.push(i.SALAIRE)
        console.log(i.SALAIRE);
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
  this.displayEvolutionbi = 1*/
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
      
  }
  
  nbRecouvrement:number=0;
  nbRV:number=0;
  nbFinalaliser:number=0;
  tabDate:any=[]
  tabRecouv:any=[]
  tabRV:any=[]
  tabFN:any=[]
  listDay:any = []
  listeSalares=[];
  listeMois=[];
  listeInfo=[];

  //somme par mois
  SommeJanvier:number=0;
  SommeFevrier:number=0;
  SommeMars:number=0;
  SommeAvril:number=0;
  SommeMai:number=0;
  SommeJuin:number=0;
  SommeJuillet:number=0;
  SommeAout:number=0;
  SommeSeptembre:number=0;
  SommeOctober:number=0;
  SommeNovembre:number=0;
  SommeDecembre:number=0;
  ngOnInit() {
   // var path = d3.geo.path() 
   this._derService.liste("2019-01-01","2019-04-23").then(res =>{
    console.log(res['message']);
    this.listeInfo=res['message'];
    for(let i of this.listeInfo){
      if(i.dateEnregistrement.split("-")[1] == "01"){
       this.SommeJanvier = this.SommeJanvier + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
      if(i.dateEnregistrement.split("-")[1] == "02"){
       this.SommeFevrier = this.SommeFevrier + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
      if(i.dateEnregistrement.split("-")[1] == "03"){
       this.SommeMars = this.SommeMars + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
      if(i.dateEnregistrement.split("-")[1] == "04"){
       this.SommeAvril = this.SommeAvril + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
      if(i.dateEnregistrement.split("-")[1] == "05"){
       this.SommeMai = this.SommeMai + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
      if(i.dateEnregistrement.split("-")[1] == "06"){
       this.SommeJanvier = this.SommeJanvier + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
      if(i.dateEnregistrement.split("-")[1] == "07"){
       this.SommeJuin = this.SommeJuin + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
      if(i.dateEnregistrement.split("-")[1] == "08"){
       this.SommeJuillet = this.SommeJuillet + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
      if(i.dateEnregistrement.split("-")[1] == "09"){
       this.SommeSeptembre= this.SommeSeptembre + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
      if(i.dateEnregistrement.split("-")[1] == "10"){
       this.SommeOctober = this.SommeOctober + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
      if(i.dateEnregistrement.split("-")[1] == "11"){
       this.SommeNovembre = this.SommeNovembre + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
      if(i.dateEnregistrement.split("-")[1] == "12"){
       this.SommeDecembre = this.SommeDecembre + this.getInfo1(i.infoSalaries,'SALAIRE_PERCU');   
      }      
    
    }
    console.log(this.listeSalares);
    console.log(this.listeMois);
    this.myChart2 = new Chart('myChart2', {
      responsive: true,
      type: 'line',
      data: {
         
        labels: ['janvier','fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
        //labels:this.listeMois,
        datasets: [{
             label:'les salaires de l\'année',
             data: [this.SommeJanvier,this.SommeFevrier,this.SommeMars,this.SommeAvril,this.SommeMai,this.SommeJuin,this.SommeJuillet,this.SommeAout,this.SommeSeptembre,this.SommeOctober,this.SommeNovembre,this.SommeDecembre],
            // data: this.listeSalares,
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
  });
    this.selectionjour =  ((new Date()).toJSON()).split("T",2)[0];
    
       //this.listRecouvremet = this.Recouvrement
       console.log( this.tabDate); 
      
    
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
    if(nom == "ABS_LIS"){
      return req.ABS_LIS;   
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
}
