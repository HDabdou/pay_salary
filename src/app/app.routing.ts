import  { RouterModule, Routes} from '@angular/router' ;
import {ConnexionComponent} from './connexion/connexion.component'; 
import {HistoriqueComponent} from './historique/historique.component';
import {AccueilComponent} from './accueil/accueil.component';
import {PaymentComponent} from './payment/payment.component';
import { AddInfoComponent } from './add-info/add-info.component';



const appRoutes=[

              {path:'',component:ConnexionComponent},
              {path:'accueil',component:AccueilComponent,
                children:[
                  {path:'',component:HistoriqueComponent},
                  {path:'historique',component:HistoriqueComponent},
                  {path:'payment',component:PaymentComponent},
                  {path:'addinfo',component:AddInfoComponent},
                ]
              },
              {path:'**',redirectTo:''}
            ];

export const Routing=RouterModule.forRoot(appRoutes);