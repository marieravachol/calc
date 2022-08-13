'use strict';

window.addEventListener('DOMContentLoaded', () => {
	const appHeight = () => {
		const doc = document.documentElement;
		doc.style.setProperty('--app-height', `${window.innerHeight}px`);
	};
	window.addEventListener('resize', appHeight);
	appHeight();

	// THEME VARIABLES

	const togglePointer = document.querySelector('.theme-switcher__toggle button'),
		themeParent = document.querySelector('.calc'),
		toggleTriggers = document.querySelectorAll('.theme-switcher__trigger');

	// CHANGE THEME 

	toggleTriggers.forEach(trigger => {
		trigger.addEventListener('click', (trigger) => changeTheme(trigger.target));
	});

	function changeTheme(elem) {
		themeParent.classList.remove('theme-1', 'theme-2', 'theme-3');
		switch (elem.getAttribute('data-theme')) {
			case '1':
				togglePointer.style.left = '5px';
				break;
			case '2':
				togglePointer.style.left = '26px';
				break;
			case '3':
				togglePointer.style.left = '49px';
				break;
		}
		themeParent.classList.add(`theme-${elem.getAttribute('data-theme')}`);
	}

	// END CHANGE THEME 

	// CALC VARIABLES

	let currentArgument = '',
		previousArgument = '',
		operator;

	const numberButtons = document.querySelectorAll('[data-type="number"]'),
		operatorsButtons = document.querySelectorAll('[data-type="operator"]'),
		screen = document.querySelector('#screen'),
		deleteButton = document.querySelector('.btn-del'),
		resetButton = document.querySelector('.btn-reset'),
		equalButton = document.querySelector('.btn-equal');

	// END CALC VARIABLES

	// FUNCTIONS 

	let addNumber = (newNumber) => {
		if (newNumber === '.' && currentArgument.toString().includes('.')) {
			return;
		}
		// currentArgument === '' ? currentArgument = newNumber : currentArgument += newNumber;
		currentArgument === '' ? newNumber === '.' ? currentArgument = '0.' : currentArgument = newNumber : currentArgument += newNumber;
	};

	let updateScreen = () => {
		currentArgument ? screen.value = currentArgument.toString().slice(0, 13) : screen.value = '0';
		console.log(`previousArgument: ${previousArgument}`, `currentArgument: ${currentArgument}`, `operator: ${operator}`);
	};

	let setOperator = (oper) => {
		if (!currentArgument) {
			currentArgument = '0';
		}
		if (previousArgument) {
			calculate();
		}

		previousArgument = currentArgument;
		operator = oper;
		currentArgument = '';
	};

	let calculate = () => {
		let argumentA = parseFloat(previousArgument),
			argumentB = parseFloat(currentArgument),
			result;

		switch (operator) {
			case '+':
				result = argumentA + argumentB;
				break;
			case '-':
				result = argumentA - argumentB;
				break;
			case 'x':
				result = argumentA * argumentB;
				break;
			case '/':
				result = argumentA / argumentB;
				break;
		}
		if (result.toString().includes('.')) {
			currentArgument = result.toFixed(3).replace(/0*$/, "");
		} else {
			currentArgument = result;
		}

		operator = '';
		previousArgument = '';
		updateScreen();
	};

	let deleteLastNumber = () => {
		currentArgument = currentArgument.toString().slice(0, -1);
	};

	let resetALL = () => {
		currentArgument = '';
		previousArgument = '';
		operator = '';
	};

	// END FUNCTIONS

	// CLICK EVENTS

	numberButtons.forEach(button => {
		button.addEventListener('click', e => {
			addNumber(e.target.innerHTML);
			updateScreen();
		});
	});

	operatorsButtons.forEach(button => {
		button.addEventListener('click', e => {
			setOperator(e.target.innerHTML);
		});
	});

	deleteButton.addEventListener('click', () => {
		deleteLastNumber();
		updateScreen();
	});

	resetButton.addEventListener('click', () => {
		resetALL();
		updateScreen();
	});

	equalButton.addEventListener('click', () => {
		calculate();
		updateScreen();
	});

	// END CLICK EVENTS

});