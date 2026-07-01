describe('/livros POST', () => {

  before(() => {
    cy.dropCollection('livros', { database: 'test', failSilently: 'true' }).then(result => {
      cy.log(result);
    })
  })

  it('Deve cadastrar um novo livro', () => {

    const livro = ({
      "titulo": "O Senhor dos Anéis: A Sociedade do Anel",
      "autor": "J.R.R. Tolkien",
      "editora": "HarperCollins",
      "anoPublicacao": 1954,
      "numeroPaginas": 424
    });

    cy.postLivro(livro).then((response) => {
      expect(response.status).to.eql(201)
      cy.log(JSON.stringify(response.body))

      expect(response.body.titulo).to.eql(livro.titulo)
      expect(response.body.autor).to.eql(livro.autor)
      expect(response.body.editora).to.eql(livro.editora)
      expect(response.body.anoPublicacao).to.eql(livro.anoPublicacao)
      expect(response.body.numeroPaginas).to.eql(livro.numeroPaginas)
      expect(response.body._id).to.not.be.empty
    })
  })

  it('Não deve cadastrar livro duplicado', () => {

    const livro = ({
      "titulo": "1984",
      "autor": "George Orwell",
      "editora": "Companhia das Letras",
      "anoPublicacao": 1949,
      "numeroPaginas": 416
    });

    cy.postLivro(livro).then((response) => {
      expect(response.status).to.eql(201)
    })
    cy.postLivro(livro).then((response) => {
      expect(response.status).to.eql(409)
      expect(response.body.erro).to.eql("Este livro (mesmo título e autor) já existe")

    })


  })
})

Cypress.Commands.add('postLivro', (livro) => {
  cy.api({
    url: 'http://localhost:50000/api/livros/',
    method: 'POST',
    body: livro,
    failOnStatusCode: false
  }).then((response) => {
    return response
  })
})