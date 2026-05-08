const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// COLA AQUI O QUE COPIASTE DO SUPABASE
const supabaseUrl = 'AQUI_COLA_A_TUA_URL'; 
const supabaseKey = 'AQUI_COLA_A_TUA_PUBLISHABLE_KEY'; 

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());
app.use(express.static('public'));

app.post('/bater-ponto', async (req, res) => {
    const { nome, data, hora, localizacao } = req.body;
    const { error } = await supabase
        .from('registros')
        .insert([{ nome, data, hora, localizacao }]);

    if (error) return res.status(500).json(error);
    res.status(200).json({ status: 'OK' });
});

app.listen(port, () => console.log('Servidor ativo'));
