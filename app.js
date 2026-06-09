const categories = [
  {
    id: "precision",
    label: "반복 정밀도",
    metrics: [
      { id: "avgPositionError", label: "평균 위치 오차", unit: "mm", direction: "lower", step: "0.001", devCost: true },
      { id: "maxPositionError", label: "최대 위치 오차", unit: "mm", direction: "lower", step: "0.001", devCost: true },
      { id: "successRate", label: "작업 성공률", unit: "%", direction: "higher", mode: "inversePercent", step: "0.1", derived: true },
    ],
  },
  {
    id: "failure",
    label: "고장률",
    metrics: [
      { id: "monthlyFailures", label: "월간 고장 횟수", unit: "회", direction: "lower", step: "0.1", devCost: true },
      { id: "repairHours", label: "평균 수리 시간", unit: "시간", direction: "lower", step: "0.1", devCost: true },
      { id: "uptime", label: "가동률", unit: "%", direction: "higher", mode: "inversePercent", step: "0.1", derived: true },
    ],
  },
  {
    id: "energy",
    label: "에너지 효율",
    metrics: [
      { id: "dailyEnergy", label: "하루 전기 사용량", unit: "kWh", direction: "lower", step: "0.1", devCost: true },
      { id: "energyPerTask", label: "작업 1회당 전력 사용량", unit: "kWh", direction: "lower", step: "0.001", devCost: true },
      { id: "standbyPower", label: "대기 전력", unit: "kW", direction: "lower", step: "0.01", devCost: true },
    ],
  },
  {
    id: "speed",
    label: "작업속도",
    metrics: [
      { id: "cycleTime", label: "사이클 타임", unit: "초", direction: "lower", step: "0.1", devCost: true },
      { id: "tasksPerHour", label: "시간당 작업 횟수", unit: "회", direction: "higher", step: "1", devCost: true },
      { id: "tipSpeed", label: "끝단 이동 속도", unit: "m/s", direction: "higher", step: "0.01", devCost: true },
    ],
  },
  {
    id: "payload",
    label: "가반하중",
    metrics: [
      { id: "maxPayload", label: "최대 가반하중", unit: "kg", direction: "higher", step: "0.1", devCost: true },
      { id: "workingPayload", label: "권장 작업 하중", unit: "kg", direction: "higher", step: "0.1", devCost: true },
      { id: "loadPositionError", label: "하중 증가 시 위치 오차", unit: "mm", direction: "lower", step: "0.001", devCost: true },
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
const FIXED_PURCHASE_COST = 15000;
const BASE_MONTHLY_COST = 150;
const BASE_MONTHLY_BENEFIT = 800;

const industryTabs = document.querySelector("#industry-tabs");
const industryDescription = document.querySelector("#industry-description");
const weightStrip = document.querySelector("#weight-strip");
const metricGroups = document.querySelector("#metric-groups");
const metricsForm = document.querySelector("#metrics-form");
const baselineButton = document.querySelector("#baseline-button");
const exampleButton = document.querySelector("#example-button");
const economyInputs = [document.querySelector("#target-payback")];

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

function estimatePercentFromSourceScore(sourceScore, baselinePercent) {
  if (sourceScore >= 50) {
    return clamp(baselinePercent + ((sourceScore - 50) / 50) * (99.9 - baselinePercent), 0, 99.9);
  }

  return clamp(baselinePercent - ((50 - sourceScore) / 50) * baselinePercent, 0, 99.9);
}

function setMetricValue(id, value, digits = 1) {
  const input = document.querySelector(`#metric-${id}`);
  if (!input) return;
  input.value = Number(value).toFixed(digits);
}

function clampMetricValue(metric, baseline) {
  if (metric.derived) return;
  const input = document.querySelector(`#metric-${metric.id}`);
  if (!input || input.value === "") return;

  const value = Number(input.value);
  if (!Number.isFinite(value)) return;

  const limits = metricLimits(metric, baseline);
  const limitedValue = clamp(value, limits.min, limits.max);
  if (limitedValue !== value) {
    input.value = limitedValue.toFixed(decimalPlaces(metric.step));
  }
}

function enforceMetricLimits() {
  const baseline = industries[activeIndustry].baseline;
  categories.forEach((category) => {
    category.metrics.forEach((metric) => {
      clampMetricValue(metric, baseline[metric.id]);
    });
  });
}

function syncDerivedMetrics() {
  const baseline = industries[activeIndustry].baseline;
  const avgError = readNumber("avgPositionError") ?? baseline.avgPositionError;
  const maxError = readNumber("maxPositionError") ?? baseline.maxPositionError;
  const precisionSourceScore = average([
    scoreLower(avgError, baseline.avgPositionError),
    scoreLower(maxError, baseline.maxPositionError),
  ]);
  const estimatedSuccess = estimatePercentFromSourceScore(precisionSourceScore, baseline.successRate);

  const failures = readNumber("monthlyFailures") ?? baseline.monthlyFailures;
  const repairHours = readNumber("repairHours") ?? baseline.repairHours;
  const baselineBurden = Math.max(baseline.monthlyFailures * baseline.repairHours, 0.01);
  const currentBurden = Math.max(failures * repairHours, 0);
  const uptimeSourceScore = scoreLower(currentBurden, baselineBurden);
  const estimatedUptime = estimatePercentFromSourceScore(uptimeSourceScore, baseline.uptime);

  setMetricValue("successRate", estimatedSuccess);
  setMetricValue("uptime", estimatedUptime);
}

function enforcePayloadLimit() {
  const baseline = industries[activeIndustry].baseline;
  const workingLimits = metricLimits(
    categories.find((category) => category.id === "payload").metrics.find((metric) => metric.id === "workingPayload"),
    baseline.workingPayload,
  );
  const maxPayload = readNumber("maxPayload");
  const workingInput = document.querySelector("#metric-workingPayload");
  if (!workingInput || !Number.isFinite(maxPayload)) return;

  workingInput.max = String(Math.min(workingLimits.max, maxPayload));
  const workingPayload = Number(workingInput.value);
  const limitedPayload = Math.min(workingLimits.max, maxPayload);
  if (Number.isFinite(workingPayload) && workingPayload > limitedPayload) {
    workingInput.value = limitedPayload;
  }
}

function calculateDevelopmentCost(purchaseCost) {
  const baseline = industries[activeIndustry].baseline;
  const costMetrics = categories.flatMap((category) => category.metrics).filter((metric) => metric.devCost);
  const difficultyPressure = average(
    costMetrics.map((metric) => {
      const value = readNumber(metric.id) ?? baseline[metric.id];
      const reference = baseline[metric.id];
      if (!Number.isFinite(value) || !Number.isFinite(reference) || reference <= 0) return 0;

      return (scoreMetric(metric, value, reference) - 50) / 50;
    }),
  );
  const baseDevelopmentRate = 0.12;
  const difficultyRate = baseDevelopmentRate + difficultyPressure * 0.85;

  return Math.round(purchaseCost * clamp(difficultyRate, 0, 1.5));
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

function decimalPlaces(step) {
  const stepText = String(step);
  return stepText.includes(".") ? stepText.split(".")[1].length : 0;
}

function metricLimits(metric, baseline) {
  if (metric.derived) {
    return { min: 0, max: 99.9 };
  }

  return {
    min: 0,
    max: baseline * 2,
  };
}

function formatMetricLimit(value, metric) {
  return formatNumber(value, decimalPlaces(metric.step));
}

function metricRangeHint(metric, baseline) {
  const limits = metricLimits(metric, baseline);
  return `범위 ${formatMetricLimit(limits.min, metric)}~${formatMetricLimit(limits.max, metric)}${metric.unit}`;
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

function weightColor(weight) {
  return {
    5: "#0b3a75",
    4: "#155a9f",
    3: "#2f7dc1",
    2: "#6aa9d8",
    1: "#b8d8ee",
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
        <div class="weight-item" style="--weight-level: ${weight}; --weight-fill: ${weightColor(weight)};">
          <div class="weight-bar" aria-hidden="true"><span></span></div>
          <div class="weight-meta">
            <span>${category.label}</span>
            <strong>${weightLabel(weight)}</strong>
            <small>중요도 ${weight}/5</small>
          </div>
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
          const limits = metricLimits(metric, baseline);
          const rowClass = metric.derived ? "metric-row auto-metric" : "metric-row";
          const readOnly = metric.derived ? "readonly aria-readonly=\"true\"" : "";
          return `
            <div class="${rowClass}">
              <label for="metric-${metric.id}">
                ${metric.label}
                <small>기준 ${baseline}${metric.unit} · ${metricRangeHint(metric, baseline)} · ${metricDirectionLabel(metric)}</small>
              </label>
              <input
                id="metric-${metric.id}"
                type="number"
                min="${limits.min}"
                max="${limits.max}"
                step="${metric.step}"
                inputmode="decimal"
                value="${industry.example[metric.id]}"
                ${readOnly}
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

function calculateMonthlyOperatingCost(categoryScores) {
  const energyScore = categoryScores.energy ?? 50;
  const failureScore = categoryScores.failure ?? 50;
  const energyImpact = ((50 - energyScore) / 50) * 0.3;
  const failureImpact = ((50 - failureScore) / 50) * 0.45;
  const costFactor = clamp(1 + energyImpact + failureImpact, 0.35, 2);

  return Math.round(BASE_MONTHLY_COST * costFactor);
}

function calculateMonthlyBenefit(fitScore) {
  const benefitFactor = clamp(fitScore / 50, 0.2, 2);
  return Math.round(BASE_MONTHLY_BENEFIT * benefitFactor);
}

function calculateEconomy(categoryScores, fitScore) {
  const purchaseCost = FIXED_PURCHASE_COST;
  const developmentCost = calculateDevelopmentCost(purchaseCost);
  const initialCost = purchaseCost + developmentCost;
  const monthlyCost = calculateMonthlyOperatingCost(categoryScores);
  const monthlyBenefit = calculateMonthlyBenefit(fitScore);
  const targetPayback = Math.max(Number(document.querySelector("#target-payback").value) || 1, 1);
  const netBenefit = monthlyBenefit - monthlyCost;
  const payback = netBenefit > 0 ? initialCost / netBenefit : Infinity;
  const score = netBenefit > 0 ? clamp(100 - (payback / (targetPayback * 2)) * 100) : 0;

  return { score, payback, netBenefit, developmentCost, initialCost, monthlyCost, monthlyBenefit };
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
  enforceMetricLimits();
  enforcePayloadLimit();
  syncDerivedMetrics();
  const { metricScores, categoryScores } = calculateCategoryScores();
  const fitScore = weightedIndustryFit(categoryScores);
  const economy = calculateEconomy(categoryScores, fitScore);
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
  document.querySelector("#development-cost").textContent = formatNumber(economy.developmentCost);
  document.querySelector("#initial-cost").textContent = formatNumber(economy.initialCost);
  document.querySelector("#monthly-cost").textContent = formatNumber(economy.monthlyCost);
  document.querySelector("#monthly-benefit").textContent = formatNumber(economy.monthlyBenefit);
  document.querySelector("#summary-development-cost").textContent = `${formatNumber(economy.developmentCost)}만원`;
  document.querySelector("#summary-initial-cost").textContent = `${formatNumber(economy.initialCost)}만원`;
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
metricsForm.addEventListener("change", calculate);
economyInputs.forEach((input) => input.addEventListener("input", calculate));
economyInputs.forEach((input) => input.addEventListener("change", calculate));
baselineButton.addEventListener("click", () => fillValues("baseline"));
exampleButton.addEventListener("click", () => fillValues("example"));

renderIndustryTabs();
renderWeights();
renderMetrics();
calculate();
