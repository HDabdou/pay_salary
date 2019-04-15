import  { RouterModule, Routes} from '@angular/router' ;
import {ConnexionComponent} from './connexion/connexion.component'; 
import {HistoriqueComponent} from './historique/historique.component';
import {AccueilComponent} from './accueil/accueil.component';
import {PaymentComponent} from './payment/payment.component';
import {AdminComponent} from './admin/admin.component';
import { AddInfoComponent } from './add-info/add-info.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionCompteComponent } from './gestion-compte/gestion-compte.component';
import { ValidationComponent } from './validation/validation.component';
import { AuditComponent } from './audit/audit.component';



const appRoutes=[

              {path:'',component:ConnexionComponent},
              {path:'admin', component:AdminComponent,
              children:[
                {path:'',component:DashboardComponent},
                {path:'dashboad',component:DashboardComponent},
                {path:'gestionuser',component:GestionCompteComponent},
                {path:'validation',component:ValidationComponent},
                {path:'audit',component:AuditComponent},
              ]
            },
              {path:'accueil',component:AccueilComponent,
                children:[
                  {path:'',component:HistoriqueComponent},
                  {path:'historique',component:HistoriqueComponent},
                  {path:'payment',component:PaymentComponent},
                  {path:'addinfo',component:AddInfoComponent},
                  {path:'message',component:MessageComponent},
                ]
              },
              {path:'**',redirectTo:''}
            ];

export const Routing=RouterModule.forRoot(appRoutes);