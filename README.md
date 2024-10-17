# Aplicação de Agendamento de Reuniões

Esta aplicação web permite que os usuários agendem reuniões, escolhendo data e hora, adicionando participantes e gerando um link do Google Meet para a reunião. A interface é simples e fácil de usar, proporcionando um processo intuitivo para criar e gerenciar reuniões.

## Funcionalidades

- **Seleção de Data e Hora:** Escolha uma data e horário específicos para a reunião.
- **Adicionar Participantes:** Insira o nome e e-mail dos participantes da reunião. Você pode adicionar vários participantes e removê-los conforme necessário.
- **Link Automático do Google Meet:** Um link para a reunião no Google Meet é gerado automaticamente quando a reunião é confirmada.
- **Envio de E-mails:** Após confirmar a reunião, e-mails de confirmação podem ser enviados ao organizador e a todos os participantes, contendo os detalhes da reunião e o link para o Google Meet.
- **Reagendar ou Cancelar Reunião:** Permite ao usuário reagendar ou cancelar a reunião antes de sua confirmação final.

## Como Usar

1. **Selecionar Data e Hora:** Na tela principal, selecione a data e a hora desejada para a reunião.
2. **Adicionar Participantes:**
   - Insira o nome e o e-mail dos participantes.
   - Clique no botão "Adicionar Participante" para adicioná-los à lista.
   - Os participantes adicionados aparecerão em uma lista, onde poderão ser removidos clicando no "x" ao lado do nome.
3. **Confirmar Reunião:**
   - Após preencher os campos obrigatórios (nome, e-mail do organizador, participantes, data e hora), clique em "Confirmar".
   - Um link do Google Meet será gerado e exibido na tela de confirmação.
   - E-mails de confirmação serão enviados para o organizador e os participantes (se configurado com um backend de envio de e-mails).
4. **Cancelar ou Reagendar:**
   - Caso precise cancelar ou reagendar, o usuário pode voltar à tela de calendário e redefinir as informações da reunião.

## Tecnologias Utilizadas

- **Frontend:**
  - HTML, CSS e JavaScript para a interface e interações do usuário.
  - Manipulação do DOM para gerenciamento dinâmico de elementos na página (como a adição e remoção de participantes).
