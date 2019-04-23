import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  //private url:string='https://sentool.bbstvnet.com/handler/';
  
 // private url:string='http://localhost:8080/pay_salary_backend';

  private url:string='http://cloudpharma.bbstvnet.com/pay_salary_middleware/public/index.php';

  private header :HttpHeaders;

  private token ;

  private id ;
  
  constructor(private http:HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");
   }

   private link = "https://mysentool.pro/index.php";
   public requerirControllerOM(requete:any): Promise<any>{
    let params="requestParam="+JSON.stringify({requestParam : requete, tokenParam : 'this.token'});
    let link=this.link+"/om-sen/requerirControllerOM";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

  public callPeriodicHandler(): Promise<any>{
    let params="requestParam="+(new Date()).toString();
    let link=this.url+"/periodicHendler.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  }

  public liste(date1,date2): Promise<any>{
    let data = JSON.stringify({'datea':date1,'dateb':date2});
    let params="requestParam="+data;
    console.log(params);
    let link=this.url+"/accueil/getListeByInterval";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }

  public addContact(nomGroup, listContacts): Promise<any>{
    let data = JSON.stringify({'nomGroupe':nomGroup,'contacts':listContacts});
    let params="requestParam="+data;
    //console.log(params);
    let link=this.url+"/sms/ajoutContacts";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }


  public addGroup(nomGroup): Promise<any>{
    let data = JSON.stringify({'nomGroupe':nomGroup,'idUser':this.id});
    let params="requestParam="+data;
    console.log(params);
    let link=this.url+"/sms/ajoutGroupe";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }

  public addCampagn(campagnName, nomGroupe, message): Promise<any>{
    let data = JSON.stringify({'campagnName':campagnName, 'nomGroupe':nomGroupe,'message':message});
    let params="requestParam="+data;
    console.log(params);
    let link=this.url+"/sms/ajoutCampagne";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }

  public getGroup(): Promise<any>{
    
    let params="requestParam=";
    console.log(params);
    let link=this.url+"/sms/getGroups";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }

  public findContact(numero): Promise<any>{    
    let data = JSON.stringify({'numero':numero});
    let params="requestParam="+data;
    let link=this.url+"/sms/findContact";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res } ).catch(error => {console.log(error); return 'bad' });
  }

  public updateContact(id, prenom, nom, telephone): Promise<any>{    
    let data = JSON.stringify({'id':id, 'prenom':prenom, 'nom':nom, 'telephone':telephone});
    let params="requestParam="+data;
    console.log(params) ;
    let link=this.url+"/sms/updateContact";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res } ).catch(error => {console.log(error); return 'bad' });
  }

  public deleteContact(id): Promise<any>{    
    let data = JSON.stringify({'id':id});
    let params="requestParam="+data;
    console.log(params) ;
    let link=this.url+"/sms/deleteContact";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res } ).catch(error => {console.log(error); return 'bad' });
  }
  
  public newListe(id): Promise<any>{

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");

    let data = JSON.stringify({id:id});
    let params ='param='+data;
    let link=this.url+"/newListe.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }
  public recherche(id): Promise<any>{

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");

    let data = JSON.stringify({id:id});
    let params ='param='+data;
    let link=this.url+"/recherche.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }



  public rechercheIntervalle(dateD,dateF): Promise<any>{

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");

    let data = JSON.stringify({dateD:dateD,dateF:dateF});
    let params ='param='+data;
    let link=this.url+"/rechercheIntervalle.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }



  public remonter(id,numFile,reponse,message,operateur,phone): Promise<any>{

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");

    //let params="id="+id;
    let data = JSON.stringify({id:id,numFile:numFile,reponse:reponse,message:message,operateur:operateur,phone:phone});
    let params ='param='+data;
    let link=this.url+"/remonter.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res);return res} ).catch(error => {console.log(error);return 'bad' });
  }


  public soumettre(requette): Promise<any>{

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");

    //let params="id="+id;
    let data = JSON.stringify(requette);
    let params ='param='+data;
    let link=this.url+"/salaries.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res);return res} ).catch(error => {console.log(error);return 'bad' });
  }


  public insertToBd(info:string):Promise<any>{

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");

    let url=this.url+"/accueil/insertToBd";
    let params="param="+JSON.stringify({id:this.id,token:this.token,info:info});

    console.log(params);

    return new Promise((resolve,reject)=>{
      this.http.post(url,params,{headers:this.header}).subscribe(reponse =>{
        console.log(reponse) ;
        resolve(reponse);
      });
    });
  }

  public getEmolyes():Promise<any>{

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");

    return new Promise((resolve,reject)=>{
      let url=this.url+"/accueil/getEmployes";
      let params="param="+JSON.stringify({id:this.id,token:this.token});
      this.http.post(url,params,{headers:this.header}).subscribe(reponse =>{
        resolve(reponse);
      });
    });
  }
  public getAbsent(){

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");

    let url=this.url+"/accueil/getAbsent";
    let params="param="+JSON.stringify({id:this.id,token:this.token});
    return new Promise((resolve,reject)=>{
      this.http.post(url,params,{headers:this.header}).subscribe(reponse =>{
        resolve(reponse);
      });
    });
  }
  public validerEnregistrementAbsence(prenom:string,nom:string,id_user:number,date:any){

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");

    let url=this.url+"/accueil/validerEnregistrementAbsence";
    let params="param="+JSON.stringify({id:this.id,token:this.token,prenom:prenom,nom:nom,id_user:id_user,date:date});
    return new Promise((resolve,reject)=>{
      this.http.post(url,params,{headers:this.header}).subscribe(reponse =>{
        resolve(reponse);
      });
    });
  }
  public supprimerAbsence(id:number){

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");

    let url=this.url+"/accueil/supprimerAbsence";
    let params="param="+JSON.stringify({id:this.id,token:this.token,id_user:id});
    return new Promise((resolve,reject)=>{
      this.http.post(url,params,{headers:this.header}).subscribe(reponse =>{
        resolve(reponse);
      });
    });
  }

  public facture(data:string){

    this.token=sessionStorage.getItem("token");

    this.id=sessionStorage.getItem("id");

    let url=this.url+"/accueil/facture";
    let params="param="+JSON.stringify({data:data});
    return new Promise((resolve,reject)=>{
      this.http.post(url,params,{headers:this.header}).subscribe(reponse =>{
        resolve(reponse);
      });
    });
  }

    public getPayValidation(){
    let url=this.url+"/admin/getPayValidation";
    let params="param="+JSON.stringify({data:""});
    return new Promise((resolve,reject)=>{
      this.http.post(url,params,{headers:this.header}).subscribe(reponse =>{
        resolve(reponse);
      });
    });

  }


}
