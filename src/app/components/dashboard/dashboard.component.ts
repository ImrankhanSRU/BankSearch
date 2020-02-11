import { Component, OnInit } from '@angular/core';
import { BankSearchService } from '../../services/bank-search.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data = {
    banksList: [],
    pageSize: 10,
    searchText: ''
  }
  constructor(private bankSearch: BankSearchService) { }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  getBanksList = (data) => {
    this.data = {...data}
  }



}
