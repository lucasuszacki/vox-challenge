# Vox

Desafio técnico para a empresa **Vox**, sistema de solicitações de abertura de empresa.

---

## Como rodar o projeto

### 1. Instale o projeto:

```bash
npm install
```

### 2. Inicie o backend:

```bash
npm run mock
```

> Este comando inicia o `json-server` como `api-faker`, os dados do arquivo `mocks/db.json` que estão nesse repositório e também estão acessível em `http://localhost:3000`.

### 3. Inicie o frontend:

```bash
npm start
```

> Este comando inicia o projeto em `http://localhost:4200`

## Ferramentas e Bibliotecas

- Angular 19 (Standalone Components)
- RxJS + Reactive Forms
- Bootstrap
- JSON Server (`json-server`)
- API pública do IBGE para lista de estados
- ngx-mask (máscaras de CPF e CEP)
- ngx-bootstrap (modais)

## Estrutura do projeto

```
src/
├── app/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── models/
│   └── app.routes.ts
├── mocks/
│   └── db.json
```

## O que foi feito?

- [x] Tela inicial com listagem de empresas
- [x] Cadastro e edição com formulários reativos
- [x] Máscaras de CPF e CEP
- [x] Validação de campos com mensagens visuais
- [x] Modal de sucesso centralizada com botão de fechar
- [x] Design adaptado para o layout proposto no mockup
- [x] Navegação entre páginas (`/`, `/solicitar`, `/editar/:id`)

## Melhorias

- [ ] Design poderia ser mais real ao fornecido pelo mockup
- [ ] Excluir listagens de empresas
- [ ] Lista mais elaborada com filtro e paginação
- [ ] Responsividade
- [ ] Modo escuro e acessibilidade
- [ ] Reaproveitar melhor components

## Desenvolvido por

[Lucas Uszacki](https://github.com/lucasuszacki)
