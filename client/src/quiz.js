let answers = [];

export const questionWriting = (e) => {
    const value = e.target.value.trim();
    if (!value) {
        document.getElementById("submit-questions").setAttribute("disabled", "true");
    } else {
        document.getElementById("submit-questions").removeAttribute("disabled")
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
}

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
        tr = document.createElement("tr")
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

export const createQuiz = (e) => {
    e.preventDefault();
    if (answers.length < 4) {
        alert("باید 4 جواب انتخاب کنید")
    } else {
        const data = new FormData();
        const question = document.getElementById("question").value.trim();
        const picture = document.getElementById("picture").files[0];
        data.append("question",question);
        data.append("picture",picture);
        data.append("answers",answers);
        
    }
};