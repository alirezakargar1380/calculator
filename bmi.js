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
// calculateHealthyWeight(heightCm);

function ss(num1, num2) {
    return (num1 - num2) / ((num1 + num2) / 2) * 100;
}

// console.log(ss(1000000000, 1200000))



/**
 * Loan Calculator
 * This calculator helps users determine monthly payments, total interest,
 * and amortization schedule for loans.
 */

function calculateLoan(loanAmount, numberOfInstallments, annualInterestRate, startDate = new Date()) {
    // Convert annual interest rate to monthly rate (decimal)
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    
    // Calculate monthly payment using the formula: P = L[i(1+i)^n]/[(1+i)^n-1]
    // Where P = payment, L = loan amount, i = monthly interest rate, n = number of payments
    const monthlyPayment = loanAmount * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfInstallments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfInstallments) - 1);
    
    // Calculate total payment over the life of the loan
    const totalPayment = monthlyPayment * numberOfInstallments;
    
    // Calculate total interest paid
    const totalInterest = totalPayment - loanAmount;
    
    // Generate amortization schedule
    const amortizationSchedule = [];
    let remainingBalance = loanAmount;
    let currentDate = new Date(startDate);
    
    for (let i = 1; i <= numberOfInstallments; i++) {
        // Calculate interest for this period
        const interestPayment = remainingBalance * monthlyInterestRate;
        
        // Calculate principal for this period
        const principalPayment = monthlyPayment - interestPayment;
        
        // Update remaining balance
        remainingBalance -= principalPayment;
        
        // Advance to next month
        currentDate.setMonth(currentDate.getMonth() + 1);
        
        // Add this payment to the schedule
        amortizationSchedule.push({
            paymentNumber: i,
            paymentDate: new Date(currentDate),
            monthlyPayment: monthlyPayment,
            principalPayment: principalPayment,
            interestPayment: interestPayment,
            remainingBalance: Math.max(0, remainingBalance) // Ensure we don't go below zero due to rounding
        });
    }
    
    return {
        loanAmount,
        numberOfInstallments,
        annualInterestRate,
        monthlyPayment,
        totalPayment,
        totalInterest,
        amortizationSchedule
    };
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

// Example usage
function displayLoanDetails(loanDetails) {
    console.log("===== LOAN SUMMARY =====");
    console.log(`Loan Amount: ${formatCurrency(loanDetails.loanAmount)}`);
    console.log(`Number of Installments: ${loanDetails.numberOfInstallments} months`);
    console.log(`Annual Interest Rate: ${loanDetails.annualInterestRate}%`);
    console.log(`Monthly Payment: ${formatCurrency(loanDetails.monthlyPayment)}`);
    console.log(`Total Payment: ${formatCurrency(loanDetails.totalPayment)}`);
    console.log(`Total Interest: ${formatCurrency(loanDetails.totalInterest)}`);
    
    console.log("\n===== AMORTIZATION SCHEDULE =====");
    console.log("Payment # | Date | Payment | Principal | Interest | Remaining Balance");
    
    loanDetails.amortizationSchedule.forEach(payment => {
        console.log(
            `${payment.paymentNumber.toString().padStart(9)} | ` +
            `${formatDate(payment.paymentDate)} | ` +
            `${formatCurrency(payment.monthlyPayment)} | ` +
            `${formatCurrency(payment.principalPayment)} | ` +
            `${formatCurrency(payment.interestPayment)} | ` +
            `${formatCurrency(payment.remainingBalance)}`
        );
    });
}

// Example: $200,000 loan for 30 years (36 months) at 4.5% interest
// const loanExample = calculateLoan(1000000000, 12, 4);
// displayLoanDetails(loanExample);



// ============ savings calculator

// monthly

// const principal = 20000; // Initial amount
// const monthlyRate = 0.03; // 3% monthly interest rate
// const months = 12; // Number of months

// let balance = principal;
// console.log("Month\tInterest\tBalance");

// for (let month = 1; month <= months; month++) {
//     const interest = balance * monthlyRate; // Calculate interest
//     balance += interest; // Update balance
//     console.log(`${month}\t$${interest.toFixed(2) / 12}\t\t$${balance.toFixed(2)}`);
// }

// daily

// Constants
// let principal = 20000; // initial amount
// const dailyRate = 1.03 / 365; // daily interest rate (3% annual)
// const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // number of days in each month
// const output = [];

// Function to calculate compound interest over one month
// function calculateMonthlyCompoundInterest(principal, dailyRate, days) {
//     let balance = principal * Math.pow((1 + dailyRate), days);
//     let interest = balance - principal;
//     return {
//         interest: interest,
//         balance: balance
//     };
// }

// Calculate for each month
// for (let month = 0; month < 12; month++) {
//     const days = 31;
//     // const days = daysInMonth[month];
//     const result = calculateMonthlyCompoundInterest(principal, dailyRate, days);
//     output.push({
//         month: month + 1,
//         // interest: result.interest,
//         // balance: result.balance,
//         interest: result.interest.toFixed(2),
//         balance: result.balance.toFixed(2)
//     });
//     // Update principal for next month
//     principal = result.balance;
// }

// Print output
// console.log("Month   Interest        Balance");
// output.forEach(entry => {
//     console.log(`${entry.month}       $${entry.interest}           $${entry.balance}`);
// });

//  ============================================= monthly
// let amount = 20000; // Initial amount
// let annualInterestRate = 0.03; // Annual interest rate
// let monthlyInterestRate = annualInterestRate / 12; // Monthly interest rate
// // let dailyInterestRate = annualInterestRate / 30; // Daily interest rate

// console.log("Month   Interest        Balance");
// for (let month = 1; month <= 12; month++) {
//     // let interest = amount * monthlyInterestRate; // Calculate interest for the month
//     let interest = amount * dailyInterestRate; // Calculate interest for the day
//     amount += interest; // Update balance
//     console.log(`${month.toString().padStart(5)} $${interest.toFixed(2).padStart(10)} $${amount.toFixed(2).padStart(11)}`);
// }

// =============================================== daily
let principal = 20000; // Initial amount
const annualRate = 3 / 100; // 3% annual interest
const daysInYear = 365; // Days in a year
const dailyRate = annualRate / daysInYear; // Daily interest rate

let innn = 0;

console.log("Month   Interest        Balance");

// Calculate interest and balance for each month
for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(2025, month, 0).getDate(); // Get number of days in the month
    const interest = principal * (Math.pow((1 + dailyRate), daysInMonth) - 1); // Compound interest for the month
    const balance = principal + interest; // Total balance after interest
    
    innn += +interest.toFixed(2)

    console.log(`${month}       $${interest.toFixed(2)}           $${balance.toFixed(2)}`);
    
    // Update principal for the next month's calculation
    principal = balance; // New principal is the balance after interest
}

console.log(innn.toFixed(2))