/*
first way to create the modal effect
all buttons with the same class*/ 
/*
const button = window.document.querySelectorAll(".button");
console.log(button);

//modal overlay div 
const modal_overlay = window.document.querySelector(".modal-overlay");

//modal effect
button.forEach(element => {
    element.addEventListener('click', () => {
        modal_overlay.classList.toggle('active');
    });
});
*/


//MODAL
const buttons = window.document.querySelectorAll(".button");//all buttons
const modal_overlay = window.document.querySelector(".modal-overlay");//modal div
const btn_submit = window.document.getElementById('submit');
//object modal
const modal = {
    openOrClose(){
        modal_overlay.classList.toggle('active');
    }
};

//loop to create the effect
buttons.forEach((btn) => {
    btn.addEventListener('click', modal.openOrClose);
});


//incomeAndExpense - array of objects/inputs
const incomeAndExpense = 
[
    {
        id: 1, 
        description: "Luz",
        amount: -50000,
        date: "23/01/2021",
    },
    {
        id: 2, 
        description: "Website",
        amount: 250000,
        date: "15/01/2021",
    },
    {
        id: 3, 
        description: "Internet",
        amount: -20000,
        date: "26/01/2021",
    },
    {
        id: 4, 
        description: "App",
        amount: 500000,
        date: "30/03/2021",
    }
];

//object transaction 
const transaction = {
    all: incomeAndExpense,
    incomes(){        
        //sum incomes
        let sumIncomes = 0;
        this.all.forEach(element => {
            if(element.amount >= 0){
                sumIncomes += (element.amount);
            }
        });
        return sumIncomes;        
    },

    expenses(){        
        //sum expenses
        let sumExpenses = 0;
        this.all.forEach(element => {
            if(element.amount < 0){
                sumExpenses  += (element.amount);
            }
        });
        return sumExpenses;        
    },

    total(){
        //incomes - expenses        
        let total = 0; 
        total = this.incomes() + this.expenses();
        return total;
    }
};

//object to create html and add to the page
const DOM = {
    //body of the table
    tableBody: 
        window.document.querySelector("#data-table tbody")
    ,

    //add html to the object
    addTransaction(transaction, index){ 
        const tr = window.document.createElement('tr');
        tr.innerHTML = this.innerHTMLTransaction(transaction);
        this.tableBody.appendChild(tr);
    },

    //create and return html
    innerHTMLTransaction(transaction){
        let CSSclass = transaction.amount > 0 ? 'income' : 'expense';
        let formattedValue = Utils.formatCurrency(transaction.amount);

        const html = `
            <td class="description" >${transaction.description}</td>
            <td class='${CSSclass}'>${formattedValue}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Remover" title="Remover"></td>
        `;
        return html;
    },


    updateBalance(){        
        //get incomes, expenses and total 
        window.document.querySelector("#incomeDisplay").innerHTML = Utils.formatCurrency(transaction.incomes());
        window.document.querySelector("#expenseDisplay").innerHTML = Utils.formatCurrency(transaction.expenses());
        window.document.querySelector("#totalDisplay").innerHTML = Utils.formatCurrency(transaction.total());
    }
};

//formatations
const Utils = {
    formatCurrency(value){
        let signal = Number(value) < 0 ? "-" : "";
        value = String(value).replace(/\D/g, "");
        value = Number(value)/100;
        value = value.toLocaleString('pt-BR', {
            style: "currency",
            currency: "BRL"
        });
        return `${signal} ${value}`;
    }
}

//print rows
incomeAndExpense.forEach(element => {
    DOM.addTransaction(element, 0);
});

//update Balance
DOM.updateBalance();

//-------------------------------------------------------------------------------------------
