function calculateBMI(weight, heightCm, gender) {
    const heightM = heightCm / 100; // تبدیل قد از سانتی‌متر به متر
    const bmi = weight / (heightM ** 2);
    
    if (gender.toLowerCase() === "male") {
        console.log(`BMI شما (مرد): ${bmi.toFixed(1)}`);
    } else if (gender.toLowerCase() === "female") {
        console.log(`BMI شما (زن): ${bmi.toFixed(1)}`);
    } else {
        console.log("جنسیت وارد شده معتبر نیست.");
    }
    return bmi;
}

calculateBMI(90, 175, "male");