/*
 * add histogram link to each course at http://eportfolio.ncku.edu.tw/index2/stu/index.php?t=ss
 */
(() => {
	let co_nu = [...document.querySelectorAll("tr > td:nth-child(3)")];
	let class_code = [...document.querySelectorAll("tr > td:nth-child(4)")];

	const histogram = (co_nu, class_code) => `<a
		href="https://qrys.ncku.edu.tw/ncku/histogram.asp?syear=0110&sem=2&co_no=${co_nu}&class_code=${class_code}"
		target="_blank"
	>
		${co_nu}
	</a>`;

	co_nu.forEach((i, index) => {
		i.innerHTML = histogram(
			co_nu[index].textContent,
			class_code[index].textContent
		);
	});

	/*
	 * GPA calculator
	 */

	// util functions

	function getScore(e) {
		let score = parseInt(e.children[7].innerText);
		return [!!score, score || 0];
	}

	function getGpa(e) {
		let score = getScore(e)[1];
		if (isNaN(score)) return 0;
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
			[0, 0],
		];
		for (let i = 0; i < boundary.length; i++) {
			if (score >= boundary[i][0]) return boundary[i][1];
		}
	}

	function getCreditHour(e) {
		return parseInt(e.children[6].innerText) || 0;
	}

	function to2(n) {
		return Math.round(n * 100) / 100;
	}

	let totalScore = 0;
	let totalGpa = 0;
	let totalCreditHour = 0;

	// head
	document.querySelectorAll("thead > tr").forEach((e) => {
		let gpa = document.createElement("th");
		gpa.innerText = "GPA";
		let creditHour = document.createElement("th");
		creditHour.innerText = "GPA*學分";
		e.append(gpa);
		e.append(creditHour);
	});

	// body
	[...document.querySelectorAll("tbody > tr")]
		.slice(0, -1)
		.forEach((i, index) => {
			let [hasScore, score] = getScore(i);
			let gpa = getGpa(i);
			let creditHour = getCreditHour(i);
			// console.log({i, hasScore, score, gpa, creditHour});

			if (hasScore) {
				totalScore += score * creditHour;
				totalGpa += gpa * creditHour;
				totalCreditHour += creditHour;
			}

			let gpaElement = document.createElement("td");
			gpaElement.innerText = hasScore ? gpa : "成績未到";
			i.append(gpaElement);

			let creditElement = document.createElement("td");
			let credit = to2(gpa * creditHour);
			creditElement.innerText = hasScore ? credit : "成績未到";
			i.append(creditElement);
		});

	// average
	// console.log({totalScore, totalGpa, totalCreditHour});
	document.querySelector("tbody > tr:last-child > td").colSpan = 7;
	document.querySelectorAll("tbody>tr:last-child").forEach((e) => {
		let averageScore = document.createElement("td");
		averageScore.innerText = to2(totalScore / totalCreditHour);
		e.append(averageScore);

		let averageGpa = document.createElement("td");
		averageGpa.innerText = to2(totalGpa / totalCreditHour);
		averageGpa.colSpan = 2;
		averageGpa.align = "center";
		e.append(averageGpa);
	});
})();
