document.addEventListener('DOMContentLoaded', function () {
    const conditionSelect = document.getElementById('condition-select');
    const otherConditionInput = document.getElementById('other-condition');
    const form = document.getElementById('toy-form');

    if (conditionSelect) {
        conditionSelect.addEventListener('change', function () {
            if (this.value === 'other') {
                otherConditionInput.style.display = 'block';
                otherConditionInput.required = true;
            } else {
                otherConditionInput.style.display = 'none';
                otherConditionInput.required = false;
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            // Before submitting the form, update the condition input
            if (conditionSelect.value === 'other' && otherConditionInput.value.trim() !== '') {
                // Replace the value of the select with what the user typed
                const customCondition = otherConditionInput.value.trim();

                // Create a hidden input to submit the custom value
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'condition';
                hiddenInput.value = customCondition;

                // Remove the dropdown's name so it doesn't override
                conditionSelect.removeAttribute('name');

                // Append hidden input to form
                form.appendChild(hiddenInput);
            }
        });
    }
});
