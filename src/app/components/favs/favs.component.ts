import { Component, OnInit } from '@angular/core';
import { BankSearchService } from '../../services/bank-search.service'

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.scss']
})
export class FavsComponent implements OnInit {
  data = {
    banksList: [],
    pageSize: 10,
    searchText: '',
    searchByCity: ''
  }
  favsList = [];
  constructor(private bankSearch: BankSearchService) { }

  ngOnInit() {
    this.data.banksList = this.getFavsList()
  }

  getFavsList = () => {
    return this.bankSearch.getFavs()
  }

  searchFavs = (data) => {
    let newObj = data
    newObj.banksList = this.getFavsList()
    let text;
    if (newObj.searchText) {
      text = newObj.searchText.toLowerCase()
    }
    if (newObj.searchByCity) {
      newObj.banksList = newObj.banksList.filter(item => item.city.toLowerCase() == text)
    }
    else if (text) {
      newObj.banksList = newObj.banksList.filter(item =>
        item.ifsc.toLowerCase().includes(text) ||
        item.branch.toLowerCase().includes(text) ||
        item.bank_name.toLowerCase().includes(text) ||
        item.address.toLowerCase().includes(text) ||
        item.city.toLowerCase().includes(text)

      )
    }
    newObj.searchText = text
    this.data = newObj
  }

}
