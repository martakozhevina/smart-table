import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(
        ['skipEmptyTargetValues'], // Стандартные правила по именам
        [rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)] // Кастомное правило
    );

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        return data.filter(item => compare(item, state));
    };
}