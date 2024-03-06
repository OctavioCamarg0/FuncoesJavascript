// Verifica se há dados de usuários armazenados no localStorage
// Se não houver, usa os dados de usuários padrão
var usuarios = [
    { nomeusuario: "user1", senha: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4", email: "user1@example.com" },
    { nomeusuario: "user2", senha: "fe2592b42a727e977f055947385b709cc82b16b9a87f88c6abf3900d65d0cdc3", email: "user2@example.com" },
];
async function validaFrmLogin() {
    var usuarioInformado = document.getElementById("txtNomeUsuario").value;
    var senhaInformada = document.getElementById("txtSenha").value;

    // Criptografa a senha
    /*
    //Aqui, estamos criando uma nova instância do objeto TextEncoder. 
    Este objeto é usado para converter strings em sequências de bytes 
    usando uma determinada codificação (nesse caso, provavelmente UTF-8).
    */
    const encoder = new TextEncoder(); 

    /*
    //Usamos o método encode() do TextEncoder para converter a string 
    senhaInformada em uma matriz de bytes, que é armazenada na constante data.
    */
    const data = encoder.encode(senhaInformada); 

    /*
    // Utilizamos a API crypto.subtle.digest() para gerar um hash criptográfico 
    da matriz de bytes data. Neste caso, o algoritmo de hash usado é SHA-256. 
    O resultado é armazenado em um buffer, que é uma representação binária do hash.
    */
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); 

    /*
    Convertendo o hashBuffer (que é uma matriz de bytes) em uma matriz de números 
    inteiros de 8 bits sem sinal (Uint8Array) e, em seguida, 
    convertendo isso para um array JavaScript com o método Array.from(). Isso é feito para poder manipular facilmente os bytes do hash.
    */
    const hashArray = Array.from(new Uint8Array(hashBuffer)); 

    /*
    Estamos mapeando cada byte do hash para uma representação hexadecimal, 
    convertendo cada byte em uma string hexadecimal de dois caracteres usando 
    toString(16), garantindo que cada string tenha pelo menos dois caracteres 
    com padStart(2, '0'), e depois juntando todas as strings hexadecimal para 
    formar a senha criptografada.
    */
    const senhaCriptografada = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
       
    // Verifica se o usuário e senha correspondem a um registro na matriz
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarioInformado === usuarios[i].nomeusuario && senhaCriptografada === usuarios[i].senha) {
            alert("Login bem-sucedido!");
            return true;
        }
    }
    
    // Se não corresponder, exibe uma mensagem de erro
    alert("Usuário ou senha inválidos. Tente novamente.");
    return false;
}

async function validafrmCadastroUsuario() {
    var usuarioInformado = document.getElementById("txtNomeUsuario").value;
    var emailInformado = document.getElementById("txtEmail").value;
    var senhaInformada = document.getElementById("txtSenha").value;
    var confirmacaoSenhaInformada = document.getElementById("txtConfirmacaoSenha").value;

    // Verifica se as senhas coincidem
    if (senhaInformada !== confirmacaoSenhaInformada) {
        alert("As senhas não coincidem. Por favor, tente novamente.");
        return false;
    }

    // Criptografa a senha
    const encoder = new TextEncoder();
    const data = encoder.encode(senhaInformada);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const senhaCriptografada = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // Adiciona os dados do novo usuário à matriz
    var newUsuario = ({ nomeusuario: usuarioInformado, senha: senhaCriptografada, email: emailInformado });

    // Se tudo estiver correto, exibe uma mensagem de sucesso
    alert("Cadastro realizado com sucesso!");
    return true
}