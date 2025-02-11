// Carrega os horários do armazenamento local ou cria um array vazio
let horariosSalvos = JSON.parse(localStorage.getItem("horariosManicure")) || [];

function carregarTabela() {
    let tabela = document.getElementById("horariosTabela");

    // Se a tabela não for encontrada, não faz nada
    if (!tabela) {
        console.error("Elemento 'horariosTabela' não encontrado.");
        return;
    }

    tabela.innerHTML = ""; // Limpa a tabela antes de recriar os horários

    horariosSalvos.forEach((horario, index) => {
        let linha = document.createElement("tr");

        let colunaDia = document.createElement("td");
        colunaDia.innerText = horario.dia;

        let colunaHorario = document.createElement("td");
        colunaHorario.innerText = horario.hora;

        let colunaSelecionar = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = horario.selecionado;
        checkbox.onchange = () => {
            horariosSalvos[index].selecionado = checkbox.checked;
            salvarHorarios();
        };
        colunaSelecionar.appendChild(checkbox);

        let colunaRemover = document.createElement("td");
        let btnRemover = document.createElement("button");
        btnRemover.innerText = "❌";
        btnRemover.classList.add("remover");
        btnRemover.onclick = () => removerHorario(index);
        colunaRemover.appendChild(btnRemover);

        linha.appendChild(colunaDia);
        linha.appendChild(colunaHorario);
        linha.appendChild(colunaSelecionar);
        linha.appendChild(colunaRemover);
        tabela.appendChild(linha);
    });
}

function adicionarHorario() {
    let dia = document.getElementById("diaSemana").value;
    let hora = document.getElementById("novoHorario").value.trim();

    if (hora === "") {
        alert("Digite um horário válido!");
        return;
    }

    horariosSalvos.push({ dia, hora, selecionado: false });
    salvarHorarios();
    carregarTabela();
}

function removerHorario(index) {
    horariosSalvos.splice(index, 1);
    salvarHorarios();
    carregarTabela();
}

function salvarHorarios() {
    localStorage.setItem("horariosManicure", JSON.stringify(horariosSalvos));
}

// Espera o DOM carregar antes de rodar o JavaScript
document.addEventListener("DOMContentLoaded", () => {
    carregarTabela();
});
