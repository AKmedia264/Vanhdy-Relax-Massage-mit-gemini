document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggle-form-btn');
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success-message');
    const submitBtn = document.getElementById('submit-btn-text');

    // 1. Formular ein-/ausblenden über den Hauptbutton
    if (toggleBtn && contactForm) {
        toggleBtn.addEventListener('click', function () {
            contactForm.classList.toggle('open');
            
            if (contactForm.classList.contains('open')) {
                toggleBtn.textContent = 'Formular schließen';
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                toggleBtn.textContent = 'Nachricht schreiben';
            }
        });
    }

    // 2. Formular-Absendung im Hintergrund (ohne Seitenwechsel)
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Verhindert das Standard-Neuladen/Weiterleiten der Seite

            const formData = new FormData(contactForm);
            
            // Button kurz deaktivieren, um Mehrfachklicks zu verhindern
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wird gesendet...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'json'
                    }
                });

                if (response.ok) {
                    // Erfolg! Formularfelder verstecken, Erfolgsmeldung zeigen
                    contactForm.reset();
                    submitBtn.style.display = 'none';
                    successMsg.style.display = 'block';
                } else {
                    alert('Leider gab es einen Fehler beim Senden. Bitte versuchen Sie es per WhatsApp.');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Nachricht absenden';
                }
            } catch (error) {
                alert('Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Nachricht absenden';
            }
        });
    }
});