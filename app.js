function calcularTaxaMetabolica() {
    const idade = parseInt(document.getElementById('idade').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const generoMasculino = document.getElementById('masculino');
    const generoFeminino = document.getElementById('feminino');

    const resultadoElemento = document.getElementById('resultado');
    resultadoElemento.innerHTML = ''; // Limpar resultados anteriores

    if (!idade || !peso || !altura || (!generoMasculino.checked && !generoFeminino.checked)) {
        // Exibir aviso se algum campo estiver vazio
        resultadoElemento.innerHTML = '<p>Preencha todos os campos antes de calcular.</p>';
        return;
    }

    let taxaMetabolica;
    let ingestaoAgua;
    let caloriasParaPerderPeso;
    let gramasCarboidratos;

    if (generoMasculino.checked) {
        taxaMetabolica = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else if (generoFeminino.checked) {
        taxaMetabolica = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }

    ingestaoAgua = peso * 0.033;
    caloriasParaPerderPeso = taxaMetabolica - 500;
    gramasCarboidratos = caloriasParaPerderPeso / 4;

    // Novos cálculos: Diferença para ganho/perda de peso
    const pesoAtual = 500; // Suponha que 500 calorias foram consumidas
    const diferencaParaPerderPeso = caloriasParaPerderPeso - pesoAtual;
    const diferencaParaGanharPeso = taxaMetabolica + 500;

    resultadoElemento.innerHTML = `
        <p>Sua taxa metabólica basal é aproximadamente ${taxaMetabolica.toFixed(2)} calorias por dia.</p>
        <p>Você precisa beber cerca de ${ingestaoAgua.toFixed(2)} litros de água por dia.</p>
        <p>Para perder peso, você precisa consumir aproximadamente ${caloriasParaPerderPeso.toFixed(2)} calorias por dia.</p>
        <p>Isso equivale a cerca de ${gramasCarboidratos.toFixed(2)}g de carboidratos diariamente.</p>
        <p>Faltam ${diferencaParaPerderPeso.toFixed(2)} calorias para atingir a meta de perda de peso.</p>
        <p>Você precisa consumir aproximadamente ${diferencaParaGanharPeso.toFixed(2)} calorias por dia para ganhar peso.</p>
    `;

    // Mostrar dieta saudável para ganho e perda de peso
    if (diferencaParaGanharPeso > 0) {
        resultadoElemento.innerHTML += `<h3>Dieta para ganho de peso:</h3>
        <p>Exemplos de alimentos: Abacate, Frutas secas, Batata-doce, Aveia, Carne vermelha, etc.</p>`;
    } else if (diferencaParaPerderPeso > 0) {
        resultadoElemento.innerHTML += `<h3>Dieta para perda de peso:</h3>
        <p>Exemplos de alimentos: Vegetais, Frutas, Grãos integrais, Peito de frango, Peixes, etc.</p>`;
    }
}

function alternarModo() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Verificar se o modo escuro está ativo e salvar essa preferência (opcional)
    const modoEscuroAtivo = body.classList.contains('dark-mode');
    localStorage.setItem('modoEscuro', modoEscuroAtivo);
}

const toggleBtn = document.getElementById('toggle-mode');
toggleBtn.addEventListener('click', alternarModo);

const modoEscuroSalvo = localStorage.getItem('modoEscuro');
if (modoEscuroSalvo && modoEscuroSalvo === 'true') {
    document.body.classList.add('dark-mode');
}
