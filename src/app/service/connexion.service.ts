import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private id:string=sessionStorage.getItem("id");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })
  };

  private link="http://127.0.0.1:8080";

  constructor(private http:HttpClient) {
   // this.headers.append('Content-Type','application/x-www-form-urlencoded');
   // this.headers.append('Content-Type','application/x-www-form-urlencoded');
  }
  connection(login:string,password:string):Promise<any>{
    let url=this.link+"/connection/connection";
    let params="param="+JSON.stringify({login:login,password:password});
    return new Promise((resolve,reject)=>{
      this.http.post(url,params,this.httpOptions).subscribe(rep =>{
       // console.log(rep);
        resolve(rep);
      });
    });
  }
  deconnection(){
    let url=this.link+"/connection/deconnexion";
    let params="param="+JSON.stringify({id:this.id});
    console.log(this.id);
    return new Promise((resolve,reject)=>{
      this.http.post(url,params,this.httpOptions).subscribe(rep =>{
        console.log(rep);
        resolve(rep);
      });
    });
  }
  verifUser(token:string,id:string){
    let url=this.link+"/connection/verifUser";
    let params="param="+JSON.stringify({id:id,token:token});
    console.log(this.id);
    return new Promise((resolve,reject)=>{
      this.http.post(url,params,this.httpOptions).subscribe(rep =>{
        console.log(rep);
        resolve(rep);
      });
    });
  }
}
