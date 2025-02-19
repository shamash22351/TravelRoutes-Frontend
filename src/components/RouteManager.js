import React, { useState } from 'react';

const tips = [
    { step: 1, message: "старт" },
    { step: 2, message: "Первая достоприм" },
    { step: 3, message: "иди к некст пункту" },
    { step: 4, message: "почти на финише" },
    { step: 5, message: "финищ" }
];

const NavigationHints = ({ currentStep }) => {
    const currentTip = tips.find(tip => tip.step === currentStep);
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            {currentTip ? currentTip.message : "Нет доступных подсказок на данном этапе."}
        </div>
    );
};

const RouteManager = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep(prevStep => Math.min(prevStep + 1, tips.length));
    };

    const handlePreviousStep = () => {
        setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
    };

    return (
        <div>
            <h1>Навигация по маршруту</h1>
            <NavigationHints currentStep={currentStep} />
            <div>
                <button onClick={handlePreviousStep} disabled={currentStep === 1}>
                    Предыдущий шаг
                </button>
                <button onClick={handleNextStep} disabled={currentStep === tips.length}>
                    Следующий шаг
                </button>
            </div>
        </div>
    );
};

export default RouteManager;