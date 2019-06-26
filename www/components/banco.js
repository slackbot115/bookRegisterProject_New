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
      var livroLista = "<option value='abstract'>Selecionar um Livro</option>";
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

  if($('#title').length > 0 && $("option:selected", ("#listar")).val() != "abstract"){

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

    desabilitaCampos();

  }
});

function desabilitaCampos(){
  $("#title").attr("readonly", true);
  $("#writer").attr("readonly", true);
  $("#year").attr("readonly", true);
  $("#number").attr("readonly", true);
}

//salvar

$(document).on("click", "#save", function(){
  if($('#title')[0].hasAttribute("readonly")){
    alert("It was a mistake, I presume.");
  }else if($('#title').val() == lastTitle && $('#writer').val() == lastAutor && 
           $('#year').val() == lastYear && $('#number').val() == lastISBN){
    alert("The informations given look like the same. There is no use to save 'em.");
    desabilitaCampos();
  }else{
    
    
    var parametros = {
    "codigo": $("#code").val(),
    "titulo": $("#title").val(),
    "autor": $('#writer').val(),
    "ano": $('#year').val(),
    "isbn": $('#number').val()
    }

    $.ajax({
      type: "POST",
      url: "https://livraria-do-ze-luskas8.c9users.io/update.php",
      data:parametros,
      success:function(data){
        navigator.notification.alert(data);
        location.reload();
      },
      error:function(data){
        navigator.notification.alert(data);
      }
    });
  }
});

// deletar

$(document).on("click", "#delete", function(){
  if(confirm("Are you sure you want to delete this book?")){
    $.ajax({
      type: "get",
      url: "https://livraria-do-ze-luskas8.c9users.io/deletar.php",
      data:"codigo="+$("#code").val(),
      success: function(data){
        navigator.notification.alert(data);
        location.reload();
      },
      error:function(data){
        navigator.notification.alert(data);
      }
    })
  }
});