-- criação da tabela prédios
create table IF NOT EXISTS predios (
	codigo serial primary key, 
	nome varchar(40) not null, 
	descricao varchar(40) not null, 
	sigla varchar(4) not null 	
);

-- inserindo registros na tabela prédios
insert into predios (nome, descricao, sigla) 
values ('Predio 5', 'Predio da Computação', 'P5'), ('Predio 3', 'Predio da Mecânica', 'P2');


-- criação da tabela salas
create table IF NOT EXISTS salas (
	codigo serial primary key, 
	numero integer not null, 
	descricao varchar(40) not null, 
	capacidade integer not null, 
	predio integer not null, 
	foreign key (predio) references predios (codigo)
);

-- inserindo alguns registros na tabela salas
insert into salas (numero, descricao, capacidade, predio) 
values (511, 'Laboratório', 12, 1), (512, 'Laboratório', 12, 1);

-- criando a tabela de usuários
create table IF NOT EXISTS usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	nome varchar(50) not null,
	tipo char(1) not null, 
	check (tipo = 'T' or tipo = 'A' or tipo ='U'),
	telefone varchar(14) not null
);

insert into usuarios (email, senha, nome, tipo, telefone) values 
('jorgebavaresco@ifsul.edu.br', '123456', 'Jorge', 'U', '99870-0987)'),
('joao@ifsul.edu.br', '123456', 'João', 'A', '99333-0987)');
