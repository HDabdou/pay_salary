import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  //private url:string='https://sentool.bbstvnet.com/handler/';
  
  private url:string='http://localhost:8080/pay_salary_backend';
  private header :HttpHeaders;
  constructor(private http:HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
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
  public liste(): Promise<any>{
    let params="requestParam="+(new Date()).toString();
    let link=this.url+"/liste.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }
  public newListe(id): Promise<any>{
    let data = JSON.stringify({id:id});
    let params ='param='+data;
    let link=this.url+"/newListe.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }
  public recherche(id): Promise<any>{
    let data = JSON.stringify({id:id});
    let params ='param='+data;
    let link=this.url+"/recherche.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }
  public rechercheIntervalle(dateD,dateF): Promise<any>{
    let data = JSON.stringify({dateD:dateD,dateF:dateF});
    let params ='param='+data;
    let link=this.url+"/rechercheIntervalle.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  }

  public remonter(id,numFile,reponse,message,operateur,phone): Promise<any>{
    //let params="id="+id;
    let data = JSON.stringify({id:id,numFile:numFile,reponse:reponse,message:message,operateur:operateur,phone:phone});
    let params ='param='+data;
    let link=this.url+"/remonter.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res);return res} ).catch(error => {console.log(error);return 'bad' });
  }
  public soumettre(requette): Promise<any>{
    //let params="id="+id;
    let data = JSON.stringify(requette);
    let params ='param='+data;
    let link=this.url+"/salaries.php";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res);return res} ).catch(error => {console.log(error);return 'bad' });
  }

}
