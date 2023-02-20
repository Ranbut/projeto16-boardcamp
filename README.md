# projeto16-boardcamp
Back-end do projeto n° 16 do curso de desenvolvimento fullstack da Driven 

# 📑Descrição

- Em mundo onde o digital tomou conta de tudo, as pessoas que preferem vivenciar um pouco mais de experiências fora das telinhas se sentem tristes e abandonadas… felizmente, há um grande números de pessoas dedicadas a oferecer esse universo de atividades e trazer um maior equilibro entre digital/analógico na vida das pessoas.
- Uma das experiências mais legais - e subestimada pela pessoas - são os jogos de tabuleiro! Você se lembra a última vez que jogou um jogo de tabuleiro? 🤔 Jogos de tabuleiro podem proporcionar muitos momentos de diversão! Basta um jogo divertido e imersivo, um ambiente aconchegante e uma galera interessada a se divertir!
- Como os preços desses jogos são muito caros, algumas pessoas resolveram empreender em locadoras de jogos de tabuleiro! E como este é um mercado relativamente novo, surgiu a oportunidade de VOCÊ ajudar essas pessoas e tirar uma graninha 🤑
- Neste novo projeto, você construirá o sistema de gestão de uma locadora de jogos de tabuleiro usando seus novos conhecimentos em Banco de Dados Relacional (SQL)!

## ⏰ Driven time

- Nomeie a pasta do seu projeto com: `projeto16-boardcamp`

## 🖥️ Front-end

- Para esse projeto você receberá um *front-end* prontinho, aguardando apenas a integração com a sua API:
    
    [GitHub - bootcamp-ra/boardcamp-front](https://github.com/bootcamp-ra/boardcamp-front)
    
- Neste *front-end,* o usuário digita dados num determinado formato. O código do *front-end* então trata aquele dado e envia para o *back-end* no formato que ele já espera, conforme determinado nas rotas dos requisitos.

## ✅ Requisitos

- Geral
    - [X]  A porta utilizada pelo seu servidor deve ser a 5000 (isso é necessário para a avaliação)
    - [X]  O servidor deve ser iniciado a partir de um arquivo em `src/app.js`
    - [X]  A estrutura de arquivos e pastas do projeto deve seguir o padrão aprendido nas últimas semanas, com as camadas `controllers`, `routers`, `middlewares` e `schemas` (onde for necessário).
    - [X]  Versionamento usando Git é obrigatório, crie um **repositório público** no seu perfil do GitHub
    - [X]  Faça commits a cada funcionalidade implementada
- CRUD de Jogos [Create | Read]
    - Formato de um jogo (tabela `games`)
        
        ```jsx
        {
          id: 1,
          name: 'Banco Imobiliário',
          image: 'http://',
          stockTotal: 3,
          pricePerDay: 1500,
        }
        ```
        
    - Listar jogos
        - **Rota**: **GET** /games
        - **Response:** lista dos jogos encontrados, seguindo o formato abaixo
            
            ```jsx
            [
              {
                id: 1,
                name: 'Banco Imobiliário',
                image: 'http://',
                stockTotal: 3,
                pricePerDay: 1500,
              },
              {
                id: 2,
                name: 'Detetive',
                image: 'http://',
                stockTotal: 1,
                pricePerDay: 2500,
              },
            ]
            ```
            
    - Inserir um jogo
        - **Rota**: **POST** /games
        - **Request**: body no formato:
            
            ```jsx
            {
              name: 'Banco Imobiliário',
              image: 'http://',
              stockTotal: 3,
              pricePerDay: 1500,
            }
            ```
            
        - **Response:** status 201, sem dados
        - **Regras de Negócio**
            - `name` deve estar presente e não pode estar vazio; `stockTotal` e `pricePerDay` devem ser maiores que 0 ⇒ nesses casos, deve retornar **status 400**
            - `name` não pode ser um nome de jogo já existente ⇒ nesse caso deve retornar **status 409**
- CRUD de Clientes [Create | Read | Update]
    - Formato de um cliente (tabela `customers`)
        
        ```jsx
        {
          id: 1,
          name: 'João Alfredo',
          phone: '21998899222',
          cpf: '01234567890',
          birthday: '1992-10-05'
        }
        ```
        
    - Listar clientes
        - **Rota: GET** /customers
        - **Response:** lista com todos os clientes
            
            ```jsx
            [
              {
                id: 1,
                name: 'João Alfredo',
                phone: '21998899222',
                cpf: '01234567890',
                birthday: '1992-10-05'
              },
              {
                id: 2,
                name: 'Maria Alfreda',
                phone: '21998899221',
                cpf: '12345678910',
                birthday: '1994-12-25'
              },
            ]
            ```
            
    - Buscar um cliente por id
        - **Rota: GET** /customers/:id
        - **Response:** somente o objeto do usuário com o id passado:
            
            ```sql
            {
              id: 1,
              name: 'João Alfredo',
              phone: '21998899222',
              cpf: '01234567890',
              birthday: '1992-10-05'
            }
            ```
            
        - **Regras de Negócio:**
            - Se o cliente com id dado não existir, deve responder com **status 404**
    - Inserir um cliente
        - **Rota:** **POST** /customers
        - **Request:** body no formato:
            
            ```sql
            {
              name: 'João Alfredo',
              phone: '21998899222',
              cpf: '01234567890',
              birthday: '1992-10-05'
            }
            ```
            
        - **Response:** status 201, sem dados
        - **Regras de negócio:**
            - `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` deve estar presente e não pode ser uma string vazia; `birthday` deve ser uma data válida; ⇒ nesses casos, deve retornar **status 400**
            - `cpf` não pode ser de um cliente já existente; ⇒ nesse caso deve retornar **status 409**
    - Atualizar um cliente
        - **Rota:** **PUT** /customers/:id
        - **Request:** body no formato:
            
            ```sql
            {
              name: 'João Alfredo',
              phone: '21998899222',
              cpf: '01234567890',
              birthday: '1992-10-05'
            }
            ```
            
        - **Response:** status 200, sem dados
        - **Regras de negócio:**
            - `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` deve estar presente e não pode ser uma string vazia; `birthday` deve ser uma data válida ⇒ nesses casos, deve retornar **status 400**
            - `cpf` não pode ser de um cliente já existente ⇒ nesse caso deve retornar **status 409.** Observe que o conflito só deve ocorrer caso o CPF enviado pertença **a outro usuário.** Uma vez que o usuário pode desejar atualizar outras propriedades, mas manter seu CPF atual.
- CRUD de Aluguéis [Create | Read | Update | Delete]
    - Formato de um aluguel (tabela `rentals`)
        
        ```jsx
        {
          id: 1,
          customerId: 1,
          gameId: 1,
          rentDate: '2021-06-20',    // data em que o aluguel foi feito
          daysRented: 3,             // por quantos dias o cliente agendou o aluguel
          returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
          originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
          delayFee: null             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
        }
        ```
        
    - Listar aluguéis
        - **Rota: GET** /rentals
        - **Response:** lista com todos os aluguéis, contendo o `customer` e o `game` do aluguel em questão em cada aluguel
            
            ```jsx
            [
              {
                id: 1,
                customerId: 1,
                gameId: 1,
                rentDate: '2021-06-20',
                daysRented: 3,
                returnDate: null, // troca pra uma data quando já devolvido
                originalPrice: 4500,
                delayFee: null,
                customer: {
                 id: 1,
                 name: 'João Alfredo'
                },
                game: {
                  id: 1,
                  name: 'Banco Imobiliário'
                }
              }
            ]
            ```
            
    - Inserir um aluguel
        - **Rota:** **POST** /rentals
        - **Request:** body no formato:
            
            ```jsx
            {
              customerId: 1,
              gameId: 1,
              daysRented: 3
            }
            ```
            
        - **Response:** status 201, sem dados
        - **Regras de Negócio**
            - Ao inserir um aluguel, os campos `rentDate` e `originalPrice` devem ser populados automaticamente antes de salvá-lo:
                - `rentDate`: data atual no momento da inserção
                - `originalPrice`: `daysRented` multiplicado pelo preço por dia do jogo no momento da inserção
            - Ao inserir um aluguel, os campos `returnDate` e `delayFee` devem sempre começar como `null`
            - Ao inserir um aluguel, deve verificar se `customerId` se refere a um cliente existente. Se não, deve responder com **status 400**
            - Ao inserir um aluguel, deve verificar se `gameId` se refere a um jogo existente. Se não, deve responder com **status 400**
            - `daysRented` deve ser um número maior que 0. Se não, deve responder com **status 400**
            - Ao inserir um aluguel, deve-se validar que existem jogos disponíveis, ou seja, que não tem alugueis em aberto acima da quantidade de jogos em estoque. Caso contrário, deve retornar **status 400**
    - Finalizar aluguel
        - **Rota:** **POST** /rentals/:id/return
        - **Response:** status 200, sem dados
        - **Regras de Negócio**
            - Ao retornar um aluguel, o campo `returnDate` deve ser populado com a data atual do momento do retorno
            - Ao retornar um aluguel, o campo `delayFee` deve ser automaticamente populado com um valor equivalente ao número de dias de atraso vezes o preço por dia do jogo no momento do retorno. Exemplo:
                - Se o cliente aluguel no dia **20/06** um jogo por **3 dias**, ele deveria devolver no dia **23/06**. Caso ele devolva somente no dia **25/06**, o sistema deve considerar **2 dias de atraso**. Nesse caso, se o jogo custava **R$ 15,00** por dia, a `delayFee` deve ser de **R$ 30,00** (3000 centavos)
            - Ao retornar um aluguel, deve verificar se o `id` do aluguel fornecido existe. Se não, deve responder com **status 404**
            - Ao retornar um aluguel, deve verificar se o aluguel já não está finalizado. Se estiver, deve responder com **status 400**
    - Apagar aluguel
        - **Rota:** **DELETE** `/rentals/:id`
        - **Response:** status 200, sem dados
        - **Regras de Negócio**
            - Ao excluir um aluguel, deve verificar se o `id` fornecido existe. Se não, deve responder com **status 404.**
            - Ao excluir um aluguel, deve verificar se o aluguel já não está finalizado (ou seja, `returnDate` já está preenchido). Se não estiver finalizado, deve responder com **status 400.**

## ☑️ Bônus

- Buscas por query string
    - **GET** /games
        
        Caso seja passado um parâmetro `name` na **query string** da requisição, os jogos devem ser filtrados para retornar somente os que começam com a string passada (case insensitive). Exemplo:
        
        - Para a rota `/games?name=ba`, deve ser retornado uma array somente com os jogos que comecem com "ba", como "Banco Imobiliário", "Batalha Naval", etc
    - **GET** /customers
        
        Caso seja passado um parâmetro `cpf` na **query string** da requisição, os clientes devem ser filtrados para retornar somente os com CPF que comecem com a string passada. Exemplo:
        
        - Para a rota `/customers?cpf=012`, deve ser retornado uma array somente com os clientes que o CPF comece com "012", como "01234567890", "01221001200", etc
    - **GET** /rentals
        - Caso seja passado um parâmetro `customerId` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente os do cliente solicitado. Exemplo:
            - Para a rota `/rentals?customerId=1`, deve ser retornado uma array somente com os aluguéis do cliente com id 1
        - Caso seja passado um parâmetro `gameId` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente os do jogo solicitado. Exemplo:
            - Para a rota `/rentals?gameId=1`, deve ser retornado uma array somente com os aluguéis do jogo com id 1
- Paginação
    - **GET** /categories, /games, /customers, /rentals
        - Caso seja passado um parâmetro `offset` na **query string** da requisição, deve-se obter somente os registros no banco após o offset determinado. Ex: se for passado `offset=20` e existirem 100 produtos no banco, só devem ser retornados os 80 últimos (do 21º ao 100º)
            - **Dica**: pesquise por SQL OFFSET
        - Caso seja passado um parâmetro `limit` na query string da requisição, deve-se limitar a quantidade de registros retornados a esse limite no máximo. Ex: se for passado `limit=30` e existirem 100 produtos no banco, só devem ser retornados os 30 primeiros
        - Caso tanto `limit` quanto `offset` sejam passados, ambos devem ser aplicados. Ex: se for passado `offset=20&limit=30`, caso existam 100 produtos no banco, só devem ser retornados os produtos do 21º ao 50º.
- Ordenação
    - **GET** /categories, /games, /customers, /rentals
        - Caso seja passado um parâmetro `order` na **query string** da requisição, deve-se retornar os registros ordenados pela coluna passada em ordem ascendente. Ex: se for passado `order=name`, os registros devem ser ordenados alfabeticamente pela coluna `name`
        - Caso seja passado também um parâmetro `desc` na **query string**, deve-se inverter esta ordem para descendente. Ex: se for passado `order=name&desc=true`, os registros devem ser ordenados alfabeticamente invertidos pela coluna `name`
- Filtragem por data
    - **GET** /rentals
        - Caso seja passado um parâmetro `status` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente aqueles que estão naquele estado. Exemplo:
            - Para a rota `/rentals?status=open`, deve ser retornado uma array somente com os aluguéis não finalizados
            - Para a rota `/rentals?status=closed`, deve ser retornado uma array somente com os aluguéis finalizados
        - Caso seja passado um parâmetro `startDate` na **query string** da requisição, os aluguéis devem ser filtrados para retornar somente os que foram feitos a partir daquela data. Exemplo:
            - Para a rota `/rentals?startDate=2021-06-10`, deve ser retornado uma array somente com os aluguéis com `rentDate` maior ou igual a `2021-06-10`
