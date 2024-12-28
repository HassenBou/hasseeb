function calculate() {
    // Récupérer le type de calcul et le montant
    let calculationType = document.getElementById('calculationType').value;
    let amount = parseFloat(document.getElementById('amount').value);
    let chiffreAffaires = parseFloat(document.getElementById('chiffreAffaires').value);

    // Vérifier que le montant est valide
    if (calculationType === "chiffreAffaires" && (isNaN(chiffreAffaires) || chiffreAffaires <= 0)) {
        document.getElementById('result').innerHTML = "<p style='color: red;'>Veuillez entrer un chiffre d'affaires valide.</p>";
        return;
    }

    let brut, net, cotisationEmploye, cotisationEmployeur, formationProfessionnelle, accidentsTravail, chargeCNSS, totalEntreprise;
    let IS, TVA, TE, totalTaxes;

    // Si le calcul porte sur le salaire
    if (calculationType === "brut" || calculationType === "net") {
        if (calculationType === "brut") {
            brut = amount;
            cotisationEmploye = brut * 0.0918;
            net = brut - cotisationEmploye;
            cotisationEmployeur = brut * 0.1657;
            formationProfessionnelle = brut * 0.02;
            accidentsTravail = brut * 0.02;
            chargeCNSS = cotisationEmploye + cotisationEmployeur;
            totalEntreprise = brut + cotisationEmployeur + formationProfessionnelle + accidentsTravail;
        } else if (calculationType === "net") {
            net = amount;
            brut = net / (1 - 0.0918);
            cotisationEmploye = brut * 0.0918;
            cotisationEmployeur = brut * 0.1657;
            formationProfessionnelle = brut * 0.02;
            accidentsTravail = brut * 0.02;
            chargeCNSS = cotisationEmploye + cotisationEmployeur;
            totalEntreprise = brut + cotisationEmployeur + formationProfessionnelle + accidentsTravail;
        }

        // Afficher les résultats du salaire
        document.getElementById('result').innerHTML = `
            <h3>Résultats Salaire :</h3>
            <p><strong>Salaire Brut :</strong> ${brut.toFixed(2)} DT</p>
            <p><strong>Cotisations Employé (9.18%) :</strong> ${cotisationEmploye.toFixed(2)} DT</p>
            <p><strong>Salaire Net :</strong> ${net.toFixed(2)} DT</p>
            <p><strong>Cotisations Employeur (16.57%) :</strong> ${cotisationEmployeur.toFixed(2)} DT</p>
            <p><strong>Formation Professionnelle (2%) :</strong> ${formationProfessionnelle.toFixed(2)} DT</p>
            <p><strong>Accidents de Travail (2%) :</strong> ${accidentsTravail.toFixed(2)} DT</p>
            <p><strong>Charge CNSS :</strong> ${chargeCNSS.toFixed(2)} DT</p>
            <p><strong>Coût Total pour l'Entreprise :</strong> ${totalEntreprise.toFixed(2)} DT</p>
        `;
    }

    // Si le calcul porte sur le chiffre d'affaires
    if (calculationType === "chiffreAffaires") {
        // Calcul des taxes
        IS = chiffreAffaires * 0.15;  // Impôt sur les sociétés à 15%
        TVA = chiffreAffaires * 0.19;  // TVA à 19% (si applicable)
        TE = chiffreAffaires * 0.01;  // Taxe sur les entreprises à 1%

        totalTaxes = IS + TVA + TE;

        // Affichage des résultats des taxes
        document.getElementById('result').innerHTML = `
            <h3>Résultats Taxes :</h3>
            <p><strong>Impôt sur les Sociétés (IS) :</strong> ${IS.toFixed(2)} DT</p>
            <p><strong>TVA (si applicable) :</strong> ${TVA.toFixed(2)} DT</p>
            <p><strong>Taxe sur les Entreprises (TE) :</strong> ${TE.toFixed(2)} DT</p>
            <p><strong>Total des Taxes :</strong> ${totalTaxes.toFixed(2)} DT</p>
        `;
    }
}

// Masquer/afficher le champ Montant ou Chiffre d'Affaires en fonction du type de calcul sélectionné
document.getElementById('calculationType').addEventListener('change', function() {
    if (this.value === 'chiffreAffaires') {
        document.getElementById('amountGroup').style.display = 'none';  // Masquer le champ Montant
        document.getElementById('chiffreAffairesGroup').style.display = 'block';  // Afficher le champ Chiffre d'Affaires
    } else {
        document.getElementById('amountGroup').style.display = 'block';  // Afficher le champ Montant
        document.getElementById('chiffreAffairesGroup').style.display = 'none';  // Masquer le champ Chiffre d'Affaires
    }
});
