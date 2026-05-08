<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ponto Eletrônico - Nome da Empresa</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding: 20px; }
        button { padding: 15px 30px; font-size: 18px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>Ponto - Help Rest</h1>
    <input type="text" id="nomeFuncionario" placeholder="Seu Nome Completo"><br><br>
    <button onclick="registrarPonto()">Bater Ponto</button>
    <p id="status"></p>

    <script>
        function registrarPonto() {
            const nome = document.getElementById('nomeFuncionario').value;
            if (!nome) return alert('Digite seu nome!');
            
            navigator.geolocation.getCurrentPosition((pos) => {
                const dados = {
                    nome: nome,
                    data: new Date().toLocaleDateString(),
                    hora: new Date().toLocaleTimeString(),
                    localizacao: `${pos.coords.latitude}, ${pos.coords.longitude}`
                };

                fetch('/bater-ponto', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dados)
                }).then(() => {
                    document.getElementById('status').innerText = "Ponto batido com sucesso!";
                });
            });
        }
    </script>
</body>
</html>
