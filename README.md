React Weather App - Teste Prático BlueRise 🚀
Este projeto é uma aplicação de meteorologia desenvolvida como parte do processo seletivo para a vaga de estágio em Front-End na BlueRise. A aplicação foi construída a partir de um repositório base, com diversas melhorias, refatorações e novas funcionalidades implementadas para demonstrar competências em desenvolvimento web moderno e proatividade.

🔗 Link para o Deploy
A aplicação está disponível online e pode ser acedida através do seguinte link:

[Clique aqui para ver o projeto online](https://bluerise-test.netlify.app/)

✨ Funcionalidades Implementadas
Internacionalização (i18n): Como um diferencial, a aplicação foi totalmente internacionalizada com react-i18next. O utilizador pode alternar dinamicamente entre Português e Inglês, e toda a interface, incluindo os dados da API e as mensagens de erro do formulário, é traduzida em tempo real.

Tema Claro/Escuro: Suporte a tema claro e escuro, refatorado do Redux para a Context API do React, permitindo uma gestão de tema mais moderna e desacoplada.

Design Responsivo (Mobile-First): A aplicação foi desenhada para funcionar perfeitamente em qualquer tamanho de ecrã, desde telemóveis pequenos a monitores desktop, utilizando Media Queries.

Página "Sobre": Uma página de apresentação pessoal (/sobre) foi adicionada, utilizando react-router-dom para a navegação.

Formulário com Validação: A página "Sobre" inclui um formulário de contacto funcional com validação de dados, utilizando a combinação poderosa de react-hook-form e zod.

Dados da API Melhorados: A lógica de busca de dados foi aprimorada para fornecer as temperaturas mínimas e máximas reais do dia, processando a resposta da API de forma mais inteligente.

🛠️ Tecnologias Utilizadas
React.js (com TypeScript): Base da aplicação, utilizando componentes funcionais e hooks.

Styled Components: Para estilização de componentes (CSS-in-JS), permitindo estilos dinâmicos e escopados.

Context API: Para a gestão do estado do tema claro/escuro.

Redux Toolkit: Para a gestão do estado global dos dados da API (clima e previsão).

React Hook Form & Zod: Para a construção e validação robusta de formulários.

React Router DOM v5: Para a gestão de rotas e navegação entre páginas.

i18next & react-i18next: Para a implementação da funcionalidade de internacionalização.

Netlify: Para o deploy e hospedagem da aplicação.

🚀 Como Rodar o Projeto Localmente
Siga os passos abaixo para instalar e executar o projeto na sua máquina.

Pré-requisitos
Node.js (versão 16 ou superior)

npm

Instalação
Clone o repositório:

git clone https://github.com/jothas2000/react-weather-app.git

Navegue para a pasta do projeto:

cd react-weather-app

Instale as dependências:
Este projeto foi construído sobre uma base mais antiga, o que pode gerar conflitos de dependência com versões mais recentes do npm. Use a flag --legacy-peer-deps para garantir uma instalação correta.

npm install --legacy-peer-deps

Configure as variáveis de ambiente:

Crie um ficheiro chamado .env na raiz do projeto.

Dentro deste ficheiro, adicione a sua chave de API do OpenWeatherMap:

REACT_APP_OPENWEATHER_API_KEY=SUA_CHAVE_DE_API_VEM_AQUI

Execução
Inicie o servidor de desenvolvimento:
Para contornar uma incompatibilidade de criptografia entre o Node.js v17+ e as dependências do projeto, o script de start foi modificado.

npm start

Abra http://localhost:3000 no seu navegador para ver a aplicação.

🧠 Principais Aprendizados e Dificuldades Encontradas
Este projeto foi uma jornada de aprendizado fantástica, especialmente no que diz respeito à modernização e refatoração de uma base de código existente.

Gestão de Dependências em Projetos Legados: A maior dificuldade foi, sem dúvida, lidar com os conflitos de dependência (ERESOLVE) e erros de compilação devido à versão mais antiga do React (v16) no projeto base. A solução envolveu o uso da flag --legacy-peer-deps e o downgrade manual de várias bibliotecas (zod, react-i18next, @hookform/resolvers) para versões compatíveis. Isso reforçou a importância de entender o ecossistema de dependências e como depurar problemas de compatibilidade.

Refatoração de Redux para Context API: Substituir a lógica de tema do Redux pela Context API foi um exercício prático excelente para entender as vantagens de cada ferramenta. A Context API provou ser uma solução mais simples e elegante para estados menos complexos como o do tema, enquanto o Redux continuou a ser uma ferramenta poderosa para a gestão dos dados assíncronos da API.

Tipagem com Styled Components: Integrar o TypeScript com o styled-components de forma robusta exigiu a criação de um ficheiro de declaração de tipos (styled.d.ts). Este processo foi fundamental para garantir a segurança de tipos no nosso sistema de temas e para depurar erros de tipo complexos que surgiram durante a implementação.

Internacionalização Dinâmica: Implementar o i18n foi um desafio interessante. Não bastava traduzir os textos estáticos; foi necessário refatorar a lógica de busca de dados para que, ao mudar de idioma, uma nova chamada à API fosse feita para buscar os dados meteorológicos (como a descrição do tempo e os dias da semana) já traduzidos, garantindo uma experiência de utilizador totalmente imersiva.

Este teste foi uma oportunidade incrível para enfrentar e resolver problemas do mundo real, consolidando os meus conhecimentos em React e no seu ecossistema.