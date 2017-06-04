# Sanctu Profit Sharing

The motivation for this RFC is to:

1. Provide a framework for Sanctuary Computer employees to share in the profit that they help to create.

2. Help employees at Sanctuary see real results from the minutia decisions they make on a day to day basis, using friendly metric to measure the team's performance.

3. Provide real incentive for technologists to stay with the Sanctuary Computer team for a longer time period (4 years or longer), and recognize those who've helped build the company, and the mindshare within.

4. Build in a methodology for understanding how much captial should be re-invested into the team and studio infrastructure (office, travel, etc).

5. Protect the interests of existing technologists, should a Sanctuary member leave the team.

6. Strike a more generous balance (than traditional roles) between the safety and incentives of a full-time position, and the financial reward of freelancing.

# Profit Share Units (PSU)

A **Profit Share Unit** (or PSU for short) is used to describe a "stock like" unit that is earnt over time.  At Sanctuary Computer, a full time technologist will earn 2x PSUs per month, with a cap of 96 (or 4 years worth of PSU earnings).

A part time technologist will earn a proportional fraction of that rate, based their weekly hours. (20 hrs per week is 1 PSU per month).

# Salary Cap

For a Profit Share system to work fairly, a Salary Cap must be introduced. At Sanctuary Computer, we have made a conscious decision for this cap to be on the moderate side of market value, at 90k USD per year.

To accomodate technologists of various skill levels, the technologist's starting salary will be set at the discretion of the acting CTO, and increased over time in the traditional way (in tandem with their skill level, growth & experience).

This model ultimately allows Sanctuary Computer to grant higher profit share payouts - those profit payouts become less of a "bonus", and more of an "earned income". This focus both enables a safer, more predictable business model for the company, and a larger payout for a faster & more efficient team.

# Yearly Calculation & Payout Timing

The yearly calculation point for profit shares will happen during the first week of November each year, and will be based on the projected income & PSU totals for the entire year.

This is so the studio's "reinvestment" share can be spent prior to the end of the tax cycle, and so that technologists can play around their payout ahead of time.

Technologist payouts will happen as a part of the final pay cycle for the year, and will be adjusted shortly prior to that cycle, should the projected income change since the initial calculation.

# Calculation Examples

The following examples work from a theorit

|               | Tech #1   | Tech #2   | Tech #3   | Tech #4   |
| ------------- | ----------| ----------|-----------|-----------|
| Time @ SC     | 12 Months | 22 Months | 60 Months | 30 Months |
| Salary        | 78,000    | 42,000    | 90,000    | 82,000    |
| PSU           | 24        | 44        | 96        | 60        |

### Scenario One - Low Efficiency


```
let totalIncome = 440,000;
let costOfLabor = 292,000;
let expenses    = 96,000;

let totalProfit = totalIncome - (costOfLabor + expenses) // 52,000

let costOfLaborPerMonth = costOfLabor / 12; // 24,333
let studioBuffer = costOfLaborPerMonth * 2; // 48,666
let studioUpgradeBudget = costOfLaborPerMonth; // 24,333

let profitPool = totalProfit - studioBuffer - studioUpgradeBudget; // - 21,999

if (profitPool <= 0) {
  return {
    profitPool: 0,
    studioBuffer: XXXX,
    studioUpdgradeBudget: XXXX,
    performance: 'POOR'
  };
};

----

//best studio efficiency = 3x (480 * 3 / 480)

studio efficiency  212 / 480 = 0.44

let studioEfficiency = totalProfit / costOfLabor; //

---
92 * (0.44 / 2) * (PSU / total PSU) = profit share

```

### Scenario Two - Moderate Efficiency

```
let totalIncome = 580,000;
let costOfLabor = 292,000;
let expenses    = 96,000;

let totalProfit = totalIncome - (costOfLabor + expenses) // 192,000

let costOfLaborPerMonth = costOfLabor / 12; // 24,333
let studioBuffer = costOfLaborPerMonth * 2; // 48,666
let studioUpgradeBudget = costOfLaborPerMonth; // 24,333

let profitPool = totalProfit - studioBuffer - studioUpgradeBudget; // 119,000


let totalPSUIssued = 24 + 44 + 96 + 60; // 224

```

|               | Tech #1   | Tech #2   | Tech #3   | Tech #4   |
| ------------- | ----------| ----------|-----------|-----------|
| PSU           | 24        | 44        | 96        | 60        |
| Profit Share  | 31,284    | 57,354    | 127,136   | 78,210    |


---

### Scenario Three - Excellent Efficiency

```
let totalIncome = 820,000;
let costOfLabor = 292,000;
let expenses    = 96,000;

let totalProfit = totalIncome - (costOfLabor + expenses) // 432,000

let costOfLaborPerMonth = costOfLabor / 12; // 24,333
let studioBuffer = costOfLaborPerMonth * 2; // 48,666
let studioUpgradeBudget = costOfLaborPerMonth; // 24,333

let profitPool = totalProfit - studioBuffer - studioUpgradeBudget; // 359000

292000/359000 = 0.81333

let totalPSUIssued = 24 + 44 + 96 + 60; // 224

```

|               | Tech #1   | Tech #2   | Tech #3   | Tech #4   |
| ------------- | ----------| ----------|-----------|-----------|
| PSU           | 24        | 44        | 96        | 60        |
| Profit Share  | 31,284    | 57,354    | 127,136   | 78,210    |


