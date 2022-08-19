/*
 *	memorize the last selected item
 */
// if is query page
(async () => {
	if (new URLSearchParams(window.location.search).get("m") !== "en_query") {
		return;
	}
	const fieldPath = [
		"#cosname",
		"#teaname",
		"#sel_wk",
		// Issue #1: sel_dept will always be empty
		// "#sel_col",
		// "#sel_dept",
		"#sel_degree",
		"#cl1",
		"#cl2",
		"#cl3",
		"#cl4",
		"#cl5",
		"#cl6",
		"#cl7",
		"#cl8",
		"#cl9",
		"#cl10",
		"#cl11",
		"#cl12",
		"#cl13",
		"#cl14",
		"#cl15",
		"#cl16",
	];

	const getItem = (item) => ({
		checked: item.checked,
		value: item.value,
	});

	const updateValue = (field) => field.map(getItem);

	const field = fieldPath.map((path) => document.querySelector(path));

	let fieldValue =
		JSON.parse(localStorage.getItem("fieldValue")) || updateValue(field);

	field.forEach((i, index) => {
		i.addEventListener("change", () => {
			fieldValue = updateValue(field);
			console.log(fieldValue);
			localStorage.setItem("fieldValue", JSON.stringify(fieldValue));
		});
		i.value = fieldValue[index].value;
		i.checked = fieldValue[index].checked;
	});
})();
