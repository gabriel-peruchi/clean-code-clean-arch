Overview

Ao longo do curso vamos desenvolver uma variação do UBER, onde um motorista pode se cadastrar para fazer corridas para passageiros.

Funcionamento (em linhas gerais, ao longo do projeto mais detalhes serão informados)

O passageiro se cadastra na plataforma fornecendo seu nome, email e cpf.
O motorista se cadastra na plataforma fornecendo seu nome, email, cpf e a placa do carro.
Inicialmente ambos devem ter avaliação igual a 5 e número de corridas igual a 0.
Após cada corrida a avaliação e o número de corridas de cada um é atualizado.
O motorista pode estar no status: fora de serviço, ocupado ou disponível.
O passageiro vai digitar as coordenadas de origem e de destino e solicitar a corrida.
O motorista pode visualizar os dados da corrida e aceitá-la. Após aceitá-la, o passageiro aguarda pelo motorista. 
Ao chegar, o motorista inicia a corrida e durante a corrida o trajeto vai sendo atualizado com os trechos percorridos, atualizando também o preço.
No final o motorista finaliza a corrida e o pagamento é processado.
O motorista pode avaliar o passageiro depois da corrida ser finalizada.
O passageiro pode avaliar o motorista depois da corrida ser finalizada.

Devem ser desenvolvidos os seguintes use cases:

Projeto - Parte 1 (Aula 1)

Use case : Calcular o preço da corrida
	url: /calculate_ride_price
	method: "post"
	input: distance, date
	output: price

Projeto - Parte 2 (Aula 2)

Use case: Cadastrar passageiro
	url: /passengers
	method: POST
	input: name, email e document
	output: passenger_id (uuid)

Use case: Cadastrar motorista
	url: /drivers
	method: POST
	input: name, email, document e car plate
	output: driver_id (uuid)

Projeto - Parte 3 (Aula 3)

Calcular corrida (modificar)
  url: /calculate_ride
  method: POST
  input: trocar a distance pelas coordenadas de from (lat, long) e to (lat, long)
  output: price (estimado)

Solicitar corrida
  url: /request_ride
  method: POST
  input: passenger_id, from (lat, long), to (lat, long)
  output: ride_id

Ao solicitar a corrida o status dela deve ser waiting_driver e o driver_id null. Além disso, deve ser criado o campo request_date com a data atual.

O from e to servem apenas para definir os pontos de origem e destino e orientar o motorista em relação ao trajeto desejado, conforme a corrida estiver em andamento os segmentos serão adicionados e o preço final pode mudar caso o motorista pegue um caminho diferente, faça mudanças no trajeto ou mude de horário, por exemplo uma corrida iniciada às 22:30 que termina às 23:10 acaba tendo cobranças diferentes por trecho.

Aceitar corrida
  url: /accept_ride
  method: POST
  input: ride_id, driver_id
  output: void

Ao aceitar a corrida, o status dela deve ser accepted e o driver_id definido. Além disso, a accept_date deve ser a data atual.

Consultar corrida
  url: /rides/:id
  method: GET
  input: ride_id
  output: passenger's information, driver's information, status, waiting_duration

Projeto - Parte 4 (Aula 04)

Iniciar corrida
  url: /start_ride
  method: POST
  input: ride_id, position (lat, long), date
  output: void

Atualizar trajeto
  url: /add_segment_to_ride
  method: POST
  input: ride_id, position (lat, long), date
  output: void

Finalizar corrida
  url: /end_ride
  method: POST
  input: ride_id, position (lat, long), date
  output: void

Consultar corrida (atualizar)
  url: /rides/:id
  method: GET
  input: ride_id
  output: passenger's information, driver's information, status, waiting_duration, distance, price, ride_duration