
$(document).ready(function() {
    const listContainer = $("#list-container");
    loadData();
    date();


    $("button").click(addTask);

    $("#input-box").on("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    $("#list-container").on("click", function(event) {
        let target = $(event.target);

        if (target.is("li")) {
            target.toggleClass("check");
        saveData();

        } else if (target.is("span")) {
            target.parent().remove();
        saveData();

        }
    });


    function addTask (){

        let inputValue = $("#input-box").val();
        if (inputValue === '') {
            alert("Você precisa digitar algo!");
        } else {
        // $("#list-container").append("<li>" + inputValue + "</li>");

            // Adicionar a nova tarefa ao contêiner da lista e armazenar a referência para o novo <li>
            let newTask = $("<li></li>").text(inputValue);

            // Criar um novo elemento <span> com o texto "×"
            let span = $("<span></span>").html("\u00d7");

            // Adicionar o <span> ao <li>
            newTask.append(span);

            // Adicionar o novo <li> (com o <span> anexado) ao contêiner da lista
            $("#list-container").append(newTask);

            $("#input-box").val("");
            saveData();

        }
        

    }


    function saveData() {
        let tasks = [];
        $("#list-container li").each(function() {
            let task = {
                text: $(this).text().slice(0, -1), // Remove o "×" do texto
                checked: $(this).hasClass("check")
            };
            tasks.push(task);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }



    function date(){

                /// Criar um novo objeto Date
    let dataAtual = new Date();

    // Obter o dia do mês
    let dia = dataAtual.getDate();

    // Obter o mês (de 0 a 11)
    let mes = dataAtual.getMonth() + 1;

    // Obter o ano
    let ano = dataAtual.getFullYear();

    // Formatando o dia e o mês para ter dois dígitos
    if (dia < 10) {
        dia = '0' + dia;
    }

    if (mes < 10) {
        mes = '0' + mes;
    }

    // Exibir a data no formato DD/MM/AAAA
    let data = ( dia + '/' + mes + '/' + ano);
    console.log(data);

    $(".data").html(data);
 }

    
    function loadData() 
    {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            tasks.forEach(function(task) {
                let newTask = $("<li></li>").text(task.text);
                if (task.checked) {
                    newTask.addClass("check");
                }
                let span = $("<span></span>").html("\u00d7");
                newTask.append(span);
                $("#list-container").append(newTask);
            });
        }
    }
});


// $("#listContainer").on("click", function(event) {
//         let target = $(event.target);

//         if (target.is("li")) {
//             target.toggleClass("checked");
//         } else if (target.is("span")) {
//             target.parent().remove();
//         }
//     });