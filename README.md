# Web Project Around Auth

Este projeto é um exemplo de aplicação web que utiliza autenticação e autorização. Foi desenvolvido utilizando diversas tecnologias modernas do ecossistema JavaScript.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de build e desenvolvimento rápida para projetos front-end modernos.
- **React Router**: Biblioteca para roteamento em aplicações React.
- **ESLint**: Ferramenta para análise de código estático, utilizada para garantir a qualidade do código.
- **CSS Modules**: Para modularização e escopo de estilos CSS.
- **Axios**: Cliente HTTP baseado em Promises para realizar requisições ao backend.
- **Context API**: Para gerenciamento de estado global na aplicação.

## Estrutura de Arquivos

A estrutura de arquivos do projeto é organizada da seguinte forma:

```
web_project_around_auth/
├── public/                     # Arquivos públicos
├── src/                        # Código fonte da aplicação
│   ├── blocks/                 # Arquivos de estilo CSS
│   ├── components/             # Componentes React
│   │   ├── App.jsx             # Componente principal da aplicação
│   │   ├── Header.jsx          # Componente de cabeçalho
│   │   ├── Footer.jsx          # Componente de rodapé
│   │   ├── Login.jsx           # Componente de login
│   │   ├── ProtectedRoute.jsx  # Componente responsável por proteger rotas
│   │   ├── Register.jsx        # Componente de registro
│   │   ├── Section.jsx         # Componente de seção
│   │   ├── Main/               # Componentes principais
│   │   │   ├── Main.jsx        # Componente principal renderizado depois do login
│   │   │   ├── components/     # Subcomponentes do Main
│   │   │   │   ├── Card/       # Componentes de cartão
│   │   │   │   ├── Popup/      # Componentes de popup - EditAvatar, EditProfile, AddPlace, ImagePopup, InfoTooltip
│   ├── contexts/               # Contextos React para gerenciamento de estado
│   ├── images/                 # Imagens utilizadas na aplicação
│   ├── utils/                  # Funções utilitárias
│   ├── vendor/                 # Arquivos de fontes e normalize
├── .eslintrc.js                # Configuração do ESLint
├── vite.config.js              # Configuração do Vite
├── package.json                # Dependências e scripts do projeto
└── README.md                   # Documentação do projeto
```

## Como Clonar e Executar o Projeto

Siga os passos abaixo para clonar e executar o projeto na sua máquina local.

### Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado. Você pode baixá-lo [aqui](https://nodejs.org/).
- **npm**: O npm é instalado junto com o Node.js. Alternativamente, você pode usar o [Yarn](https://yarnpkg.com/).

### Passos

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/phendges7/web_project_around_auth.git
   ```

2. **Navegue até o diretório do projeto**:

   ```bash
   cd web_project_around_auth
   ```

3. **Instale as dependências**:

   ```bash
   npm install
   ```

4. **Execute o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

5. **Abra o navegador**:
   - Acesse `http://localhost:3000` para ver a aplicação em execução.

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Cria uma versão de produção do projeto.
- `npm run serve`: Serve a versão de produção criada pelo build.
- `npm run lint`: Executa o ESLint para verificar problemas no código.

## Demonstração

A aplicação pode ser visualizada em funcionamento através do seguinte link: [Demonstração Online](https://screenrec.com/share/6EqpQwLPtb).

## Autor

Pedro Henrique

## Meta

Este projeto demonstra o uso do ReactJS com foco em popups e criação de cartões e com uso de APIs para autenticar e criar usuarios, seguindo boas práticas de desenvolvimento web, design pixel-perfect e gestão avançada de estado com hooks e contextos.

## Licença

Este projeto é de uso livre para fins educacionais e pessoais.
