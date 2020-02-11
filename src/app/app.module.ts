import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FavsComponent } from './components/favs/favs.component';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';
import { BankSearchService } from './services/bank-search.service'

const routes: Routes = [
  {
    path: '',
    redirectTo: "/banks",
    pathMatch: 'full'
  },
  {
    path: 'banks',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'favs',
    component: FavsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'banks/:id',
    component: BankDetailsComponent,
    // canActivate: [AuthGuard]
  },
  
]


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
    DashboardComponent,
    FavsComponent,
    BankDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
        HttpClientModule

  ],
  providers: [BankSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
