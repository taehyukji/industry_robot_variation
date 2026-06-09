const categories = [
  {
    id: "precision",
    label: "반복 정밀도",
    metrics: [
      { id: "avgPositionError", label: "평균 위치 오차", unit: "mm", direction: "lower", step: "0.001" },
      { id: "maxPositionError", label: "최대 위치 오차", unit: "mm", direction: "lower", step: "0.001" },
      { id: "successRate", label: "작업 성공률", unit: "%", direction: "higher", mode: "inversePercent", step: "0.1" },
    ],
  },
  {
    id: "failure",
    label: "고장률",
    metrics: [
      { id: "monthlyFailures", label: "월간 고장 횟수", unit: "회", direction: "lower", step: "0.1" },
      { id: "repairHours", label: "평균 수리 시간", unit: "시간", direction: "lower", step: "0.1" },
      { id: "uptime", label: "가동률", unit: "%", direction: "higher", mode: "inversePercent", step: "0.1" },
    ],
  },
  {
    id: "energy",
    label: "에너지 효율",
    metrics: [
      { id: "dailyEnergy", label: "하루 전기 사용량", unit: "kWh", direction: "lower", step: "0.1" },
      { id: "energyPerTask", label: "작업 1회당 전력 사용량", unit: "kWh", direction: "lower", step: "0.001" },
      { id: "standbyPower", label: "대기 전력", unit: "kW", direction: "lower", step: "0.01" },
    ],
  },
  {
    id: "speed",
    label: "작업속도",
    metrics: [
      { id: "cycleTime", label: "사이클 타임", unit: "초", direction: "lower", step: "0.1" },
      { id: "tasksPerHour", label: "시간당 작업 횟수", unit: "회", direction: "higher", step: "1" },
      { id: "tipSpeed", label: "끝단 이동 속도", unit: "m/s", direction: "higher", step: "0.01" },
    ],
  },
  {
    id: "payload",
    label: "가반하중",
    metrics: [
      { id: "maxPayload", label: "최대 가반하중", unit: "kg", direction: "higher", step: "0.1" },
      { id: "workingPayload", label: "권장 작업 하중", unit: "kg", direction: "higher", step: "0.1" },
      { id: "loadPositionError", label: "하중 증가 시 위치 오차", unit: "mm", direction: "lower", step: "0.001" },
    ],
  },
];

const industries = {
  medical: {
    title: "의학 분야",
    subtitle: "정밀도 우선",
    description: "반복 정밀도와 고장률이 가장 크게 반영되며, 가반하중은 낮은 비중으로 계산됩니다.",
    weights: { precision: 5, failure: 4, energy: 3, speed: 2, payload: 1 },
    baseline: {
      avgPositionError: 0.1,
      maxPositionError: 0.3,
      successRate: 96,
      monthlyFailures: 1.5,
      repairHours: 4,
      uptime: 97,
      dailyEnergy: 25,
      energyPerTask: 0.08,
      standbyPower: 0.3,
      cycleTime: 180,
      tasksPerHour: 20,
      tipSpeed: 0.6,
      maxPayload: 5,
      workingPayload: 2,
      loadPositionError: 0.2,
    },
    example: {
      avgPositionError: 0.05,
      maxPositionError: 0.14,
      successRate: 98.7,
      monthlyFailures: 0.7,
      repairHours: 2.5,
      uptime: 98.9,
      dailyEnergy: 18,
      energyPerTask: 0.055,
      standbyPower: 0.18,
      cycleTime: 135,
      tasksPerHour: 27,
      tipSpeed: 0.75,
      maxPayload: 6,
      workingPayload: 2.5,
      loadPositionError: 0.12,
    },
  },
  materials: {
    title: "재료공정 분야",
    subtitle: "하중과 에너지 우선",
    description: "가반하중, 고장률, 에너지 효율을 크게 반영하고 정밀도는 낮은 비중으로 계산됩니다.",
    weights: { precision: 1, failure: 4, energy: 4, speed: 3, payload: 5 },
    baseline: {
      avgPositionError: 0.5,
      maxPositionError: 1.5,
      successRate: 92,
      monthlyFailures: 3,
      repairHours: 6,
      uptime: 94,
      dailyEnergy: 90,
      energyPerTask: 0.5,
      standbyPower: 1.2,
      cycleTime: 60,
      tasksPerHour: 60,
      tipSpeed: 1.2,
      maxPayload: 50,
      workingPayload: 30,
      loadPositionError: 1.2,
    },
    example: {
      avgPositionError: 0.42,
      maxPositionError: 1.1,
      successRate: 95,
      monthlyFailures: 2,
      repairHours: 4,
      uptime: 96,
      dailyEnergy: 70,
      energyPerTask: 0.38,
      standbyPower: 0.85,
      cycleTime: 48,
      tasksPerHour: 78,
      tipSpeed: 1.35,
      maxPayload: 65,
      workingPayload: 42,
      loadPositionError: 0.9,
    },
  },
  semiconductor: {
    title: "반도체 제조 분야",
    subtitle: "정밀도와 속도 우선",
    description: "반복 정밀도와 작업속도가 최우선이며, 고장률도 높은 비중으로 계산됩니다.",
    weights: { precision: 5, failure: 4, energy: 3, speed: 5, payload: 1 },
    baseline: {
      avgPositionError: 0.02,
      maxPositionError: 0.05,
      successRate: 98.5,
      monthlyFailures: 1,
      repairHours: 3,
      uptime: 98.5,
      dailyEnergy: 40,
      energyPerTask: 0.03,
      standbyPower: 0.5,
      cycleTime: 30,
      tasksPerHour: 120,
      tipSpeed: 1,
      maxPayload: 3,
      workingPayload: 1.5,
      loadPositionError: 0.05,
    },
    example: {
      avgPositionError: 0.012,
      maxPositionError: 0.028,
      successRate: 99.2,
      monthlyFailures: 0.5,
      repairHours: 2,
      uptime: 99.2,
      dailyEnergy: 34,
      energyPerTask: 0.022,
      standbyPower: 0.32,
      cycleTime: 23,
      tasksPerHour: 155,
      tipSpeed: 1.15,
      maxPayload: 3.5,
      workingPayload: 1.8,
      loadPositionError: 0.032,
    },
  },
};

const errorMetricIds = [
  "avgPositionError",
  "maxPositionError",
  "successRate",
  "monthlyFailures",
  "repairHours",
  "uptime",
  "loadPositionError",
];

let activeIndustry = "medical";

const industryTabs = document.querySelector("#industry-tabs");
const industryDescription = document.querySelector("#industry-description");
const weightStrip = document.querySelector("#weight-strip");
const metricGroups = document.querySelector("#metric-groups");
const metricsForm = document.querySelector("#metrics-form");
const baselineButton = document.querySelector("#baseline-button");
const exampleButton = document.querySelector("#example-button");
const economyInputs = [
  document.querySelector("#purchase-cost"),
  document.querySelector("#monthly-cost"),
  document.querySelector("#monthly-benefit"),
  document.querySelector("#target-payback"),
];

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function readNumber(id) {
  const input = document.querySelector(`#metric-${id}`);
  const value = Number(input?.value);
  return Number.isFinite(value) ? value : null;
}

function formatNumber(value, digits = 0) {
  if (!Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

function scoreLower(value, baseline) {
  if (!Number.isFinite(value) || !Number.isFinite(baseline) || baseline <= 0) return 50;
  return clamp(50 + ((baseline - Math.max(value, 0)) / baseline) * 50);
}

function scoreHigher(value, baseline) {
  if (!Number.isFinite(value) || !Number.isFinite(baseline) || baseline <= 0) return 50;
  return clamp(50 + ((Math.max(value, 0) - baseline) / baseline) * 50);
}

function scoreMetric(metric, value, baseline) {
  if (metric.mode === "inversePercent") {
    const currentRisk = clamp(100 - Number(value), 0, 100);
    const baselineRisk = Math.max(100 - Number(baseline), 0.01);
    return scoreLower(currentRisk, baselineRisk);
  }

  if (metric.direction === "lower") {
    return scoreLower(Number(value), Number(baseline));
  }

  return scoreHigher(Number(value), Number(baseline));
}

function getScoreColor(score) {
  if (score >= 80) return "#137865";
  if (score >= 65) return "#2f6690";
  if (score >= 50) return "#d08a24";
  return "#c95742";
}

function getBand(score) {
  if (score >= 80) return "높음";
  if (score >= 65) return "양호";
  if (score >= 50) return "검증 필요";
  if (score >= 35) return "보완 필요";
  return "낮음";
}

function metricDirectionLabel(metric) {
  return metric.direction === "lower" ? "낮을수록 유리" : "높을수록 유리";
}

function weightLabel(weight) {
  return {
    5: "최상",
    4: "상",
    3: "중",
    2: "하",
    1: "최하",
  }[weight];
}

function renderIndustryTabs() {
  industryTabs.innerHTML = Object.entries(industries)
    .map(([id, industry]) => {
      const selected = id === activeIndustry ? "true" : "false";
      return `
        <button class="industry-tab" type="button" data-industry="${id}" aria-selected="${selected}">
          <strong>${industry.title}</strong>
          <span>${industry.subtitle}</span>
        </button>
      `;
    })
    .join("");
}

function renderWeights() {
  const industry = industries[activeIndustry];
  industryDescription.textContent = industry.description;
  weightStrip.innerHTML = categories
    .map((category) => {
      const weight = industry.weights[category.id];
      return `
        <div class="weight-item">
          <span>${category.label}</span>
          <strong>${weightLabel(weight)}</strong>
          <small>중요도 ${weight}</small>
        </div>
      `;
    })
    .join("");
}

function renderMetrics() {
  const industry = industries[activeIndustry];
  metricGroups.innerHTML = categories
    .map((category) => {
      const rows = category.metrics
        .map((metric) => {
          const baseline = industry.baseline[metric.id];
          return `
            <div class="metric-row">
              <label for="metric-${metric.id}">
                ${metric.label}
                <small>기준 ${baseline}${metric.unit} · ${metricDirectionLabel(metric)}</small>
              </label>
              <input
                id="metric-${metric.id}"
                type="number"
                min="0"
                step="${metric.step}"
                inputmode="decimal"
                value="${industry.example[metric.id]}"
              />
              <em>${metric.unit}</em>
            </div>
          `;
        })
        .join("");

      return `
        <section class="metric-group" data-category="${category.id}">
          <header>
            <strong>${category.label}</strong>
            <span class="metric-score" id="category-score-${category.id}">50</span>
          </header>
          ${rows}
        </section>
      `;
    })
    .join("");
}

function fillValues(kind) {
  const industry = industries[activeIndustry];
  const values = kind === "baseline" ? industry.baseline : industry.example;
  categories.forEach((category) => {
    category.metrics.forEach((metric) => {
      const input = document.querySelector(`#metric-${metric.id}`);
      if (input) input.value = values[metric.id];
    });
  });
  calculate();
}

function calculateCategoryScores() {
  const industry = industries[activeIndustry];
  const metricScores = {};
  const categoryScores = {};

  categories.forEach((category) => {
    const scores = category.metrics.map((metric) => {
      const value = readNumber(metric.id);
      const baseline = industry.baseline[metric.id];
      const score = scoreMetric(metric, value, baseline);
      metricScores[metric.id] = score;
      return score;
    });

    categoryScores[category.id] = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  });

  return { metricScores, categoryScores };
}

function calculateEconomy() {
  const purchaseCost = Number(document.querySelector("#purchase-cost").value) || 0;
  const monthlyCost = Number(document.querySelector("#monthly-cost").value) || 0;
  const monthlyBenefit = Number(document.querySelector("#monthly-benefit").value) || 0;
  const targetPayback = Math.max(Number(document.querySelector("#target-payback").value) || 1, 1);
  const netBenefit = monthlyBenefit - monthlyCost;
  const payback = netBenefit > 0 ? purchaseCost / netBenefit : Infinity;
  const score = netBenefit > 0 ? clamp(100 - (payback / (targetPayback * 2)) * 100) : 0;

  return { score, payback, netBenefit };
}

function weightedIndustryFit(categoryScores) {
  const weights = industries[activeIndustry].weights;
  const totalWeight = categories.reduce((sum, category) => sum + weights[category.id], 0);
  const weightedSum = categories.reduce(
    (sum, category) => sum + categoryScores[category.id] * weights[category.id],
    0,
  );
  return weightedSum / totalWeight;
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function buildRecommendation(adoption, efficiency, categoryScores, economy) {
  const ordered = [...categories].sort(
    (a, b) => categoryScores[a.id] - categoryScores[b.id],
  );
  const weakest = ordered[0];
  const strongest = ordered[ordered.length - 1];
  let title = "보완 후 재평가";
  let body = `${weakest.label} 점수가 가장 낮습니다. 이 항목을 먼저 개선하면 산업 적합도가 빠르게 올라갑니다.`;

  if (adoption >= 80 && efficiency >= 75) {
    title = "상용 투입 우선 검토";
    body = `${strongest.label} 강점이 뚜렷합니다. 경제성과 오류 안정성이 함께 받쳐주므로 현장 파일럿에서 검증 범위를 넓힐 수 있습니다.`;
  } else if (adoption >= 65 && efficiency >= 60) {
    title = "파일럿 투입 적합";
    body = `${weakest.label} 관리 조건을 정하면 제한된 공정부터 적용하기 좋습니다. 회수 기간은 ${Number.isFinite(economy.payback) ? `${formatNumber(economy.payback, 1)}개월` : "산정 불가"}입니다.`;
  } else if (adoption >= 50 || efficiency >= 50) {
    title = "조건부 검증";
    body = `${weakest.label}와 경제성 중 낮은 쪽을 보완해야 합니다. 현재 수치로는 작은 범위의 검증이 알맞습니다.`;
  }

  return { title, body };
}

function setScoreText(selector, value, digits = 0) {
  document.querySelector(selector).textContent = formatNumber(value, digits);
}

function updateMeter(selector, score) {
  const meter = document.querySelector(selector);
  meter.style.width = `${clamp(score)}%`;
  meter.style.background = getScoreColor(score);
}

function updateResultBar(barSelector, valueSelector, score, label) {
  const bar = document.querySelector(barSelector);
  const value = document.querySelector(valueSelector);
  bar.style.width = `${clamp(score)}%`;
  bar.style.background = getScoreColor(score);
  value.textContent = label;
}

function calculate() {
  const { metricScores, categoryScores } = calculateCategoryScores();
  const economy = calculateEconomy();
  const fitScore = weightedIndustryFit(categoryScores);
  const errorScore = average(errorMetricIds.map((id) => metricScores[id]));
  const adoptionScore = fitScore * 0.7 + economy.score * 0.3;
  const efficiencyScore = errorScore * 0.65 + economy.score * 0.35;

  categories.forEach((category) => {
    const score = categoryScores[category.id];
    const badge = document.querySelector(`#category-score-${category.id}`);
    badge.textContent = formatNumber(score);
    badge.style.background = getScoreColor(score);
  });

  setScoreText("#adoption-score", adoptionScore);
  setScoreText("#efficiency-score", efficiencyScore);
  setScoreText("#fit-score", fitScore);
  setScoreText("#error-score", errorScore);
  setScoreText("#economy-score", economy.score);
  document.querySelector("#payback-value").textContent = Number.isFinite(economy.payback)
    ? `${formatNumber(economy.payback, 1)}개월`
    : "불가";
  updateMeter("#adoption-meter", adoptionScore);
  updateMeter("#fit-meter", fitScore);
  updateMeter("#efficiency-meter", efficiencyScore);
  updateResultBar("#bar-adoption", "#bar-adoption-value", adoptionScore, `${formatNumber(adoptionScore)}점`);
  updateResultBar("#bar-efficiency", "#bar-efficiency-value", efficiencyScore, `${formatNumber(efficiencyScore)}점`);
  updateResultBar("#bar-fit", "#bar-fit-value", fitScore, `${formatNumber(fitScore)}점`);
  updateResultBar("#bar-error", "#bar-error-value", errorScore, `${formatNumber(errorScore)}점`);
  updateResultBar("#bar-economy", "#bar-economy-value", economy.score, `${formatNumber(economy.score)}점`);
  updateResultBar(
    "#bar-payback",
    "#bar-payback-value",
    economy.score,
    Number.isFinite(economy.payback) ? `${formatNumber(economy.payback, 1)}개월` : "불가",
  );

  const chip = document.querySelector("#status-chip");
  chip.textContent = getBand((adoptionScore + efficiencyScore) / 2);
  chip.style.background = `${getScoreColor((adoptionScore + efficiencyScore) / 2)}22`;
  chip.style.color = getScoreColor((adoptionScore + efficiencyScore) / 2);

  const recommendation = buildRecommendation(adoptionScore, efficiencyScore, categoryScores, economy);
  document.querySelector("#recommendation").innerHTML = `
    <strong>${recommendation.title}</strong>
    <span>${recommendation.body}</span>
  `;
}

industryTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-industry]");
  if (!button) return;
  activeIndustry = button.dataset.industry;
  renderIndustryTabs();
  renderWeights();
  renderMetrics();
  calculate();
});

metricsForm.addEventListener("input", calculate);
economyInputs.forEach((input) => input.addEventListener("input", calculate));
baselineButton.addEventListener("click", () => fillValues("baseline"));
exampleButton.addEventListener("click", () => fillValues("example"));

renderIndustryTabs();
renderWeights();
renderMetrics();
calculate();
