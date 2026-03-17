import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        if (elements[elementName]) {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
            );
        }
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        // Если нажата кнопка с name="clear", сбрасываем связанное с ней поле
        if (action && action.name === 'clear') {
            const fieldToClear = action.value; // Например, 'searchBySeller'
            if (elements[fieldToClear]) {
                elements[fieldToClear].value = '';
                state[fieldToClear] = ''; // Очищаем значение в стейте, чтобы фильтр его не учитывал
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    };
}