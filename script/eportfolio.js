/*
 * add histogram link to each course at http://eportfolio.ncku.edu.tw/index2/stu/index.php?t=ss
 */

let co_nu = [...document.querySelectorAll('tr > td:nth-child(3)')];
let class_code = [...document.querySelectorAll('tr > td:nth-child(4)')];

const histogram =(co_nu, class_code) => `<a
		href="https://qrys.ncku.edu.tw/ncku/histogram.asp?syear=0110&sem=2&co_no=${co_nu}&class_code=${class_code}"
		target="_blank"
	>
		${co_nu}
	</a>`;

co_nu.forEach((i, index) => {
	i.innerHTML = histogram(co_nu[index].textContent, class_code[index].textContent);
})

/*
 * GPA calculator
 */

function getGpa(e){
	let score = parseInt(e.lastElementChild.innerText);
	if(isNaN(score)) return '成績未到';
	let boundary = [
		[90, 4.3],
		[85, 4.0],
		[80, 3.7],
		[75, 3.3],
		[70, 3.0],
		[65, 2.7],
		[60, 2.3],
		[55, 2.0],
		[50, 1.7],
		[0, 0]
	];
	for(let i = 0; i < boundary.length; i++) {
		if(score >= boundary[i][0]) return boundary[i][1];
	}
}

function getCredit(e){
	return parseInt(e.lastElementChild.previousElementSibling.innerText);
}

console.log('loaded');
[...document.querySelectorAll('tr')].slice(0, -1).forEach((i, index) => {
	let gpa = getGpa(i);
	let credit = getCredit(i);

	let gpaElement = document.createElement(index === 0 ? 'th' : 'td');
	gpaElement.innerText = index === 0 ?
		'GPA' : gpa;
	i.append(gpaElement);

	let creditElement = document.createElement(index === 0 ? 'th' : 'td');
	credit = (gpa*credit).toPrecision(2);
	creditElement.innerText = index === 0 ? 
		'GPA*學分' : credit === 'NaN' ?
			'成績未到' : credit;
	i.append(creditElement);
});
document.querySelector('tbody > tr:last-child > td').colSpan = 10;
