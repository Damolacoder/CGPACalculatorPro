const add = document.querySelector('#add');
const courseCode = document.querySelector('#course-code');
const creditUnit = document.querySelector('#credit-Unit');
const grade = document.querySelector('#grade');
const tbody = document.querySelector("#tbody");
const tfoot = document.querySelector('#tfoot')
const table = document.querySelector("#table");
const calcGP = document.querySelector("#calc-gp")
const clear = document.querySelector("#clear")
let gpArray = [];


add.addEventListener("click", () => {
  if (courseCode.value === '' || creditUnit.value === '' || grade.selectedIndex === 0) {
alert('Incomplete input, kindly fill up!')
} else {
  const tr = document.createElement('tr');
  const tdCourseCode = document.createElement('td');
  tdCourseCode.innerHTML = courseCode.value;
  const tdCreditUnit = document.createElement('td');
  tdCreditUnit.innerHTML = creditUnit.value;
  const tdGrade = document.createElement('td');
  tdGrade.innerHTML = grade.options[grade.selectedIndex].text;
  tr.appendChild(tdCourseCode);
  tr.appendChild(tdCreditUnit);
  tr.appendChild(tdGrade);
  tbody.appendChild(tr);

  table.classList.remove('display-none');
  calcGP.classList.remove('display-none');
  clear.classList.remove('display-none');

  gpArray.push({'creditUnit': creditUnit.value, 'grade': grade.options[grade.selectedIndex].value});

  courseCode.value = '';
  creditUnit.value = '';
  grade.selectedIndex = '0';

}
});


calcGP.addEventListener('click', () => {
  let creditUnits = 0, productOfCreditUnitsAndGrades = 0,
  sumOfProductOfCreditUnitsAndGrades = 0;

  gpArray.forEach(result => {
     creditUnits += parseInt(result.creditUnit);
     productOfCreditUnitsAndGrades = parseInt(result.creditUnit) * parseInt(result.grade);
     sumOfProductOfCreditUnitsAndGrades += productOfCreditUnitsAndGrades;
  });
  const tr = document.createElement('tr');

  const tdTotalCreditUnits = document.createElement('td');
  tdTotalCreditUnits.innerHTML = `Your total credit is ${creditUnits}`;

  const tdGpa = document.createElement('td');
  tdGpa.setAttribute('colspan', '2');
  tdGpa.innerHTML = "Your GPA is " + (sumOfProductOfCreditUnitsAndGrades / creditUnits).toFixed(2);

  if (tfoot.querySelector('tr') !== null) {
    tfoot.querySelector('tr').remove();
  };
  tr.appendChild(tdTotalCreditUnits);
  tr.appendChild(tdGpa);
  tfoot.appendChild(tr);

});

clear.addEventListener('click', () => {
  gpArray = [];
  if (tfoot !== null) {
    tfoot.querySelector('tr').remove();
  }
  tbody.querySelectorAll('*').forEach(child => {
    child.remove()
  });
  table.classList.add('display-none');
  calcGP.classList.add('display-none');
  clear.classList.add('display-none');
});
