console.log(
  `\nВикористовуйте функцію triangle наступним чином:\ntriangle(value1, type1, value2, type2);\nДе:\n- value1, value2: числа (довжини або кути в градусах).\n- type1, type2: один з "leg", "hypotenuse", "adjacent angle", "opposite angle", "angle".\nПриклад: triangle(4, "leg", 8, "hypotenuse");\n`
);

function triangle(value1, type1, value2, type2) {
  const types = [
    "leg",
    "hypotenuse",
    "adjacent angle",
    "opposite angle",
    "angle",
  ];

  if (!types.includes(type1) || !types.includes(type2)) {
    console.log(
      "Неправильний тип введено. Будь ласка, прочитайте інструкцію і спробуйте ще раз."
    );
    return "failed";
  }

  if (value1 <= 0 || value2 <= 0) {
    console.log("Значення мають бути додатними числами.");
    return "failed";
  }

  const toRadians = (deg) => (deg * Math.PI) / 180;
  const toDegrees = (rad) => (rad * 180) / Math.PI;

  let a, b, c, alpha, beta;

  try {
    if (
      (type1 === "leg" && type2 === "hypotenuse") ||
      (type2 === "leg" && type1 === "hypotenuse")
    ) {
      const leg = type1 === "leg" ? value1 : value2;
      const hypotenuse = type1 === "hypotenuse" ? value1 : value2;

      if (leg >= hypotenuse) {
        console.log("Катет не може бути більшим або рівним гіпотенузі.");
        return "failed";
      }

      a = leg;
      c = hypotenuse;
      b = Math.sqrt(c ** 2 - a ** 2);
      alpha = toDegrees(Math.asin(a / c));
      beta = 90 - alpha;
    } else if (type1 === "leg" && type2 === "leg") {
      a = value1;
      b = value2;
      c = Math.sqrt(a ** 2 + b ** 2);
      alpha = toDegrees(Math.atan(a / b));
      beta = 90 - alpha;
    } else if (
      (type1 === "leg" && type2 === "adjacent angle") ||
      (type2 === "leg" && type1 === "adjacent angle")
    ) {
      const leg = type1 === "leg" ? value1 : value2;
      const angle = type1 === "adjacent angle" ? value1 : value2;

      if (angle >= 90) {
        console.log("Кут має бути гострим (менше 90 градусів).");
        return "failed";
      }

      a = leg;
      alpha = angle;
      c = a / Math.cos(toRadians(alpha));
      b = Math.sqrt(c ** 2 - a ** 2);
      beta = 90 - alpha;
    } else if (
      (type1 === "leg" && type2 === "opposite angle") ||
      (type2 === "leg" && type1 === "opposite angle")
    ) {
      const leg = type1 === "leg" ? value1 : value2;
      const angle = type1 === "opposite angle" ? value1 : value2;

      if (angle >= 90) {
        console.log("Кут має бути гострим (менше 90 градусів).");
        return "failed";
      }

      a = leg;
      alpha = angle;
      c = a / Math.sin(toRadians(alpha));
      b = Math.sqrt(c ** 2 - a ** 2);
      beta = 90 - alpha;
    } else if (
      (type1 === "hypotenuse" && type2 === "angle") ||
      (type2 === "hypotenuse" && type1 === "angle")
    ) {
      const hypotenuse = type1 === "hypotenuse" ? value1 : value2;
      const angle = type1 === "angle" ? value1 : value2;

      if (angle >= 90) {
        console.log("Кут має бути гострим (менше 90 градусів).");
        return "failed";
      }

      c = hypotenuse;
      alpha = angle;
      a = c * Math.sin(toRadians(alpha));
      b = Math.sqrt(c ** 2 - a ** 2);
      beta = 90 - alpha;
    } else {
      console.log(
        "Неправильна комбінація типів. Будь ласка, прочитайте інструкцію і спробуйте ще раз."
      );
      return "failed";
    }

    console.log(`Результати:
  a (катет): ${a.toFixed(2)}
  b (катет): ${b.toFixed(2)}
  c (гіпотенуза): ${c.toFixed(2)}
  alpha (кут напроти a): ${alpha.toFixed(2)}°
  beta (кут напроти b): ${beta.toFixed(2)}°`);

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const scale = 200 / c;
    const x0 = 50,
      y0 = 250;

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0, y0 - a * scale);
    ctx.lineTo(x0 + b * scale, y0);
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "rgba(0, 150, 255, 0.5)";
    ctx.fill();

    return "success";
  } catch (error) {
    console.log(
      "Сталася помилка під час обчислень. Будь ласка, перевірте введені дані і спробуйте ще раз."
    );
    return "failed";
  }
}
