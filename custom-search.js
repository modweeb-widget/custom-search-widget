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
        const customInput = document.querySelector('.search-input');  
        const searchContainer = document.querySelector('.search-container');
        const searchBox = document.querySelector('.search-box');
        const loadingEl = document.querySelector('.search-loading');  
        
        // الأيقونات الجديدة
        const voiceSearchIcon = document.querySelector('.voice-search-icon');
        const imageSearchIcon = document.querySelector('.image-search-icon');
  
        if (!customInput || !searchContainer) return; // لا شيء لربطه  

        // إضافة تأثير التركيز (focus) لشريط البحث
        customInput.addEventListener('focus', () => {
            searchContainer.classList.add('focused');
            searchBox.classList.add('focused');
        });
        customInput.addEventListener('blur', () => {
            searchContainer.classList.remove('focused');
            searchBox.classList.remove('focused');
        });

        // وظائف وهمية لأيقونات الميكروفون والكاميرا
        if (voiceSearchIcon) {
            voiceSearchIcon.addEventListener('click', () => {
                alert('وظيفة البحث الصوتي غير متاحة حاليًا.');
            });
        }
        if (imageSearchIcon) {
            imageSearchIcon.addEventListener('click', () => {
                alert('وظيفة البحث بالصور غير متاحة حاليًا.');
            });
        }
  
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
  
          // ضغط Enter في الحقل  
          customInput.addEventListener('keydown', function(e){  
            if (e.key === 'Enter') { e.preventDefault(); doSearch(customInput.value.trim()); }  
          });  
  
          // مراقبة تغيُّر نتائج CSE لإخفاء التحميل  
          const observerTarget = document.querySelector('#gcse-results-placeholder');  
          if (observerTarget) {  
            const mo = new MutationObserver((mutations) => {  
              // عند ظهور عناصر جديدة أو تغيُّر الشجرة، أخفِ مؤشر التحميل  
              if (loadingEl) loadingel.style.display = 'none';  
            });  
            mo.observe(observerTarget, { childList: true, subtree: true });  
          }  
  
        } else if (attemptsLeft > 0) {  
          // إن لم يتكوَّن بعد عناصر CSE انتظر وحاول مرة أخرى  
          setTimeout(() => attemptWire(attemptsLeft - 1), 150);  
        } else {  
          // فشل العثور — سنستخدم إعادة توجيه كخارطة طريق بديلة  
          console.warn('لم يتم العثور على عناصر CSE الداخلية. سيتم فتح نتائج البحث على صفحة CSE كحل احتياطي.');  
          const customInputFail = document.querySelector('.search-input'); // استخدام customInput بدلاً من customButtonFail
          if (customInputFail) {  
            customInputFail.addEventListener('keydown', function(e) { // الاستماع لـ Enter فقط
              if (e.key === 'Enter') {
                e.preventDefault();
                const q = customInputFail.value || '';  
                if (!q) return;  
                window.location.href = 'https://cse.google.com/cse?cx=' + CSE_CX + '&q=' + encodeURIComponent(q);  
              }
            });  
          }  
        }  
      };  
  
      // ابدأ الربط  
      attemptWire();  
    }  
  };
