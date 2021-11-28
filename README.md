# NodeApi

## instalação 
É necessário clonar esse repositório e então usar um gerenciador de pacotes para instalar todas as dependências. 
Com o npm, basta rodar o comando "npm i".

## rodar o projeto na porta 2000
Para iniciar o servidor basta rodar o comando "npm run dev" e aguardar. Por padrão o projeto roda na porta 2000, ou seja, http://localhost:2000.

## Utilizar projeto
Para um bom uso do projeto recomendo programas que fazem requisições http, tais como insomnia ou postman. 

## ⚠️ Testes
Para iniciar os teste automatizados é importante que o projeto esteja  rodando adequadamente na porta 2000. Do contrário muitos testes falharão. Isso ocorre porque alguns testes utilizam o axios para fazer requisições nas rotas e verificar se algumas funcionalidades estão funcionando corretamente

## ⚠️ Token
Para a autenticação funcionar corretamente é necessário que o token seja enviada como Bearer token.

![image](https://user-images.githubusercontent.com/58526964/143788384-4830caad-a747-449c-9688-0dff6818dbef.png)



## Principais rotas
### POST - /employer
Rota de criação de funcionário. Basta enviar no corpo da requisição um json semelhante a este da imagem abaixo. 
Detalhe: Contas criadas com a role "seller" possuem limitações, não podendo deletar veículos por exemplo. Se deseja ter acesso a todas funcionalidades é necessário ser um administrador, ou seja, ter a role "administrator". 

![image](https://user-images.githubusercontent.com/58526964/143788284-f16c5f41-0da4-4ab3-b1be-93c2090ba72c.png)


### POST - /login 
Rota de autenticação. Basta enviar um email e senha da conta criada anteriormente. 
Você receberá um token, este que será utilizado para navegar em todas as outras rotas. 

![image](https://user-images.githubusercontent.com/58526964/143788430-22a668bc-fa49-4e57-ac49-f98d1f8c15f0.png)


### GET -  /employer/:id
Rota de pegar um funcionário. Basta passar o id do funcionário onde está :id . 

![image](https://user-images.githubusercontent.com/58526964/143786986-64f8c57a-d3a7-4560-ad05-00818877c3b7.png)

### PUT - /employer/:id
Rota de atualizar un funcionário. Passe os dados a serem atualizados no corpo da requizição. Utilize a rota anterior se deseja verificar a mudança.

![image](https://user-images.githubusercontent.com/58526964/143787124-b6c0ad5d-a734-40ab-8c65-87042f18516d.png)

### GET - /employees/:page
Rota de pegar todos os funcionários. Cada página exibe 10 funcionários. 

![image](https://user-images.githubusercontent.com/58526964/143787244-9ccba910-dd78-47b3-965e-8f816c1bd89d.png)

### DELETE - /employer/:id
Rota de deletar um funcionário. 

![image](https://user-images.githubusercontent.com/58526964/143787429-e0a0326e-fab7-4b5c-ad07-80bc4dd2d282.png)

### POST - /vehicle
Rota de criar um veículo. 

![image](https://user-images.githubusercontent.com/58526964/143787526-3e22f53c-2b88-4661-a777-7af02090f9c8.png)

### GET - /vehicles/:page
Rota de listar todos os veículos.
É possível filtrar por status. Basta adicionar ?status=:status. Os status aceitos são: available, sold, reserved.

![image](https://user-images.githubusercontent.com/58526964/143787613-0e59b3ec-fe23-4da3-bb67-6de674bbe4eb.png)

### DELETE - /vehicle/:id 
Rota de deletar um veículo. 

![image](https://user-images.githubusercontent.com/58526964/143787640-ae36aa8d-d77b-4651-9c51-600b238f2d16.png)

### PUT -  /vehicle/:id
Rota de atualizar um veículo.

![image](https://user-images.githubusercontent.com/58526964/143787657-4a49d06b-403f-4ce0-9a8a-188e68ef87d6.png)

### GET - /vehicle/:id
Rota de pegar um veículo. 

![image](https://user-images.githubusercontent.com/58526964/143787797-8c9af022-6f20-4ecd-8c55-9ce97cef8da9.png)

### Post - /transaction/:id?type=:type
Rota para fazer transação de um veículo. :id representa o id do veículo e :type representa o tipo de transação. Três tipos de transações são aceitas: available, reserved, sold. 

![image](https://user-images.githubusercontent.com/58526964/143787883-4a25b041-6955-452e-a2d2-6b85bfd5f28d.png)

### Delete - /transaction/:id 
Rota para apagar uma transação. 

![image](https://user-images.githubusercontent.com/58526964/143787910-ef26f809-72c9-4134-95d1-c320ddbff829.png)

### GET - /transactions/:page?employer=:employerID
Rota de pegar todas as transações feitas por um funcionário em específico. 

![image](https://user-images.githubusercontent.com/58526964/143787929-853ce636-7ce3-422e-b2d0-178129b03464.png)


### Get - /transactions/:page
Rota para pegar todas as transações. 

![image](https://user-images.githubusercontent.com/58526964/143788012-7e428989-268e-4e97-bd4e-8baaabf63d30.png)

### GET - /transaction/:id
Rota para pegar uma transação.

![image](https://user-images.githubusercontent.com/58526964/143788568-d62eaa4e-d31c-4872-b3f5-f50b222874ab.png)







