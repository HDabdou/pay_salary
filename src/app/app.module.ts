import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { Routes, RouterModule} from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccueilComponent } from './accueil/accueil.component';
import { HandlerService } from './service/handler.service';
import { HttpClientModule} from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {NgPipesModule} from 'ngx-pipes';
import { AdminComponent } from './admin/admin.component';
import { ConnexionService } from './service/connexion.service';
import { HistoriqueComponent } from './historique/historique.component';
import { Routing } from './app.routing';
import { PaymentComponent } from './payment/payment.component';
import { AddInfoComponent } from './add-info/add-info.component';
import { PipeService } from './service/pipe.service';
import { BbspipePipe } from './service/bbspipe.pipe';
import { MessageComponent } from './message/message.component';

/*
const routes:Routes=[  {path:'accueil', component:AccueilComponent},
{path:'login', component:ConnexionComponent},
{path:'admin', component:AdminComponent},
{path:'',redirectTo:'/login' ,pathMatch:'full'},
];*/

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AccueilComponent,
    AdminComponent,
    HistoriqueComponent,
    PaymentComponent,
    AddInfoComponent,
    BbspipePipe,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Routing,
    ModalModule.forRoot(),
    HttpClientModule,
    TabsModule.forRoot(),
    NgPipesModule,
    
  ],
  providers: [
    HandlerService,
    ConnexionService,
    PipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
