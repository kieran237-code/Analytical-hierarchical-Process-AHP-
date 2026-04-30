
# 📊 Analytical hierarchical Process (AHP)

**Analytical hierarchical Process (AHP)** est une application web moderne d'aide à la décision multicritère basée sur la méthode **Analytic Hierarchy Process (AHP)**. Conçue pour les étudiants et les professionnels, elle permet de décomposer des problèmes complexes en une hiérarchie de critères et d'alternatives pour obtenir un choix rationnel et mathématiquement justifié.

## 🚀 Fonctionnalités

*   **Gestion de l'Objectif :** Définition claire de la problématique de décision.
*   **Système de Critères Dynamiques :** Ajout et gestion flexible des critères d'évaluation.
*   **Saisie Intuitive des Préférences :** Utilisation de l'échelle de Saaty (1-9) via des curseurs visuels.
*   **Analyse de Cohérence :** Calcul automatique de l'Indice de Cohérence (CI) et du Ratio de Cohérence (CR) pour valider la logique des comparaisons.
*   **Visualisation des Résultats :** Graphiques interactifs et identification de la meilleure alternative avec son score global.

## 🛠️ Installation

Suivez ces étapes pour configurer le projet localement.

### Prérequis
*   **Node.js** (v18.0.0 ou supérieur)
*   **npm** ou **yarn**

### Étapes
1.  **Cloner le dépôt :**
    ```bash
    git clone git@github.com:kieran237-code/Analytical-hierarchical-Process-AHP-.git
    cd nom_du_dossier_ou_le_projet_est_clone
    ```

2.  **Installer les dépendances :**
    
```bash
    npm install
    ```

3.  **Lancer l'application en mode développement :**
    ```bash
    npm run dev
    
```
    *L'application sera accessible sur `http://localhost:5173`.*

4.  **Construire pour la production :**
    ```bash
    npm run build
    ```

## 📖 Guide d'Utilisation

L'application suit un flux de travail en 4 étapes :

### 1. Définition (Objectif & Critères)
Saisissez votre objectif principal (ex: "Choisir un ordinateur") et ajoutez au moins deux critères (ex: Prix, Performance, Design).

### 2. Alternatives
Identifiez les options disponibles (ex: Asus, Dell, MacBook). Pour chaque alternative, saisissez une valeur brute ou un score préliminaire pour chaque critère.

### 3. Comparaison Paire par Paire
Utilisez les sliders pour comparer l'importance relative de chaque critère l'un par rapport à l'autre selon l'échelle suivante:
*   **1 :** Importance égale.
*   **3 :** Importance modérée.
*   **5 :** Importance forte.
*   **7 :** Importance très forte.
*   **9 :** Importance extrême.

Cliquez sur **"Générer la matrice"** pour valider vos choix, puis sur **"Lancer l'analyse"**.

### 4. Résultats & Analyse
*   Consultez le score final de chaque alternative.
*   **Important :** Vérifiez le **Ratio de Cohérence (CR)**. S'il est inférieur à **0.1 (10%)**, vos jugements sont considérés comme cohérents. S'il est supérieur, l'application vous avertira de revoir vos comparaisons.

## 🧮 Méthodologie Mathématique

Le moteur de calcul effectue les opérations suivantes :
1.  **Normalisation de la matrice :** Division de chaque élément par la somme de sa colonne.
2.  **Calcul des vecteurs propres (Poids) :** Moyenne arithmétique des lignes normalisées.
3.  **Calcul de $\lambda_{max}$ :** Pour déterminer la cohérence.
4.  **Vérification du CR :** $CR = \frac{CI}{RI}$, où $RI$ est l'indice aléatoire correspondant à la taille de la matrice.

## 🧪 Technologies Utilisées

*   **Frontend :** React.js, Tailwind CSS.
*   **Animations :** Framer Motion.
*   **Icônes :** Lucide React.
*   **Graphiques :** Chart.js & React-Chartjs-2.

---
*Développé par FOGUEM Junior Kieran etudiant a l'Université de Yaoundé I.*
```