class Customer {
    constructor(name, amount){
        this.name = name;
        this.amount = amount;
    }
    
    describe(){
        return `Customer: ${this.name} 
                Account Balance: ${this.amount}`;
    }
}
class Menu {
    constructor(){
        this.customers = [];
        this.selectedCustomer = null;
    }

    start(){
        let selection = this.showMainMenuOptions();
        while(selection != 0) {
            switch(selection) {
                case '1':
                    this.addCustomer();
                    break;
                case '2':
                    this.deleteCustomer();
                    break;
                case '3': 
                    this.displayCustomers();    
                    break;
                case '4':
                    this.selectCustomer();      
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions(){
        return prompt(`
        Welcome to the Banking Menu!
        Here are your options: 

        1. Add Customer
        2. Delete Customer
        3. Display Customers
        4. Select Customer

        --------------------
        0. Exit Application
        `);
    }

    showCustomerMenuOptions(customerName, customerBalance) {
        return prompt(`
        Welcome, ${customerName}! 
        Here are your options:
        
        1. Deposit money
        2. Withdraw money
        
        --------------------
        Your balance: $${customerBalance}
        --------------------
        0. Back
        `);
    }

    addCustomer(){
        let name = prompt('Please enter your name: ');
        let balance = parseFloat(prompt('Please enter your total balance: '));
        
        this.customers.push(new Customer(name, balance));
    }

    deleteCustomer(){
        let index = prompt('Enter the index of the customer in which you would like to delete: ');
        if (index > -1 && index < this.customers.length){
            this.customers.splice(index, 1);
        }
    }

    displayCustomers(){
        let customerString = '';
        for(let i = 0; i < this.customers.length; i++){
            customerString += "Customer " + i + ': ' + this.customers[i].name + '\n';
        }
        alert(customerString);
    }

    selectCustomer(){
        let index = prompt("Enter the index of the customer that you want to select: ");
        if(index > -1 && index < this.customers.length){
            this.selectedCustomer = this.customers[index];
            let customerName = this.selectedCustomer.name;
            let customerBalance = this.selectedCustomer.amount;
            let selection1 = this.showCustomerMenuOptions(customerName, customerBalance);
            switch(selection1){
                case '0':
                    this.showMainMenuOptions();
                    break;
                case '1':
                    this.depositMoney(index, customerName, customerBalance);
                    break;
                case '2':
                    this.withdrawMoney(index, customerName, customerBalance);
                    break;           
                default:
                    selection1 = 0;    
            }
            selection1 = this.showCustomerMenuOptions(customerName, customerBalance);
        }
    }
    depositMoney(index, customerName, customerBalance){
        let deposit = parseFloat(prompt("Please enter the amount of money you would like to deposit: "));
        if(deposit>0){
            customerBalance += deposit;
            this.customers[index].amount = customerBalance;
            alert(`${customerName}'s new balance: $${customerBalance}`);
            this.selectCustomer(customerName, customerBalance);
        }
    }
    withdrawMoney(customerName, customerBalance){
        let withdraw = parseFloat(prompt("Please enter the amount of money you would like to withdraw: "));
        if(withdraw>0 && withdraw<=customerBalance){
            customerBalance -= withdraw;
            this.customers[index].amount = customerBalance;
            alert(`${customerName}'s new balance: $${customerBalance}`);
            this.selectCustomer(customerName, customerBalance);
        }
    }

}
let menu = new Menu();
menu.start();