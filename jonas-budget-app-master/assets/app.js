
// // App modules used to create a separation of concerns (simple MVC)
// // Acts as a simplified model
// const budgetController = (() => {
// 	const Expense = function(id, desc, value) {
// 		this.id = id;
// 		this.desc = desc;
// 		this.value = value;
// 	};

// 	const Income = function(id, desc, value) {
// 		this.id = id;
// 		this.desc = desc;
// 		this.value = value;
// 	};

// 	const calculateTotal = type => {
// 		let total = data.items[type].reduce((sum, item) => sum + item.value, 0);
// 		data.totals[type] = total;
// 	};

// 	const data = {
// 		items: {
// 			expenses: [],
// 			income: []
// 		},
// 		totals: {
// 			expenses: 0,
// 			income: 0
// 		},
// 		budget: 0,
// 		percent: -1
// 	};

// 	return {
// 		addItem: (type, desc, value) => {
// 			let newItem, id;
// 			// Generate a random ID
// 			id = (
// 				Date.now().toString(36) +
// 				Math.random()
// 					.toString(36)
// 					.substr(2, 5)
// 			).toUpperCase();
// 			// Create a new item based on type
// 			type === 'expenses'
// 				? (newItem = new Expense(id, desc, value))
// 				: (newItem = new Income(id, desc, value));

// 			// Push item into the data structure
// 			data.items[type].push(newItem);
// 			return newItem;
// 		},
// 		deleteItem: attr => {
// 			const type = attr.split('-')[0];
// 			const id = attr.split('-')[1];
// 			// The find method would be more efficient but it is less compatible
// 			const removeIndex = data.items[type].map(item => item.id).indexOf(id);

// 			data.items[type].splice(removeIndex, 1);
// 		},
// 		calculateBudget: () => {
// 			// Calculate total income and expenses
// 			calculateTotal('expenses');
// 			calculateTotal('income');
// 			// Calculate the budget: income - expenses
// 			data.budget = data.totals.income - data.totals.expenses;
// 			// Calculate the percentage of income spent
// 			if (data.totals.income > 0) {
// 				data.percent = Math.round(
// 					(data.totals.expenses / data.totals.income) * 100
// 				);
// 			} else {
// 				data.percent = -1;
// 			}
// 		},
// 		getBudget: () => {
// 			return {
// 				budget: data.budget,
// 				totalIncome: data.totals.income,
// 				totalExpenses: data.totals.expenses,
// 				percent: data.percent
// 			};
// 		},
// 		testing: () => {
// 			console.log(data);
// 		}
// 	};
// })();

// // Handles the applications view
// const UIController = (() => {
// 	const elements = {
// 		inputType: '.add__type',
// 		inputDesc: '.add__description',
// 		inputValue: '.add__value',
// 		inputBtn: '.add__btn',
// 		budgetLbl: '.budget__value',
// 		incomeLbl: '.budget__income--value',
// 		expensesLbl: '.budget__expenses--value',
// 		percentLbl: '.budget__expenses--percentage',
// 		container: '.container',
// 		expenseListItems: '.expenses__list > div',
// 		dateLbl: '.budget__title--month'
// 	};

// 	const formatNumber = num => {
// 		return num.toLocaleString(undefined, {
// 			minimumFractionDigits: 2,
// 			maximumFractionDigits: 2
// 		});
// 	};

// 	return {
// 		getInput: () => {
// 			return {
// 				type: document.querySelector(elements.inputType).value, // Either 'income' or 'expenses'
// 				desc: document.querySelector(elements.inputDesc).value,
// 				value: parseFloat(document.querySelector(elements.inputValue).value)
// 			};
// 		},
// 		addListItem: (item, type) => {
// 			// Create HTML string for income / expense item
// 			let html = `
// 			<div class="item clearfix" id="${type}-${item.id}">
// 				<div class="item__description">${item.desc}</div>
// 				<div class="right clearfix">
// 					<div class="item__value" data-value="${item.value}">${formatNumber(
// 				item.value
// 			)}</div>
// 					${type === 'expenses' ? '<div class="item__percentage">0%</div>' : ''}
// 					<div class="item__delete">
// 						<button class="item__delete--btn">
// 							<i class="ion-ios-close-outline" data-item="${type}-${item.id}">
// 							</i>
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 			`;
// 			// Insert HTML into the DOM
// 			document
// 				.querySelector(`.${type}__list`)
// 				.insertAdjacentHTML('beforeend', html);
// 		},
// 		displayBudget: obj => {
// 			document.querySelector(elements.budgetLbl).textContent = formatNumber(
// 				obj.budget
// 			);
// 			document.querySelector(elements.incomeLbl).textContent = formatNumber(
// 				obj.totalIncome
// 			);
// 			document.querySelector(elements.expensesLbl).textContent = formatNumber(
// 				obj.totalExpenses
// 			);
// 			let percent = document.querySelector(elements.percentLbl);
// 			if (obj.percent >= 0) {
// 				percent.textContent = obj.percent + '%';
// 			} else {
// 				percent.textContent = '---';
// 			}
// 		},
// 		displayPercents: totalIncome => {
// 			const listItems = document.querySelectorAll(elements.expenseListItems);
// 			listItems.forEach(item => {
// 				const expense = item.querySelector('.item__value');
// 				const percent = item.querySelector('.item__percentage');
// 				if (totalIncome > 0) {
// 					percent.textContent =
// 						Math.round((expense.dataset.value / totalIncome) * 100) + '%';
// 				} else {
// 					percent.textContent = '---';
// 				}
// 			});
// 		},
// 		deleteListItem: id => {
// 			document.getElementById(id).remove();
// 		},
// 		getElements: () => {
// 			return elements;
// 		},
// 		displayDate: () => {
// 			const monthNames = [
// 				'January',
// 				'February',
// 				'March',
// 				'April',
// 				'May',
// 				'June',
// 				'July',
// 				'August',
// 				'September',
// 				'October',
// 				'November',
// 				'December'
// 			];
// 			const dateElement = document.querySelector(elements.dateLbl);
// 			const date = new Date();
// 			dateElement.textContent =
// 				monthNames[date.getMonth()] + ' ' + date.getFullYear();
// 		},
// 		changedType: () => {
// 			const inputs = document.querySelectorAll(
// 				elements.inputType +
// 					', ' +
// 					elements.inputDesc +
// 					', ' +
// 					elements.inputValue
// 			);

// 			inputs.forEach(input => {
// 				input.classList.toggle('red-focus');
// 			});

// 			document.querySelector(elements.inputBtn).classList.toggle('red');
// 		},
// 		clearInputs: () => {
// 			// Converted node list into an array to demonstrate using the call method on the Array prototype
// 			const inputs = document.querySelectorAll(
// 				elements.inputDesc + ', ' + elements.inputValue
// 			);
// 			const inputsArr = Array.prototype.slice.call(inputs);
// 			inputsArr.forEach(input => {
// 				input.value = '';
// 			});
// 			// Set focus on first input element
// 			inputsArr[0].focus();
// 		}
// 	};
// })();

// // Serves as the controller of the application
// const controller = ((budgetCtrl, UICtrl) => {
// 	const setupEventListeners = () => {
// 		const UIElements = UICtrl.getElements();
// 		document
// 			.querySelector(UIElements.inputBtn)
// 			.addEventListener('click', ctrlAddItem);

// 		document.addEventListener('keypress', e => {
// 			// 'which' is used to support older browsers
// 			if (e.keyCode === 13 || e.which === 13) {
// 				ctrlAddItem();
// 			}
// 		});

// 		document
// 			.querySelector(UIElements.container)
// 			.addEventListener('click', ctrlDeleteItem);

// 		document
// 			.querySelector(UIElements.inputType)
// 			.addEventListener('change', UICtrl.changedType);
// 	};

// 	const updateBudget = () => {
// 		// 1. Recalculate the budget
// 		budgetCtrl.calculateBudget();
// 		// 2. Return the budget
// 		const budget = budgetCtrl.getBudget();
// 		// 3. Display the budget in the UI
// 		UICtrl.displayBudget(budget);
// 	};

// 	const updatePercents = () => {
// 		// 1. Get total income from budget
// 		const totalIncome = budgetCtrl.getBudget().totalIncome;
// 		// 2. Update UI with new percentages
// 		UICtrl.displayPercents(totalIncome);
// 	};

// 	const ctrlAddItem = () => {
// 		// 1. Get field input value
// 		const input = UICtrl.getInput();
// 		if (input.desc === '' || isNaN(input.value) || input.value === 0) {
// 			alert(
// 				'Please add description and valid dollar amount before submitting.'
// 			);
// 			return false;
// 		}
// 		// 2. Add item to the budget controller
// 		const newItem = budgetCtrl.addItem(input.type, input.desc, input.value);
// 		// 3. Add item to the UI
// 		UICtrl.addListItem(newItem, input.type);
// 		// 4. Clear input fields
// 		UICtrl.clearInputs();
// 		// 5. Calculate and update budget
// 		updateBudget();
// 		// 6. Calculate and update percentages
// 		updatePercents();
// 	};

// 	const ctrlDeleteItem = e => {
// 		if (e.target && e.target.nodeName === 'I') {
// 			// Get ID stored in a data attribute on the delete icon element
// 			const attr = e.target.dataset.item;
// 			// Delete node from the DOM
// 			UICtrl.deleteListItem(attr);
// 			// Delete item from budget array then recalculate and update budget
// 			budgetCtrl.deleteItem(attr);
// 			updateBudget();
// 			// recalculate and update percentages
// 			updatePercents();
// 		}
// 	};

// 	return {
// 		init: () => {
// 			console.log('Start');
// 			UICtrl.displayDate();
// 			setupEventListeners();
// 		}
// 	};
// })(budgetController, UIController);

// controller.init();


// BUDGET CONTROLLER
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }

    }

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.total[type] = sum;
    };

    // var allExpenses = [];
    // var allIncomes = [];
    // var totalExpenses = 0;
    // var totalIncome = 0;

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },

        budget: 0,
        percentage: -1

    }

    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            ID = 0;
            //[1,2,3,4,5], next ID = 6
            //[1,2,4,6,8], next ID = 9
            //ID = lastID + 1;

            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            //create newItem basend on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            //Push it into our data structure
            data.allItems[type].push(newItem);// the [type] selects the item we want from our allItems object
            //whether it is inc or exp

            //Return the element
            return newItem;


        },

        deleteItem: function (type, id) {
            var ids, index;
            //    id =6;
            //data.allItems[type][id];
            // ids = [1 2 4 6 8] 
            //index = 3

            var ids = data.allItems[type].map(function (current) {

                return current.id;
            });
            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function () {
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget : income - expenses
            data.budget = data.total.inc - data.total.exp;

            //calculate percentage of income that we spent
            if (data.total.inc > 0) {
                data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function () {
            /*
            a =10;
            b= 20;
            c= 40;
            income = 100;
            a = 10/100 =10%
            b = 20/100 = 20%
            c = 40/100 = 40%
            */
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage(data.total.inc);
            });
        },

        getPercentages: function () {
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data);
        }
    }

})();



//UI CONTROLLER
var UIController = (function () {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    var formatNumber = function (num, type) {
        var numSplit, int, dec, type, sign;
        /*
        + or - before the number
        exactly two decimal points
        coma seperating the thousands

        2310.4567 - +2,310.46
        2000  -  +2, 000.00
        */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            //substr selects from a string first parameter is index and second is how many character
            //if input is 23510 result is 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };

    var nodeListForEach = function (list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };

        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create html  strings with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id = "inc-%id%" > <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div >';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //Replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            //insert html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function (selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            //for each element loops over the fieldsArr and sets the value of all of them to empty string
            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });
            //focus back to the first element
            fieldsArr[0].focus();

        },

        displayBudget: function (obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        },

        displayPercentages: function (percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);



            nodeListForEach(fields, function (current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }

            });
        },

        displayMonth: function () {
            var now, months, month, year;
            now = new Date();
            //var christmas = new Date(2021, 11, 25);
            months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changedType: function () {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);

            nodeListForEach(fields, function (cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    }
})();


//GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {


    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    var updateBudget = function () {
        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget on UI
        UICtrl.displayBudget(budget);
    }

    var updatePercentages = function () {
        //1. Calculate the Percentage
        budgetCtrl.calculatePercentages();

        //2. Read Percentage from budget
        var percentages = budgetCtrl.getPercentages();
        //3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    }

    var ctrlAddItem = function () {
        var input, newItem;
        // 1. Get filled input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //2. Add the item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the item to UI
            UICtrl.addListItem(newItem, input.type);
            //4. Clear the fields
            UICtrl.clearFields();

            //5. Calculate and update budget
            updateBudget();

            //6. Calculate and updaate percentages
            updatePercentages();

        }


    }

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            //2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            //3. Update and show the new budget
            updateBudget();

            //4. Calculate and updaate percentages
            updatePercentages();
        }
    };

    return {
        init: function () {
            console.log('it has started');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };


})(budgetController, UIController);

controller.init();

























