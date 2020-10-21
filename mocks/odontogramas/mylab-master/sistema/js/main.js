var list = [];

function getTotal(){
	var total = 0;
	for (var key in list){
		total += list[key].quantidade * list[key].valor;
	}
	return total;
}

function listaItens(list){
	var resultado = '<thead><tr><th>Produto</th><th>Quantidade</th><th>Preço</th><th>Ações</th></tr></thead><tbody id="conteudo">';
	for (var key in list){
			resultado +='<tr>';
				resultado +='<td>' +list[key].produto+ '</td>';
				resultado +='<td>' +list[key].quantidade+ '</td>';
				resultado +='<td>'  +list[key].valor+  '</td>';
				resultado +='<td> <button type="button" class="btn btn-warning" onclick="editItem('+key+')">Editar</button> <button type="button" class="btn btn-danger" onclick="deleteItem('+key+')">Deletar</button></td>';
			resultado +='</tr>';
	}
	resultado +='<tbody>';
	document.getElementById("tabelaItens").innerHTML = resultado;
	document.getElementById("totalValor").innerHTML = "R$ " + getTotal();
}

function exibeToolbar(){
	document.getElementById("toolbar").style.display = "block";

	document.getElementById("inputIDUpdate").style.display = "none";
	document.getElementById("btSalvar").style.display = "inline-block";
}
function escondeToolbar(){
		document.getElementById("toolbar").style.display = "none";
}

function limpaCampos(){
	document.getElementById("produto").value = "";
	document.getElementById("quantidade").value = "";
	document.getElementById("valor").value = "";
}

function saveList(){
	var produto = document.getElementById("produto").value;
	var quantidade = document.getElementById("quantidade").value;
	var valor = document.getElementById("valor").value;

	list.unshift({"produto": produto, "quantidade": quantidade, "valor": valor});

	escondeToolbar();
		atualizaBanco(list);
	limpaCampos();
	listaItens(list);
	initPaganation();
}

function saveListWS(nome, preco){

		var nomeWS = nome;
		var valorWS = preco;

		console.log(preco);
		console.log(nome);



	list.unshift({"produto": nomeWS, "quantidade": "1", "valor": valorWS});

		atualizaBanco(list);
	limpaCampos();
	listaItens(list);
	initPaganation();

}

function editItem(key){
	exibeToolbar();
	document.getElementById("produto").value = list[key].produto;
	document.getElementById("quantidade").value = list[key].quantidade;
	document.getElementById("valor").value = list[key].valor;

	document.getElementById("btSalvar").style.display = "none";

	var novoBotao = '<button type="button" id="btAtualizar" class="btn btn-default btn-md" onclick="atualizaLista('+key+');"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Atualizar</button>';
	document.getElementById("inputIDUpdate").innerHTML = novoBotao;
	document.getElementById("inputIDUpdate").style.display = "inline";
}
function atualizaLista(key){
	list[key].produto = document.getElementById("produto").value;
	list[key].quantidade = document.getElementById("quantidade").value;
	list[key].valor = document.getElementById("valor").value;


		escondeToolbar();
		atualizaBanco(list);
	limpaCampos();
	listaItens(list);
	initPaganation();
}
function deleteItem(key){
	list.splice(key, 1);
		atualizaBanco(list);
	listaItens(list);
	initPaganation();

}
function deletaLista(){
	if(confirm("Deseja apagar a lista?")){
		list = [];
	}
		atualizaBanco(list);
	listaItens(list);
}


function rodaBanco(){
	var testList = localStorage.getItem("list");

	if(testList){
		//se existirem os dados no Banco
		list = JSON.parse(testList);
		listaItens(list);
	} else {
		//banco limpo
		var jsonStr = JSON.stringify(list);
		localStorage.setItem("list",jsonStr);

		testList = localStorage.getItem("list");

		list = JSON.parse(testList);
		listaItens(list);
	}
}

function atualizaBanco(list){
	var jsonStr = JSON.stringify(list);
		localStorage.setItem("list",jsonStr);
}

rodaBanco();

function initPaganation(){
	pager.init(); 
    pager.showPageNav('pager', 'pageNav'); 
    pager.showPage(1);
}
