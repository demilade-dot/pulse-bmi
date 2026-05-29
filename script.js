class PulseBMI {
  constructor() {
    // HEIGHT
    this.heightSlider = document.querySelector("#height-slider");
    this.heightValue = document.querySelector("#height-value");

    // WEIGHT
    this.weightSlider = document.querySelector("#weight-slider");
    this.weightValue = document.querySelector("#weight-value");

    // BUTTON
    this.calculateBtn = document.querySelector("#calculate-btn");

    // BMI RESULT
    this.bmiNumber = document.querySelector("#bmi-number");
    this.statusText = document.querySelector("#status-text");
    this.resultText = document.querySelector("#result-text");

    // PROGRESS RING
    this.progressCircle = document.querySelector("#progress-circle");

    // UNIT TOGGLE
    this.metricBtn = document.querySelector("#metric-btn");
    this.imperialBtn = document.querySelector("#imperial-btn");

    // TRACK CURRENT UNIT
    this.currentUnit = "metric";

    this.heightLabel = document.querySelector("#height-label");
    this.weightLabel = document.querySelector("#weight-label");

    // initialize
    this.init();
  }

  init() {
    this.heightSlider.addEventListener("input", () => this.updateHeightValue());
    this.weightSlider.addEventListener("input", () => this.updateWeightValue());
    this.calculateBtn.addEventListener("click", () => this.calculateBMI());
    this.metricBtn.addEventListener("click", () => this.switchUnit("metric"));
    this.imperialBtn.addEventListener("click", () =>
      this.switchUnit("imperial"),
    );
    this.calculateBMI();
    this.updateHeightValue();
  }

  updateHeightValue() {
    this.heightValue.textContent = this.heightSlider.value;
  }

  updateWeightValue() {
    this.weightValue.textContent = this.weightSlider.value;
  }

  switchUnit(unit) {
    this.currentUnit = unit;
    if (unit === "metric") {
      this.metricBtn.classList.add("active");
      this.imperialBtn.classList.remove("active");

      this.heightSlider.max = 350;
      this.heightSlider.value = 180;
      this.heightSlider.min = 100;
      this.updateHeightValue();

      this.weightSlider.max = 500;
      this.weightSlider.value = 75;
      this.weightSlider.min = 30;
      this.updateWeightValue();

      this.heightLabel.textContent = "HEIGHT (CM)";
      this.weightLabel.textContent = "WEIGHT (KG)";

      this.calculateBMI();
    } else {
      this.imperialBtn.classList.add("active");
      this.metricBtn.classList.remove("active");

      this.heightSlider.max = 96;
      this.heightSlider.value = 67;
      this.heightSlider.min = 48;
      this.updateHeightValue();

      this.weightSlider.max = 440;
      this.weightSlider.value = 165;
      this.weightSlider.min = 66;
      this.updateWeightValue();

      this.heightLabel.textContent = "HEIGHT (IN)";
      this.weightLabel.textContent = "WEIGHT (LBS)";
      this.calculateBMI();
    }
  }

  calculateBMI() {
    let height = parseFloat(this.heightSlider.value);
    let weight = parseFloat(this.weightSlider.value);
    let bmi;

    if (this.currentUnit === "metric") {
      height = height / 100;
      bmi = weight / (height * height);
    } else {
      bmi = (weight / (height * height)) * 703;
    }

    this.bmiNumber.textContent = bmi.toFixed(1);
    this.updateStatus(bmi);
    this.updateProgressRing(bmi);
  }

  updateStatus(bmi) {
    let status;
    let color;
    let message;

    if (bmi <= 18.5) {
      status = "Underweight";
      color = "#94A3B8";
      message =
        "You are underweight. Consider a balanced diet and consult a healthcare provider.";
    } else if (bmi <= 24.9) {
      status = "Normal Weight";
      color = "#22C55E";
      message = "You have a normal weight. Maintain your healthy lifestyle!";
    } else if (bmi <= 29.9) {
      status = "Overweight";
      color = "#F59E0B";
      message =
        "You are overweight. Consider a balanced diet and regular exercise.";
    } else {
      status = "Obese";
      color = "#EF4444";
      message =
        "You are obese. Consider consulting a healthcare provider for guidance.";
    }

    this.statusText.textContent = status;
    this.statusText.style.color = color;
    this.resultText.textContent = message;
  }

  updateProgressRing(bmi) {
    let percentage = ((bmi - 10) / 40) * 100; // Scale BMI to 0-100% range (10-50)
    percentage = Math.min(100, Math.max(0, percentage));
    const fill = 300 * (percentage / 100);
    this.progressCircle.style.strokeDasharray = `${fill} 300`;
  }
}

document.addEventListener("DOMContentLoaded", () => new PulseBMI());
