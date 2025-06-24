import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  id!: number;
  registrationEntities: { key: number; value: string }[] = [];
  states: { id: number; sigla: string; nome: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    this.buildForm();
    this.loadRegistrationEntities();
    this.loadStates();

    if (this.isEditMode) {
      console.log('Edit mode ON! ID:', this.id);
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

  buildForm() {
    this.form = this.fb.group({
      solicitante: this.fb.group({
        ds_responsavel: ['', Validators.required],
        nu_cpf: ['', Validators.required],
        date_nascimento: ['', Validators.required],
      }),
      empresa: this.fb.group({
        ds_nome_fantasia: ['', Validators.required],
        co_entidade_registro: [null, Validators.required],
        endereco: this.fb.group({
          co_cep: [null, Validators.required],
          ds_logradouro: ['', Validators.required],
          co_numero: ['', Validators.required],
          ds_complemento: [''],
          ds_bairro: ['', Validators.required],
          ds_municipio: ['', Validators.required],
          co_uf: ['', Validators.required],
        }),
      }),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const data = this.form.value;
    console.log('Form send:', data);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
