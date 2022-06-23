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
