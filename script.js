document.addEventListener('DOMContentLoaded', function() {
    // Элементы формы
    const recordsInput = document.getElementById('records');
    const increaseInput = document.getElementById('increase');
    const priceInput = document.getElementById('price');
    const periodButtons = document.querySelectorAll('.period-selector button');
    const onlineRecordsInput = document.getElementById('online-records');
    const calculateButton = document.getElementById('calculate');
    const resultsSection = document.getElementById('results');
    
    // Элементы результатов
    const currentRecordsEl = document.getElementById('current-records');
    const potentialIncreaseEl = document.getElementById('potential-increase');
    const workDaysEl = document.getElementById('work-days');
    const currentIncomeEl = document.getElementById('current-income');
    const potentialIncomeEl = document.getElementById('potential-income');
    const incomeIncreaseEl = document.getElementById('income-increase');
    const incomeGrowthEl = document.getElementById('income-growth');

    const slider = document.getElementById('increase');
    const valueDisplay = document.querySelector('.slider-current-value');
    const slidetTicket = document.getElementById("online-records");
    const valueDisplayTicket = document.querySelector(".slider-current-ticket");
    // Параметры расчета
    let workDays = 30; // По умолчанию месяц
    
    // Обработчики событий
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            periodButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            workDays = parseInt(this.dataset.days);
        });
    });
    
    calculateButton.addEventListener('click', calculateResults);
    
    // Функция расчета результатов
    function calculateResults() {
        // Получаем значения из формы
        const avgRecords = parseFloat(recordsInput.value);
        const increasePercent = parseFloat(increaseInput.value) / 100;
        const avgPrice = parseFloat(priceInput.value);
        const avgOnlineRecords = parseFloat(onlineRecordsInput.value);
        
        // Расчеты
        const currentRecords = (avgRecords + avgOnlineRecords) * workDays;
        const potentialAdditionalRecords = Math.round(avgOnlineRecords * increasePercent * workDays);
        console.log("avgOnlineRecords",avgOnlineRecords);
        console.log("workDays",workDays);
        console.log("currentRecords",currentRecords);
        console.log("increasePercent",increasePercent);
        const potentialTotalRecords = currentRecords + potentialAdditionalRecords;
        
        const currentIncome = currentRecords * avgPrice;
        const potentialIncome = potentialTotalRecords * avgPrice;
        const incomeIncrease = potentialIncome - currentIncome;
        const incomeGrowth = (incomeIncrease / currentIncome) * 100;
        
        // Отображение результатов
        currentRecordsEl.textContent = `${currentRecords} записей`;
        potentialIncreaseEl.textContent = `${Math.round(potentialAdditionalRecords)} записей (+${(increasePercent * 100).toFixed(0)}%)`;
        workDaysEl.textContent = `${workDays} дней`;
        currentIncomeEl.textContent = `${formatMoney(currentIncome)} руб.`;
        potentialIncomeEl.textContent = `${formatMoney(potentialIncome)} руб.`;
        incomeIncreaseEl.textContent = `+${formatMoney(incomeIncrease)} руб.`;
        incomeGrowthEl.textContent = `+${incomeGrowth.toFixed(1)}%`;
        
        // Показываем результаты
        resultsSection.style.display = 'block';
        
        // Прокрутка к результатам
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Функция форматирования денежных значений
    function formatMoney(amount) {
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
    }
    
    function updateValue(){
        valueDisplay.textContent = slider.value + "%";

    }
    updateValue();
    slider.addEventListener('input', updateValue);
    

    function updateValueTicket(){
        valueDisplayTicket.textContent = slidetTicket.value;

    }
    updateValueTicket();
    slidetTicket.addEventListener('input', updateValueTicket);
});
