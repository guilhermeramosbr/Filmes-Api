const pesquisa = document.querySelector('#Pesquisa');
const resultados = document.querySelector('#resultados');

async function procurar() {
    try {
        resultados.innerHTML = 'Carregando...'; // Limpa e exibe mensagem de carregamento

        const termoPesquisa = pesquisa.value;
        const response = await fetch(`http://www.omdbapi.com/?apikey=28d0dee8&s=${encodeURIComponent(termoPesquisa)}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar filmes. Verifique sua conexão.');
        }

        const data = await response.json();

        if (data.Response === "True") {
            resultados.innerHTML = ''; 

            data.Search.forEach(filme => {
                const filmeDiv = document.createElement('div');
                filmeDiv.classList.add('filme'); // Adiciona uma classe para estilização

                const imagem = document.createElement('img');
                imagem.src = filme.Poster;
                imagem.alt = filme.Title;

                const titulo = document.createElement('h2');
                titulo.textContent = filme.Title;

                filmeDiv.appendChild(imagem);
                filmeDiv.appendChild(titulo);
                resultados.appendChild(filmeDiv);
            });
        } else {
            resultados.innerHTML = data.Error; 
        }

    } catch (error) {
        resultados.innerHTML = error.message; 
    }
}