import React from 'react';
import clarkPhoto from '../assets/images/clients/clark.jpg';
import dianaPhoto from '../assets/images/clients/diana.jpg';
import oliverPhoto from '../assets/images/clients/oliver.jpg';
import brucePhoto from '../assets/images/clients/bruce.jpg';

// ARQUIVOS CSS E IMAGENS DEVEM SER IMPORTADOS AQUI
import '../assets/css/Clients.css';
import '../assets/css/Responsive/Clients--Reponsive.css';

import AutoCompleteSuggest from './AutoCompleteSuggest';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import cogoToast from 'cogo-toast';

class Clients extends React.Component{    
    constructor(props){         
        super(props);

        this.state = {
            clientCRUDVisibility: false,

            clients: [
                {
                    id: 1,
                    name: "Clark Cold",
                    phone: "(12) 99088-4140",
                    email: "clarkcold@gmail.com",
                    address: "Avenida Brasil, 21",
                    photo: clarkPhoto
                },
                {
                    id: 2,
                    name: "Diana Mendes",
                    phone: "(12) 87995-1105",
                    email: "dianamendes@gmail.com",
                    address: "Rua Monsenhor Dutra, 43",
                    photo: dianaPhoto
                },
                {
                    id: 3,
                    name: "Oliver Queen",
                    phone: "(12) 97865-2141",
                    email: "oliverthekey@gmail.com",
                    address: "Avenida JK, 110",
                    photo: oliverPhoto
                },
                {
                    id: 4,
                    name: "Brunce Wayne da Silva",
                    phone: "(12) 99065-4040",
                    email: "brucesilva@gmail.com",
                    address: "Rua Jacareí, 230",
                    photo: brucePhoto
                }
            ]
        };
    };

    openCrudClientsModal = () => {
        debugger
    };

    triedToDeleteClient = (clientId) => {
        cogoToast.info(
            <div>
                <div>Tem certeza que deseja excluir esse cliente?</div>
                <button className="button--confirmation" onClick = {() => this.deleteClient(clientId)}>Sim</button>
                <button className="button--cancel" onClick = { this.destroyCogoToastInfo }>Não</button>
            </div>,
            { heading: 'Confirmação', position: 'top-center', hideAfter: 0 }
        );
    };

    deleteClient = (clientId) => {
        var newClients = [];
        for (var i = 0; i < this.state.clients.length; i++){
            if (this.state.clients[i].id !== clientId)
                newClients.push(this.state.clients[i]);
        }

        // Salvando     
        this.setState({
            clients: newClients
        });
        
        this.destroyCogoToastInfo();
        cogoToast.success('Cliente excluído com sucesso.', { heading: 'Sucesso!', position: 'top-center', hideAfter: 3 });
    };

    destroyCogoToastInfo = () => {
        var ctToasts = document.getElementsByClassName("ct-toast");
        for (var i = 0; i < ctToasts.length; i++){
            ctToasts[i].remove();
        }
    };

    // VISUALIZAÇÃO DE TODO O CONTEÚDO HTML
    render(){
        // LISTAGEM DE CLIENTES
        const listClients = this.state.clients.map((client) => {
            return (
                <div className="div--individual-card" key={client.id}>
                    <Button className="button--card-delete" onClick={() => this.triedToDeleteClient(client.id) }><DeleteForeverIcon /></Button>
                    <div className="div--card-background" onClick={ this.openCrudClientsModal }>
                        <div className="div--card-picture">
                            <img src={ client.photo }></img>
                        </div>
                        <div className="div--card-name">{ client.name }</div>
                        <div className="div--card-contact">{ client.email }<br/>{ client.phone }</div>
                        <div className="div--card-address">{ client.address }</div>
                    </div>
                </div>
            );
        });

        // RETORNO BÁSICO DO HTML
        return (
            <div className="container--miolo-main">
                <div className="container--content-clients">
                    <div className="div--content-title">
                        <h1>Clientes</h1>
                    </div>
    
                    {/* Auto Suggest */}
                    < AutoCompleteSuggest />
                    
                    <div className="container--clients-card">
                        { listClients }                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Clients;