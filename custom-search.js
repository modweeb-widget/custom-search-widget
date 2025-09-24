const CSE_CX = '05321cdede9964b69';

window.__gcse = {
    callback: function() {
        const attemptWire = function(attemptsLeft = 40) {
            const gscInput = document.querySelector('input.gsc-input');
            const customInput = document.querySelector('.search-input');
            const customButton = document.querySelector('.search-button');
            const clearButton = document.querySelector('.search-clear-button');
            const resultsContainer = document.querySelector('#gcse-results-placeholder');
            const loadingEl = document.querySelector('.search-loading');

            if (!customInput || !customButton || !clearButton) {
                if (attemptsLeft > 0) {
                    setTimeout(() => attemptWire(attemptsLeft - 1), 150);
                } else {
                    console.error('Failed to wire search functionality. Elements not found.');
                }
                return;
            }

            const doSearch = (query) => {
                if (!query) {
                    customInput.focus();
                    return;
                }
                if (loadingEl) loadingEl.style.display = 'block';

                if (gscInput) {
                    gscInput.value = query;
                    gscInput.dispatchEvent(new Event('input', {
                        bubbles: true
                    }));

                    const internalBtn = document.querySelector('.gsc-search-button button');
                    if (internalBtn) {
                        internalBtn.click();
                    }
                }
            };

            customButton.addEventListener('click', function(e) {
                e.preventDefault();
                doSearch(customInput.value.trim());
            });

            clearButton.addEventListener('click', function() {
                customInput.value = '';
                customInput.focus();

                if (resultsContainer) {
                    resultsContainer.innerHTML = '';
                }
                if (loadingEl) {
                    loadingEl.style.display = 'none';
                }
            });

            customInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    customButton.click();
                }
            });

            customInput.addEventListener('input', function() {
                if (this.value.trim().length === 0) {
                    if (resultsContainer) {
                        resultsContainer.innerHTML = '';
                    }
                }
            });

            const observerTarget = document.querySelector('#gcse-results-placeholder');
            if (observerTarget) {
                const mo = new MutationObserver(() => {
                    if (loadingEl) loadingEl.style.display = 'none';
                });
                mo.observe(observerTarget, {
                    childList: true,
                    subtree: true
                });
            }
        };
        attemptWire();
    }
};
