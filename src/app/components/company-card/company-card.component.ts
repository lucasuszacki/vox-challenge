import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRequest } from '@models/company.model';

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent {
  @Input() company!: CompanyRequest;
  @Output() edit = new EventEmitter<void>();

  get address(): string {
    const end = this.company.empresa.endereco;
    return `${end.ds_logradouro}, ${end.co_numero} - ${end.ds_bairro}, ${end.ds_municipio} (${end.co_uf})`;
  }
}
