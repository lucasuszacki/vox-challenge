import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CompanyService } from '@services/company.service';
import { CompanyRequest } from '@models/company.model';
import { ModalSuccessComponent } from '@components/modal-success/modal-success.component';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalModule, NgxMaskDirective],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  id!: number;
  registrationEntities: { key: number; value: string }[] = [];
  states: { id: number; sigla: string; nome: string }[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    this.buildForm();
    this.loadRegistrationEntities();
    this.loadStates();

    if (this.isEditMode) {
      this.loadCompanyData(this.id);
    }
  }

  loadRegistrationEntities() {
    fetch('http://localhost:3000/entidade-registro')
      .then((res) => res.json())
      .then((data) => {
        this.registrationEntities = data;
      })
      .catch(() => {
        console.error('Failed to load registration entities');
      });
  }

  loadStates() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
      .then((res) => res.json())
      .then((data) => {
        this.states = data.sort((a: any, b: any) =>
          a.nome.localeCompare(b.nome)
        );
      })
      .catch(() => {
        console.error('Failed to load states');
      });
  }

  loadCompanyData(id: number) {
    this.companyService.getById(id).subscribe({
      next: (company: CompanyRequest) => {
        this.form.patchValue(company);
      },
      error: () => {
        console.error('Failed to load data from company');
        this.router.navigate(['/']);
      },
    });
  }

  showSuccessModal() {
    const modalRef = this.modalService.show(ModalSuccessComponent, {
      class: 'modal-sm modal-dialog-centered',
    });

    modalRef.onHidden?.subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  buildForm() {
    this.form = this.fb.group({
      solicitante: this.fb.group({
        ds_responsavel: ['', Validators.required],
        nu_cpf: ['', Validators.required],
        date_nascimento: ['', Validators.required],
      }),
      empresa: this.fb.group({
        ds_nome_fantasia: ['', Validators.required],
        co_entidade_registro: ['', Validators.required],
      }),
      endereco: this.fb.group({
        co_cep: ['', Validators.required],
        ds_logradouro: ['', Validators.required],
        co_numero: ['', Validators.required],
        ds_complemento: [''],
        ds_bairro: ['', Validators.required],
        ds_municipio: ['', Validators.required],
        co_uf: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const data = this.form.value;

    const request$ = this.isEditMode
      ? this.companyService.update(this.id, data)
      : this.companyService.create(data);

    request$.subscribe({
      next: () => {
        setTimeout(() => {
          this.isSubmitting = false;
          this.showSuccessModal();
        }, 1000); // setTimeout apenas para simular delay de uma request
      },
      error: () => {
        this.isSubmitting = false;
        alert('Erro ao salvar solicitação.');
      },
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
