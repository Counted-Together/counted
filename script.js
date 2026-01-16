stateSelect.addEventListener("change", () => {
  const state = stateSelect.value;

  // Clear existing options
  seniorSelect.innerHTML = '<option value="">Optional</option>';
  juniorSelect.innerHTML = '<option value="">Optional</option>';
  houseSelect.innerHTML = '<option value="">Optional</option>';

  if (!state) return;

  const data = REPRESENTATIVES[state];

  data.senators.forEach(name => {
    const opt1 = document.createElement("option");
    opt1.value = name;
    opt1.textContent = name;
    seniorSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = name;
    opt2.textContent = name;
    juniorSelect.appendChild(opt2);
  });

  data.house.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    houseSelect.appendChild(opt);
  });
});
const stateSelect = document.getElementById("state");
const seniorSelect = document.getElementById("seniorSenator");
const juniorSelect = document.getElementById("juniorSenator");
const houseSelect = document.getElementById("houseRep");

// Populate state dropdown
Object.keys(REPRESENTATIVES).forEach(state => {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateSelect.appendChild(option);
});
const REPRESENTATIVES = {
  "Minnesota": {
    senators: [
      "Amy Klobuchar",
      "Tina Smith"
    ],
    house: [
      "Ilhan Omar",
      "Betty McCollum",
      "Tom Emmer"
    ]
  },
  "Missouri": {
    senators: [
      "Josh Hawley",
      "Eric Schmitt"
    ],
    house: [
      "Cori Bush",
      "Ann Wagner",
      "Sam Graves"
    ]
  }
};
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbysG0D7bsNicaqemV7vX79nUdzW-eUmYoqsCO_QAKHMm2Yv0zVnEJ6pWCxLTZ-gp_N_eg/exec';

const logForm = document.getElementById('logForm');
const confirmation = document.getElementById('confirmation');

logForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const offices = [
    document.getElementById('seniorSenator').value,
    document.getElementById('juniorSenator').value,
    document.getElementById('houseRep').value
  ].filter(x => x);

  const method = document.getElementById('method').value;
  const today = new Date().toISOString().split('T')[0];

  let counted = [];
  for (const office of offices) {
    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ office, method, date: today }),
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await res.json();
      if(result.status === 'success') counted.push(office);
    } catch(err) {
      console.error(err);
    }
  }

  confirmation.textContent = counted.length
    ? `Your action was counted for: ${counted.join(', ')}.`
    : 'No actions logged. Please try again.';
});
