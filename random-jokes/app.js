const jokeContainer = document.getElementById("joke-list");
const bottomDiv = document.getElementById("bottom");
const reset = document.getElementById("reset");
const pdf = document.getElementById("pdf");
const numOfJokes = 10;
let emailBtns = [];

reset.addEventListener("click", () => { appendJokes() });
pdf.addEventListener("click", () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.classList.add('hide'));
    html2pdf(document.body);
    setTimeout(() => {
        buttons.forEach(button => button.classList.remove('hide'));
    }, 500)
});
appendJokes();

async function generateJokes() {
    let jokeList = [];
    for (let i = 0; i < numOfJokes; i++) {
        const currJoke = await fetch("https://icanhazdadjoke.com/", { headers: { 'Accept': "application/json" } });
        const jokeData = await currJoke.json();
        jokeList.push(jokeData.joke);
    }
    return jokeList;
}

async function appendJokes() {
    jokeContainer.innerHTML = "";
    jokes = await generateJokes();
    bottomDiv.classList.remove("hide");
    for (let i = 0; i < numOfJokes; i++) {
        jokeContainer.innerHTML += `
            <div class="joke">
                <p>${jokes[i]}</p>
                <button class="email">Email to Me</button>
            </div>
        `
    }
    emailBtns = jokeContainer.querySelectorAll(".email");
    linkEmailBtns(emailBtns, jokes);
}

function linkEmailBtns(btns, jokeListToSendJoke) {
    btns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            Email.send({
                Host: "", //smtp server
                Username: "", //smtp server login
                Password: "", //smtp server password
                To: "", // email to 
                From: "", // email from
                Subject: "This is a funny joke!!",
                Body: `${jokeListToSendJoke[i]}`
            }).then(
                message => alert(message)
            );
        })
    })
}
