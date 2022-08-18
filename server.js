import express from "express";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

const server = express();

server.get("/logoMaya", function (req, res) {
  res.sendFile("logoMaya.jpeg", { root: "." });
});

server.get("/", (req, res) => {
  const app = createSSRApp({
    data: () => ({
      logoMaya:
        "https://mayatecsaude.com/assets/images/logo-horizontal-verde.svg",
      nome: "Márcia Carvalho",
      funcao: "Técnica de enfermagem",
      resumo:
        "Técnica de enfermagem com experiência hospitalr e atendimento domiciliar em empresa de home care. Cuida de idosos com dependências parcial e total",

      imagem:
        "https://maya-homo-directus.paas.node10.de.vix.br/assets/d4a46998-23a6-48ee-b52b-cc20309968b7?width=150&height=150&fit=cover&quality=100",
    }),
    template: ` 
      <table>
        <tr>
          <th rowspan="4"><img class="img-avatar" :src="imagem" ></th>
          <td><img class="img-logo" :src="logoMaya"></td>
        </tr>
        <tr>
          <td style="text-align: right; ">{{ nome }}</td>
        </tr>
        <tr>
          <td style="text-align: right; ">{{ funcao }}</td>
        </tr>
        <tr>
          <td style="text-align: right; ">{{ resumo }}</td>
        </tr>
      </table>
    `,
  });

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <style>
        .img-logo {
          margin-left: 0;
          width: 150px;
          height: 30px;
          margin-top: -4px;
        }
        .img-avatar {
          margin-left: 0;
          width: 150px;
          height: 150px;
          margin-top: 0px;
        }
      </style>
      <body>
      <div id="app" style="background-color: #ABBAEA; " >${html}</div>
        
        </body>
    </html>
    `);
  });
});

server.listen(3000, () => {
  console.log("ready");
});
