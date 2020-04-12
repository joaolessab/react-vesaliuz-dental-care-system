import React from 'react';
import { defaults } from 'react-chartjs-2';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/News.css';
import '../assets/css/News--Icons.css';

export default function News(){
    defaults.global.defaultFontFamily = 'Averta';

    // RETORNO BÁSICO DO HTML
    return (
        <div className="container--miolo-main">
            <div className="container--content-news">
                
                <div className="div--content-title">
                    <h1>Notícias</h1>
                </div>

                <div className="div--filter-news">
                    <button className="selected">Todos</button>
                    <button>Saúde</button>
                    <button>Equipamentos</button>
                    <button>Investimentos</button>
                    <button>Tecnologia</button>
                    <button>Atualidade</button>
                    <button>Política</button>
                    <button>Tratamentos</button>
                    <button>Remédios</button>
                </div>
                
                <div className="div--list-news">
                    
                    {/* Item de notícia */}
                    <div className="div--item-news">
                        {/* Icone */}
                        <div className="div--item-news-icon corona--girl">
                        </div>
                        {/* Resumo */}
                        <div className="div--item-news-text">
                            <h1>COVID-19: Você já se preparou para combater o prejuízo do seu consultório?</h1>
                            <p>Tempos difíceis chegaram. Estamos enfrentando uma crise sem previsão de terminar. Não há estabilidade nesse cenário, porém, você está preparado para enfrentar? Ou está sentado esperando tudo acontecer? Confira aqui nossas dicas.</p>
                            <div className="div--details">
                                <p>Ler mais</p>
                                <button></button>
                            </div>
                        </div>
                    </div>

                    {/* Item de notícia */}
                    <div className="div--item-news">
                        {/* Icone */}
                        <div className="div--item-news-icon dentist--chair">
                        </div>
                        {/* Resumo */}
                        <div className="div--item-news-text">
                            <h1>Novas cadeiras disponíveis no mercado</h1>
                            <p>As novas cadeiras com suspensão a ar e flexibilidade rotativa estão dando o que falar no mercado odontológico. A mais nova inovação foi criada e patenteada pela empresa "Sony" e seus preços já estão disponíveis no mercado em torno de R$ 5.000,00.</p>
                            <div className="div--details">
                                <p>Ler mais</p>
                                <button></button>
                            </div>
                        </div>
                    </div>

                    {/* Item de notícia */}
                    <div className="div--item-news">
                        {/* Icone */}
                        <div className="div--item-news-icon economy--pork">
                        </div>
                        {/* Resumo */}
                        <div className="div--item-news-text">
                            <h1>Investimentos: agora é hora de reeinvestir no seu negócio?</h1>
                            <p>A resposta é simples e direta: você possui caixa? Se preparou para momentos difíceis e de instabilidade? Se a resposta for sim: com certeza deve continuar reinvestindo no seu negócio. Caso a resposta seja não: agora é o momento de mantér o fluxo de caixa do seu negócio.</p>
                            <div className="div--details">
                                <p>Ler mais</p>
                                <button></button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}