# Desafio Técnico Tokenizadora

## Contexto

Neste desafio foi proposto construir uma lista de tarefas usando a técnica Pomodoro. A aplicação deveria permitir um CRUD simples, listar, editar, remover e inserir uma tarefa no sistema e deveria ter as funcionalidades para iniciar e finalizar uma tarefa, com o objetivo de exibir o tempo gasto e quantos pomodoros foram usados para a conclusão de determinada tarefa.

## Tecnologias

A seguir estão listadas as tecnologias que decide usar para este desafio:
  - NestJS: Um framework pra construção de aplicativos NodeJs e server-side. Essa foi uma das tecnologias sugeridas para o desafio e, pelo fato de nunca ter tido contato anteriormente com o framework, decide me propor um desafio a mais em estudar e aplicar o que consegui tirar dessa oportunidade
  - VueJS: Um framework pra construção de interface de usuários baseado em HTML, CSS e Javascript. Outra tecnologia sugerida para o desafio e, novamente a minha escolha para desenvolver o front-end da aplicação.
  - MySQL: Um gerenciador de banco de dados que utiliza linguagem SQL. Não foi especificado sobre a forma de armazenamento dos dados, essa escolha foi feita com base na praticidade de criar um banco e gerenciar o mesmo em um escopo pequeno.

## Configuração

Antes de executar o projeto é necessário seguir alguns passos importantes para execução do mesmo.
  1. Inicialmente clone este repositório em sua máquina.
  2. Após o clone for concluído haverá 2 pastas presentes na raiz do projeto **back-end** e **front-end**, será necessário ter dois terminais abertos em sua máquina.
  3. Em um terminal navegue até o diretório da pasta **back-end** e em outro terminal navegue para **front-end**. Após ter navegado para ambos diretórios em ambos terminais, deve ser executado o seguindo comanndo:  
      ```npm install``` ou ```npm i```.
  4. Com a instalação das bibliotecas feita, será necessário construir um banco de dados **MySQL** com o nome **pomodoro** em sua máquina.
  5. Concluído a construção do banco de dados em sua máquina, o sistema do back-end precisará de algumas variáveis de ambiente para a execução completa do servidor. Dentro da raiz do diretório do **back-end** crie um arquivo .env com as seguintes variáveis de ambiente:
    ```
      DB_HOST=seu_host
      DB_PORT=porta_mysql
      DB_USERNAME=usuario
      DB_PASSWORD=senha
    ```
  6. Após as configurações acima, execute o comando ```npm run start``` dentro do diretório do **back-end** e, o seguindo comando ```npm run dev``` no diretório do **front-end**.
