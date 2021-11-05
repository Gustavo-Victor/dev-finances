//modal
const buttons = window.document.querySelectorAll(".button");//all buttons
const modal_overlay = window.document.querySelector(".modal-overlay");//modal div
const modal = {
    openOrClose(){
        modal_overlay.classList.toggle('active');
    }
}

//incomeAndExpense - array of objects/inputs - just for testing
const incomeAndExpense = [];

/*keep information*/
const myStorage = {
    get(){
        //return object or an empty array
        return JSON.parse(localStorage.getItem('dev-finances:incomeAndExpense')) || [];
    },
    set(transactions){
        //convert object to string to storage
        localStorage.setItem("dev-finances:incomeAndExpense",JSON.stringify(transactions));
    }
};

//loop to create the effect
buttons.forEach((btn) => {
    btn.addEventListener('click', modal.openOrClose);
});

//object transaction 
const transaction = {
    all: myStorage.get(),

    add(transaction){
        this.all.push(transaction);
        console.log(this.all);
        App.reload();
    },

    remove(index){
        window.alert('Transação removida com sucesso!');
        this.all.splice(index, 1);
        App.reload();
    },

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
        window.document.querySelector("#data-table tbody"),

    //add html to the page
    addTransaction(transaction, index){ 
        const tr = window.document.createElement('tr');
        tr.innerHTML = this.innerHTMLTransaction(transaction, index);
        tr.dataset.index = index;         
        this.tableBody.appendChild(tr);
    },

    //create and return html
    innerHTMLTransaction(transaction, index){
        let CSSclass = transaction.amount > 0 ? 'income' : 'expense';
        let formattedValue = Utils.formatCurrency(transaction.amount);

        const html = `
            <td class="description" >${transaction.description}</td>
            <td class='${CSSclass}'>${formattedValue}</td>
            <td class="date">${transaction.date}</td>
            <td><img onclick='transaction.remove(${index})' src="assets/svg/minus.svg" alt="Remover" title="Remover"></td>
        `;
        return html;
    },

    //update balance
    updateBalance(){        
        //get incomes, expenses and total 
        window.document.querySelector("#incomeDisplay").innerHTML = Utils.formatCurrency(transaction.incomes());
        window.document.querySelector("#expenseDisplay").innerHTML = Utils.formatCurrency(transaction.expenses());
        window.document.querySelector("#totalDisplay").innerHTML = Utils.formatCurrency(transaction.total());
    },

    //clear all transactions (clear table)
    clearTransactions(){
        this.tableBody.innerHTML = '';
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
    },

    formatAmount(value){
        value = Number(value.replace(/\,\./g, "")) * 100;
        console.log(value);
        return value;
    },

    formatDate(date){        
        const splittedDate = date.split("-");
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    }
};

//object app
const App = {
    init(){        
        //print rows
        transaction.all.forEach((element, index) => {
            DOM.addTransaction(element, index);
        });

        //update Balance
        DOM.updateBalance();

        //update storage
        myStorage.set(transaction.all);
    },

    reload(){
        DOM.clearTransactions();
        this.init();
    }
};

/*form*/
const Form = {
    description: window.document.getElementById('description'),
    amount: window.document.getElementById('amount'),
    date:  window.document.getElementById('date'),

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    submit(ev){
        //don't show unnecessary things on the url
        ev.preventDefault();

        //check if all information was filled out
        try{
            //validate form data  
            this.validateFields();   

            //format data to save
            const transaction_object =  this.formatFormData();

            //save transaction
            this.saveTransaction(transaction_object);
                        
            //delete data from form
            this.deleteFormData();
            
            //close modal
            modal.openOrClose();

        }catch(error){
            window.alert(error.message);
        }        
    },

    validateFields(){
        let {description, amount, date} = this.getValues();

        if(description.trim() === '' || amount.trim() === '' || date.trim() === ''){
            throw new Error("Por favor, preencha todos os campos");
        }
    },

    
    formatFormData(){
        let {description, amount, date} = this.getValues();
        //format amount and date 
        amount = Utils.formatAmount(amount);
        date = Utils.formatDate(date);

        //return full object 
        return {
            description, 
            amount,
            date
        }
    },

    saveTransaction(t){
        window.alert('Transação cadastrada com sucesso!');
        transaction.add(t);
    },

    deleteFormData(){
        this.description.value = '';
        this.amount.value = '';
        this.date.value = '';
    }
};

//start application
App.init();

