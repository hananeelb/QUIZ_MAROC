const buttons = document.querySelectorAll('button');
const resultElement = document.getElementById('result');
let countdown; // تعريف المتغير لتخزين مرجع العد التنازلي

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        clearInterval(countdown); // إيقاف العد التنازلي عند الضغط على الزر

        const isCorrect = button.getAttribute('data-correct') === "true";
        if (isCorrect) {
            button.style.backgroundColor = 'green';
            button.style.color = 'white';
        } else {
            button.style.backgroundColor = 'red';
            button.style.color = 'white';
            const correctButton = document.querySelector('button[data-correct="true"]');
            correctButton.style.backgroundColor = 'green';
            
        }

        buttons.forEach(btn => btn.disabled = true); // تعطيل الأزرار بعد الإجابة
    });
});

// الحصول على عنصر العداد
const timerElement = document.getElementById('timer');
let timeLeft = 15; // بدء العد التنازلي من 15

// دالة العد التنازلي
function startCountdown() {
    timerElement.innerText = timeLeft;

    countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;

        // عند انتهاء العد التنازلي
        if (timeLeft < 0) {
            clearInterval(countdown); // إيقاف المؤقت
            timerElement.innerText = "C'est fini";

            // عند انتهاء الوقت، تحديد الإجابة الصحيحة إذا لم يتم تحديدها بعد
            if (![...buttons].some(button => button.style.backgroundColor === 'green')) {
                const correctButton = document.querySelector('button[data-correct="true"]');
                correctButton.style.backgroundColor = 'green';
                correctButton.style.color = 'white';
            }

            buttons.forEach(btn => btn.disabled = true); // تعطيل الأزرار عند انتهاء الوقت
        }
    }, 1000); // تحديث كل ثانية
}

window.onload = startCountdown;

