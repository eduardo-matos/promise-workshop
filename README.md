# Workshop de promises

App que consiste em alguns endpoints de exemplo para ser usado num workshop sobre Promise.

A teoria pode ser encontrada [aqui](https://gist.github.com/eduardo-matos/59b863927d91c91c64b01a561b2ff8a8).

## Endpoints

1. `GET /users`: Retorna todos os usuários.
1. `GET /users/:id`: Retorna 1 usuário.
1. `POST /users`, parâmetros `{"name": string}`: Cria um novo usuário.
1. `PUT /users/:id`, parâmetros `{"name": string}`: Atualiza um usuário.
1. `DELETE /users/:id`: Remove um usuário.
1. `DELETE /users`: Remove todos os usuários.

## Teste

```sh
npm test
```

## Build

```sh
npm run build
```

## Running

Antes de rodar esse comando, é necessário rodar `npm run build`.

```
npm start
```

## Environment Variables

1. `APP_PORT` (`8080`): Porta onde a aplicação irá rodar.
1. `DB_URL` (`sqlite://:memory`): URL de conexão com o banco de dados. Ex.: `mysql://user:pass@host:port/db_name`.
