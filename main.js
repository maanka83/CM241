document.addEventListener('DOMContentLoaded', () => {
    const addRowBtn = document.getElementById('addRowBtn');
    const recipeForm = document.getElementById('recipeForm');
    const ingredientList = document.getElementById('ingredientList');
    const recipeCard = document.getElementById('recipeCard');

    // DOM Manipulation: Adding rows dynamically [Source 9]
    addRowBtn.addEventListener('click', () => {
        const div = document.createElement('div');
        div.className = 'ingredient-row';
        div.innerHTML = `
            <input type="text" placeholder="Name" class="ing-name" required>
            <input type="number" placeholder="Qty" class="ing-qty" required>
            <select class="ing-unit">
                <option value="tsp">Teaspoon (tsp)</option>
                <option value="ml">Milliliters (ml)</option>
                <option value="cup">Cup</option>
            </select>
        `;
        ingredientList.appendChild(div);
    });

    // Dynamic Calculation: Conversion formula [Source 114, 177]
    const convertTspToMl = (tsp) => tsp * 4.92;

    // Event Handling: Submit form [Source 9, 10]
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const servings = document.getElementById('servingSize').value;
        const rows = document.querySelectorAll('.ingredient-row');
        
        let cardHTML = `<h2>Your Adjusted Recipe</h2>`;
        cardHTML += `<p><strong>Total Servings:</strong> ${servings}</p><ul>`;

        // Data Manipulation: Processing inputs [Source 10]
        rows.forEach(row => {
            const name = row.querySelector('.ing-name').value;
            const qty = parseFloat(row.querySelector('.ing-qty').value);
            const unit = row.querySelector('.ing-unit').value;

            // Adjust quantity based on serving size
            const adjustedQty = (qty * servings).toFixed(2);
            let conversionText = "";

            // Requirement: Unit conversion (tsp to ml) [Source 176]
            if (unit === 'tsp') {
                conversionText = ` (${convertTspToMl(adjustedQty).toFixed(2)} ml)`;
            }

            cardHTML += `<li>${name}: ${adjustedQty} ${unit}${conversionText}</li>`;
        });

        cardHTML += `</ul><button onclick="window.print()">Print Recipe Card</button>`;
        
        recipeCard.innerHTML = cardHTML;
        recipeCard.classList.remove('hidden'); // Show card [Source 9]
    });
});