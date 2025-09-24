/*
 * modweeb Custom Search - Logic
 * Version: 2.0.0
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
      const gscBtn = document.querySelector('.gsc-search-button button, .gsc-search-button input[type="button"]');
      const customInput = document.querySelector('.search-input');
      const clearButton = document.querySelector('.search-clear');
      const resultsContainer = document.querySelector('#gcse-results-placeholder');
      const loadingEl = document.querySelector('.search-loading');

      if (!customInput || !gscInput) return;

      const doSearch = (query) => {
        if (!query) return;
        if (loadingEl) loadingEl.style.display = 'block';

        gscInput.value = query;
        gscInput.dispatchEvent(new Event('input', {
          bubbles: true
        }));
        
        const internalBtn = document.querySelector('.gsc-search-button button');
        if (internalBtn) {
          internalBtn.click();
        }
      };

      // زر الإدخال المخصص يضغط على زر جوجل
      customInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          doSearch(customInput.value.trim());
        }
      });
      
      // إظهار وإخفاء زر المسح
      customInput.addEventListener('input', function() {
        if (this.value.length > 0) {
          clearButton.style.display = 'block';
        } else {
          clearButton.style.display = 'none';
        }
      });
      
      // وظيفة زر المسح
      clearButton.addEventListener('click', function() {
        customInput.value = '';
        customInput.focus();
        this.style.display = 'none';
        
        // مسح النتائج
        if (resultsContainer) {
          resultsContainer.innerHTML = '';
        }
      });

      // مراقبة تغيُّر نتائج CSE لإخفاء التحميل
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
