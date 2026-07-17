ux = ['Lead', 'Designer', 'Researcher', 'Developer', 'Strategist'];

roles = 0;
setInterval (() => {
	role = ux[roles];
	let next = 1;
	document.getElementById('jobTitle').innerHTML = ``; //clears previous
  setInterval (() => {
    document.getElementById('jobTitle').innerHTML = document.getElementById('jobTitle').innerHTML + ux[roles].substring(next - 1 , next);
    next = next + 1; //typing effect
	},
100);

  return roles >= 4 ? roles = 0 : roles = (roles + 1);

}, 4000);
