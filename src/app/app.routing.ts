import  { RouterModule, Routes} from '@angular/router' ;
import {ConnexionComponent} from './connexion/connexion.component'; 
import {HistoriqueComponent} from './historique/historique.component';
import {AccueilComponent} from './accueil/accueil.component';
import {PaymentComponent} from './payment/payment.component';
import {AdminComponent} from './admin/admin.component';
import { AddInfoComponent } from './add-info/add-info.component';
import { MessageComponent } from './message/message.component';



const appRoutes=[

              {path:'',component:ConnexionComponent},
              {path:'admin', component:AdminComponent},
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