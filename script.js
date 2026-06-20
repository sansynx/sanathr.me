const projects = [
  {
    title: "OffGriid",
    text: "Offline mesh-networked Android messaging for secure communication without internet.",
    href: "https://offgriid.vercel.app/",
  },
  {
    title: "Zero-Knowledge Authentication",
    text: "Private identity verification using zero-knowledge proofs instead of exposing credentials.",
    href: "https://zkauth.dev/",
  },
  {
    title: "ElectroDock",
    text: "Wireless EV charging concept built around ElectroPad, a cable-free charging surface.",
    href: "https://electrodock.vercel.app/",
  },
  {
    title: "PitchEval",
    text: "AI judging platform that helps hackathon organizers shortlist submissions faster.",
    href: "https://pitcheval.vercel.app/",
  },
  {
    title: "CertForge",
    text: "Batch verification tool for NPTEL certificate PDFs with single and bulk upload support.",
    href: "https://certforge-crem.onrender.com/",
  },
  {
    title: "ExpiTrack",
    text: "Predictive inventory tool for forecasting expirations and visualizing stock health.",
    href: "https://expitrack.vercel.app/",
  },
  {
    title: "ClaudeFlare",
    text: "",
    href: "https://claudeflare.in/",
  },
  {
    title: "SanSyn World",
    text: "",
    href: "https://sansynworld.vercel.app/",
  },
];

const certificates = [
  {
    title: "AWS Cloud Quest",
    text: "AWS cloud fundamentals.",
    href: "https://www.credly.com/badges/e876a009-1f4b-4c8e-a9b6-bac900a62c6e/linked_in?t=t1ntpw",
  },
  {
    title: "Oracle Cloud Infrastructure 2025",
    text: "OCI cloud fundamentals.",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=3763D83E1D50A13CA36B1B5C21519B90B5BA2CC0FA1B03118A1C54AD5042DEA0",
  },
  {
    title: "Introduction to Cybersecurity",
    text: "Cybersecurity fundamentals.",
    href: "https://www.credly.com/badges/fafbb13f-b646-49ba-ab3e-4ab74aebd20c/linked_in_profile",
  },
  {
    title: "Cyber Threat Management",
    text: "Threat management concepts.",
    href: "https://www.credly.com/badges/f96622de-b20c-4540-a04a-f5b33f007f3a/public_url",
  },
  {
    title: "Junior Cybersecurity Analyst",
    text: "Cisco career-path credential focused on security analysis fundamentals.",
    href: "https://www.credly.com/badges/bb796abc-a90b-4aa8-ba7e-c41758f441d7/public_url",
  },
  {
    title: "Cybersecurity Finishing School",
    text: "Program from Centre of CySecK, Indian Institute of Science, Bengaluru.",
  },
];

const panels = {
  skills: {
    content: `
      <p>Security, cloud, and product tools I actually reach for.</p>
      <div class="skills-box" aria-label="Moving skills list">
        <div class="skill-row" style="--duration: 28s">
          <div class="skill-track">
            <span>Java</span><span>Python</span><span>JavaScript</span><span>SQL</span><span>Bash</span><span>Rego</span>
            <span>Java</span><span>Python</span><span>JavaScript</span><span>SQL</span><span>Bash</span><span>Rego</span>
          </div>
        </div>
        <div class="skill-row reverse" style="--duration: 32s">
          <div class="skill-track">
            <span>React</span><span>Node.js</span><span>Express</span><span>MongoDB</span><span>PostgreSQL</span><span>Kafka</span>
            <span>React</span><span>Node.js</span><span>Express</span><span>MongoDB</span><span>PostgreSQL</span><span>Kafka</span>
          </div>
        </div>
        <div class="skill-row" style="--duration: 36s">
          <div class="skill-track">
            <span class="cloudflare-text">Cloudflare</span><span>Docker</span><span>Linux</span><span>Burp Suite</span><span>Terraform</span><span>Grafana</span>
            <span class="cloudflare-text">Cloudflare</span><span>Docker</span><span>Linux</span><span>Burp Suite</span><span>Terraform</span><span>Grafana</span>
          </div>
        </div>
      </div>
    `,
  },
  projects: {
    content: listTemplate(projects),
  },
  achievements: {
    content: listTemplate([
      { title: "inCSEption Hackathon", text: "1st Place" },
      { title: "NCET Hackathon", text: "1st Place" },
      { title: "Central India Hackathon", text: "1st Runner-Up" },
      { title: "BMSIT Department Project Exhibition", text: "1st Place" },
      { title: "InfoSec University Hackathon", text: "Finalist (CTF)" },
      { title: "ZeroBlink", text: "Capture The Flag team", href: "https://zeroblink.vercel.app/" },
    ]),
  },
  certificates: {
    content: `<p class="certificate-note">Not a big fan of certificates.<br>"Practical skills &gt; theory knowledge"</p>${listTemplate(certificates)}`,
  },
};

const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector("[data-theme-label]");
const dialog = document.querySelector("[data-dialog]");
const dialogContent = document.querySelector("[data-dialog-content]");

const storedTheme = localStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

setTheme(storedTheme || preferredTheme);
requestAnimationFrame(() => {
  root.classList.add("theme-ready");
});

updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});

document.querySelectorAll("[data-panel]").forEach((button) => {
  button.addEventListener("click", () => openPanel(button.dataset.panel));
});

document.querySelector("[data-close]").addEventListener("click", () => dialog.close());

dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
});

dialog.addEventListener("click", (event) => {
  const box = dialog.getBoundingClientRect();
  const isBackdropClick = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;

  if (isBackdropClick) {
    dialog.close();
  }
});

function setTheme(theme) {
  root.dataset.theme = theme;
  themeLabel.textContent = theme === "dark" ? "Light" : "Dark";
}

function updateScrollState() {
  document.body.classList.toggle("scrolled", window.scrollY > 12);
}

function openPanel(key) {
  const panel = panels[key];

  dialogContent.innerHTML = panel.content;
  dialog.scrollTop = 0;
  document.body.classList.add("dialog-open");
  dialog.showModal();
}

function listTemplate(items) {
  return `<ul class="dialog-list">${items
    .map(
      (item) => `<li class="${item.href ? "has-action" : ""}"><div><strong>${item.title}</strong>${item.text ? `<span>${item.text}</span>` : ""}</div>${item.href ? `<a href="${item.href}" target="_blank" rel="noreferrer">Open</a>` : ""}</li>`,
    )
    .join("")}</ul>`;
}
