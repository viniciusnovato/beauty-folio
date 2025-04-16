# BeautyFolio Connect

Sistema de agendamento e gestão para profissionais de beleza.

## Tecnologias

- React + TypeScript
- Supabase (Banco de dados e Storage)
- TailwindCSS
- Lucide Icons

## Configuração

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/beauty-folio-connect.git
cd beauty-folio-connect
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## Estrutura do Banco de Dados

### Tabelas

- `professionals`: Cadastro de profissionais
- `services`: Serviços oferecidos
- `availability`: Disponibilidade dos profissionais
- `appointments`: Agendamentos

### Storage

O projeto utiliza o Supabase Storage para armazenamento de imagens:

- Bucket: `images`
  - `/professionals`: Logos dos profissionais
  - `/services`: Imagens dos serviços

## Contribuindo

1. Crie uma branch para sua feature
```bash
git checkout -b feature/nome-da-feature
```

2. Faça commit das suas alterações
```bash
git commit -m "Descrição da alteração"
```

3. Envie para o GitHub
```bash
git push origin feature/nome-da-feature
```

4. Abra um Pull Request

## Desenvolvimento

Para rodar o projeto localmente:

```bash
npm install
npm run dev
```

## CI/CD

O projeto utiliza GitHub Actions para:
- Verificação de tipos
- Linting
- Build
