const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xmlbuilder = require('xmlbuilder');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/enviar', (req, res) => {
  const data = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const xml = xmlbuilder.create('actualizacion')
    .ele('codigo_cliente', data.codigo).up()
    .ele('tipo_persona', data.tipo_persona).up()
    .ele('tipo_documento', data.tipo_documento).up()
    .ele('numero_documento', data.numero_documento).up()
    .ele('digito_verificacion', data.digito).up()
    .ele('razon_social', data.razon_social).up()
    .ele('nombre_establecimiento', data.nombre_establecimiento).up()
    .ele('celular', data.celular).up()
    .ele('whatsapp', data.whatsapp).up()
    .ele('direccion', data.direccion).up()
    .ele('barrio', data.barrio).up()
    .ele('estrato', data.estrato).up()
    .ele('telefono_propietario', data.telefono_propietario).up()
    .ele('ip', ip).end({ pretty: true });

  fs.appendFile('respuestas.xml', xml + '\n\n', err => {
    if (err) return res.status(500).send('Error al guardar');
    res.send('<h2>Formulario enviado correctamente</h2><a href="/">Volver</a>');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
