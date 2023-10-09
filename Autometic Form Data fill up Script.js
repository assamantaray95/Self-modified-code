function fillRandomValues() 
{
	const elements = document.querySelectorAll('input[type="text"]');
	const emails = document.querySelectorAll('input[type="email"]');
	const radios = document.querySelectorAll('input[type="radio"]');
	const textarea = document.querySelectorAll('textarea.form-control');
	const selectElements = document.querySelectorAll('select.form-control');
	for (let i = 0; i < elements.length; i++) 
	{
		randomValues = generateRandomValues();
		convertValueToUpperCase = randomValues.toUpperCase();
		elements[i].value = convertValueToUpperCase;
	}
	for (let i = 0; i < emails.length; i++) 
	{	
		randomValues = generateRandomEmail();
		convertValueToUpperCase = randomValues.toUpperCase();
		emails[i].value = convertValueToUpperCase;
	}
	for (let i = 0; i < radios.length; i++) 
	{	
		const randomIndex = Math.floor(Math.random() * radios.length);
		radios[randomIndex].checked = true;
	}
	for (let i = 0; i < textarea.length; i++) 
	{
		randomValues = generateRandomValues();
		convertValueToUpperCase = randomValues.toUpperCase();
		textarea[i].value = convertValueToUpperCase;
	}
	for (let i = 0; i < selectElements.length; i++) 
	{
		const selectElement = selectElements[i];
		const randomIndex = Math.floor(Math.random() * (selectElement.options.length - 1)) + 1;
		selectElement.selectedIndex = randomIndex;
	}
}

function generateRandomEmail(){
	return generateRandomValues() + '@gmail.com';;
}

function generateRandomValues() {
	return Math.random().toString(36).substring(3);
}