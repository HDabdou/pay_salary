import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaySalaryService {

  private header :HttpHeaders;
  constructor(private http:HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
   }
   private link = "https://mysentool.pro/index.php";
   public requerirControllerOM(requete:any): Promise<any>{
    let params="requestParam="+JSON.stringify({requestParam : requete, tokenParam : 'this.token'});
    let link=this.link+"/om-sen/requerirControllerOM";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {return 'bad' });
  }}
