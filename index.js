const express = require('express');
const request = require('request');

const app = express()
const port = 3000

require('dotenv').config()

app.get('/', (req, res) => {
    res.send(`    
        <header>
        <h1>${process.env.TITLE_COPY}</h1>
        </header>
        <main>
        <h1>${process.env.SUB_TITLE_COPY}</h1>
        <p>${process.env.BODY_COPY}</p>
        <img src='https://rtek.com.au/content/images/2022/01/frothn-01S.jpg' style='width: 1000px; height: 1052px; object-fit: cover;'/>
        </main>
        <footer>
        <p>${process.env.FOOTER_COPY}</p>
        </footer>
        `)
})

app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
  })

app.get('/surf', (req, res) => {
    const now = new Date()
    const dateFmt = now.toISOString().substring(0,10)

    const regex = /-/g;
    console.log(dateFmt.replace(regex, ''))

    const hr = now.getHours()
    const date = `${now.getFullYear()} : ${now.getUTCMonth()} : ${now.getDate()}`
    const time = `${hr}`

    
    // jsonMapQuery.php?date=20220109&time=11&zoom=12&cont=10&bounds=%28%28-34.10979587398766%2C+151.10809031178002%29%2C+%28-33.953309034703%2C+151.38961496998314%29%29 
    let url = `${process.env.WAVES_API}${process.env.WAVES_API_ENDPOINT}date=${dateFmt}&time=${time}&zoom=12&cont=10&bounds=${process.env.WAVES_API_BOUNDS}`;
    console.log('url', url)

    // res.send(`Hello World! ${url}`)


    request(url, function (err, response, body) {
        if (err) {
            res.json({ waves: null, error: 'Error, please try again' });
        } else {
            let waves = JSON.parse(body);
            console.log(body);
            res.json({ waves: body, error: null });
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
