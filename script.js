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
