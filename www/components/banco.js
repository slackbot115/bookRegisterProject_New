// This is a JavaScript file

var lastTitle, lastAutor, lastYear, lastISBN;


$(document).on('click', '#cadastro', function(){
    var parametros = {
      'titulo': $('#titulo').val(),
      'autor': $('#autor').val(),
      'ano': $('#ano').val(),
      'isbm': $('#isbn').val()
    }

    $.post({
      url:'https://livraria-do-ze-luskas8.c9users.io/cadastrar.php',
      data:parametros,
      success:function(data){
        $('#titulo').val('');
        $('#autor').val('');
        $('#ano').val('');
        $('#isbn').val('');
        navigator.notification.alert(data);
        location.reload();
      },
      error:function(data){
        navigator.notification.alert(data);
      }
    });
  });

// funcao listar
function popularSelect(){
  $.ajax({
    type: "post",
    url: 'https://livraria-do-ze-luskas8.c9users.io/listar.php',
    dataType: "json",
    success:function(data){
      var livroLista = "";
      $.each(data.livros, function(i, parametros){
        livroLista += "<option value='" + parametros.codigo + "'>" + parametros.titulo + "</option>";
      });
      $("#listar").html(livroLista);
    },
    error:function(data){
      navigator.notification.alert(data);
    }
  });
};


//funcao que popula os campos

$(document).on("change", "#listar", function(){
  var codigo = $("option:selected", ("#listar")).val();

  $.ajax({
    type: "get",
    url: "https://livraria-do-ze-luskas8.c9users.io/listar-um.php",
    data:"id="+codigo,
    dataType: "json",
    success: function(data){
      $("#code").val(data.livros.codigo);
      $("#title").val(data.livros.titulo);
      $("#writer").val(data.livros.autor);
      $("#year").val(data.livros.ano);
      $("#number").val(data.livros.isbn);
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  });
  
});

// funcao botao editar

$(document).on('click', '#edit', function(){

  if($('#title').length > 0){

    lastTitle = $('#title').val();
    lastAutor = $('#writer').val();
    lastYear =  $('#year').val();
    lastISBN =  $('#number').val();


    $('#title').attr('readonly', false);
    $('#writer').attr('readonly', false);
    $('#year').attr('readonly', false);
    $('#number').attr('readonly', false);  

  }else{
    alert("Why are you trying to edit something that doesn't exist? Like your relationship?");
  }

});

// funcao botao cancelar

$(document).on("click", "#cancel", function(){

  if($('#title')[0].hasAttribute("readonly")){
    alert("It was a mistake, I presume.");
  }else{

    $('#title').val(lastTitle);
    $('#writer').val(lastAutor);
    $('#year').val(lastYear);
    $('#number').val(lastISBN);

    $("#title").attr("readonly", true);
    $("#writer").attr("readonly", true);
    $("#year").attr("readonly", true);
    $("#number").attr("readonly", true);
  }
});