import React, { useState } from 'react';
import "../css/chatbot.css";

const ChatBot = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const [lastDeviceType, setLastDeviceType] = useState(null);
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const sendMessage = (message) => {
    // Adicionar a mensagem do usuário ao chat
    addMessage(message, 'user');

    setTimeout(() => {
      // Obter resposta do bot com base na mensagem do usuário
      const botResponse = getBotResponse(message);

      // Adicionar resposta do bot ao chat
      addMessage(botResponse, 'bot');
    }, 1000);
  };

  const addMessage = (text, sender) => {
    setMessages(prevMessages => [...prevMessages, { text, sender }]);
  };

  const getBotResponse = (userInput) => {
    userInput = userInput.toLowerCase();

    const regexPatterns = [
      { pattern: /conectar|modem|roteador|wifi/, response: 'Tente reiniciar seu modem e roteador. Procedimento completo: Desconecte o roteador e o conversor da tomada de energia. Aguarde de 5 a 10 minutos para garantir que todos os componentes eletrônicos nos dispositivos sejam desenergizados. Conecte novamente os cabos e ligue o roteador e o conversor novamente na tomada de energia. Teste e verifique como está a sua conexão.' },
      { pattern: /senha|wifi/, response: 'Certo, como você já realizou o procedimento, oriento a esquecer a senha do wifi e conectar novamente.' },
      { pattern: /oi|olá|ola|Oi|oii/, response: 'Oi sou o Suporte, Como posso auxiliar?' },
      { pattern: /tarde/, response: 'Suporte, boa tarde! Como posso auxiliar?' },
      { pattern: /noite/, response: 'Suporte, boa noite! Como posso auxiliar?' },
      { pattern: /dia/, response: 'Suporte, bom dia! Como posso auxiliar?' },
      { pattern: /lenta/, response: 'Verifique se há muitos dispositivos conectados à sua rede. Quantos aparelhos estão conectados? \n1. Um dispositivo \n2. Três dispositivos ou menos \n3. Mais de 4 dispositivos', nextStep: 'checkDeviceDetails' },
      { pattern: /sem internet|vermelho/, response: 'Há led vermelho nos equipamentos de internet? 1. Sim há no roteador ou no conversor da fibra\n 2. Não \n3. Não acende nenhum LED', nextStep: 'checkDeviceDetailsSem' },
      { pattern: /procedimento|reiniciar/, response: 'Retire da tomada os aparelhos de intenret, deixe aproximadamente 5 minutos desligados e ligue-os novamente.' },
      { pattern: /sim|feito/, response: 'Certo, como você já realizou o procedimento, oriento a esquecer a senha do wifi e conectar novamente.' },
      {
        pattern: /testar velocidade|velocidade/, response: 'Para fazer o teste certifique-se, que somente o equipamento que está fazendo o teste, esteja conectado. Caso mais de um dispositivo fique conectado na hora do teste, a banda poderá ser dividida, e o mesmo não será preciso. Desligue também programas de downloads, e atualizações, pois todos esses interferem no teste.'
          + 'Após todos esses requerimentos, abra um navegador de internet, google chrome etc...' + ' acesse os links abaixo e basta clicar em ' + "Iniciar o teste" + 'e esperar até que ele seja concluído. Nós selecionamos o melhor servidor automaticamente, mas você também pode escolher manualmente clicando na opção ' + "Seleção automática de servidor."
          + 'Teste de Velocidade de Conexão da Internet https://www.nperf.com/pt/ https://www.fast.com https://www.speedtest.net/pt servidores  Contato Internet Engeplus são os homologados./n' + 'Só algumas informações importantes - para conexões *cabeadas* além de 100mb será necessário cabo de rede *cat5e* ou superior de *8 vias*, placas de rede com suporte *Gigabit*, roteadores com portas *Gigabit*. Para conexões wifi - rede *2.4G* (rede convencional mais amplamente usada) o limite da tecnologia chega a no máx 30~50mb, para conexões *5.8G* necessário aparelhos compatíveis com rede *802.11 ac*, somente nas redes *5.8G* você atingirá velocidades superiores *dependendo de aparelho para aparelho* e ainda tem o fator *distância* do Wifi, quanto mais *longe* você esta do Wifi mais *lenta* ficará sua conexão com a internet.'
      },
      { pattern: /funcionou|certo|ok/, response: 'Posso ajudar em algo mais?' },
      { pattern: /tv|TV|televisao|televisão|televisao/, response: 'Você utiliza para assistir Netflix/youtube ou teria algum IPTV/TV BOX conectado?' },
      {
        pattern: /iptv|IPTV|TV BOX|TVBOX|Tv box|TVbox|tv box/, response: 'Muitos desses aparelhos podem apresentar instabilidades,  interferências e falta de segurança.' + '/n' +
          'Nem todo aparelho de Tv Box é bom. Muito desses aparelhos possuem limitações tecnológicas como placas de Wifi de baixa qualidade,' +
          'facilidade de aquecimento que pode causar falha de dispositivo, capacidade de processamento baixa que pode causar lentidão e algumas ' +
          'outras coisas. ' + '/n' +
          'Alem disso, alguns aparelhos apresentam vulnerabilidade de segurança, que podem ser aproveitadas por hackers, congestionando a sua rede ' +
          'interna e causando falhas de conexão em todos os dispositivos. Por isso, é importante verificar se o seu aparelho é certificado pela ' +
          'Anatel. A principal recomendação é utilizar esses aparelhos conectados por meio de cabos. Isso garante uma conexão mais estável e rápida.' + '/n' +
          'Uma boa dica é verificar se a data e hora da TV estão corretas, se teria alguma atualização pendente a ser realizada. Caso não resolva, entre em contato com seu fornecedor de canais.'
      },
      { pattern: /não|nada|obrigado|obrigada|só isso|so isso/, response: 'Agradeço pelo contato. Fico contente em saber que a conexão não apresentou problemas até agora. Sugiro que continue monitorando a estabilidade nos próximos dias.' },
      { pattern: /obrigad(o|a)|obg|brigado|brigada/, response: 'De nada! Estou à disposição para o que você precisar. 😊' }

    ];


    if (currentStep) {
      if (currentStep === 'checkDeviceDetails') {
        setCurrentStep('handleDeviceDetails');
        return checkDeviceDetails(userInput);
      } else if (currentStep === 'handleDeviceDetails') {
        setCurrentStep(null);
        askIfUserHasMoreQuestions();
        return handleDeviceDetails(userInput);
      } else if (currentStep === 'checkDeviceDetailsSem') {
        setCurrentStep('handleDeviceDetailsSem');
        return handleDeviceDetailsSem(userInput);
      } else if (currentStep === 'handleDeviceDetailsSem') {
        setCurrentStep(null);
        askIfUserHasMoreQuestions();
        return handleDeviceDetailsSem(userInput);
      }
    }

    for (const patternObj of regexPatterns) {
      if (patternObj.pattern.test(userInput)) {
        if (patternObj.nextStep) {
          setCurrentStep(patternObj.nextStep);
          return patternObj.response;
        }
        return patternObj.response;
      }
    }

    return 'Desculpe, não entendi sua solicitação. Pode reformular sua pergunta?';
  };

  const checkDeviceDetails = (userInput) => {
    setLastDeviceType(userInput);

    if (userInput === '1') {
      return 'Já realizou procedimento? \na) Sim \nb) Não';
    } else if (userInput === '2' || userInput === '3') {
      return 'Quais dispositivos estão conectados? Se for um celular/smartphone/telefone, por favor informe a marca de cada um.';
    } else {
      setCurrentStep('checkDeviceDetails');
      return 'Resposta não reconhecida. Por favor, tente novamente.';
    }
  };

  const handleDeviceDetails = (userInput) => {
    if (/lg|motorola|motorolla|motog/i.test(userInput)) {
      return 'Para dispositivos LG ou Motorola, entre em contato com a provedora para desativar o IPV6, pois pode causar conflitos. Oriente-se no site tudocelular.com para verificar a tecnologia Wi-Fi do seu aparelho. Se for AX, ele tem tecnologia Wi-Fi 6; se for AC, pega a rede 5G (maior velocidade e menor distância); se for apenas B/G/N, funciona apenas na rede 2.4GHz (maior distância e menor velocidade). Sugiro pedir ao suporte do provedor que desative o AX das redes e troque a criptografia para WPA2 PSK.';
    } else if (/samsung|iphone|ios|android|xiaomi|galaxy/i.test(userInput)) {
      return 'Oriente-se no site tudocelular.com para verificar a tecnologia Wi-Fi do seu aparelho. Se for AX, ele tem tecnologia Wi-Fi 6; se for AC, pega a rede 5G (maior velocidade e menor distância); se for apenas B/G/N, funciona apenas na rede 2.4GHz (maior distância e menor velocidade). Sugiro pedir ao suporte do provedor que desative o AX das redes e troque a criptografia para WPA2 PSK.';
    } else if (/celular|smartphone|telefone/i.test(lastDeviceType)) {
      return 'Oriente-se no site tudocelular.com para verificar a tecnologia Wi-Fi do seu aparelho. Se for AX, ele tem tecnologia Wi-Fi 6; se for AC, pega a rede 5G (maior velocidade e menor distância); se for apenas B/G/N, funciona apenas na rede 2.4GHz (maior distância e menor velocidade). Sugiro pedir ao suporte do provedor que desative o AX das redes e troque a criptografia para WPA2 PSK.';
    } else if (/notebook/i.test(lastDeviceType)) {
      return 'Seu notebook está conectado por cabo ou Wi-Fi? Se por cabo, siga este procedimento para verificar se o cabo de rede é gigabit ou fast: Configurações de Ethernet. Vá até Configurações de Ethernet, clique em 🖥️, vá até o final da página em Propriedades e verifique a velocidade da conexão (recepção/transmissão). Se estiver 1000/1000 (Mbps), é gigabit. Caso esteja 100, é fast, e não alcançará os 400MB contratados. Vá em Painel de Controle > Rede e Internet > Conexões de rede. Botão direito no ícone -> Propriedades -> Configurar -> Avançado -> Velocidade e Duplex -> Altere para 1 Gbps full duplex. Se conectar por Wi-Fi, aproxime-se do roteador e conecte-se à rede 5G. Se não aparecer, a placa de rede é /100, fast. Recomendo sempre conectar por cabo de rede!';
    } else if (/televisão|tv/i.test(lastDeviceType)) {
      return 'Sua TV está conectada por cabo ou Wi-Fi? Se por Wi-Fi, ela está perto ou longe do roteador? Oriente a conectar na 5G se estiver próxima do roteador. Caso contrário, oriente a conectar por cabo de rede. É uma TV SMART e possui algum IPTV / TV BOX conectado? Se for uma TV Smart, teste se ocorre travamento no YouTube. Se não travar, não é problema de internet. Verifique com o fornecedor do IPTV/TV Box, que deve ter um número de suporte se for homologado pela Anatel. Note que muitos desses aparelhos podem ter instabilidades, interferências e falta de segurança. Certifique-se de que seu aparelho é certificado pela Anatel e conecte-o por cabo para maior estabilidade e rapidez.';
    } else {
      currentStep = 'handleDeviceDetails'; // Define de volta para o mesmo passo
      return 'Informe o tipo de dispositivo e se ele é móvel (ex: tablet) ou fixo (ex: televisão).';
    }
  };

  const handleDeviceDetailsSem = (userInput) => {
    if (userInput === '1') {
      setCurrentStep('askIfUserHasMoreQuestions');
      return 'ja realizou procedimento? \n Retire da tomada os aparelhos de internet, deixe aproximadamente 5 minutos desligados e ligue-os novamente.\n a) Sim \n b) Não';
    } else if (userInput === 'a') {
      return 'Ótimo. Resolveu? c) Sim d) Não';
    } else if (userInput === 'c') {
      return 'ótimo, obrigada pelo contato.';
    } else if (userInput === 'b' || userInput === 'd') {
      return 'há led vermelho no roteador apenas?\n e) sim \n f) nao';
    } else if (userInput === 'e') {
      return 'aparece a rede para conectar? 1e) sim 1f) nao'
    } else if (userInput === '1e') {
      return 'se aparece a rede entao possivelmente pode ser aparelho travado ou entao nao foi provisionado o mac na olt, entre em contato com o provedor.'
    } else if (userInput === '1f') {
      return 'se nao aparece então foi resetado, entre em contato com a provedora para tentar configurar remotamente, caso nao de será aberto visita técnica.';

    } else if (userInput === '2') {
      setCurrentStep('askIfUserHasMoreQuestions');
      return 'Tente reiniciar o roteador e o conversor, e esquecer a senha da rede WiFi. isso resolveu? 2a) sim 2b) nao';
    } else if (userInput === '2a') {
      return 'ótimo posso ajudar em algo mais?'
    } else if (userInput === '2b') {
      return 'aparece: 2c) Senha inválida ou 2d) conectado sem internet';
    } else if (userInput === '2c') {
      return ' senha inválida,: Se for senha inválida, pode ser problema na senha, você está digitando a senha errada. ';
    } else if (userInput === '2d') {
      'conectado sem internet,   Se estiver conectado sem internet, possivelmente o aparelho travou e deve ser entrado em contato com a provedora.';
    } else if (userInput === '3') {
      setCurrentStep('askIfUserHasMoreQuestions');
      return 'Tente testar em outra tomada, caso ainda assim não acenda, pode ter queimado o cabo da fonte do aparelho ou entao o próprio aparelho.' +
        ' Caso tenha queimado a fonte, é cobrado R$50,00, valor pode ser pago a vista ou na proxima fatura com a mensalidade.' +
        'Em caso de queima do equipamento e ser equipamento comodato dependendo do modelo, a partir de R$250 para repor.' +
        'Caso seja equipamento seu, possivelmente tera que adquirir outro que seja compativel com sua velocidade.';
    } else {
      setCurrentStep('checkDeviceDetailsSem');
      return 'Resposta não reconhecida. Por favor, tente novamente.';
    }
  };

  const askIfUserHasMoreQuestions = () => {
    setTimeout(() => {
      addMessage('Você tem mais alguma dúvida?', 'bot');
    }, 1000);
  };

  const showSuggestions = (suggestions) => {
    setSuggestions(suggestions);
  };

  return (
    <div className="chat-bot">
      <div id="chat-box" className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input id="user-input" type="text" />
        <button onClick={() => {
          const userInputElement = document.getElementById('user-input');
          const userInput = userInputElement.value.trim();
          if (!userInput) return;

          sendMessage(userInput);
          userInputElement.value = '';
        }}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBot;
