/*
 * modweeb Custom Search - Logic
 * Version: 1.0.0
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
        const gscInput = document.querySelector('input.gsc-input'); // input الذي أنشأته Google  
        const gscBtn = document.querySelector('.gsc-search-button button, .gsc-search-button input[type="button"]'); // زر البحث الداخلي  
        const resultsContainer = document.querySelector('#gcse-results-placeholder'); // حاوية النتائج المرئية  
        const customInput = document.querySelector('.search-input');  
        const customButton = document.querySelector('.search-button');  
        const loadingEl = document.querySelector('.search-loading');  
        const options = document.querySelectorAll('.search-option');  
  
        if (!customInput || !customButton) return; // لا شيء لربطه  
  
        // تفعيل تبديل الخيارات بصريًا (يمكن لاحقًا ربطها بفلاتر فعلية)  
        options.forEach(opt => {  
          opt.addEventListener('click', () => {  
            options.forEach(o => o.classList.remove('active'));  
            opt.classList.add('active');  
            // يمكن هنا حفظ نطاق البحث في متغير لاستخدامه في الاستعلام (مثال: data-scope)  
            // const scope = opt.getAttribute('data-scope');  
          });  
        });  
  
        if (gscInput) {  
          // إذا وجدنا عنصر Google، اربطه بزرنا المخصص  
          const doSearch = (query) => {  
            if (!query) { customInput.focus(); return; }  
            if (loadingEl) loadingEl.style.display = 'block';  
  
            // ننسخ القيمة إلى حقل Google ثم نضغط زر Google  
            gscInput.value = query;  
            gscInput.dispatchEvent(new Event('input', { bubbles: true }));  
  
            // انقر زر Google إن وجد، وإلا أرسل النموذج  
            const internalBtn = document.querySelector('.gsc-search-button button');  
            if (internalBtn) {  
              internalBtn.click();  
            } else {  
              const form = gscInput.closest('form');  
              if (form) form.submit();  
              else {  
                // fallback: تحويل لسجل بحث Google (نادر)  
                window.location.href = 'https://cse.google.com/cse?cx=' + CSE_CX + '&q=' + encodeURIComponent(query);  
              }  
            }  
          };  
  
          // زر الواجهة  
          customButton.addEventListener('click', function(e){  
            e.preventDefault();  
            doSearch(customInput.value.trim());  
          });  
  
          // ضغط Enter في الحقل  
          customInput.addEventListener('keydown', function(e){  
            if (e.key === 'Enter') { e.preventDefault(); customButton.click(); }  
          });  
  
          // مراقبة تغيُّر نتائج CSE لإخفاء التحميل  
          const observerTarget = document.querySelector('#gcse-results-placeholder');  
          if (observerTarget) {  
            const mo = new MutationObserver((mutations) => {  
              // عند ظهور عناصر جديدة أو تغيُّر الشجرة، أخفِ مؤشر التحميل  
              if (loadingEl) loadingEl.style.display = 'none';  
            });  
            mo.observe(observerTarget, { childList: true, subtree: true });  
          }  
  
        } else if (attemptsLeft > 0) {  
          // إن لم يتكوَّن بعد عناصر CSE انتظر وحاول مرة أخرى  
          setTimeout(() => attemptWire(attemptsLeft - 1), 150);  
        } else {  
          // فشل العثور — سنستخدم إعادة توجيه كخارطة طريق بديلة  
          console.warn('لم يتم العثور على عناصر CSE الداخلية. سيتم فتح نتائج البحث على صفحة CSE كحل احتياطي.');  
          const customButtonFail = document.querySelector('.search-button');  
          if (customButtonFail) {  
            customButtonFail.addEventListener('click', function() {  
              const q = (document.querySelector('.search-input') || {}).value || '';  
              if (!q) return;  
              window.location.href = 'https://cse.google.com/cse?cx=' + CSE_CX + '&q=' + encodeURIComponent(q);  
            });  
          }  
        }  
      };  
  
      // ابدأ الربط  
      attemptWire();  
    }  
  };
