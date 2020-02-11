import { Component, OnInit } from '@angular/core';
import { BankSearchService } from '../../services/bank-search.service'


@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {
  bankDetails;
  constructor(private bankSearch: BankSearchService) { }

  ngOnInit() {
    this.bankDetails = this.bankSearch.getCurrentBankDetails()
  }

}
