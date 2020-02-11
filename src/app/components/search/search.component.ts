import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankSearchService } from '../../services/bank-search.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() outputToParent = new EventEmitter()
  @Output() sendSearchTextToFavs = new EventEmitter()
  @Input() headText;
  pageSize = 10;
  data = {
    banksList: [],
    pageSize: 10,
    searchText: ''
  }
  selectedCity = "Bengaluru";
  searchText;
  cache = new Map();

  constructor(public bankSearch: BankSearchService, private router: Router) { }

  ngOnInit() {
    this.getBanks()
    // this.favs = this.
  }

  handleCityChange = () => {
    if (this.headText == "View Banks") {
      this.handleFavsSearch(true)
    }
    else {
      this.getBanks()
    }
  }

  getBanks = () => {
    let city = this.selectedCity.toUpperCase()

    let url = `http://vast-shore-74260.herokuapp.com/banks?city=${city}`

    this.data.banksList = []
    this.sendDataToParent()
    if (this.get(url)) {
      this.data.banksList = this.get(url)
      this.searchBank()

    }
    else {
      let scope = this
      this.bankSearch.getBankListByCity(url).subscribe(res => {
        scope.data.banksList = res
        scope.cache.set(url, { response: res })

        scope.searchBank()
      })
      // this.sendDataToParent()
    }
  }

  get(url) {
    const cached = this.cache.get(url);
    if (!cached) {
      return 0;
    }

    return cached.response;
  }

  handlePageSizeChange = (e) => {
    this.data.pageSize = parseInt(e.target.value)
    if (this.headText == "View Favourites") {
      this.searchBank()
    }
    else {
      this.handleFavsSearch(false)
    }
  }

  sendDataToParent = () => {
    this.outputToParent.emit(this.data)
  }

  handleSearchChange = () => {
    if (this.headText == "View Favourites") {
      this.searchBank()
    }
    else {
      this.handleFavsSearch(false)
    }
  }

  handleFavsSearch = (citySelect) => {
    let newObj = {
      searchByCity: citySelect,
      searchText: this.searchText,
      pageSize: this.data.pageSize
    };
    if (citySelect) {
      newObj.searchText = this.selectedCity
    }

    this.sendSearchTextToFavs.emit(newObj)
  }

  searchBank = () => {
    if (this.searchText) {
      let text = this.searchText.toLowerCase()
      let newObj = { ...this.data }
      newObj.searchText = text
      newObj.banksList = newObj.banksList.filter(item =>
        item.ifsc.toLowerCase().includes(text) ||
        item.branch.toLowerCase().includes(text) ||
        item.bank_name.toLowerCase().includes(text) ||
        item.address.toLowerCase().includes(text) ||
        item.city.toLowerCase().includes(text)
      )
      this.outputToParent.emit(newObj)
    }
    else {
      this.sendDataToParent()
    }
  }

  goToFavs = () => {
    if (this.headText == "View Favourites") {
      this.router.navigate(['/favs']);
    }
    else {
      this.router.navigate(['/banks'])
    }
  }

}
