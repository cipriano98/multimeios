# General Instructions

Essa aplicação deve ser desenvolvida utilizando um Framework Back-end Fullstack. O aluno poderá escolher qual framework pretende trabalhar, mas deverá justificar adequadamente.

O trabalho consiste em desenvolver uma aplicação com **`funcionalidades administrativas`** para um sistema escolhido pelo aluno. Por exemplo, suponhamos que o aluno tenha escolhido um sistema de vendas comerciais como escopo, esse módulo do sistema será responsável por cadastros (produtos, categorias, marca, fornecedores), compra de produtos, controle de estoque e cadastro de usuários administrativos (outros funcionários), além do próprio login.

## Funcionalidades:

* **`Cadastros de Entidades:`** Consiste em um CRUD (Create-Retrieve-Update-Delete) de uma determinada entidade (no exemplo acima seria produtos, categorias, etc). Uma dica importante é relacionar identificadores (“id”) para essas entidades. Pelo menos **`dois tipos de cadastros são obrigatórios`**.
* **`Funcionalidades de negócio:`** Consiste em funcionalidades que aplicam operações ou regras de negócio específicas no sistema. Por exemplo, a funcionalidade “controle de estoque” aplicam operações e regras de negócio para fazer esse controle. Pelo menos **`um tipo de regra de negócio é obrigatório`**.
* **`Autenticação e controle de usuário:`** Todos os usuários administrativos devem realizar um login para acessar o sistema. Inicialmente, o sistema deve conter apenas um usuário admin. Esse usuário poderá cadastrar novos usuários, informando o CPF, nome, cargo na empresa, e-mail e username. A senha pode estar inicialmente no cadastro do novo usuário, mas o ideal é enviar por e-mail para o novo usuário com um link para este usuário cadastrar a senha. Os usuários cadastrados poderão editar seu perfil.
'''
<br>
<br>

# Concepts

## Conceito C:

- [X] Aplicação inicial, realizando pelo menos dois cadastros;
- [X] Realização do login;
- [x] Persistência de dados;
- [x] Utilização adequada do Framework Back-end.

## Conceito B:

- [X] Realização das funcionalidades para o conceito C;
- [x] Aplicação praticamente funcional - realizando os cadastros e a funcionalidade de negócio;
- [x] Cadastros simples de usuários, edição de perfil;
- [ ] Interface gráfica adequada;
- [x] Utilização de um sistema de controle de versão (ex: git) e de um ambiente de colaboração e gerenciamento de código baseado nesse controle de versão (ex: github, bitbucket).

## Conceito A:

- [ ] Realização das funcionalidades para o conceito B;
- [ ] Aplicação totalmente funcional, com o controle de usuário (e login) realizado completamente, incluindo enviar e-mail para cadastrar/recadastrar senha;
- [ ] Utilização de alguma funcionalidade diferenciada: testes unitários, técnicas de caching, técnicas de segurança ou outras (ver com o professor);
- [x] Implantação do sistema na nuvem ou em um serviço de hospedagem.
