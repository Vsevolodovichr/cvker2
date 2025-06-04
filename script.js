let currentTemplate = "template-minimal";

document.getElementById("template-select").addEventListener("change", (e) => {
  currentTemplate = e.target.value;
  document.getElementById("cv-preview").innerHTML = ""; // Очистити попередній перегляд
  document.getElementById("download-pdf-btn").style.display = "none";
});

document.getElementById("generate-btn").addEventListener("click", () => {
  generateCV(currentTemplate);
  document.getElementById("download-pdf-btn").style.display = "inline-block";
});

function generateCV(templateId) {
  const template = document.getElementById(templateId);
  const clone = template.content.cloneNode(true);

  clone.getElementById("name").textContent = document.getElementById("name").value.trim() || "(Name)";
  clone.getElementById("email").textContent = document.getElementById("email").value.trim() || "(Email)";
  clone.getElementById("summary").textContent = document.getElementById("summary").value.trim() || "(Summary)";

  const preview = document.getElementById("cv-preview");
  preview.innerHTML = "";
  preview.appendChild(clone);
}

document.getElementById("download-pdf-btn").addEventListener("click", () => {
  downloadPDF();
});

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const name = document.getElementById("name").value.trim() || "(Name)";
  const email = document.getElementById("email").value.trim() || "(Email)";
  const summary = document.getElementById("summary").value.trim() || "(Summary)";

  doc.setFontSize(20);
  doc.text(name, 10, 20);

  doc.setFontSize(14);
  doc.text(email, 10, 30);

  doc.setFontSize(12);
  const splitSummary = doc.splitTextToSize(summary, 180);
  doc.text(splitSummary, 10, 40);

  doc.save("resume.pdf");
}
