import { Component, OnInit } from '@angular/core';
import { HandlerService } from '../service/handler.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  loader:boolean = false;
  listSalarees:any =[];
  date:any;
  constructor(public _derService:HandlerService) { }
  
  Recherhce(date1,date2){
    console.log(date1,date2);
    this.loader = true;
    this._derService.liste(date1.toString(),date2.toString()).then(res =>{
      console.log(res['message']);
      this.listSalarees = res['message'];
      this.loader = false;
      /*for(let i of  this.listSalarees){
        if(i.etat == 0){
          this.boutonFaye = 1;
        }
      }*/

    });
  }
  ngOnInit() {
    this.date = ((new Date()).toJSON()).split("T",2)[0];
    this.loader = true;
    this._derService.liste(this.date.toString(),this.date.toString()).then(res =>{
       console.log(res['message']);
       this.listSalarees = res['message'];
       this.loader = false;
       /*for(let i of  this.listSalarees){
         if(i.etat == 0){
           this.boutonFaye = 1;
         }
       }*/
 
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
