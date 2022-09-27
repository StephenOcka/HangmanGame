/*Variables*/
const defaultWords = ["Esquiador", "Anciano", "Palmada", "Torta", "Celebración", "Podrido", "Torpedo", "Navidad", "Italiana", "Bonito", "Sastre", "Pueblo", "Plaqueta", "Cosechar", "Hueco", "Idea", "Ovillo", "Torneo", "Amenazar", "Marioneta", "Recta", "Peso", "Cliente", "Tierra", "Licor", "Casa", "Fritas", "Doble", "Zurdo", "Volante", "Radio", "Tres", "Nacional", "Armadura", "Esfera", "Nasa", "Animar", "Cuero", "Adelgazar", "Loro", "Moneda", "Pupila", "Almohada", "Tapiz", "Tallarines", "Carretera", "Billete", "Tinta", "Dividir", "Prisma", "Grieta", "Mosquito", "Inesperada", "Bate", "Fotografiar", "Romper", "Mar", "Esgrima", "Alumnos", "Reflector", "Desertar", "Capturar", "Saludar", "Comida", "Arrastrar", "Pis", "Motocicleta", "Africano", "Peste", "Secuestrar", "Perrera", "Cobarde", "Maullido", "Algarrobo", "Citar", "Espiral", "Jarabe", "Tanga", "Búho", "Libro", "Esmalte", "Paciente", "Payaso", "Preso", "Enhebrar", "Barrotes", "Alhajas", "Conversación", "Sobretodo", "Lava", "Cíclope", "Inodoro", "Alpiste", "Ley", "Aparatos", "Tabla", "Tijeras", "Despierto", "Hormonas"];
const body = document.body,
    screen = document.getElementById("canvas"),
    draw = screen.getContext("2d"),
    changeView = document.getElementById("changeView"),
    alura = document.getElementById("alura"),
    docElem = document.documentElement,
    add = document.getElementById("add"),
    init = document.getElementById("init"),
    canvas = document.getElementById("canvas"),
    refresh = document.getElementById("refresh"),
    addWord = document.getElementById("addWord"),
    resign = document.getElementById("resign"),
    conteiner = document.getElementById("wordSection"),
    conteinerAttempt = document.getElementById("trySection"),
    author = document.getElementById("author"),
    gameOver = document.getElementById("gameOver"),
    dontWord = document.getElementById("dontWord"),
    viewAttempts = document.getElementById("viewTry"),
    viewTypeWords = document.getElementById("viewTypeWord");
const color = {
    day: "#E8EAEE",
    dayHigh: "#E5E5E5",
    night: "#292736",
    nightHigh: "#29273D",
    nightLight: "#CCC",
    grey: "#DDD",
    black: "#000",
    green: "#0F0",
    red: "#F00"
    },
    img = {
        ChangeView: ["url(../Img/Day.png)", "url(../Img/Night.png)"],
        Alura: ["../Img/LogoAlura.png", "../Img/LogoAluraLight.png"],
        Refresh: ["url(../Img/RetryDay.png)", "url(../Img/RetryNight.png)"],
        Author: ["url(../Img/AuthorDay.png)", "url(../Img/AuthorNight.png)"],
        AddWord: ["url(../Img/addWordDay.png)", "url(../Img/addWordNight.png)"],
        Hanged: ["url(../Img/Hanged.png)","url(../Img/HangedGameOver.png)"],
        Attempt: ["url(../Img/ErrorAttempt.png)"]
    },
    varCss = {
        btns: ["--colorButton", "--colorButtonBorder"],
        input: ["--colorInputBorder"],
        author: ["--imageAuthor"]
    }
let positionX = 0,
    positionY = 0,
    heightPorcentDeft = 0.15,
    heightPorcent = heightPorcentDeft,
    actualLetter,
    word,
    change = true,
    userWords = [],
    verificated,
    attempts = 0,
    maxAttempts = 7,
    letterPress = [],
    verifyGameOver=false,
    typeWord,
    showInformation = true,
    userOrDefaultWord;
/*Changes Colors*/
function view() {
    change = change ? false : true;
    body.style.backgroundColor = change ? color.day : color.night;
    changeView.style.backgroundImage = change ? img.ChangeView[0] : img.ChangeView[1];
    alura.src = change ? img.Alura[0] : img.Alura[1];
    refresh.style.backgroundImage = change ? img.Refresh[0] : img.Refresh[1];
    addWord.style.backgroundImage = change ? img.AddWord[0] : img.AddWord[1];
    author.style.backgroundImage = change ? img.Author[0] : img.Author[1];
    author.style.borderColor = change ? color.night : color.day;
    docElem.style.setProperty(varCss.author, change ? img.Author[0] : img.Author[1]);
    docElem.style.setProperty(varCss.btns[0], change ? color.dayHigh : color.nightHigh);
    docElem.style.setProperty(varCss.btns[1], change ? color.nightHigh : color.dayHigh);
    docElem.style.setProperty(varCss.input[0], change ? color.nightHigh : color.dayHigh);
    canvas.style.backgroundColor = change ? color.day : color.nightLight;
    drwSuperior();
    changeColorText();
}
/*Reset Variables*/
function resetVariables() {
    positionX = 0;
    positionY = 0;
    heightPorcent = heightPorcentDeft;
    actualLetter ="";
    word = ""
    letterPress = [];
    attempts = 0;
    verifyGameOver=false;
    dontWord.textContent = "";
    resign.disabled = false;
    viewAttempts.style.display = "none";
}
/*Author*/
function authorShow() {
    Swal.fire({
        title: "Esteban Padilla",
        footer: `<a href="https://github.com/StephenOcka" style="color:${color.day}">Github/StephenOcka</a>`,
        heightAuto: false,
        showClass: {
            popup: "animate__animated animate__fadeInDown"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutUp"
        }
    })
}
/*Instruction*/
function information() {
    Swal.fire({
        icon: 'info',
        title: 'Presiona una tecla para jugar',
        text: '(despues de cerrar este mensaje, claro...)',
        heightAuto: false,
        background: color.grey,
        color: color.black,
        confirmButtonColor: "deepskyblue"
      })
      showInformation = false;
}
/*Select Type Word*/
async function requestVerifyWord() {
    try {
        resetVariables();
        typeWord = await selectTypeWord();
        console.log(typeWord)
        return typeWord ? verifiWord() : play();
    } catch (e) {
        console.log(e);
    }
}
async function selectTypeWord() {
    const inputOptions = new Promise(
        (resolve) => {
            setTimeout(() => {
                resolve({
                    "true": "Mis palabras",
                    "false": "Palabra al azar",
                })
            }, 500)
        })
    const { value: wordSelect } = await Swal.fire({
        title: "¿Cuál quieres jugar?",
        background: color.grey,
        color: color.black,
        heightAuto: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: "deeppink",
        input: "radio",
        inputOptions: inputOptions,
        inputAttributes: {
            backgroundColor: color.grey,
            color: color.black
        },
        inputValidator: (value) => {
            if (!value) {
                return "Selecciona una opción."
            }
        }
    })
    return wordSelect == "true" ? true : false;
}
/*verify User Words*/
async function verifiWord() {
    try {
        const aggregateWord = await requestAddWord();
        const beforeVerify = await beforeVerifyWord(aggregateWord);
        if (userWords.length != 0 && beforeVerify && verificated) {
            play();
        }
    } catch (e) {
        console.log(e);
    }
}
async function requestAddWord() {
    const aggregateWord = await Swal.fire({
        heightAuto: false,
        title: "Agrega tu palabra",
        input: "text",
        inputLabel: `No acepta caracteres especiales.
        Máximo de 45 letras.`,
        inputPlaceholder: 'Ingresa una palabra',
        inputAttributes: {
            autocapitalize: 'characters',
            autocorrect: 'off',
            maxlength: 45,
            onkeypress: "return character(event)"
        },
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        background: color.grey,
        color: color.black,
        heightAuto: false,
        inputValidator: (value) => {
            if (!value) {
                return 'Escribe una palabra.';
            }
        }
    })
    if (aggregateWord.isConfirmed) {
        verificated = true;
        confirmedAddWord();
        return aggregateWord.value;
    } else {
        verificated = false;
    }
}
function confirmedAddWord(){
    Swal.fire({
        heightAuto: false,
        position: 'top-end',
        icon: 'success',
        title: 'Palabra agregada',
        showConfirmButton: false,
        background: color.grey,
        color: color.black,
        timer: 1500
      })
}
function character(e) {
    let key = (document.all) ? e.keyCode : e.which,
        letter = /[A-Za-z]/,
        keyPress = String.fromCharCode(key);
    return letter.test(keyPress) ? uperCase(e, key) : false;
}
function uperCase(e, key) {
    if ((key >= 97) && (key <= 122)) {
        let newChar = key - 32,
            start = e.target.selectionStart,
            end = e.target.selectionEnd;
        e.target.value = e.target.value.substring(0, start) + String.fromCharCode(newChar) + e.target.value.substring(end);
        e.target.setSelectionRange(start + 1, start + 1);
        e.preventDefault();
    }
}
function beforeVerifyWord(aggregateWord) {
    try {
        userWords.push(aggregateWord);
        userWords = userWords.filter((item) => item !== undefined);
        return true;
    } catch (e) {
        return false;
    }
}
/*Play*/
function play() {
    if (showInformation){
        information();
    }
    restartImgCanvas();
    resetVariables();
    viewStyle();
    wordSection();
    trySection();
    listen();
}
function restartImgCanvas() {
    if (screen.style.backgroundImage = img.Hanged[1]) {
        screen.style.backgroundImage = img.Hanged[0];
    }
}
function viewStyle() {
    add.style.display = "none";
    init.style.display = "none";
    canvas.style.display = "inline";
    refresh.style.display = "inline";
    addWord.style.display = "inline";
    resign.style.display = "inline";
    hanged();
}
function hanged() {
    let img = new Image(),
        imgHeight = (0.95 * screen.height),
        imgWidth = (0.4 * imgHeight),
        posX = ((screen.width - imgWidth) / 2),
        posY = ((screen.height - imgHeight) / 2);
    img.onload = function () {
        draw.drawImage(img, posX, posY, imgWidth, imgHeight);
    }
    drwSuperior();
}
function drwSuperior() {
    draw.fillStyle = change ? color.day : color.nightLight;
    draw.fillRect(positionX, positionY, screen.width, screen.height);
}
function wordSection() {
    generateWord();
    if (conteiner.length != 0) {
        removeAllChildNodes(conteiner);
    }
    for (let x = 1; x <= word.length; x++) {
        let newElement = document.createElement("input");
        with (newElement) {
            value = word[x - 1];
            type = "text";
            className = "letter";
        }
        conteiner.appendChild(newElement);
    }
}
function generateWord() {
    words = verificated ? userWords : defaultWords;
    userOrDefaultWord = verificated ? "user" : "default";
    if (words.length > 0) {
        let wordGenerate = words[Math.floor(Math.random() * words.length)].toUpperCase();
        word = wordGenerate;
    }
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function listen() {
    document.addEventListener('keydown', (e) => {
        if(verifyGameOver || attempts >= maxAttempts){
            return false;
        } else {
            let keyValue = e.key;
            keyValue = keyValue.toUpperCase();
            let search = word.indexOf(keyValue);
            if ((e.which > 64 &&  e.which < 91)) {
                e.stopImmediatePropagation();
                if (search >= 0) {
                    for (let i = 0; i < word.length; i++) {
                        let child = word[i];
                        if (child == keyValue) {
                            conteiner.childNodes[i].nodeValue = child;
                            actualLetter = conteiner.childNodes[i];
                            if (letterPress.indexOf(keyValue) < 0) {
                                letterPress.push(keyValue);
                            }
                            colorLetter(actualLetter, color.black, color.green, 2000);
                            verifyWin(letterPress, word);
                        }
                    }
                }
                if ((search < 0) && (dontWord.textContent.indexOf(keyValue) < 0)) {
                    let canvasWidth = screen.width,
                        canvasHeight = screen.height,
                        radius = 7;
                    clearCanvas(positionX, positionY, canvasWidth, canvasHeight, heightPorcent, draw, radius);
                    positionY = (heightPorcent * canvasHeight) + 2.5;
                    heightPorcent += heightPorcentDeft;
                    errorAttempt();
                    viewDontWord(keyValue);
                } else if(dontWord.textContent.indexOf(keyValue) >= 0){
                    console.log(dontWord)
                    console.log(dontWord.textContent)
                    Swal.fire({
                        heightAuto: false,
                        title: `La letra '${keyValue}' ya la probaste y no está.`,
                        background: color.grey,
                        color: color.black,
                        confirmButtonColor: "Orange"
                    });
                }
            }
        }
    }, false);
}
function colorLetter(parameter, colorText, colorBg, intervalMs) {
    parameter.style.color = colorText;
    parameter.style.backgroundColor = colorBg;
    setTimeout(() => { changeColorText() }, intervalMs);
}
function clearCanvas(posX, posY, maxWidth, maxHeight, heightPorcent, context, radius) {
    heightPorcent = (heightPorcent * maxHeight);
    let increment = (0.8 * radius);
    let m = setInterval(() => {
        if (posY > maxHeight) {
            clearInterval(m);
            finishGame();
        }
        for (let count = 0; count < 1; count++) {
            if (posY > heightPorcent) {
                clearInterval(m);
                break;
            }
            clearCircle(context, posX, posY, radius)
            posX = posX + increment;
            if (posX > maxWidth) {
                increment = increment * (-1);
                posY = posY + (0.9 * radius);
            } else if (posX < 0) {
                increment = increment * (-1);
                posY = posY + (0.9 * radius);
            }
        }
    }, 0);
}
function clearCircle(context, x, y, radius) {
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, true);
    context.clip();
    context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    context.restore();
}
function changeColorText() {
    let i, j, pV, lP, parameter;
    let border = change ? color.nightHigh : color.dayHigh,
        text = change ? color.nightHigh : color.dayHigh,
        bg = change ? color.day : color.night;
    for (i = 0; i < letterPress.length; i++) {
        lP = letterPress[i];
        for (j = 0; j < word.length; j++) {
            pV = conteiner.childNodes[j].value;
            parameter = conteiner.childNodes[j];
            if (pV == lP) {
                parameter.style.color = text;
                parameter.style.backgroundColor = bg;
                parameter.style.borderColor = border;
            }
        }
    }
}
/*Refresh Game - Change word*/
function refreshGame() {
    positionX = 0;
    positionY = 0;
    heightPorcent = heightPorcentDeft;
    gameOver.style.display = "none"
    drwSuperior();
    play();
}
/*Resign*/
function resignGame() {
    clearCanvas(positionX, positionY, screen.width, screen.height, 1, draw, screen.width);
}
/*Game Over*/
function finishGame() {
    canvas.style.backgroundImage = "url(../Img/HangedGameOver.png)";
    gameOver.style.display = "inline"
    viewMissingLetters();
    verifyGameOver = true;
}
function viewMissingLetters() {
    for(let i = 0; i < word.length; i++) {
        let search = letterPress.indexOf(word[i]);
        actualLetter = conteiner.childNodes[i];
        if (search < 0) {
            colorLetter(actualLetter, color.black, color.red, 2000);
        }
    }
}
/*Attempts*/
function trySection() {
    if (conteinerAttempt.length != 0) {
        removeAllChildNodes(conteinerAttempt);
    }
    for (let x = 1; x <= maxAttempts; x++) {
        let newElement = document.createElement("input");
        with (newElement) {
            type = "button"
            className = "attempt";
        }
        conteinerAttempt.appendChild(newElement);
    }
}
function errorAttempt() {
    viewAttempts.style.display = "inline"
    parameter = conteinerAttempt.childNodes[attempts];
    parameter.style.backgroundImage = img.Attempt[0];
    attempts += 1;
    viewAttempts.textContent = viewTrys();
    if(maxAttempts - attempts > 4) {
        viewAttempts.style.color= "#5D5";
    } else if (maxAttempts - attempts > 2) {
        viewAttempts.style.color= "#FA4";
    } else if (maxAttempts - attempts > 0) {
        viewAttempts.style.color= "#F00";
    } else {
        viewAttempts.style.color= "#000";
    }
}
function viewDontWord(letter) {
    console.log(dontWord)
    if (dontWord.textContent  == "") {
        dontWord.innerHTML = letter;
    } else {
        dontWord.innerHTML += "<br>" + letter;
    }
}
function viewTrys() {
    return `Intentos: ${maxAttempts - attempts}`;
}
/*Verificated Win*/
function verifyWin(letterPress, word) {
    let confirmation = true;
    for (let i = 0; i < word.length; i++)
    {
        if (letterPress.indexOf(word[i]) < 0) {
            confirmation = false;
            break;
        }
    }
    if (confirmation)
    {
        Swal.fire({
            icon: 'success',
            title: 'Felicidades! Has ganado!',
            heightAuto: false,
            background: color.grey,
            color: color.black,
            confirmButtonColor: "green"
          })
          resign.disabled = true;
    }
}
/*Change Type Word*/
function changeTypeWord() {
    if (userOrDefaultWord == "user") {
        verificated = false;
        play();
    } else {
        verificated = true;
        play();
    }
    
}