import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/News.css';
import '../assets/css/News--Icons.css';
//import '../assets/css/Responsive/News--Responsive.css';

class News extends React.Component{

    constructor(props){
        super(props);

        /* VARIABLES */
        this.state = {
            modalVisibility: false,
            newsFilter: 10,
            selectedTags: ["Todos"]
        };
        this.names = [
            'Todos',
            'Saúde',
            'Equipamentos',
            'Investimentos',
            'Tecnologia',
            'Atualidade',
            'Política',
            'Tratamentos',
            'Remédios'
        ]
        
        this.modalTitle = "";
        this.modalBody = "";
        this.modalPicture = "";
    }

    onOpenModal = (newsId) => {
        if (newsId === "covid19"){
            this.modalTitle = "COVID-19: Você já se preparou para combater o prejuízo do seu consultório?";
            this.modalBody =    "<p>Tempos difíceis chegaram. Estamos enfrentando uma crise sem previsão de término.</p>" +
                                "<p>Não há estabilidade nesse cenário, porém, você está preparado para enfrentar? Ou está sentado esperando tudo acontecer?" +
                                "<p>Haja agora ou cale-se para sempre!</p>" +
                                "<img src='https://cdn.portalcbncampinas.com.br/wp-content/uploads/2020/01/portalcbncampinas.com.br-corona-virus-e-febre-hemorragica-coronavirus.jpg'>" +
                                "<p className='footer-news'>Revista Super Interessante, 2020.</p>";
        }
        else if (newsId === "chair20"){
            this.modalTitle = "Novas cadeiras disponíveis no mercado";
            this.modalBody =    "<p>As novas cadeiras com suspensão a ar e flexibilidade rotativa estão dando o que falar no mercado odontológico!" +
                                "<p>A mais nova inovação foi criada e patenteada pela empresa Sony e seus preços já estão disponíveis no mercado em torno de R$ 5.000,00.</p>" +
                                "<p>Confira as fotos na galeria: </p>" +
                                "<img src='https://mundirepresentacoes.com.br/images/produtos/linha-odontologica/consultorios/Cadeira-Frente.png'>"; 
        }

        else if (newsId === "economy21"){
            this.modalTitle = "Investimentos: agora é hora de reeinvestir no seu negócio?";
            this.modalBody =    "<p>A resposta é simples e direta: você possui caixa?</p>" + 
                                "<p>Se preparou para momentos difíceis e de instabilidade?</p>" + 
                                "<p>Se a resposta for sim: com certeza deve continuar reinvestindo no seu negócio. Caso a resposta seja não: agora é o momento de mantér o fluxo de caixa do seu negócio.</p>" +
                                "<img src='data:image/jpeg;base64,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'>" +
                                "<p className='footer-news'><em>www.infomoney.com.br</em>, 2020.</p>";
        }

        this.setState({ modalVisibility: true });
    };
    
    onCloseModal = () => {
        this.setState({ modalVisibility: false });
    };

    setButtonSelectedValues = (buttonNodeItens, type) =>{
        if (type === "button"){
            if (buttonNodeItens.classList.contains("selected") === true){
                buttonNodeItens.classList.remove("selected");
            }
            else{
                buttonNodeItens.classList.add("selected");
            }
        }
        else{
            var buttonsHtmlNodes = document.getElementsByClassName("button--tag");
            for (var i = 0; i < buttonsHtmlNodes.length; i++){
                var buttonHtmlNodeText = buttonsHtmlNodes[i].children[0].innerText;
                if (buttonNodeItens.includes(buttonHtmlNodeText)){
                    buttonsHtmlNodes[i].classList.add("selected");
                }
                else{
                    buttonsHtmlNodes[i].classList.remove("selected");
                }
            }
        }
    };

    showNewsItem = (tags) =>{
        var newsNodes = document.getElementsByClassName("div--item-news");
        var emptyNews = document.getElementsByClassName("div--item-news-empty")[0];
        
        if (tags.length === 0){
            emptyNews.style.display = "flex";

            for (var k = 0; k < newsNodes.length; k++){
                newsNodes[k].style.display = "none";
            }
        }
        else{
            if (tags.includes("Todos") === true){
                for (var i = 0; i < newsNodes.length; i++){
                    newsNodes[i].style.display = "flex";
                }
            }
            else{
                emptyNews.style.display = "none";

                // Normalizando tags
                var tagsNormalized = [];
                for (var b = 0; b < tags.length; b++){                
                    tagsNormalized.push(tags[b].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                }

                //Verificando itens
                for (var p = 0; p < newsNodes.length; p++){
                    var tagExistent = false;
                    var itemTags = newsNodes[p].getAttribute("tagnews").split("-");
                    
                    // Pegando tags do item selecionado
                    for (var j = 0; j < itemTags.length; j++){
                        if (tagsNormalized.includes(itemTags[j]) === true){
                            tagExistent = true;
                        }
                    }
                    
                    // Final da manipulacao
                    if (tagExistent){
                        newsNodes[p].style.display = "flex";
                    }
                    else{
                        newsNodes[p].style.display = "none";
                    }
                }
            }
        }
    };

    filterTag = (event) =>{
        // Para ListBox
        if (event.target.parentElement === undefined){
            this.setState({ selectedTags: event.target.value });
            this.setButtonSelectedValues(event.target.value, "checkBox");
            this.showNewsItem(event.target.value);
        }
        // Para botões físicos
        else{
            this.setButtonSelectedValues(event.target.parentElement, "button");
            var buttonsHtmlNodes = document.getElementsByClassName("button--tag");
            var selectedTagsFromNode = [];
            for (var i = 0; i < buttonsHtmlNodes.length; i++){
                if (buttonsHtmlNodes[i].classList.contains("selected") === true){
                    selectedTagsFromNode.push(buttonsHtmlNodes[i].children[0].innerText);
                }
            }    
            this.setState({ selectedTags: selectedTagsFromNode });
            this.showNewsItem(selectedTagsFromNode);
        }               
    };

    // Visualização de Todo o conteúdo do HTML
    render(){

        // RETORNO BÁSICO DO HTML
        return (
            <div className="container--miolo-main">
                <div className="container--content-news">
                    
                    <div className="div--content-title">
                        <h1>Notícias</h1>
                    </div>

                    <div className="div--filter-news">
                        <Button className="button--tag selected" onClick={(e) => this.filterTag(e)}>Todos</Button>
                        <Button className="button--tag" onClick={(e) => this.filterTag(e)}>Saúde</Button>
                        <Button className="button--tag" onClick={(e) => this.filterTag(e)}>Equipamentos</Button>
                        <Button className="button--tag" onClick={(e) => this.filterTag(e)}>Investimentos</Button>
                        <Button className="button--tag" onClick={(e) => this.filterTag(e)}>Tecnologia</Button>
                        <Button className="button--tag" onClick={(e) => this.filterTag(e)}>Atualidade</Button>
                        <Button className="button--tag" onClick={(e) => this.filterTag(e)}>Política</Button>
                        <Button className="button--tag" onClick={(e) => this.filterTag(e)}>Tratamentos</Button>
                        <Button className="button--tag" onClick={(e) => this.filterTag(e)}>Remédios</Button>                     
                    
                        {/* Seletor multiplo */}
                        <FormControl variant="outlined" className="formcontrol--tag-news">
                            <InputLabel htmlFor="demo-mutiple-checkbox-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={this.state.selectedTags}
                                onChange={ this.filterTag }
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                >
                                {this.names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox 
                                            checked={this.state.selectedTags.indexOf(name) > -1} 
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={< CheckCircleIcon />}
                                        />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                                            
                    <div className="div--list-news">
                        
                        {/* Item de notícia */}
                        <div className="div--item-news" onClick={() => this.onOpenModal("covid19")} tagnews="saude">
                            {/* Icone */}
                            <div className="div--item-news-icon corona--girl">
                            </div>
                            {/* Resumo */}
                            <div className="div--item-news-text">
                                <h1>COVID-19: Você já se preparou para combater o prejuízo do seu consultório?</h1>
                                <p>Tempos difíceis chegaram. Estamos enfrentando uma crise sem previsão de término. Não há estabilidade nesse cenário, porém, você está preparado para enfrentar? Ou está sentado esperando tudo acontecer? Confira aqui nossas dicas.</p>
                                <div className="div--details">
                                    <p>Ler mais</p>
                                    <button></button>
                                </div>
                            </div>
                        </div>

                        {/* Item de notícia */}
                        <div className="div--item-news" onClick={() => this.onOpenModal("chair20")} tagnews="equipamentos-tecnologia">
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
                        <div className="div--item-news" onClick={() => this.onOpenModal("economy21")} tagnews="investimentos">
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

                        {/* Item de notícia - Em branco */}
                        <div className="div--item-news-empty" tagnews="nenhum">
                            {/* Resumo */}
                            <h1>Parece que não existem notícias a serem exibidas</h1>
                            <p>Selecione alguma categoria nos botões acima para realizar um filtro.</p>
                        </div>                        
                    </div>
                </div>

                {/* Modal de notícia */}
                <Modal open={ this.state.modalVisibility } onClose={ this.onCloseModal } center>
                    <h1>{ this.modalTitle }</h1>
                    <div className="div--modalBody-default" dangerouslySetInnerHTML={{ __html: this.modalBody }} />
                </Modal>
            </div>
        );
    }
}

export default News;