import moment from "moment";
import { datetimeFromat } from "./const";

export function pluralize(word, shouldCapitalize = true) {
	// Check for common irregular plural forms
	const irregulars = {
		man: "men",
		woman: "women",
		child: "children",
		tooth: "teeth",
		foot: "feet",
		mouse: "mice",
		goose: "geese",
		person: "people",
		leaf: "leaves",
		loaf: "loaves",
		knife: "knives",
		wife: "wives",
		cactus: "cacti",
		focus: "foci",
		crisis: "crises",
		thesis: "theses",
		axis: "axes",
	};

	// Check if the word is an irregular plural
	if (irregulars[word.toLowerCase()]) {
		return irregulars[word.toLowerCase()];
	}

	// Capitalize the first letter of the word
	if (shouldCapitalize) word = capitalize(word);

	// Regular pluralization rules
	if (/[^aeiou]y$/i.test(word)) {
		return word.replace(/y$/, "ies");
	} else if (/s$|x$|z$|ch$|sh$/i.test(word)) {
		return word + "es";
	} else {
		return word + "s";
	}
}

export function getType(type) {
	switch (type) {
		case "character varying":
			return "string";
		case "integer":
			return "number";
		case "timestamp with time zone":
			return "date";
		default:
			return "string";
	}
}

export function capitalize(word) {
	if (!word) return "";
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatLabel(word, plural = false) {
	if (!word) return "";
	// Check for special cases
	word = formatSpecialCases(word);

	// Check if the word is plural
	if (plural) plural = !isPlural(word);

	// Capitalize the first letter of the word
	word = capitalize(word);

	// Check if the word is an id
	if (word.includes("_id")) word = word.replace("_id", "");

	// Set word to plural
	word = plural ? pluralize(word) : word;

	// Check for snake case
	word = word
		.split("_")
		.map((e) => capitalize(e))
		.join(" ");

	return word;
}

export function formatDatetime(date) {
	return moment(date).format(datetimeFromat);
}

export const isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

export const isDate = (dateString) => {
	// Proverite da li je string u ISO 8601 formatu
	const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

	if (!iso8601Regex.test(dateString)) {
		return false;
	}

	// Pokušajte da parsirate datum
	const parsedDate = new Date(dateString);

	// Proverite da li je rezultat validan datum
	return parsedDate instanceof Date && !isNaN(parsedDate.getTime());

	if (typeof value === "number") return false;
	const date = new Date(value);
	const time = date.getTime();
	return date instanceof Date && !isNaN(date) && time > 0;
};

function formatSpecialCases(word) {
	switch (word) {
		case "id":
			return "Id";
		case "created_by":
			return "Created By";
		case "updated_by":
			return "Updated By";
		case "createdAt":
			return "Created Time";
		case "updatedAt":
			return "Updated Time";
		default:
			return word;
	}
}

function isPlural(word) {
	const pluralPatterns = /(s|es|ies)$/;

	return pluralPatterns.test(word);
}
