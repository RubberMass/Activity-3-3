const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")
const courses = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server
})

server.get("/", function(req, res) {
    const about = {
        avatar_url:"data:image/png;base64,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",
        role:"Rocketseat",
        description:"Mais do que uma plataforma de educação em tecnologia, somos uma comunidade incrível de programadores em busca do próximo nível.",
        info:'Abaixo a stack das tecnologias usadas pela <a href="https://rocketseat.com.br/starter" target="_blank"class="efeito">Rocketseat</a>',
        empurra: [
            {name:"JavaScritpt"},
            {name:"ES6"},
            {name:"NodeJS"},
            {name:"ReactJS"},
            {name:"React Native"}
            
        ],

        links: [
            {name:"Github", url:"https://github.com/Rocketseat"},
            {name:"Instagram", url:"https://www.instagram.com/rocketseat_oficial/"},
            {name:"Facebook", url:"https://www.facebook.com/rocketseat/"}

        ]

    }

    return res.render("about", {about}) 
})


server.get('/course', function (req, res) {
    return res.render('course.njk')
})

server.get('/course/:id', function (req, res) {
    const id = req.params.id


    const course = courses.find(function (course) {
        return course.id == id
    })


    return res.render('courses', { course})
})



server.get("/conteudo", function(req, res) {
    return res.render("conteudo", {items: videos})
}),



server.listen(5000, function() {
     console.log("server is runing")
})