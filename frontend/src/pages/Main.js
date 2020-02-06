import React from 'react';

//Arquivos CSS e Imagens devem ser importados aqui
import './Main.css';
import Resume from '../components/Resume';

export default function Main(){

    function manipulateSidebar(e){
        //Retract
        if (e.target.classList.contains("button--sidebar-retract")){
            //Changing CSS
            e.target.classList.remove("button--sidebar-retract");
            e.target.classList.add("button--sidebar-expand");
            e.target.style.marginLeft = "-30px";
            document.getElementsByClassName("container--sidebar")[0].style.display = "none";

        }
        else{
            //Changing CSS
            e.target.classList.remove("button--sidebar-expand"); 
            e.target.classList.add("button--sidebar-retract");            
            e.target.style.marginLeft = "85px";
            document.getElementsByClassName("container--sidebar")[0].style.display = "flex";
        }
    };

    // Retorno básico do HTML
    return (
        <div className="container--father">
            <div className="container--blackboard-columnar">                               
                
                {/* MAIN NAVBAR */}
                <div className="navbar-main--top">
                    <div className="left--side">
                        <div className="logo"></div>
                        <p>Clínica <em>Dente Brilhoso</em></p>
                    </div>
                    
                    <div className="right--side">
                        <i className="alert"></i>
                        <p>Bem-vindo, João</p>
                        <div className="photo"></div>
                        <button className="button--rectangle-secondary-middle-size lrbuton icon-exit--white">
                            <p>Sair</p>
                        </button>
                    </div>
                </div>
             
                {/* MAIN CONTENT */}
                <div className="container--main-content">
                    
                    {/* SIDEBAR */}
                    <div className="container--sidebar">
                        <div className="sidebar">
                            <button className="icon--home-white selected"></button>
                            <button className="icon--agendamentos"></button>
                            <button className="icon--pacientes"></button>
                            <button className="icon--financas"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                            <button className="icon--exams"></button>
                        </div>
                    </div>        

                    <button 
                        className="button--sidebar-retract" 
                        onClick={manipulateSidebar}
                    >
                    </button>
                    
                                        
                    {/* DYNAMIC CONTENT - MIOLO*/}
                    <Resume />

                </div>

            </div>
        </div>
    );
}