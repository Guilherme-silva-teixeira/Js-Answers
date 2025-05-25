import Click from "./examples/click.js";
import Scroll from "./examples/scroll.js";
import FindAndClick from "./examples/findAndClick.js";
import YoutubeSearch from "./examples/youtubeSearch.js"; 

// ------------ Anotações ------------
// Acho que importar agora não serve para nada
// Depois eu acho que tenho que encontrar uma utilidade para isso (importar de outro arquivo)
// Pegar os exemplos de automação e colocar lá embaixo
// Pegar extrutura de outras páginas (Gmail, Watssapp, instagram, chatgpt, docs, etc)
/* Criar alguma maneira da IA entender cada elemento mais rapido sobre a pesquisa do usuário e
aplicar alguma segurança para não dar erro na hora de clicar ou fazer scroll e bloquear conteúdos
nocivos (NSFW, +18, etc)
*/
// fazer  a entrada (por microfone (os comandos devem ser inseridos por microfone)) e o leitor de tela, contraste, etc

const examples = [];//também não sei se serve para alguma coisa ou deva servir depois

const popularPages = [youtubePage];

const duvidas = [
    cliqueNoBotaoEEnvieUmFormulario,
    digiteOlaEmUmCampoDeTextoEDepoisCliqueEmEnviar,
    roleParaOTopoDaPagina,
    roleParBaixo500Pixels,
    roleParaCima300Pixels,
    roleParaBAixoAteOFinalDaPagina,
    pesquisaYoutube
];

// Adiciona exemplos de automação

// a IA deve retornar em JSON para rodar a automação

//Comandos simples

const cliqueNoBotaoEEnvieUmFormulario = `
    Exemplo para "Clique no botão 'Enviar' em um formulário":
{
  "actions": [
    { "action": "CLICK", "selector": "button[type='submit'][name='enviar']" }
  ]
}
`;

const digiteOlaEmUmCampoDeTextoEDepoisCliqueEmEnviar = `
Exemplo para "Digite 'Olá' em um campo de texto e depois clique em 'Enviar'":
{
  "actions": [
    { "action": "TYPE", "selector": "input[name='mensagem']", "text": "Olá" },
    { "action": "CLICK", "selector": "button[type='submit'][name='enviar']" }
  ]
}`;

const roleParaOTopoDaPagina = `
Exemplo para "Role para o topo da página":
{
  "actions": [
    { "action": "SCROLL", "direction": "top" }
  ]
}`;

const roleParBaixo500Pixels = `
Exemplo para "Role para baixo 500 pixels":
{
  "actions": [
    { "action": "SCROLL", "direction": "down", "amount_pixels": 500 }
  ]
}`;

const roleParaCima300Pixels = `
Exemplo para "Role para cima 300 pixels":
{
  "actions": [
    { "action": "SCROLL", "direction": "up", "amount_pixels": 300 }
  ]
}`;

const roleParaBAixoAteOFinalDaPagina = `
Exemplo para "Role para baixo até o final da página":
{
    "actions": [
    { "action": "SCROLL", "direction": "bottom" }
    ]
}
`;

//============================================================= COMANDOS AVANÇADOS ============================================================

const pesquisaYoutube = `
//Comando do usuário: "Procure por 'Sentry DevRelate: Debugging with Replay' no YouTube e clique no primeiro vídeo do canal Sentry"

// JSON de automação para o YouTube

{
  "actions": [
    {
      "action": "NAVIGATE",
      "url": "https://www.youtube.com"
    },
    {
      "action": "WAIT",
      "milliseconds": 1500
    },
    {
      "action": "TYPE",
      "selector": "input#search",
      "text": "Sentry DevRelate: Debugging with Replay"
    },
    {
      "action": "CLICK",
      "selector": "button#search-icon-legacy"
    },
    {
      "action": "WAIT",
      "milliseconds": 3000
    },
    {
      "action": "GET_HTML_AND_CONTINUE",
      "next_command_hint": "Na página de resultados da pesquisa do YouTube para 'Sentry DevRelate: Debugging with Replay', encontre e clique no primeiro vídeo cujo nome do canal seja 'Sentry' ou que contenha 'Sentry' no nome do canal."
    }
  ]
}
`;


//============================================================= PÁGINAS POPULARES ============================================================


let youtubePage = `
    <!DOCTYPE html>
<html lang="pt-BR" style="font-size: 10px; font-family: Roboto, Arial, sans-serif;">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Exemplo</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; color: #333; }

        header { background-color: #fff; padding: 10px; border-bottom: 1px solid #ddd; display: flex; align-items: center; }
        
        header #logo { font-size: 1.5em; font-weight: bold; color: red; margin-right: 20px; text-decoration: none; }
        
        header #search-bar { display: flex; flex-grow: 1; }
        
        header input[type="text"] { padding: 8px; border: 1px solid #ccc; border-radius: 3px 0 0 3px; flex-grow: 1; }
        
        header button { padding: 8px 15px; border: 1px solid #ccc; background-color: #f0f0f0; border-left: none; border-radius: 0 3px 3px 0; cursor: pointer; }
        
        #video-results-container { padding: 20px; }
        
        .video-item { background-color: #fff; border: 1px solid #ddd; margin-bottom: 15px; padding: 15px; border-radius: 3px; display: flex; }
        
        .video-thumbnail { width: 160px; height: 90px; background-color: #eee; margin-right: 15px; object-fit: cover; }
        
        .video-info { flex-grow: 1; }
        
        .video-title { font-size: 1.2em; font-weight: bold; margin: 0 0 5px 0; }
        
        .video-title a { text-decoration: none; color: #1a0dab; }
        
        .video-channel, .video-metadata, .video-description { font-size: 0.9em; color: #555; margin: 3px 0; }
        
        .video-metadata span { margin-right: 10px; }

    </style>
</head>

<body>
    <header>
        <a href="/" id="logo">YouTube</a>
        <div id="search-bar">
            <input type="text" id="search-query" placeholder="Pesquisar vídeos...">
            <button id="search-button" onclick="performSearch()">Pesquisar</button>
        </div>
    </header>

    <div id="video-results-container">
        <h2>Resultados da Pesquisa</h2>
        
        <!-- Exemplo de como um vídeo seria estruturado. A Você pode preencher isso ou buscar itens com esta estrutura. procure dentro da página do youtube se quiser -->
        <!-- Vídeos existentes foram removidos para simplificar. Uma IA pode adicionar itens aqui dinamicamente ou analisar os existentes. -->
        <!-- Exemplo de vídeo (resultado da pesquisa) -->
        <!-- A pesquisa é de "Como aprender Programação" -->

        <div class="video-item" data-video-id="A1BaZr82XJI">
            <img class="video-thumbnail" src="https://i.ytimg.com/vi/A1BaZr82XJI/hq720.jpg" alt="Thumbnail do Vídeo 1">
            <div class="video-info">
                <h3 class="video-title"><a href="/watch?v=A1BaZr82XJI">Se nao aprender PROGRAMAÇÃO com esse video. - ̗̀  DESISTE   ̖́-</a></h3>
                <p class="video-channel">Fiasco</p>
                <p class="video-metadata">
                    <span class="video-views">1.939.198 visualizações</span> -
                    <span class="video-upload-date">há 1 ano</span> -
                    <span class="video-duration">7:51</span>
                </p>
                <p class="video-description">#frontend #fiasco #programação Link: https://youtu.be/_pXwL7rSvJI "Neste vídeo imperdível, vamos apresentar um roadmap ...</p>
            </div>
        </div>

        <div class="video-item" data-video-id="VIDEO_ID_EXEMPLO_2">
            <img class="video-thumbnail" src="https://via.placeholder.com/160x90.png?text=Video+Thumbnail" alt="Thumbnail do Vídeo 2">
            <div class="video-info">
                <h3 class="video-title"><a href="/watch?v=VIDEO_ID_EXEMPLO_2">Outro Título de Vídeo Incrível</a></h3>
                <p class="video-channel">Canal Exemplo</p>
                <p class="video-metadata">
                    <span class="video-views">500.000 visualizações</span> -
                    <span class="video-upload-date">há 6 meses</span> -
                    <span class="video-duration">12:30</span>
                </p>
                <p class="video-description">Uma breve descrição sobre o conteúdo deste segundo vídeo de exemplo, útil para análise de IA.</p>
            </div>
        </div>
        
        <!-- procure por mais elementos .video-item aqui -->

    </div>

    <script>
        // Script mínimo para simular a busca (opcional para IA, mais para demonstração humana)
        function performSearch() {
            const query = document.getElementById('search-query').value;
            if (query) {
                // Em uma aplicação real, aqui você faria uma requisição ou filtraria o conteúdo.
                // Para esta IA, ela provavelmente analisaria a estrutura HTML diretamente.
                console.log("IA pesquisaria por: " + query);
                // Poderia, por exemplo, limpar #video-results-container e popular com novos .video-item
            }
        }
    </script>
</body>
</html>
`;
