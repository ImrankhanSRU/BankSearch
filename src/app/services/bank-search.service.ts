import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankSearchService {
  constructor(private httpClient: HttpClient) { }

  getBankListByCity = (url) => {
    
    return this.httpClient.get<any[]>(url)
    
  }

  addFavourite = (favs) => {
    localStorage.setItem('favs', JSON.stringify(favs))
  }

  getFavs = () => {
    let favs = JSON.parse(localStorage.getItem('favs'))
    if(favs) {
      return favs
    }
    return []
  }

 

  changeCurrentBankDetails = (bank) => {
    localStorage.setItem('currentBank', JSON.stringify(bank))
  }

  getCurrentBankDetails = () => JSON.parse(localStorage.getItem('currentBank'))

}
