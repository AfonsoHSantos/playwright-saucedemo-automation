# Playwright Best Practices — SauceDemo

Repositório de referência com exemplos práticos das boas práticas de automação
com Playwright, usando a aplicação real **https://www.saucedemo.com**.

## Credenciais

| Usuário             | Senha         |
|---------------------|---------------|
| `standard_user`     | `secret_sauce` |
| `locked_out_user`   | `secret_sauce` |
| `problem_user`      | `secret_sauce` |
| `performance_glitch_user` | `secret_sauce` |

## Estrutura

```
├── playwright.config.ts    → configuração global com projetos
├── fixtures/
│   └── index.ts            → fixtures de POM e de estado (substitui beforeEach)
├── pages/
│   ├── LoginPage.ts        → seletores com data-test + métodos agnósticos
│   ├── InventoryPage.ts    → adicionar/remover produtos, ordenação
│   ├── CartPage.ts         → visualização e remoção de itens
│   └── CheckoutPage.ts     → preenchimento de dados e finalização
└── tests/
    ├── auth.setup.ts       → autenticação única via storageState
    ├── login.spec.ts       → login válido, inválido e data-driven por tipo de usuário
    ├── inventory.spec.ts   → listagem, adição, remoção e ordenação de produtos
    ├── cart.spec.ts        → fixture de estado substituindo beforeEach
    └── checkout.spec.ts    → fluxo completo e validações de campos obrigatórios
```

## Conceitos aplicados

| Arquivo | Prática demonstrada |
|---|---|
| `tests/auth.setup.ts` | Autenticação uma única vez via `storageState` |
| `fixtures/index.ts` | Fixtures de POM e fixture de estado (`productInCart`) |
| `pages/*.ts` | Page Object Model — seletores `readonly`, sem asserções |
| `tests/login.spec.ts` | Data-driven testing com `for...of` |
| `tests/cart.spec.ts` | Fixture de estado vs `beforeEach` |
| `tests/checkout.spec.ts` | Padrão AAA completo |

## Como executar

```bash
# 1. Instalar dependências
npm install

# 2. Instalar o Chromium
npx playwright install

# 3. Rodar todos os testes
npm test

# 4. Rodar com interface visual (recomendado para explorar)
npm run test:ui

# 5. Ver relatório HTML após a execução
npm run report
```
