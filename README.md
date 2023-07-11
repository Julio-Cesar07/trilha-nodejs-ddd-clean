# Trilha NodeJs DDD & Clean - Fórum -

## Criar Pub/Sub

Pub

- Tem que ser um agregado, então pode transformar uma entitidade em AggregateRoot que será o pub.
- Crie uma classe evento, que será uma classe que representará o tipo de evento. Apenas implementa DomainEvent
- Adicione um evento na entitidade, por exemplo: na função create chama a função addDomainEvent com o paramentro de uma classe evento.
- Agora o publisher foi criado, quando estiver totalmente pronto para lançar o evento, chame DomainEvents.dispatchEventsForAggregate com o id do agregado.

Sub

- Crie uma classe que representa um evento, apenas implemente EventHandler, será o sub.
- Registre essa classe para ouvir um evento com DomainEvents.register
- Crie a callback
- Dispare depois de salvar no banco
