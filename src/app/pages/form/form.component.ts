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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    this.buildForm();

    if (this.isEditMode) {
      console.log('Edit mode ON! ID:', this.id);
    }
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
