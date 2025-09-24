/*
 * modweeb Custom Search - Logic
 * Version: 3.0.0
 * Author: modweeb.com
 * License: Free to use and modify, provided this header remains intact.
 */
// معرف CSE الخاص بك — اعدله إذا لزم الأمر
const CSE_CX = '05321cdede9964b69';

// تهيئة واستجابة لحدث تحميل CSE
window.__gcse = {
    callback: function() {
        const attemptWire = function(attemptsLeft = 40) {
            const gscInput = document.querySelector('input.gsc-input');
            const customInput = document.querySelector('.search-input');
            const clearButton = document.querySelector('.search-clear');
            const resultsContainer = document.querySelector('#gcse-results-placeholder');

            if (!customInput || !gscInput) {
                // المحاولة مرة أخرى إذا لم يتم العثور على العناصر
                if (attemptsLeft > 0) {
                    setTimeout(() => attemptWire(attemptsLeft - 1), 150);
                } else {
                    console.error('Failed to wire search functionality. Google CSE elements not found.');
                }
                return;
            }

            const doSearch = (query) => {
                if (!query) return;

                gscInput.value = query;
                gscInput.dispatchEvent(new Event('input', { bubbles: true }));

                const internalBtn = document.querySelector('.gsc-search-button button');
                if (internalBtn) {
                    internalBtn.click();
                } else {
                    const form = gscInput.closest('form');
                    if (form) form.submit();
                }
            };

            // زر الإدخال المخصص يضغط على زر جوجل عند الضغط على Enter
            customInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    doSearch(this.value.trim());
                }
            });

            // إظهار وإخفاء زر المسح
            customInput.addEventListener('input', function() {
                if (this.value.length > 0) {
                    clearButton.style.display = 'flex';
                } else {
                    clearButton.style.display = 'none';
                }
            });

            // وظيفة زر المسح
            clearButton.addEventListener('click', function() {
                customInput.value = '';
                customInput.focus();
                this.style.display = 'none';

                // مسح نتائج البحث
                if (resultsContainer) {
                    resultsContainer.innerHTML = '';
                }
            });

            // ربط زر المسح الداخلي بنص الإدخال الخارجي
            gscInput.closest('div').querySelector('.gsc-clear-button').addEventListener('click', () => {
                customInput.value = '';
                customInput.focus();
                clearButton.style.display = 'none';
            });
        };

        attemptWire();
    }
};
