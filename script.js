const content = document.querySelector(".content");
const selectElement = document.querySelector('select');
const array = [];
let clonedArray = [];

buttonClick();

function buttonClick() {
    selectElement.addEventListener("change", (event) => {
        selectValue = event.target.value;
        handleOption(selectValue);
    })
}


function handleOption(selectValue) {
    removeAllContainers();
    display(selectValue);
    clonedArray = [...array];
    createContainers(selectValue);
}

function createContainers(selectValue) {
    for (let i = 1; i <= selectValue; i++) {
        //
        text("", i);
        //
        const newDiv = document.createElement("div");
        //
        newDiv.className = `container-${i}`;
        newDiv.textContent = `Khách ${i}`;
        //
        inputCheck = createOption(i, selectValue);
        content.appendChild(newDiv);
        newDiv.appendChild(inputCheck);
    }
}



function createOption(customerNumber, selectValue) {
    const numberOption = 5;
    let optionName = 1;
    const divCheck = document.createElement("div");
    divCheck.classList.add(`customer`);
    for (let i = 1 + (customerNumber - 1) * numberOption; i <= customerNumber * numberOption; i++) {
        //
        const inputCheck = document.createElement('input');
        const label = document.createElement('label');
        const br = document.createElement('br');
        //
        inputCheck.classList.add(`checkbox-${i}`);
        inputCheck.setAttribute('type', 'checkbox');
        label.textContent = 'option ' + optionName;
        optionName++;
        //
        divCheck.appendChild(label);
        label.appendChild(inputCheck);
        label.appendChild(br);
        //
        inputCheck.addEventListener("click", () => {
            checkClick(i, selectValue);
        })
    }
    return divCheck;
}


function checkClick(checkboxNumber, selectValue) {
    if (checkBox(checkboxNumber).checked) {
        const optionIndex = checkboxNumber % 5 === 0 ? 5 : checkboxNumber % 5;
        clonedArray[checkboxNumber] = `option ${optionIndex}, `;

    } else {
        clonedArray[checkboxNumber] = "";
    }
    notify(selectValue);
}

function notify(selectValue) {
    let string = "";
    let customer = 1;
    for (let i = 1; i <= selectValue * 5; i++) {
        if (clonedArray[i]) {
            string += clonedArray[i];
        }
        text(string, customer);
        if (i % 5 == 0) {
            customer = 1;
            customer += i / 5;
            string = "";
        }
    }
}

function removeAllContainers() {
    const containers = content.querySelectorAll("[class^='container-']");
    containers.forEach(container => container.remove());
}

function checkBox(checkNumber) {
    return document.querySelector(`.checkbox-${checkNumber}`);
}

function display(numberCustomer) {
    for (let i = 1; i <= 5; i++) {
        const customer = document.querySelector(`.customer-${i}`);
        if (customer)
            customer.style.display = "none";
    }
    for (let i = 1; i <= numberCustomer; i++) {
        const customer = document.querySelector(`.customer-${i}`);
        if (customer)
            customer.style.display = "block";
    }
}

function text(string, customerNumber) {
    string = string.slice(0, -2);
    const customer = document.querySelector(`.customer-${customerNumber}`);
    if (customer) {
        customer.textContent = `Khách ${customerNumber} đã chọn: ` + string;
    }
}