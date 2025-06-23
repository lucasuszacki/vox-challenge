import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CompanyService } from '@services/company.service';
import { CompanyRequest } from '@models/company.model';
import { CompanyCardComponent } from '@components/company-card/company-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CompanyCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  companyList: CompanyRequest[] = [];
  isLoading = false;

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.isLoading = true;
    this.companyService.getAll().subscribe({
      next: (data) => {
        this.companyList = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onCreateNew() {
    this.router.navigate(['/new']);
  }

  onEdit(id: number) {
    this.router.navigate(['/edit', id]);
  }
}
