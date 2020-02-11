import { Component, OnInit, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BankSearchService } from '../../services/bank-search.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() data: {
    banksList: [],
    pageSize
  }
  list = []
  pageNumbers = []
  copyPage = []
  activePage = 1;
  pages;
  starIcon = faStar;
  isActive = []
  favs = []

  constructor(private bankSearch: BankSearchService, private router: Router) { }

  ngOnInit() {
    this.favs = this.bankSearch.getFavs() ? this.bankSearch.getFavs() : []
  }

  toggleFav(bank) {
    let favs = this.bankSearch.getFavs()
    let checkExist = favs.filter(item => item.ifsc == bank.ifsc)
    if (checkExist.length) {
      favs.map((item, index) => {
        if (item.ifsc == bank.ifsc) {
          favs.splice(index, 1)
        }
      })
    }
    else {
      favs.push(bank)
    }
    // if (this.router.url == '/banks') {

      this.bankSearch.addFavourite(favs)
      this.favs = this.bankSearch.getFavs() ? this.bankSearch.getFavs() : []
    // }
  }

  isFav = (ifsc) => {
    return this.favs.filter(item => item.ifsc == ifsc)
  }

  ngOnChanges() {
    this.activePage = 1
    let i, j, temparray = [], chunk = parseInt(this.data.pageSize);
    for (i = 0, j = this.data.banksList.length; i < j; i += chunk) {
      temparray.push(this.data.banksList.slice(i, i + chunk))
    }
    this.list = temparray
    let arr = []
    for (let i = 1; i <= this.list.length; i++) {
      arr.push(i)
    }

    this.makePages()
  }

  makePages = () => {
    let paginateObj = this.paginate()
    this.activePage = paginateObj.currentPage
    this.pages = paginateObj.pages
  }



  pageChange = (i) => {
    this.activePage = i
    this.makePages()
  }

  goToEnd = (end) => {
    if (end == "first") {
      this.activePage = 1;
    }
    else {
      this.activePage = this.list.length;
    }
    this.makePages()
  }

  goToBankDetails = (ifsc) => {
    let bank = this.data.banksList.filter(item => item['ifsc'] == ifsc)
    this.router.navigateByUrl(`/banks/${ifsc}`)
    this.bankSearch.changeCurrentBankDetails(bank[0])
  }

  paginate(
    totalItems: number = this.data.banksList.length,
    currentPage: number = this.activePage,
    pageSize: number = this.data.pageSize,
    maxPages: number = 10
  ) {
    let totalPages = Math.ceil(totalItems / pageSize);

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
