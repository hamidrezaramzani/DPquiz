let answers = [];
let questions = [];
let index = 0;
let correctAnswers = 0;
let currentQuestion = {};

if (localStorage.getItem("questions")) {
    questions = JSON.parse(localStorage.getItem("questions"));
    currentQuestion = questions[0];
}


export const questionWriting = (e) => {
    const value = e.target.value.trim();
    if (!value) {
        document.getElementById("submit-questions").setAttribute("disabled", "true");
    } else {
        document.getElementById("submit-questions").removeAttribute("disabled");
    }

};

export const goToSecondForm = (e) => {
    e.preventDefault();
    document.getElementById("first").classList.add("none");
    document.getElementById("second").classList.remove("none");
};

export const backToQuestionForm = (e) => {
    e.preventDefault();
    document.getElementById("second").classList.add("none");
    document.getElementById("first").classList.remove("none");
};

export const addAnswer = () => {
    const title = document.getElementById("answer").value.trim();
    const isCorrect = document.getElementById("is-correct").checked;

    if (!title) {
        alert("فیلد جواب خالی است");
        return;
    }
    if (answers.find(item => item.isCorrect == true) && isCorrect) {
        alert("قبلا یک جواب به عنوان جواب درست انتخاب شده است.");
        return;
    }
    if (answers.length >= 4) {
        alert("حداکثر میتواند 4 جواب داشته باشد");
        return;
    }

    if (answers.length == 3 && !answers.find(item => item.isCorrect == true) && isCorrect != true) {
        alert("یک جواب باید به عنوان جواب درست انتخاب شده باشد");
        return;
    }

    addData();


};

const addData = () => {
    const title = document.getElementById("answer").value.trim();
    const isCorrect = document.getElementById("is-correct").checked;
    const id = answers.length ? answers[answers.length - 1].id + 1 : 1;
    answers.push({
        id,
        title, isCorrect
    });
    renderItems();
};

const renderItems = () => {
    let tr;
    for (let index = 0; index < answers.length; index++) {
        const element = answers[index];
        tr = document.createElement("tr");
        tr.id = "answer_item_" + element.id;
        const id = document.createElement("td");
        const titleTd = document.createElement("td");
        const isCorrectTd = document.createElement("td");
        const manageTd = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.innerText = "حذف";
        removeButton.onclick = () => removeItem(element.id);
        removeButton.type = "button";
        id.innerText = element.id;
        titleTd.innerText = element.title;
        isCorrectTd.innerText = element.isCorrect ? "بله" : "خیر";
        manageTd.appendChild(removeButton);
        tr.appendChild(id);
        tr.appendChild(titleTd);
        tr.appendChild(isCorrectTd);
        tr.appendChild(manageTd);

    }
    document.getElementById("tbody").appendChild(tr);
};

const removeItem = (id) => {
    answers = answers.filter(item => item.id != id);
    document.getElementById("answer_item_" + id).remove();
};

export const createQuiz = async (e) => {
    e.preventDefault();
    if (answers.length < 4) {
        alert("باید 4 جواب انتخاب کنید");
    } else {
        const data = new FormData();
        const question = document.getElementById("question").value.trim();
        const picture = document.getElementById("picture").files[0];
        data.append("question", question);
        data.append("picture", picture);
        data.append("answers", JSON.stringify(answers));
        await fetch("http://localhost:5000/api/v1/quiz/add-quiz", {
            method: "POST",
            body: data
        });
        alert("سوال با موفقیت افزوده  شد");
        location.href = "/";
    }
};

export const checkPictureIsValid = (e) => {
    const file = e.target.files[0];
    const format = file.name.split(".")[1].toLowerCase();
    const SUPPORTED_FORMATS = ["jpg", "png", "jpeg", "gif"];
    if (!SUPPORTED_FORMATS.includes(format)) {
        alert("لطفا یک عکس انتخاب کنید");
        e.target.value = null;
    }
};



export const setCurrectQuestion = (question) => {
    const ids = ["first", "second", "third", "fourth"];
    document.getElementById("question-lable").innerText = question.question;
    const answers = question.answers;
    ids.forEach((item, index) => {
        if (question.picture) {
            document.getElementById("picture").style.display = "block";
            document.getElementById("picture").src = 'http://localhost:5000/public/pictures/' + question.picture;

        }
        else
            document.getElementById("picture").style.display = "none";


        document.getElementById(item + "-" + "lable").innerText = answers[index].title;
        document.getElementById(item).value = answers[index].id;
    });

};


export const nextQuestion = () => {
    const checkedInput = document.querySelector("input[type=radio]:checked");

    if (checkedInput) {
        const value = checkedInput.value;
        const answers = currentQuestion.answers;
        for (const key in answers) {
            if (answers[key].isCorrect && value == answers[key].id)
                correctAnswers += 1;
        }
        let questionLength = questions.length;
        if (index == questionLength - 1) {
            alert(`
                تمام شد
                جواب های درست:${correctAnswers}
                جواب های اشتباه: ${questionLength - correctAnswers}
            `);
            location.href = "/";
        }
        index += 1;
        currentQuestion = questions[index];
        checkedInput.checked = false;
        setCurrectQuestion(currentQuestion);

    } else {
        alert("گزینه خود را انتخاب کنید");
    }

};