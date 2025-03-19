function calculateBMI(weight, heightCm, gender) {
    const heightM = heightCm / 100; // تبدیل قد از سانتی‌متر به متر
    const bmi = weight / (heightM ** 2);
    
    // if (gender.toLowerCase() === "male") {
    //     console.log(`BMI شما (مرد): ${bmi.toFixed(1)}`);
    // } else if (gender.toLowerCase() === "female") {
    //     console.log(`BMI شما (زن): ${bmi.toFixed(1)}`);
    // } else {
    //     console.log("جنسیت وارد شده معتبر نیست.");
    // }
    return bmi;
}

// calculateBMI(90, 175, "male");

function calculateHealthyWeight(heightCm) {
    const heightM = heightCm / 100; // Convert height to meters

    const minHealthyWeight = 18.5 * (heightM ** 2);
    const maxHealthyWeight = 24.9 * (heightM ** 2);
    const underweightThreshold = 18.5 * (heightM ** 2);
    const severelyUnderweightThreshold = 16.0 * (heightM ** 2);
    
    // Adding the requested classifications
    const overweightThreshold = 25.0 * (heightM ** 2);
    const obeseClass1Threshold = 30.0 * (heightM ** 2);
    const obeseClass2Threshold = 35.0 * (heightM ** 2);
    const obeseClass3Threshold = 40.0 * (heightM ** 2);

    console.log(`For height ${heightCm} cm:`);

    console.log(`Healthy Weight Range: ${minHealthyWeight.toFixed(1)} kg - ${maxHealthyWeight.toFixed(1)} kg`);
    console.log(`Underweight Threshold: Below ${underweightThreshold.toFixed(1)} kg`);
    console.log(`Severely Underweight Threshold: Below ${severelyUnderweightThreshold.toFixed(1)} kg`);
    // Logging the new classifications
    console.log(`Overweight Threshold: ${overweightThreshold.toFixed(1)} kg - ${obeseClass1Threshold.toFixed(1)} kg`);
    console.log(`Obese Class I Threshold: ${obeseClass1Threshold.toFixed(1)} kg - ${obeseClass2Threshold.toFixed(1)} kg`);
    console.log(`Obese Class II Threshold: ${obeseClass2Threshold.toFixed(1)} kg - ${obeseClass3Threshold.toFixed(1)} kg`);
    console.log(`Obese Class III Threshold: Above ${obeseClass3Threshold.toFixed(1)} kg`);
}

// Example:
const heightCm = 175; // Replace this with the user's input
calculateHealthyWeight(heightCm);