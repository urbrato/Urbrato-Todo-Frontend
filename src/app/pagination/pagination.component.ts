import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    MatIcon,
    FormsModule,
    MatIconButton
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input()
  set totalPages(pages: number) {
    this._totalPages = pages;
    if (pages > 0 && this._currentPage >= this._totalPages)
      this.currentPage = pages - 1;
  }

  @Output()
  changePageEvent = new EventEmitter<number>();

  _currentPage: number = 0;
  _totalPages: number;

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page: number) {
    if (this._totalPages < 1) return;

    const was = this._currentPage;

    if (page < 0)
      this._currentPage = 0;
    else if (page >= this._totalPages)
      this._currentPage = this._totalPages - 1;
    else
      this._currentPage = page;

    if (was !== this._currentPage) {
      this.changePageEvent.emit(this._currentPage);
    }
  }

  firstPage() {
    this.currentPage = 0;
  }

  lastPage() {
    this.currentPage = this._totalPages - 1;
  }

  setPage($event) {
    this.currentPage = $event.target.value - 1;
  }

  nextPage() {
    this.currentPage += 1;
  }

  prevPage() {
    this.currentPage -= 1;
  }
}
