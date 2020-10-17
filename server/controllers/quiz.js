const Quiz = require('../models/quiz');
const addQuiz = async (req, res) => {
    try {
        const { body, files } = req;
        let name = "";
        if (files) {
            name = Math.ceil(Math.random() * 9999) + files.picture.name;
            files.picture.mv("public/pictures/" + name, (err) => {
                if (err)
                    throw new Error("we have an error");

            });
        }

        const newQuiz = new Quiz({
            question: body.question,
            answers: JSON.parse(body.answers),
            picture: name
        });

        await newQuiz.save();
        res.status(200).json({ messge: 'quiz createdI' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server internal error' });
    }

};



const listQuiz = async (req, res) => {
    try {
        const response = await Quiz.find({});
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server internal error' });
    }

};


module.exports = {
    addQuiz, listQuiz
};