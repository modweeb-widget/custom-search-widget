/*
 * modweeb Custom Search - Logic
 * Version: 4.0.0
 * Author: modweeb.com
 * License: Free to use and modify, provided this header remains intact.
 */
// معرف CSE الخاص بك — اعدله إذا لزم الأمر
const CSE_CX = '05321cdede9964b69';

// تهيئة واستجابة لحدث تحميل CSE
window.__gcse = {
  callback: function() {
    // بعد أن ينتهي CSE من الإنشاء نربط الزر والحقل بالتحكمات الداخلية
    const attemptWire = function(attemptsLeft = 40) {
      const gscInput = document.querySelector('input.gsc-input');
      const gscBtn = document.querySelector('.gsc-search-button button, .gsc-search-button input[type="button"]');
      const resultsContainer = document.querySelector('#gcse-results-placeholder');
      const customInput = document.querySelector('.search-input');
      const customButton = document.querySelector('.search-button');
      const clearButton = document.querySelector('.search-clear-button');
      const loadingEl = document.querySelector('.search-loading');

      if (!customInput || !customButton || !clearButton) return;

      const doSearch = (query) => {
        if (!query) {
          customInput.focus();
          return;
        }
        if (loadingEl) loadingEl.style.display = 'block';

        gscInput.value = query;
        gscInput.dispatchEvent(new Event('input', {
          bubbles: true
        }));

        const internalBtn = document.querySelector('.gsc-search-button button');
        if (internalBtn) {
          internalBtn.click();
        } else {
          const form = gscInput.closest('form');
          if (form) form.submit();
          else {
            window.location.href = 'https://cse.google.com/cse?cx=' + CSE_CX + '&q=' + encodeURIComponent(query);
          }
        }
      };

      // زر الواجهة
      customButton.addEventListener('click', function(e) {
        e.preventDefault();
        doSearch(customInput.value.trim());
      });

      // زر المسح/إعادة التعيين
      clearButton.addEventListener('click', function() {
        customInput.value = '';
        customInput.focus();
        if (resultsContainer) {
          resultsContainer.innerHTML = '';
        }
      });

      // ضغط Enter في الحقل
      customInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          customButton.click();
        }
      });

      // مراقبة تغيُّر نتائج CSE لإخفاء التحميل
      const observerTarget = document.querySelector('#gcse-results-placeholder');
      if (observerTarget) {
        const mo = new MutationObserver((mutations) => {
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
