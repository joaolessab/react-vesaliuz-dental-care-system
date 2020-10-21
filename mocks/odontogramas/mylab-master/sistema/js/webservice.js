$.getJSON("http://www.outletclube.com/web_api/products/", function(data) {

    var output="<ul>";
    for (var i in data.Products) 
    {
        if ( i <= 4){
        output+="<li class='produto col-xs-12 col-sm-12 col-md-3'> <a href='#'><img src='" + data.Products[i].Product.ProductImage[0].http  + "' /></a>";

        output+="<p class='nome'> <a href='#'>" + data.Products[i].Product.name  + "</a></p>";

        output+="<p class='preco-antigo'> <a href='#'>" + data.Products[i].Product.price  + "</a></p>";
        output+="<p class='preco-novo'> <a href='#'>" + data.Products[i].Product.promotional_price  + "</a></p>";
        output+="<small class='parcelamento'> <a href='#'>" + data.Products[i].Product.payment_option  + "</a></small>";

        output+="<button type='button' class='btn btn-primary btn-lg btn-success bt-comprar-produto' onclick='openModalquantidade(" + i + ");'>Comprar</button>";

        output+="</li>";
        }
    }
    output+="</ul>";

    $('.produto-vitrine').html(output);
    
});



$.getJSON("http://www.outletclube.com/web_api/products/", function(data) {

    var output3="";
    for (var i in data.Products) 
    {
        output3+="<div><a href='#'><img src='" + data.Products[i].Product.ProductImage[0].http  + "' /></a>";

        output3+="<p class='nome'> <a href='#'>" + data.Products[i].Product.name  + "</a></p>";

        output3+="<p class='preco-antigo'> <a href='#'>" + data.Products[i].Product.price  + "</a></p>";
        output3+="<p class='preco-novo'> <a href='#'>" + data.Products[i].Product.promotional_price  + "</a></p>";
        output3+="<small class='parcelamento'> <a href='#'>" + data.Products[i].Product.payment_option  + "</a></small>";

        output3+="<button type='button' class='btn btn-primary btn-lg btn-success bt-comprar-produto' onclick='openModalquantidade(" + i + ");'>Comprar</button>";
        output3+="</div>"
    }
    output3+="";

    $('#slider').html(output3);
    
});






function openModalquantidade(key){

    $.getJSON("http://www.outletclube.com/web_api/products/", function(data) {

        var nomeWS = data.Products[key].Product.name;
        var precoWS = data.Products[key].Product.promotional_price;

        saveListWS(nomeWS, precoWS);
    });

}


/* SELECIONADOR DE QUANTIDADE VIA MODAL */
/*
function openModalquantidade(key){

    $.getJSON("http://www.outletclube.com/web_api/products/", function(data) {

        $('.modal').modal('show');

        var imgWS = data.Products[key].Product.ProductImage[0].http;
        var nomeWS = data.Products[key].Product.name;

        var precoWS = data.Products[key].Product.promotional_price;

        console.log(precoWS);



        var output2='<div class="add-product">';
           output2+='<img src="' + imgWS + '" />'; 
           output2+='<p class="nome">' + nomeWS + '</p>';
           output2+='<p class="preco-antigo">' + precoWS + '</p>';
           output2+='<p><input type= "text" id="quantidade" name="quantidade" class="form-control text-center" onblur="quantidadeExt();" placeholder="Digite a quantidade"></p>';

           var quantidadeCampo = document.getElementById("quantidade").value;
           console.log(quantidadeCampo);

           output2+='<p><button type="button" class="btn btn-success" data-dismiss="modal" onclick="saveListWS(' + quantidadeCampo +')">Comprar</button></p>';
        output2+='</div>';

        //document.getElementById("modal-body").innerHTML = output2;

        $('#modal-body').html(output2);

    });

}
*/






